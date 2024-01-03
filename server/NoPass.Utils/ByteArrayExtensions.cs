namespace NoPass.Utils;

public static class ByteArrayExtensions
{
    public static string ToBase64(this byte[] bytes) => Convert.ToBase64String(bytes);

    public static byte[] GetRandom(this byte[] bytes)
    {
        new Random().NextBytes(bytes);
        return bytes;
    }
}