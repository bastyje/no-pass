namespace NoPass.WebAPI.Extensions;

public static class ApplicationBuilderExtensions
{
    public static WebApplication ConfigureRequestPipeline(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseHttpsRedirection();
        }

        app.UseCors(x =>
        {
            x.WithOrigins("http://app.no-pass.localhost:4200");
            x.AllowCredentials();
            x.AllowAnyHeader();
            x.AllowAnyMethod();
            x.Build();
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}