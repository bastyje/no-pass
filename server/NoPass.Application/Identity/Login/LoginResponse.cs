namespace NoPass.Application.Identity.Login;

public record LoginResponse(Guid UserId, byte[]? KeyDerivationSalt);