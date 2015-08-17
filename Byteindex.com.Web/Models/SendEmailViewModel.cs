using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace btcamp.net.web.Models
{
    public class SendEmailViewModel
    {
        public string name { get; set; }
        public string phone { get; set; }

        public string email { get; set; }
        public string message { get; set; }
    }
}