using System.Security.Cryptography;

namespace MFilesApi.Tools
{
    public static class Tools
    {
        extension(byte[] data)
        {
            public string Hash()
            {
                byte[] hash = SHA512.HashData(data);
                return Convert.ToHexString(hash).ToLowerInvariant();
            }
        }

        extension(Stream stream)
        {
            public async ValueTask<byte[]> ToByteArrayAsync()
            {
                using var ms = new MemoryStream();
                await stream.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}
