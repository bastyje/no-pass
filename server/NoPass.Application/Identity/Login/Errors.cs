using NoPass.Application.Common;

namespace NoPass.Application.Identity.Login;

public static class Errors
{
    public static ErrorMessage UserDoesNotExist(string loginId) => new()
    {
        Id = "LGI-001",
        Message = $"User with login ID '{loginId}' does not exist."
    };
    
    public static ErrorMessage CouldNotCreateToken(string loginId) => new()
    {
        Id = "LGI-002",
        Message = $"Could not create token for user with login ID '{loginId}'."
    };
    
    public static ErrorMessage UserNotAuthenticated() => new()
    {
        Id = "LGI-003",
        Message = $"User could not be authenticated."
    };
}