using NoPass.WebAPI.Extensions;

WebApplication
    .CreateBuilder(args)
    .ConfigureServices()
    .Build()
    .ConfigureRequestPipeline()
    .Run();