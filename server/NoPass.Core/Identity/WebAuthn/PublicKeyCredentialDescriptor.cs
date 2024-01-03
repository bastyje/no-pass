namespace NoPass.Core.Identity.WebAuthn;

public class PublicKeyCredentialDescriptor
{
    public required byte[] Id { get; set; }
    public List<string>? Transports { get; set; }
    public required string Type { get; set; }
}