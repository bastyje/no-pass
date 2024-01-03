using NoPass.Application;
using NoPass.Application.Common;
using NoPass.Identity;
using NoPass.Infrastructure;

namespace NoPass.WebAPI.Extensions;

public static class ServiceCollectionExtensions
{
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        var configuration = new Configuration
        {
            Data = new DataConfiguration
            {
                Server = builder.Configuration["Data:Server"] ?? throw new ArgumentNullException(),
                Port = int.Parse(builder.Configuration["Data:Port"] ?? throw new ArgumentNullException()),
                Database = builder.Configuration["Data:Database"] ?? throw new ArgumentNullException(),
                UserId = builder.Configuration["Data:UserId"] ?? throw new ArgumentNullException(),
                Password = builder.Configuration["Data:Password"] ?? throw new ArgumentNullException()
            },
            Jwt = new JwtConfiguration
            {
                Audience = builder.Configuration["Jwt:Audience"] ?? throw new ArgumentNullException(),
                Issuer = builder.Configuration["Jwt:Issuer"] ?? throw new ArgumentNullException(),
                SecretKey = builder.Configuration["Jwt:SecretKey"] ?? throw new ArgumentNullException()
            }
        };

        builder.Services.AddSingleton<Configuration>(x => configuration);

        builder.Services.AddMemoryCache();
        builder.Services.AddIdentity(builder.Configuration);
        builder.Services.AddInfrastructure(builder.Configuration);
        builder.Services.AddApplication();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddControllers();

        return builder;
    }
}