using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using NoPass.Application.Common;
using NoPass.Application.Common.Services;
using NoPass.Core.Identity;

namespace NoPass.Identity;

public class JwtService(Configuration configuration) : IJwtService
{
    public ServiceResponse<string> GenerateJwt(User user)
    {
        // todo take from config
        var tokenLifetime = TimeSpan.FromHours(1);
        
        var key = Encoding.UTF8.GetBytes(configuration.Jwt.SecretKey);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, user.Name),
            new(JwtRegisteredClaimNames.Email, user.Name)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(tokenLifetime),
            Issuer = configuration.Jwt.Issuer,
            Audience = configuration.Jwt.Audience,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature
            )
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwt = tokenHandler.WriteToken(token);

        return new ServiceResponse<string>(jwt);
    }
}