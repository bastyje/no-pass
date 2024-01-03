using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NoPass.Application.Common.Services;
using NoPass.Infrastructure.Persistence;

namespace NoPass.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddDbContext<IRepository, NoPassDbContext>(x =>
        {
            x.UseNpgsql(new ConnectionStringBuilder(configuration).Build()).UseSnakeCaseNamingConvention();
        });

        return serviceCollection;
    }
}