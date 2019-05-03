using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DFC.Composite.SharedAssets.Models;

namespace DFC.Composite.SharedAssets.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["Branding"] = "ESFA";

            return View();
        }

        public IActionResult Privacy()
        {
            ViewData["Branding"] = "ESFA";

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            ViewData["Branding"] = "ESFA";

            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
