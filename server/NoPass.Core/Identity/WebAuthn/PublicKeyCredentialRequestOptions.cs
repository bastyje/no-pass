namespace NoPass.Core.Identity.WebAuthn;

public class PublicKeyCredentialRequestOptions
{
    public List<PublicKeyCredentialDescriptor>? AllowCredentials { get; set; }
    public required byte[] Challenge { get; set; }
    public ClientExtensionsInput? Extensions { get; set; }
    public string? RpId { get; set; }
    public uint Timeout { get; set; }
    public string? UserVerification { get; set; }
}