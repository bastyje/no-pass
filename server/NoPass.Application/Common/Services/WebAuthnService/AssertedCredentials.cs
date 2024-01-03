namespace NoPass.Application.Common.Services.WebAuthnService;

public class AssertedCredentials
{
    public required byte[] KeyDerivationSalt { get; set; }
}