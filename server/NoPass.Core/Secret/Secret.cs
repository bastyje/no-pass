namespace NoPass.Core.Secret;

public class Secret
{
    public required Guid Id { get; set; }
    public required Guid UserId { get; set; }
    public required byte[] Content { get; set; }
    public required byte[] Iv { get; set; }
}