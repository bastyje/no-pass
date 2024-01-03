using System.Collections.ObjectModel;
using NoPass.Utils;

namespace NoPass.Core.Identity;

public class User
{
    private User() {}

    public User(string name, string displayName)
    {
        Id = Guid.NewGuid();
        Name = name;
        DisplayName = displayName;
        Credentials = new Collection<Credential>();
        GeneratePrfFirstSalt();
    }
    
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string DisplayName { get; set; }
    public Collection<Credential> Credentials { get; set; }
    public byte[]? PrfFirstSalt { get; set; }

    public void GeneratePrfFirstSalt()
    {
        PrfFirstSalt = new byte[32].GetRandom();
    }
}