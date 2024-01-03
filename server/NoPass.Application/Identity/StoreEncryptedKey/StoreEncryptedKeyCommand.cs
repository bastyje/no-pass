using MediatR;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Core.Identity;

namespace NoPass.Application.Identity.StoreEncryptedKey;

public class StoreEncryptedKeyCommand : IRequest<ServiceResponse>
{
    public required byte[] EncryptedKey { get; set; }
    public required byte[] Iv { get; set; }
    public required byte[] RawId { get; set; }
    public Guid UserId { get; set; }

    public class Handler(IRepository repository) : IRequestHandler<StoreEncryptedKeyCommand, ServiceResponse>
    {
        public Task<ServiceResponse> Handle(StoreEncryptedKeyCommand request, CancellationToken cancellationToken)
        {
            var credential = repository
                .Get<Credential>()
                .FirstOrDefault(c => c.UserId == request.UserId && c.RawId == request.RawId && c.EncryptedKey == null);
            if (credential is not null)
            {
                credential.EncryptedKey = request.EncryptedKey;
                credential.EncryptedKeyIv = request.Iv;
                repository.Update(credential);
                repository.SaveChangesAsync(cancellationToken);
            }

            return new ServiceResponse().AsTask();
        }
    }
}