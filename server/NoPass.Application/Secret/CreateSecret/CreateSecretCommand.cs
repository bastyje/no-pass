using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;

namespace NoPass.Application.Secret.CreateSecret;

public class CreateSecretCommand : IRequest<ServiceResponse<IdModel>>
{
    public Guid UserId { get; set; }
    public required string Content { get; set; }
    public required string Iv { get; set; }
    
    public class Handler(IRepository repository): IRequestHandler<CreateSecretCommand, ServiceResponse<IdModel>>
    {
        public async Task<ServiceResponse<IdModel>> Handle(CreateSecretCommand request, CancellationToken cancellationToken)
        {
            var id = Guid.NewGuid();
            repository.Add(new Core.Secret.Secret
            {
                Id = id,
                Content = Convert.FromBase64String(request.Content),
                Iv = Convert.FromBase64String(request.Iv),
                UserId = request.UserId
            });

            await repository.SaveChangesAsync(cancellationToken);
            return new ServiceResponse<IdModel>(new IdModel(id));
        }
    }
}