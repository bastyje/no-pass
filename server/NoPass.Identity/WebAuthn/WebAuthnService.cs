using System.Text;
using Fido2NetLib;
using Fido2NetLib.Objects;
using Microsoft.Extensions.Caching.Memory;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Application.Common.Services.WebAuthnService;
using NoPass.Core.Identity;
using NoPass.Core.Identity.WebAuthn;
using AuthenticationExtensionsClientInputs = Fido2NetLib.Objects.AuthenticationExtensionsClientInputs;
using AuthenticatorAssertionResponse = NoPass.Core.Identity.WebAuthn.AuthenticatorAssertionResponse;
using AuthenticatorAttestationResponse = NoPass.Core.Identity.WebAuthn.AuthenticatorAttestationResponse;
using PublicKeyCredentialDescriptor = Fido2NetLib.Objects.PublicKeyCredentialDescriptor;

namespace NoPass.Identity.WebAuthn;

public class WebAuthnService(IFido2 fido2, IMemoryCache cache, IRepository repository) : IWebAuthnService
{
    private const string Attestation = "Attestation-{0}";
    private const string Assertion = "Assertion-{0}";
    
    #region Options

    public ServiceResponse<AttestationOptions> GetAttestationOptions(User user)
    {
        var fido2User = new Fido2User
        {
            Id = Encoding.UTF8.GetBytes(user.Id.ToString()),
            Name = user.Name,
            DisplayName = user.DisplayName
        };
        
        var keyDescriptors = repository
            .Get<Credential>()
            .Where(c => c.UserId == user.Id)
            .Select(c => new PublicKeyCredentialDescriptor(
                PublicKeyCredentialType.PublicKey,
                c.RawId,
                // todo use transports
                new[] { AuthenticatorTransport.Usb }
            )).ToList();

        // todo adjust properly
        var authenticatorSelection = new AuthenticatorSelection
        {
            ResidentKey = ResidentKeyRequirement.Discouraged,
            AuthenticatorAttachment = AuthenticatorAttachment.CrossPlatform,
            UserVerification = UserVerificationRequirement.Discouraged
        };

        var extensions = new AuthenticationExtensionsClientInputs
        {
            PRF = new AuthenticationExtensionsPRFInputs
            {
                Eval = new AuthenticationExtensionsPRFValues
                {
                    First = Array.Empty<byte>()
                }
            }
        };

        var options = fido2.RequestNewCredential(
            fido2User,
            keyDescriptors,
            authenticatorSelection,
            AttestationConveyancePreference.Direct,
            extensions
        );

        cache.Set(string.Format(Attestation, user.Id), options);
        return new ServiceResponse<AttestationOptions>(options.Map());
    }

    public ServiceResponse<PublicKeyCredentialRequestOptions> GetAssertionOptions(User user)
    {
        var credentials = repository
            .Get<Credential>()
            .Where(c => c.UserId == user.Id)
            .Select(c => new PublicKeyCredentialDescriptor(
                PublicKeyCredentialType.PublicKey,
                c.RawId,
                // todo use transports
                new[] { AuthenticatorTransport.Usb }
            )).ToList();

        var extensions = new AuthenticationExtensionsClientInputs
        {
            PRF = new AuthenticationExtensionsPRFInputs
            {
                Eval = new AuthenticationExtensionsPRFValues
                {
                    First = user.PrfFirstSalt
                }
            }
        };

        var options = fido2.GetAssertionOptions(credentials, UserVerificationRequirement.Discouraged, extensions);

        cache.Set(string.Format(Assertion, user.Id), options);
        return new ServiceResponse<PublicKeyCredentialRequestOptions>(options.Map());
    }

    #endregion

    #region Verifications

    public async Task<ServiceResponse<AttestedCredentials>> VerifyAttestationAsync(Guid userId,
        AuthenticatorAttestationResponse authenticatorResponse)
    {
        if (!cache.TryGetValue(string.Format(Attestation, userId), out CredentialCreateOptions? options) ||
            options is null)
        {
            return Errors.ContractError().ToServiceResponse<AttestedCredentials>();
        }

        cache.Remove(string.Format(Attestation, userId));

        try
        {
            var mapped = authenticatorResponse.Map();
            var credential = await fido2.MakeNewCredentialAsync(
                mapped,
                options,
                IsCredentialIdUniqueToUserAsyncDelegate,
                CancellationToken.None);

            if (credential.Result is null)
            {
                return Errors.CredentialAttestationError().ToServiceResponse<AttestedCredentials>();
            }

            
            return new ServiceResponse<AttestedCredentials>(new AttestedCredentials
            {
                CredentialId = credential.Result.Id,
                PublicKey = credential.Result.PublicKey,
                Transports = credential.Result.Transports?.Select(t => t.ToEnumMemberValue()).ToArray()
            });
        }
        catch (Fido2VerificationException)
        {
            return Errors.CredentialAttestationError().ToServiceResponse<AttestedCredentials>();
        }
    }

    public async Task<ServiceResponse<AssertedCredentials>> VerifyAssertionAsync(Guid userId, AuthenticatorAssertionResponse authenticatorResponse)
    {
        if (!cache.TryGetValue(string.Format(Assertion, userId), out AssertionOptions? options) || options is null)
        {
            return Errors.ContractError().ToServiceResponse<AssertedCredentials>();
        }
        
        cache.Remove(string.Format(Assertion, userId));

        var credential = repository.Get<Credential>().First(c => c.RawId == authenticatorResponse.RawId);
        await fido2.MakeAssertionAsync(
            authenticatorResponse.Map(),
            options,
            credential.PublicKey,
            new List<byte[]>(),
            0,
            IsUserHandleOwnerOfCredentialIdAsyncDelegate);
        
        return new ServiceResponse<AssertedCredentials>(new AssertedCredentials
        {
            KeyDerivationSalt = credential.KeyDerivationSalt
        });
    }
    
    private Task<bool> IsCredentialIdUniqueToUserAsyncDelegate(IsCredentialIdUniqueToUserParams credentialIdUserParams, CancellationToken cancellationToken)
    {
        return Task.FromResult(!repository.Get<Credential>().Any(c => c.RawId == credentialIdUserParams.CredentialId));
    }

    private static Task<bool> IsUserHandleOwnerOfCredentialIdAsyncDelegate(IsUserHandleOwnerOfCredentialIdParams param,
        CancellationToken token)
    {
        return Task.FromResult(true);
    }

    #endregion
}

public static class Errors
{
    public static ErrorMessage ContractError() => new()
    {
        Id = "WAUTH-0001",
        Message = "Action is invoked in wrong order."
    };
    
    public static ErrorMessage CredentialAttestationError() => new()
    {
        Id = "WAUTH-0002",
        Message = "There was an error during credential attestation."
    };
}