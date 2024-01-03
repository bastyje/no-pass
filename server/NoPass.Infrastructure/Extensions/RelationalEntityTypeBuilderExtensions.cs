using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoPass.Utils;

namespace NoPass.Infrastructure.Extensions;

public static class RelationalEntityTypeBuilderExtensions
{
    public static EntityTypeBuilder<TEntity> ToPostgresTable<TEntity>(this EntityTypeBuilder<TEntity> entityTypeBuilder, string name, string schema) where TEntity : class
    {
        return entityTypeBuilder.ToTable(name.ToSnakeCase(), schema);
    }
}