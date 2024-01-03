namespace NoPass.Application.Secret.GetAllSecrets;

public class GetAllSecretsRow
{
    public Guid Id { get; set; }
    public required string Content { get; set; }
    public required string Iv { get; set; }
}