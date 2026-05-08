using MFilesApi.Models;
using MFilesApi.Tools;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MFilesApi.Controllers;

[ApiController]
[Route("[controller]")]
public class MFilesController(ILogger<MFilesController> logger) : ControllerBase
{
    private readonly ILogger<MFilesController> _logger = logger;

    private string[] _validContentTypes = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"];

    [HttpPost]
    public async ValueTask<IActionResult> Post(IFormFileCollection files)
    {
        try
        {
            IFormFile formFile = files.Single();
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation($"{formFile.FileName} - {formFile.Length} ({formFile.ContentType})");
            }

            if(!_validContentTypes.Contains(formFile.ContentType))
            {
                return BadRequest(new { Error = "Invalid Content-Type" });
            }

            return Ok (new FileDetailsDto(formFile.FileName, formFile.Length, (await formFile.OpenReadStream().ToByteArrayAsync()).Hash()));

        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
}
