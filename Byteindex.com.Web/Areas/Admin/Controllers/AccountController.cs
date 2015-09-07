using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Byteindex.com.Web.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(Models.AccountViewModels.AccountLoginModel model)
        {
            string email = "admin@163.com";
            string pwd = "123456";
            bool Conditionemail = model.Email.Equals(email);
            bool Conditionpwd = model.Password.Equals(pwd);
            if (Conditionemail && Conditionpwd)
            {
                //return Content("登录成功");
                return Redirect(Url.Action("Index","News"));
            }
            else
            {
                Response.Write("<script>alert('帐号或密码不正确,登录失败!');</script>");
                return View();
            }
        }

    }
}