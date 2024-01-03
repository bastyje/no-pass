using Fido2NetLib;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NoPass.Application.Common.Services;
using NoPass.Application.Common.Services.WebAuthnService;
using NoPass.Identity.WebAuthn;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace NoPass.Identity;

public static class DependencyInjection
{
    public static IServiceCollection AddIdentity(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddFido2(options =>
        {
            options.ServerDomain = configuration["Fido:Rp:Id"];
            options.ServerName = configuration["Fido:Rp:Name"];
            options.Origins = configuration.GetSection("Fido:Rp:Origins").Get<HashSet<string>>();
            options.TimestampDriftTolerance = configuration.GetValue<int>("Fido:TimestampDriftTolerance");
            options.MDSCacheDirPath = configuration["Fido:MDSCacheDirPath"];
            options.BackupEligibleCredentialPolicy = configuration.GetValue<Fido2Configuration.CredentialBackupPolicy>("Fido:BackupEligibleCredentialPolicy");
            options.BackedUpCredentialPolicy = configuration.GetValue<Fido2Configuration.CredentialBackupPolicy>("Fido:BackedUpCredentialPolicy");
        });
        
        serviceCollection.AddTransient<IWebAuthnService, WebAuthnService>();

        serviceCollection.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
        {
            options.Cookie.Name = "auth";
            options.Cookie.SameSite = SameSiteMode.Strict;
            options.Cookie.Domain = "api.no-pass.localhost";
            options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
            options.Events.OnRedirectToLogin = context =>
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            };
            options.Events.OnRedirectToReturnUrl = _ => Task.CompletedTask;
        });
            
        
        return serviceCollection;
    }
}