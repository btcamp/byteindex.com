using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Byteindex.com.Web.Areas.Admin.Models
{
    public class AccountViewModels
    {

        public class AccountLoginModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            public string ReturnUrl { get; set; }
            public bool RememberMe { get; set; }
        }

    }
}