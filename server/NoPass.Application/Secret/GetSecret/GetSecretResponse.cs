namespace NoPass.Application.Secret.GetSecret;

public class GetSecretResponse
{
    public required string Content { get; init; }
    public required string Iv { get; init; }
}