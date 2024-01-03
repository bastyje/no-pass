namespace NoPass.Core.Identity.WebAuthn;

public class AuthenticatorResponse
{
    public required byte[] AttestationObject { get; set; }
    public required byte[] ClientDataJson { get; set; }
}

public class PrfExtensionOutput
{
    public required byte[] First { get; set; }
    public byte[]? Second { get; set; }
}

public class PrfType
{
    public bool Enabled { get; set; }
    public PrfExtensionOutput? Results { get; set; }
}

public class AuthenticationExtensionsClientOutputs
{
    public PrfType? Prf { get; set; }
}

public class AuthenticatorAttestationResponse
{
    public required string Id { get; set; }
    public required byte[] RawId { get; set; }
    public required string Type { get; set; }
    public required AuthenticatorResponse Response { get; set; }
    public AuthenticationExtensionsClientOutputs? Extensions { get; set; }
}