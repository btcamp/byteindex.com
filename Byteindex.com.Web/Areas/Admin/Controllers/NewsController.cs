using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Diagnostics;

namespace Byteindex.com.Web.Areas.Admin.Controllers
{
    public class NewsController : Controller
    {

        // GET: News
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Index(string title, string content)
        {
            string newspath = Server.MapPath("~/News");
            if (!Directory.Exists(newspath))
            {
                Directory.CreateDirectory(newspath);
            }
            string path = Server.MapPath("~/Areas/Admin/Templete/newsTemp.htm");
            string contents = System.IO.File.ReadAllText(path);
            contents = contents.Replace("{title}", title).Replace("{content}", content);
            string time = DateTime.Now.ToString("yyyyMMddHHmmss");
            string saveUrl = Server.MapPath("~/News/" + time);
            System.IO.File.WriteAllText(saveUrl, contents);
            string logpath = Server.MapPath("~/log");
            if (!Directory.Exists(logpath))
            {
                Directory.CreateDirectory(logpath);
            }
            string newinfo = time + ".html" + "^_^" + title;
            string logUrl = Server.MapPath("~/log/newslog.txt");
            System.IO.File.AppendAllText(logUrl, newinfo + "\r\n");
            Response.Write("<script>alert('新闻发布成功');</script>");
            return View();
        }
    }
}