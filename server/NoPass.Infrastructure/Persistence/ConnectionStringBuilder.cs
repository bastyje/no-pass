using Microsoft.Extensions.Configuration;
using Npgsql;

namespace NoPass.Infrastructure.Persistence;

public class ConnectionStringBuilder(IConfiguration configuration)
{
    public string Build() => new NpgsqlConnectionStringBuilder()
        .AddServer(configuration)
        .AddPort(configuration)
        .AddUserName(configuration)
        .AddPassword(configuration)
        .AddDatabase(configuration)
        .ToString();
}

public static class NpgsqlConnectionStringBuilderExtensions
{
    private const string MissingPropertyError = "Required property {0} is missing in configuration";
    
    private const string ServerPropertyName = "Data:Server";
    private const string PortPropertyName = "Data:Port";
    private const string UserIdPropertyName = "Data:UserId";
    private const string PasswordPropertyName = "Data:Password";
    private const string DatabasePropertyName = "Data:Database";
    
    public static NpgsqlConnectionStringBuilder AddServer(this NpgsqlConnectionStringBuilder builder, IConfiguration configuration)
    {
        const string propName = "";
        var server = configuration[ServerPropertyName];
        if (server is null)
        {
            ThrowIfMissingProperty(ServerPropertyName);
        }

        builder.Host = server;
        return builder;
    }
    
    public static NpgsqlConnectionStringBuilder AddPort(this NpgsqlConnectionStringBuilder builder, IConfiguration configuration)
    {
        var portString = configuration[PortPropertyName];
        if (portString is null)
        {
            ThrowIfMissingProperty(PortPropertyName);
        }
        
        if (!int.TryParse(portString, out var port))
        {
            throw new ArgumentException($"Port in {PortPropertyName} is invalid.");
        }

        builder.Port = port;
        return builder;
    }

    public static NpgsqlConnectionStringBuilder AddUserName(this NpgsqlConnectionStringBuilder builder, IConfiguration configuration)
    {
        var username = configuration[UserIdPropertyName];
        if (username is null)
        {
            ThrowIfMissingProperty(UserIdPropertyName);
        }

        builder.Username = username;
        return builder;
    }
    
    public static NpgsqlConnectionStringBuilder AddPassword(this NpgsqlConnectionStringBuilder builder, IConfiguration configuration)
    {
        var password = configuration[PasswordPropertyName];
        if (password is null)
        {
            ThrowIfMissingProperty(PasswordPropertyName);
        }

        builder.Password = password;
        return builder;
    }
    
    public static NpgsqlConnectionStringBuilder AddDatabase(this NpgsqlConnectionStringBuilder builder, IConfiguration configuration)
    {
        var database = configuration[DatabasePropertyName];
        if (database is null)
        {
            ThrowIfMissingProperty(DatabasePropertyName);
        }

        builder.Database = database;
        return builder;
    }

    private static void ThrowIfMissingProperty(string propertyName)
    {
        throw new ArgumentException(string.Format(MissingPropertyError, propertyName));
    }
}