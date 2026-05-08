using System.Security.Cryptography;

namespace MFilesApi.Tools
{
    public static class Tools
    {
        extension(byte[] data)
        {
            public byte[] Hash()
            {
                return SHA512.HashData(data);
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
