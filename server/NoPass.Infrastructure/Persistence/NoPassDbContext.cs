using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using NoPass.Application.Common.Services;
using NoPass.Core.Identity;
using NoPass.Core.Secret;
using NoPass.Infrastructure.Extensions;

namespace NoPass.Infrastructure.Persistence;

public class NoPassDbContext(DbContextOptions<NoPassDbContext> options) : DbContext(options), IRepository
{
    
    #region identity

    private const string IdentitySchemaName = "identity";

    public DbSet<Credential> Credentials { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    #endregion
    
    #region secret

    private const string SecretSchemaName = "secret";

    public DbSet<Secret> Secrets { get; set; } = null!;

    #endregion

    #region configuration

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        base.ConfigureConventions(configurationBuilder);
        configurationBuilder.Conventions.Remove(typeof(TableNameFromDbSetConvention));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        #region identity

        modelBuilder.Entity<Credential>().ToPostgresTable(nameof(Credential), IdentitySchemaName);
        modelBuilder.Entity<User>().ToPostgresTable(nameof(User), IdentitySchemaName);
        
        #endregion

        #region secret

        modelBuilder.Entity<Secret>().ToPostgresTable(nameof(Secret), SecretSchemaName);

        #endregion
    }

    #endregion

    public IQueryable<TEntity> Get<TEntity>() where TEntity : class => Set<TEntity>();

    public new void Add<TEntity>(TEntity entity) where TEntity : class
    {
        Set<TEntity>().Add(entity);
    }

    public void AddRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
    {
        Set<TEntity>().AddRange(entities);
    }

    public new void Update<TEntity>(TEntity entity) where TEntity : class
    {
        Set<TEntity>().Update(entity);
    }

    public void UpdateRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
    {
        Set<TEntity>().UpdateRange(entities);
    }

    public new void Remove<TEntity>(TEntity entity) where TEntity : class
    {
        Set<TEntity>().Remove(entity);
    }

    public void RemoveRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
    {
        Set<TEntity>().RemoveRange(entities);
    }
}