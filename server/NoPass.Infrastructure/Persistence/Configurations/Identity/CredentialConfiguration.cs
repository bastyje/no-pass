using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoPass.Core.Identity;

namespace NoPass.Infrastructure.Persistence.Configurations.Identity;

public class CredentialConfiguration : IEntityTypeConfiguration<Credential>
{
    public void Configure(EntityTypeBuilder<Credential> builder)
    {
        builder.Property(x => x.Transports).HasConversion(
            v => v == null ? null : JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
            v => v == null ? null : JsonSerializer.Deserialize<string[]>(v, JsonSerializerOptions.Default));
    }
}