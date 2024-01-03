using NoPass.Core.Identity;

namespace NoPass.Application.Common.Services;

public interface IJwtService
{
    public ServiceResponse<string> GenerateJwt(User user);
}