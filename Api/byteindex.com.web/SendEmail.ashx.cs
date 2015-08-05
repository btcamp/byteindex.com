using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace byteindex.com.web
{
    /// <summary>
    /// Summary description for SendEmail
    /// </summary>
    public class SendEmail : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string name = context.Request.Form["name"];
            string Tel = context.Request.Form["phone"];
            string email = context.Request.Form["email"];
            string message = context.Request.Form["message"];

            WriteLogs("发送邮件线程已启动....");

            try
            {
                MailMessage mailMessage = new MailMessage(new MailAddress(ConfigurationManager.AppSettings["fromemail"], "通知信息"), new MailAddress("Coop@ByteIndex.com", "byteindex"));
                mailMessage.Subject = name + "-" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + "-" + Tel + "-" + email;
                mailMessage.Body = message;
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
            context.Response.Write("true");
        }

        private void WriteLogs(string p)
        {
            string path = HttpContext.Current.Server.MapPath("/log");
            if (!System.IO.Directory.Exists(path))
            {
                System.IO.Directory.CreateDirectory(path);
            }
            System.IO.File.AppendAllText(System.IO.Path.Combine(path, DateTime.Now.ToString("yyyyMMdd") + ".txt"), p + "\r\n");
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}