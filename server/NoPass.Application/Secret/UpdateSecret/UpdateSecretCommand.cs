using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Utils;

namespace NoPass.Application.Secret.UpdateSecret;

public class UpdateSecretCommand : IRequest<ServiceResponse>
{
    public required Guid Id { get; set; }
    public required string Content { get; set; }
    public required string Iv { get; set; }
    public Guid UserId { get; set; }
    
    public class Handler(IRepository repository) : IRequestHandler<UpdateSecretCommand, ServiceResponse>
    {
        public async Task<ServiceResponse> Handle(UpdateSecretCommand request, CancellationToken cancellationToken)
        {
            if (!repository.Get<Core.Secret.Secret>().Any(s => s.Id == request.Id && s.UserId == request.UserId))
            {
                return await Errors.SecretDoesNotExistOrUserIsNotAllowed(request.Id).ToServiceResponseAsync();
            }
                
            repository.Update(new Core.Secret.Secret
            {
                Id = request.Id,
                Content = request.Content.FromBase64(),
                Iv = request.Iv.FromBase64(),
                UserId = request.UserId
            });

            return await repository.SaveChangesAsync(cancellationToken) == 1
                ? new ServiceResponse()
                : await Errors.SavingWentWrong(request.Id).ToServiceResponseAsync();
        }
    }
}