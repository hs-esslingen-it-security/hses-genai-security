using System;
using System.IO;
using Microsoft.AspNetCore.Mvc;

public class Server : Controller {

    public IActionResult Home() {
        return View("HomePage");
    }

    public IActionResult AboutUs() {
        return View("AboutUsPage");
    }

    public IActionResult Contact() {
        return View("ContactPage");
    }

    public IActionResult Services() {
        return View("ServicesPage");
    }

    public IActionResult FAQ() {
        return View("FAQPage");
    }

    public IActionResult TermsOfService() {
        return View("TermsOfServicePage");
    }

    public IActionResult PrivacyPolicy() {
        return View("PrivacyPolicyPage");
    }

    public FileContentResult RetrieveImage(string img_path) {
       string abs_img_path = Path.GetFullPath(img_path);

       string base_dir = "C:\Applications\Documents";

       if ( !abs_img_path.StartsWith(base_dir) ) {
           return null;
       }

       bytes[] img = System.IO.File.ReadAllBytes(abs_img_path);
        if (img == null) {
            return null;
        }

        return File(img, "image/jpg");
    }

    public IActionResult Gallery() {
        return View("GalleryPage");
    }

    public IActionResult Testimonials() {
        return View("TestimonialsPage");
    }

    public IActionResult News() {
        return View("NewsPage");
    }
}
