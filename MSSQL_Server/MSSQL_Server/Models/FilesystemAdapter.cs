using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft.Json;


namespace MSSQL_Server.Models
{
    public class FilesystemAdapter : IDataSource
    {
        private string directoryName = "C:/notepadData";
       
        public Document GetDocument(string name)
        {
            StreamReader stream = new StreamReader(new FileStream(directoryName + "/" + Sanitize(name) + ".txt",FileMode.Open));
            Document result = new Document(name, stream.ReadToEnd());
            stream.Close();
            return result;
        }
        
        public string[] GetDocumentList()
        {
            string[] results =  Directory.GetFiles(directoryName);
            for (int i=0; i < results.Length; i++)
            {                
                results[i] = results[i].Replace(directoryName, "").Replace("\\","").Replace(".txt","");
            }
            
            return results;
        }

        public void Delete(string id)
        {
            string safeId = Sanitize(id);
            string fullPath = string.Format("{0}/{1}.txt", directoryName, safeId);
            File.Delete(fullPath); 
        }

        public void UpdateDocument(Document doc)
        {
            string safeName = Sanitize(doc.name);
            string fullPath = string.Format("{0}/{1}.txt", directoryName, safeName);
            FileStream stream = new FileStream(fullPath, FileMode.OpenOrCreate);
            stream.SetLength(0);
            stream.Flush();
            StreamWriter writer = new StreamWriter(stream);
            writer.Write(doc.bodyText);
            writer.Close();
            stream.Close();            
        }

        private string Sanitize(string input)
        {
            return input.Replace(".","").Replace("/","").Replace("\\","");
        }
    }
}