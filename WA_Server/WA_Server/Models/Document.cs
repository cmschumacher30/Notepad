using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WA_Server.Models
{
    public class Document
    {
        public Document(string _name, string _body)
        {
            name = _name;
            bodyText = _body;
        }
        public string name { get; set; }
        public string bodyText { get; set; }
    }
}