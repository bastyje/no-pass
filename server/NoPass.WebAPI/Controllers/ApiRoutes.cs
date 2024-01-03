namespace NoPass.WebAPI.Controllers;

public static class ApiRoutes
{
    public static class Identity
    {
        public const string Login = "identity/login";
        public const string Register = "identity/register";
        public const string StoreEncryptedKey = "identity/storeEncryptedKey";
        public const string GetEncryptedKey = "identity/credential/{rawId}/encryptedKey";
        public const string GetWebAuthnAttestationOptions = "identity/webauthn/attestation/options";
        public const string GetWebAuthnAssertionOptions = "identity/webauthn/assertion/options";
    }

    public static class Secret
    {
        public const string GetAll = "secret";
        public const string Get = "secret/{id}";
        public const string Create = "secret";
        public const string Update = "secret";
    }
}