using System.Security.Claims;

namespace NoPass.WebAPI.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static Guid? GetUserId(this ClaimsPrincipal claimsPrincipal)
    {
        if (claimsPrincipal.Identity is ClaimsIdentity claimsIdentity)
        {
            var idClaim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (idClaim is not null && Guid.TryParse(idClaim, out var id))
            {
                return id;
            }
        }
        
        return null;
    }
}