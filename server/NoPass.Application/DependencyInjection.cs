
using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace NoPass.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddMediatR(x =>
        {
            x.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
        });

        return serviceCollection;
    }
}