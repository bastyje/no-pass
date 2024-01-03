using NoPass.Application.Common;

namespace NoPass.Application.Secret;

public static class Errors
{
    public static ErrorMessage SecretDoesNotExistOrUserIsNotAllowed(Guid secretId) => new()
    {
        Id = "SEC-0001",
        Message = $"Secret {secretId} does not exist or user is not allowed to access this secret."
    };
    
    public static ErrorMessage SavingWentWrong(Guid secretId) => new()
    {
        Id = "SEC-0002",
        Message = $"There was an error while saving secret with id {secretId}."
    };
}