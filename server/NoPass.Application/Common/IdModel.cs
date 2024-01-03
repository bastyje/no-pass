namespace NoPass.Application.Common;

public class IdModel(Guid id)
{
    public Guid Id { get; set; } = id;
}