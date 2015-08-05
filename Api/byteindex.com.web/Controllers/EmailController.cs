using byteindex.com.web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace byteindex.com.web.Controllers
{
    public class EmailController : Controller
    {
        //
        // GET: /Email/

        public ActionResult Send(AccountViewModel model)
        {
            Task.Factory.StartNew(() =>
            {
                WriteLogs("发送邮件线程已启动....");
                while (true)
                {
                    try
                    {
                        MailMessage mailMessage = new MailMessage(new MailAddress(ConfigurationManager.AppSettings["fromemail"], "通知信息"), new MailAddress("Coop@ByteIndex.com", "byteindex"));
                        mailMessage.Subject = model.Name + "-" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "-" + model.Tel + "-" + model.Tel;
                        mailMessage.Body = model.Content;
                        mailMessage.IsBodyHtml = true;

                        SmtpClient client = new SmtpClient(ConfigurationManager.AppSettings["smtp"]);
                        client.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["fromemail"], ConfigurationManager.AppSettings["fromemailpwd"]);
                        client.Send(mailMessage);
                        WriteLogs(string.Format("成功发送邮件：from:{0}->to:{1}", ConfigurationManager.AppSettings["fromemail"], "Coop@ByteIndex.com"));
                    }
                    catch (Exception ex)
                    {
                        WriteLogs(ex.ToString());
                    }
                }

            });
            return Json(new { status = true }, JsonRequestBehavior.AllowGet);
        }

        private void WriteLogs(string p)
        {
            string path = Server.MapPath("/log");
            if (System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path);
            }
            System.IO.File.AppendAllText(System.IO.Path.Combine(path, DateTime.Now.ToString("yyyyMMdd") + ".txt"), p);
        }

    }
}
