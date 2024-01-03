namespace NoPass.Application.Common;

public class ErrorMessage
{
    public required string Id { get; set; }
    public required string Message { get; set; }

    private List<ErrorMessage> ToList() => new() { this };

    public ServiceResponse ToServiceResponse() => new(ToList());
    public ServiceResponse<T> ToServiceResponse<T>() => new(ToList());

    public Task<ServiceResponse> ToServiceResponseAsync() => Task.FromResult(new ServiceResponse(ToList()));
    public Task<ServiceResponse<T>> ToServiceResponseAsync<T>() => Task.FromResult(new ServiceResponse<T>(ToList()));
}

public static partial class Extensions
{
    public static ServiceResponse ToServiceResponse(this List<ErrorMessage> errorMessages) => new(errorMessages);
    public static ServiceResponse<T> ToServiceResponse<T>(this List<ErrorMessage> errorMessages) => new(errorMessages);
}