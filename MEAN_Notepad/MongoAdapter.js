exports.MongoAdapter = function()
{
    var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    //initalize schema if it doesn't already exist
    mongoose.connect('mongodb://localhost:27017/notepad',{useMongoClient : true});
    var Schema = mongoose.Schema;
    var docSchema = new Schema({
                        name : String,
                        body : String
                    });
    mongoose.model('docs',docSchema);
    var Docs = mongoose.model('docs');    


    this.save = function(documentName, documentBody)
    {
        //create and update now have to be seperate operations
        Docs.find({'name': documentName}, function(err,dox)
        {
            var doc;
            if (dox.length > 0)
                {
                    //code-enforced primary key
                    doc = dox[0];
                }
                else {
                    doc = new Docs();
                    doc.name = documentName;
                }
                doc.body = documentBody;
                 doc.save(function(err) {
            if (err) {
                console.log('Failed to save document');
            }
        });
      
    })};

    this.list = function(req, res)
    {
        Docs.find(function(err, dox)
        {
            var results = [];
            dox.forEach(function(x) {results.push(x.name);});
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(results));
            res.end();
        });
    }

    this.get = function(documentName,req,res)
    {
        Docs.find({"name" : documentName}, 
            function(err,dox)
            {
                if (err)
                    {
                        res.status(404);  
                    }
                else
                    {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.write(JSON.stringify(dox[0].body));                        
                    }

                res.end();
            }
        );    
    }
    
    this.delete = function(documentName, req, res)
    {
        Docs.find({"name" : documentName}, 
            function(err,dox)
            {
                if (err)
                    {
                        res.status(404);  
                    }
                else
                    {
                        dox[0].remove();
                    }

                res.end();
            }
        );  
    }

}

