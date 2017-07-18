using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace MSSQL_Server.Models
{
    public class DocumentContext : DbContext
    {
        public DocumentContext() : base("DocumentStorage")
        {

        }


        public DbSet<Document> Entries { get; set; }
    }
}