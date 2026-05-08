namespace MFilesApi.Models
{
    public class FileDetailsDto(string name, long size, string hash)
    {
        public string Name { get; } = name;
        public long Size { get; } = size;
        public string Hash { get; } = hash;

    }
}
