namespace NoPass.Application.Common;

public class ServiceResponse(List<ErrorMessage> errorMessages)
{
    public ServiceResponse() : this(new List<ErrorMessage>()) {}

    public List<ErrorMessage> ErrorMessages { get; protected init; } = errorMessages;
    public bool Success => ErrorMessages.Count == 0;
    public Task<ServiceResponse> AsTask() => Task.FromResult(this);

}

public class ServiceResponse<T> : ServiceResponse
{
    public ServiceResponse(List<ErrorMessage> errorMessages) : base(errorMessages)
    {
        Content = default;
    }

    public ServiceResponse(T content)
    {
        Content = content;
    }

    public ServiceResponse(T content, List<ErrorMessage> errorMessages)
    {
        Content = content;
        ErrorMessages = errorMessages;
    }

    public new Task<ServiceResponse<T>> AsTask() => Task.FromResult(this);

    public T? Content { get; }
}

public class CollectionServiceResponse<T>(List<T> content) : ServiceResponse
{
    public Task<CollectionServiceResponse<T>> AsTask() => Task.FromResult(this);
    
    public List<T> Content { get; set; } = content;
}

public static partial class Extensions
{
    public static ServiceResponse<T> ToServiceResponse<T>(this T obj) => new(obj);
    public static ServiceResponse<T> ToServiceResponse<T>(this T obj, List<ErrorMessage> errorMessages) => new(obj, errorMessages);
}