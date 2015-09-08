using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Byteindex.com.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            string path = Server.MapPath("~/log/newslog.txt");
            List<Models.NewsViewModel> result = new List<Models.NewsViewModel>();
            if (System.IO.File.Exists(path))
            {
                string[] array = System.IO.File.ReadAllLines(path);
                result = ConverToModel(array);
            }
            //System.IO.File.ReadAllLines()
            return View(result.OrderByDescending(e => e.Time).Take(3).ToList());
        }


        public ActionResult News()
        {
            string path = Server.MapPath("~/log/newslog.txt");
            List<Models.NewsViewModel> result = new List<Models.NewsViewModel>();
            if (System.IO.File.Exists(path))
            {
                string[] array = System.IO.File.ReadAllLines(path);
                result = ConverToModel(array);
            }
            //System.IO.File.ReadAllLines()
            return View(result.OrderByDescending(e => e.Time).Take(40).ToList());
        }
        public List<Models.NewsViewModel> ConverToModel(string[] array)
        {
            List<Models.NewsViewModel> list = new List<Models.NewsViewModel>();
            foreach (string item in array)
            {
                Models.NewsViewModel model = new Models.NewsViewModel();
                string[] info = item.Split(new string[] { "^_^" }, StringSplitOptions.RemoveEmptyEntries);
                if (info.Length == 2)
                {
                    model.Time = DateTime.ParseExact(info[0], "yyyyMMddHHmmss", CultureInfo.CurrentCulture);
                    model.Path = string.Format("/news/{0}.html", info[0]);
                    model.Title = info[1];
                    list.Add(model);
                }
            }
            return list;
        }
    }
}