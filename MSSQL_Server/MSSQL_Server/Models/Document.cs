using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MSSQL_Server.Models
{
    [Table("DocumentStorage")]
    public class Document
    {
        public Document()
        {

        }

        public Document(string _name, string _body)
        {
            name = _name;
            bodyText = _body;
        }
        [Key]
        public string name { get; set; }
        public string bodyText { get; set; }
    }
}