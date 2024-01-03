namespace NoPass.Core.Identity.WebAuthn;

public class PublicKeyCredentialRpEntity
{
    public required string Id { get; set; }
    public required string Name { get; set; }
}

public class PublicKeyCredentialUserEntity
{
    public required byte[] Id { get; set; }
    public required string Name { get; set; }
    public required string DisplayName { get; set; }
}

public class PublicKeyCredentialParameters
{
    public required int Alg { get; set; }
    public required string Type { get; set; }
}



public class AttestationOptions
{
    public required PublicKeyCredentialRpEntity Rp { get; set; }
    public required PublicKeyCredentialUserEntity User { get; set; }
    public ClientExtensionsInput? Extensions { get; set; }
    public required List<PublicKeyCredentialParameters> PubKeyCredParams { get; set; }
    public string? Attestation { get; set; }
    public required byte[] Challenge { get; set; }
}    
