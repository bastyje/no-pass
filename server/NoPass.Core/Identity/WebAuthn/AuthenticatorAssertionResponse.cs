namespace NoPass.Core.Identity.WebAuthn;

public class AssertionResponse : AuthenticatorResponse
{
    public required byte[] Signature { get; set; }
    public required byte[] AuthenticatorData { get; set; }
    public byte[]? UserHandle { get; set; }
}

public class AuthenticatorAssertionResponse
{
    public required string Id { get; set; }
    public required byte[] RawId { get; set; }
    public required string Type { get; set; }
    public required AssertionResponse Response { get; set; }
    public AuthenticationExtensionsClientOutputs? Extensions { get; set; }
}