using Fido2NetLib;
using Fido2NetLib.Objects;
using NoPass.Core.Identity;
using NoPass.Core.Identity.WebAuthn;
using NoPass.Core.Identity.WebAuthn.Extensions;
using NoPass.Core.Identity.WebAuthn.Extensions.Prf;
using AssertionOptions = Fido2NetLib.AssertionOptions;
using AuthenticatorAttestationResponse = NoPass.Core.Identity.WebAuthn.AuthenticatorAttestationResponse;
using Prf = NoPass.Core.Identity.WebAuthn.Extensions.Prf.Prf;
using PublicKeyCredentialDescriptor = NoPass.Core.Identity.WebAuthn.PublicKeyCredentialDescriptor;
using PublicKeyCredentialRpEntity = NoPass.Core.Identity.WebAuthn.PublicKeyCredentialRpEntity;
using PublicKeyCredentialUserEntity = NoPass.Core.Identity.WebAuthn.PublicKeyCredentialUserEntity;

namespace NoPass.Identity.WebAuthn;

public static class WebAuthnMapper
{
    #region Options

    public static AttestationOptions Map(this CredentialCreateOptions options) => new()
    {
        Rp = new PublicKeyCredentialRpEntity
        {
            Id = options.Rp.Id,
            Name = options.Rp.Name
        },
        User = new PublicKeyCredentialUserEntity
        {
            Id = options.User.Id,
            Name = options.User.Name,
            DisplayName = options.User.Name 
        },
        Extensions = options.Extensions is null ? null : new ClientExtensionsInput
        {
            Prf = options.Extensions.PRF is null ? null : new Prf
            {
                Eval = new Eval
                {
                    First = options.Extensions.PRF.Eval.First
                }
            }
        },
        PubKeyCredParams = options.PubKeyCredParams.Select(param => new PublicKeyCredentialParameters
        {
            Alg = (int) param.Alg,
            Type = PublicKeyCredentialType.PublicKey.ToEnumMemberValue()
        }).ToList(),
        Attestation = options.Attestation.ToEnumMemberValue(),
        Challenge = options.Challenge
    };

    public static PublicKeyCredentialRequestOptions Map(this AssertionOptions options) => new()
    {
        AllowCredentials = options.AllowCredentials.Select(credential => new PublicKeyCredentialDescriptor
        {
            Id = credential.Id,
            Type = credential.Type.ToEnumMemberValue(),
            Transports = credential.Transports?.Select(t => t.ToEnumMemberValue()).ToList()
        }).ToList(),
        Challenge = options.Challenge,
        Extensions = options.Extensions is null ? null : new ClientExtensionsInput
        {
            Prf = options.Extensions.PRF is null ? null : new Prf
            {
                Eval = options.Extensions.PRF.Eval is null ? null : new Eval
                {
                    First = options.Extensions.PRF.Eval.First
                }
            }
        },
        RpId = options.RpId,
        Timeout = options.Timeout,
        UserVerification = options.UserVerification?.ToEnumMemberValue()
    };
    
    #endregion

    #region Verifications
    
    public static AuthenticatorAttestationRawResponse Map(this AuthenticatorAttestationResponse response) => new ()
    {
        Id = Base64Url.Decode(response.Id),
        RawId = response.RawId,
        Type = response.Type == "public-key" ? PublicKeyCredentialType.PublicKey : PublicKeyCredentialType.Invalid,
        Response = new AuthenticatorAttestationRawResponse.ResponseData
        {
            AttestationObject = response.Response.AttestationObject,
            ClientDataJson = response.Response.ClientDataJson
        },
        Extensions = response.Extensions is null ? null : new Fido2NetLib.Objects.AuthenticationExtensionsClientOutputs
        {
            PRF = response.Extensions.Prf is null ? null : new AuthenticationExtensionsPRFOutputs
            {
                Enabled = response.Extensions.Prf.Enabled,
                Results = response.Extensions.Prf.Results is null ? null : new AuthenticationExtensionsPRFValues
                {
                    First = response.Extensions.Prf.Results.First,
                    Second = response.Extensions.Prf.Results.Second
                }
            }
        }
    };

    public static AuthenticatorAssertionRawResponse Map(this NoPass.Core.Identity.WebAuthn.AuthenticatorAssertionResponse response) => new()
    {
        Id = Base64Url.Decode(response.Id),
        RawId = response.RawId,
        Type = response.Type == "public-key" ? PublicKeyCredentialType.PublicKey : PublicKeyCredentialType.Invalid,
        Response = new AuthenticatorAssertionRawResponse.AssertionResponse
        {
            AttestationObject = null,
            ClientDataJson = response.Response.ClientDataJson,
            AuthenticatorData = response.Response.AuthenticatorData,
            UserHandle = response.Response.UserHandle,
            Signature = response.Response.Signature
        }
    };

    #endregion
}