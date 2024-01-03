namespace NoPass.Application.Common.Services.WebAuthnService;

public class AttestedCredentials
{
    public required byte[] CredentialId { get; set; }
    public required byte[] PublicKey { get; set; }
    public string[]? Transports { get; set; }
}