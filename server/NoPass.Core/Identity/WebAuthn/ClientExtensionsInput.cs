using NoPass.Core.Identity.WebAuthn.Extensions;
using NoPass.Core.Identity.WebAuthn.Extensions.Prf;

namespace NoPass.Core.Identity.WebAuthn;

public class ClientExtensionsInput
{
    public Extensions.Prf.Prf? Prf { get; set; }
}