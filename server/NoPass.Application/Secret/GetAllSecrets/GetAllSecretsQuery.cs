using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;

namespace NoPass.Application.Secret.GetAllSecrets;

public class GetAllSecretsQuery(Guid userId) : IRequest<CollectionServiceResponse<GetAllSecretsRow>>
{
    private Guid UserId { get; } = userId;

    public class Handler(IRepository repository) : IRequestHandler<GetAllSecretsQuery, CollectionServiceResponse<GetAllSecretsRow>>
    {
        public Task<CollectionServiceResponse<GetAllSecretsRow>> Handle(GetAllSecretsQuery request, CancellationToken cancellationToken)
        {
            var secrets = repository
                .Get<Core.Secret.Secret>()
                .Where(x => x.UserId == request.UserId)
                .Select(x => new GetAllSecretsRow
                {
                    Id = x.Id,
                    Content = Convert.ToBase64String(x.Content),
                    Iv = Convert.ToBase64String(x.Iv)
                }).ToList();
            return new CollectionServiceResponse<GetAllSecretsRow>(secrets).AsTask();
        }
    }
}