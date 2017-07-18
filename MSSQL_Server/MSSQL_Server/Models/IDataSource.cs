using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MSSQL_Server.Models
{
    public interface IDataSource
    {

       string[] GetDocumentList();
       Document GetDocument(string name);
       void Delete(string id);
       void UpdateDocument(Document doc);
       
    }
}
