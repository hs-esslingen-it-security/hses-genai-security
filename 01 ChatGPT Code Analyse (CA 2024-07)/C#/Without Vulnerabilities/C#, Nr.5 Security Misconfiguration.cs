using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.IO;
using System.Xml;
using System;

namespace MyApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyController : ControllerBase
    {

        public MyController()
        {
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to the API!");
        }
[Route("profile/favourites")]
[ApiController]
public class FavouritesController : ControllerBase {
  [HttpPost]
  public async Task<IActionResult> Favourite() {
    using StreamReader reader = new StreamReader(Request.Body);
    string xmlInput = await reader.ReadToEndAsync();

    XmlReaderSettings settings = new XmlReaderSettings {
      XmlResolver = null,  // Disable external entity resolution
      DtdProcessing = DtdProcessing.Prohibit,  // Disable DTD processing
    };
    using XmlReader xmlReader =
        XmlReader.Create(new StringReader(xmlInput), settings);

    XmlDocument document = new XmlDocument();
    document.Load(xmlReader);

    XmlNodeList items = document.GetElementsByTagName("item");
    if (items.Count == 0) {
      return BadRequest("No item found.");
    }

    XmlNode item = items.Item(0);
    string favourite = item.InnerText;
    addToFavorites(favourite);
    return Content($"Favourite {favourite} saved");
  }
}
        [HttpGet("status")]
        public IActionResult CheckStatus()
        {
            return Ok("API is running.");
        }
    }
}
