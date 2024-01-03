using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Application.Common.Services.WebAuthnService;
using NoPass.Core.Identity;
using NoPass.Core.Identity.WebAuthn;

namespace NoPass.Application.Identity.Register;

public class RegisterCommand : IRequest<ServiceResponse>
{
    public required string LoginId { get; set; }
    public required AuthenticatorAttestationResponse AuthenticatorResponse { get; set; }

    public class Handler(IRepository repository, IWebAuthnService webAuthnService)
        : IRequestHandler<RegisterCommand, ServiceResponse>
    {
        public async Task<ServiceResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var user = repository.Get<User>().First(u => u.Name == request.LoginId);
            var attestationResult = await webAuthnService
                .VerifyAttestationAsync(user.Id, request.AuthenticatorResponse);

            if (!attestationResult.Success || attestationResult.Content is null)
            {
                return attestationResult.ErrorMessages.ToServiceResponse();
            }

            if (user.PrfFirstSalt is null)
            {
                user.GeneratePrfFirstSalt();
            }

            repository.Add(new Credential(
                user.Id,
                attestationResult.Content.CredentialId,
                attestationResult.Content.PublicKey,
                attestationResult.Content.Transports
            ));

            await repository.SaveChangesAsync(cancellationToken);

            return new ServiceResponse();
        }
    }
}