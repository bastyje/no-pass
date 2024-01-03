using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Application.Common.Services.WebAuthnService;
using NoPass.Core.Identity;
using NoPass.Core.Identity.WebAuthn;

namespace NoPass.Application.Identity.GetAttestationOptions;

public class GetAttestationOptionsQuery : IRequest<ServiceResponse<AttestationOptions>>
{
    public required string LoginId { get; set; }
    
    public class Handler(IWebAuthnService webAuthnService, IRepository repository) : IRequestHandler<GetAttestationOptionsQuery, ServiceResponse<AttestationOptions>>
    {
        public Task<ServiceResponse<AttestationOptions>> Handle(GetAttestationOptionsQuery request, CancellationToken cancellationToken)
        {
            var options = webAuthnService.GetAttestationOptions(repository.Get<User>().First(u => u.Name == request.LoginId));
            return Task.FromResult(options);
        }
    }
}