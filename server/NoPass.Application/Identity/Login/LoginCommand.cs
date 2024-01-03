using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Application.Common.Services.WebAuthnService;
using NoPass.Core.Identity;
using NoPass.Core.Identity.WebAuthn;

namespace NoPass.Application.Identity.Login;

public class LoginCommand : IRequest<ServiceResponse<LoginResponse>>
{
    public required string LoginId { get; set; }
    public required AuthenticatorAssertionResponse AuthenticatorResponse { get; set; }

    public class Handler(IRepository repository, IWebAuthnService webAuthnService)
        : IRequestHandler<LoginCommand, ServiceResponse<LoginResponse>>
    {
        public async Task<ServiceResponse<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = repository.Get<User>().First(u => u.Name == request.LoginId);
            var attestationResult = await webAuthnService.VerifyAssertionAsync(user.Id, request.AuthenticatorResponse);
            
            if (!attestationResult.Success)
            {
                return Errors.UserNotAuthenticated().ToServiceResponse<LoginResponse>();
            }
            
            return !attestationResult.Success
                ? Errors.CouldNotCreateToken(request.LoginId).ToServiceResponse<LoginResponse>()
                : new LoginResponse(user.Id, attestationResult.Content?.KeyDerivationSalt)
                    .ToServiceResponse(attestationResult.ErrorMessages);
        }
    }
}