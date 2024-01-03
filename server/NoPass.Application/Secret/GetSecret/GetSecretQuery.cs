using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Utils;

namespace NoPass.Application.Secret.GetSecret;

public class GetSecretQuery(Guid secretId, Guid userId) : IRequest<ServiceResponse<GetSecretResponse>>
{
    private Guid SecretId { get; } = secretId;
    private Guid UserId { get; } = userId;

    public class Handler(IRepository repository) : IRequestHandler<GetSecretQuery, ServiceResponse<GetSecretResponse>>
    {
        public Task<ServiceResponse<GetSecretResponse>> Handle(GetSecretQuery request, CancellationToken cancellationToken)
        {
            var secret = repository
                .Get<Core.Secret.Secret>()
                .First(s => s.UserId == request.UserId && s.Id == request.SecretId);
            return new ServiceResponse<GetSecretResponse>(new GetSecretResponse()
            {
                Content = secret.Content.ToBase64(),
                Iv = secret.Iv.ToBase64()
            }).AsTask();
        }
    }
}