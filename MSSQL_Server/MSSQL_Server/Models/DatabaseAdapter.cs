using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSSQL_Server.Models
{
    public class DatabaseAdapter : IDataSource
    {
        private DocumentContext _context;

        public DatabaseAdapter()
        {
            _context = new DocumentContext();
        }

        public void Delete(string id)
        {
            Document toDelete = _context.Entries.Find(id);
            _context.Entries.Remove(toDelete);
            _context.SaveChanges();
        }

        public Document GetDocument(string name)
        {
            return _context.Entries.Find(name);
        }

        public string[] GetDocumentList()
        {
            return _context.Entries.Select(x => x.name).ToArray();
        }

        public void UpdateDocument(Document doc)
        {
            Document toUpdate = _context.Entries.Find(doc.name);
            if (toUpdate != null)
            {
                toUpdate.bodyText = doc.bodyText;
                _context.SaveChanges();
            }
            else
            {
                _context.Entries.Add(doc);
                _context.SaveChanges();
            }
            
        }
    }
}