namespace NoPass.Application.Identity.GetEncryptedKey;

public class EncryptedKeyResponse
{
    public required byte[] Key { get; set; }
    public required byte[] Iv { get; set; }
}