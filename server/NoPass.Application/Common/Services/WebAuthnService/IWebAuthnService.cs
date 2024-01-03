using NoPass.Core.Identity;
using NoPass.Core.Identity.WebAuthn;

namespace NoPass.Application.Common.Services.WebAuthnService;

public interface IWebAuthnService
{
    ServiceResponse<AttestationOptions> GetAttestationOptions(User user);
    ServiceResponse<PublicKeyCredentialRequestOptions> GetAssertionOptions(User user);
    Task<ServiceResponse<AttestedCredentials>> VerifyAttestationAsync(Guid userId, AuthenticatorAttestationResponse authenticatorResponse);
    Task<ServiceResponse<AssertedCredentials>> VerifyAssertionAsync(Guid userId, AuthenticatorAssertionResponse authenticatorResponse);
}