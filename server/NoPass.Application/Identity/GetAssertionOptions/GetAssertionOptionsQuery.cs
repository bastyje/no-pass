using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Application.Common.Services.WebAuthnService;
using NoPass.Core.Identity;
using NoPass.Core.Identity.WebAuthn;

namespace NoPass.Application.Identity.GetAssertionOptions;

public class GetAssertionOptionsQuery : IRequest<ServiceResponse<PublicKeyCredentialRequestOptions>>
{
    public required string LoginId { get; set; }

    public class Handler(IWebAuthnService webAuthnService, IRepository repository) : IRequestHandler<GetAssertionOptionsQuery, ServiceResponse<PublicKeyCredentialRequestOptions>>
    {
        public Task<ServiceResponse<PublicKeyCredentialRequestOptions>> Handle(GetAssertionOptionsQuery request, CancellationToken cancellationToken)
        {
            var options = webAuthnService.GetAssertionOptions(repository.Get<User>().First(u => u.Name == request.LoginId));
            return options.AsTask();
        }
    }
}