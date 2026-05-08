namespace MFilesApi.Models
{
    public class FileDetailsDto(string name, long size, byte[] hash)
    {
        public string Name { get; } = name;
        public long Size { get; } = size;
        public byte[] Hash { get; } = hash;

    }
}
