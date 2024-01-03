namespace NoPass.Utils;

public static class StringExtensions
{
    public static string ToSnakeCase(this string str) => string
        .Concat(str.Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x : x.ToString()))
        .ToLower();

    public static byte[] FromBase64(this string str) => Convert.FromBase64String(str);

    public static byte[] FromBase64UrlSafe(this string str) => str.Replace('-', '+').Replace('_', '/').FromBase64();
}