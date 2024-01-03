using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using NoPass.Application.Common;
using NoPass.Application.Identity.GetAssertionOptions;
using NoPass.Application.Identity.GetAttestationOptions;
using NoPass.Application.Identity.GetEncryptedKey;
using NoPass.Application.Identity.Login;
using NoPass.Application.Identity.Register;
using NoPass.Application.Identity.StoreEncryptedKey;
using NoPass.Utils;
using NoPass.WebAPI.Extensions;

namespace NoPass.WebAPI.Controllers;

[ApiController]
public class IdentityController(IMediator mediator) : ControllerBase
{
    [HttpPost(ApiRoutes.Identity.Login)]
    public async Task<ActionResult> Login([FromBody] LoginCommand loginCommand)
    {
        var result = await mediator.Send(loginCommand);
        var userId = result.Content?.UserId.ToString();
        if (result.Success && userId is not null)
        {
            await HttpContext.SignInAsync(new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new(ClaimTypes.NameIdentifier, userId)
            }, CookieAuthenticationDefaults.AuthenticationScheme)));
        }
        return new OkObjectResult(result);
    }

    [HttpPost(ApiRoutes.Identity.Register)]
    public async Task<ActionResult> Register([FromBody] RegisterCommand registerCommand)
    {
        var result = await mediator.Send(registerCommand);
        return new OkObjectResult(result);
    }

    [HttpPut(ApiRoutes.Identity.StoreEncryptedKey)]
    public async Task<ActionResult> StoreEncryptedKey(StoreEncryptedKeyCommand command)
    {
        command.UserId = HttpContext.User.GetUserId() ?? throw new UnauthorizedAccessException();
        var result = await mediator.Send(command);
        return new OkObjectResult(result);
    }

    [HttpGet(ApiRoutes.Identity.GetEncryptedKey)]
    public async Task<ActionResult> GetEncryptedKey(string rawId)
    {
        var result = await mediator.Send(new GetEncryptedKeyQuery(rawId.FromBase64UrlSafe()));
        return new OkObjectResult(result);
    }

    [HttpPost(ApiRoutes.Identity.GetWebAuthnAttestationOptions)]
    public async Task<ActionResult> GetAttestationOptions(GetAttestationOptionsQuery query)
    {
        var result = await mediator.Send(query);
        return new OkObjectResult(result);
    }

    [HttpPost(ApiRoutes.Identity.GetWebAuthnAssertionOptions)]
    public async Task<ActionResult> GetAssertionOptions(GetAssertionOptionsQuery query)
    {
        var result = await mediator.Send(query);
        return new OkObjectResult(result);
    }
}