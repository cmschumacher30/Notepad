using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WA_Server.Models;
using System.Web.Http.Cors;

namespace WA_Server.Controllers
{
    public class DocumentController : ApiController
    {
        private IDataSource _dataSource;

        public DocumentController()
        {
            _dataSource = new FilesystemAdapter();
        }

        public DocumentController(IDataSource source)
        {
            _dataSource = source;
        }

        // GET: api/Document
        [EnableCors(origins: "http://localhost:50153", headers: "*", methods: "*")]
        public IEnumerable<string> Get()
        {
            //todo: add path?
            return _dataSource.GetDocumentList();
        }

        [HttpGet]
        [EnableCors(origins: "http://localhost:50153", headers: "*", methods: "*")]
        public string Get(string ID)
        {   //todo: currently doesn't work
            return _dataSource.GetDocument(ID).bodyText;
        }

        // POST: api/Document
        public void Post([FromBody]string value)
        {
        }

        [HttpPut]
        [EnableCors(origins: "http://localhost:50153", headers: "*", methods: "*")]
        public void Put(string id, [FromBody]string value)
        {
            _dataSource.UpdateDocument(new Document(id,value));
        }

        [HttpDelete]
        [EnableCors(origins: "http://localhost:50153", headers: "*", methods: "*")]
        public void Delete(string id)
        {
            _dataSource.Delete(id);
        }
    }
}
