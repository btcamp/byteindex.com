using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace btcamp.net.web.Controllers
{
    public class EmailController : Controller
    {
        //
        // GET: /Email/

        public ActionResult Send(Models.SendEmailViewModel model)
        {
            try
            {
                string sendemail = ConfigurationManager.AppSettings["sendemail"];
                string sendpwd = ConfigurationManager.AppSettings["sendpwd"];
                string toemial = ConfigurationManager.AppSettings["toemail"];
                string smtp = ConfigurationManager.AppSettings["smtp"];
                MailMessage message = new MailMessage(new MailAddress(sendemail, "通知信息"), new MailAddress("Coop@ByteIndex.com", "byteindex"))
                {
                    Subject = model.name + "-" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "-" + model.phone + "-" + model.email,
                    Body = model.message,
                    IsBodyHtml = true
                };
                new SmtpClient(smtp) { Credentials = new NetworkCredential(sendemail, sendpwd) }.Send(message);
                this.WriteLogs(string.Format("成功发送邮件：from:{0}->to:{1}", sendemail, "Coop@ByteIndex.com"));
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        private void WriteLogs(string p)
        {
            
            string path =Server.MapPath("/log");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            System.IO.File.AppendAllText(Path.Combine(path, DateTime.Now.ToString("yyyyMMdd") + ".txt"), p + "\r\n");
        }


    }
}
