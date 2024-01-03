using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoPass.Application.Secret.CreateSecret;
using NoPass.Application.Secret.GetAllSecrets;
using NoPass.Application.Secret.GetSecret;
using NoPass.Application.Secret.UpdateSecret;
using NoPass.WebAPI.Extensions;

namespace NoPass.WebAPI.Controllers;

[Authorize]
[ApiController]
public class SecretController(ISender mediator) : ControllerBase
{
    [HttpGet(ApiRoutes.Secret.GetAll)]
    public async Task<ActionResult> GetAll()
    {
        var userId = HttpContext.User.GetUserId();
        var query = new GetAllSecretsQuery(userId ?? throw new ArgumentNullException(nameof(userId)));
        var result = await mediator.Send(query);
        return Ok(result);
    }
    
    [HttpGet(ApiRoutes.Secret.Get)]
    public async Task<ActionResult> Get(Guid id)
    {
        var userId = HttpContext.User.GetUserId();
        var query = new GetSecretQuery(id, userId ?? throw new ArgumentNullException(nameof(userId)));
        var result = await mediator.Send(query);
        return Ok(result);
    }

    [HttpPost(ApiRoutes.Secret.Create)]
    public async Task<ActionResult> Create([FromBody] CreateSecretCommand command)
    {
        var userId = HttpContext.User.GetUserId();
        command.UserId = userId ?? throw new ArgumentNullException(nameof(userId));
        var result = await mediator.Send(command);
        return Ok(result);
    }

    [HttpPut(ApiRoutes.Secret.Update)]
    public async Task<ActionResult> Update([FromBody] UpdateSecretCommand command)
    {
        var userId = HttpContext.User.GetUserId();
        command.UserId = userId ?? throw new ArgumentNullException(nameof(userId));
        var result = await mediator.Send(command);
        return Ok(result);
    }
}