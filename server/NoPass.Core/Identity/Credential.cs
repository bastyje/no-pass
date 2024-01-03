using NoPass.Utils;

namespace NoPass.Core.Identity;

public class Credential
{
    public Credential() {}

    public Credential(Guid userId, byte[] rawId, byte[] publicKey, string[]? transports, byte[]? encryptedKey = null)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        RawId = rawId;
        PublicKey = publicKey;
        Transports = transports;
        EncryptedKey = encryptedKey;
        
        GenerateKeyDerivationSalt();
    }
    
    public Guid Id { get; init; }
    public Guid UserId { get; init; }
    public User? User { get; init; }
    public byte[] RawId { get; init; }
    public byte[] PublicKey { get; init; }
    public string[]? Transports { get; init; }
    public byte[] KeyDerivationSalt { get; set; }
    public byte[]? EncryptedKey { get; set; }
    public byte[]? EncryptedKeyIv { get; set; }

    public void GenerateKeyDerivationSalt()
    {
        KeyDerivationSalt = new byte[32].GetRandom();
    }
}