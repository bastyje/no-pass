namespace NoPass.Application.Common;

public class DataConfiguration
{
    public string Server { get; set; }
    public int Port { get; set; }
    public string Database { get; set; }
    public string UserId { get; set; }
    public string Password { get; set; }
}

public class JwtConfiguration
{
    public string Audience { get; set; }
    public string Issuer { get; set; }
    public string SecretKey { get; set; }
}

public class Configuration
{
    public DataConfiguration Data { get; set; }
    public JwtConfiguration Jwt { get; set; }
}