using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Core.Identity;

namespace NoPass.Application.Identity.GetEncryptedKey;

public class GetEncryptedKeyQuery(byte[] rawId) : IRequest<ServiceResponse<EncryptedKeyResponse>>
{
    private byte[] RawId { get; } = rawId;
    public class Handler(IRepository repository) : IRequestHandler<GetEncryptedKeyQuery, ServiceResponse<EncryptedKeyResponse>>
    {
        public Task<ServiceResponse<EncryptedKeyResponse>> Handle(GetEncryptedKeyQuery request, CancellationToken cancellationToken)
        {
            // todo add error handling
            var key = repository
                .Get<Credential>()
                .Where(c => c.RawId == request.RawId)
                .Select(c => new EncryptedKeyResponse
                {
                    Key = c.EncryptedKey,
                    Iv = c.EncryptedKeyIv
                })
                .Single();

            return key.ToServiceResponse().AsTask();
        }
    }
}