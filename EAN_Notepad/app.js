/* The server segment of the project */
var express = require('express');
var app = express();
var fa = new (require("./FileAdapter.js")).FileAdapter;
var bodyParser = require('body-parser');


//static file access
app.use(express.static('html'));
app.use(express.static('lib'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));

//REST functions
function GetListing(req, res)
{
    //sync needed because the async callback can't take the req object as an argument
    //var dirFiles =  fs.readdirSync(documentDirectory);
    //dirFiles = dirFiles.map((x) => {return x.replace('//','').replace('.txt','')});    
    var dirFiles = fa.list(); 
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(dirFiles));
    res.end();
}

function GetDocument(req, res)
{
    try{
        //var dFileName = GetFullPath(req.params.doc_name);
        //fs.accessSync(dFileName);
        //var documentBody  = fs.readFileSync(dFileName,'utf8');
        var documentBody = fa.get(req.params.doc_name);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(documentBody));
    }catch (e)
    {
        res.status(404);       
    }    
    res.end();
}

function SaveDocument(req,res)
{
    //var fileName = GetFullPath(req.params.doc_name);
    //var wStream = fs.createWriteStream(fileName);
    //wStream.write(req.body);
    //wStream.close();
    fa.save(req.params.doc_name,req.body);
    res.end();
}

function DeleteDocument(req,res)
{
     //var fileName = GetFullPath(req.params.doc_name);
     try{
         //fs.accessSync(fileName);
         //fs.unlinkSync(fileName);
         fa.delete(req.params.doc_name);
     } catch(e)
     {
         res.status(404);
     }
        res.end();
}

//routing

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ strict : false}));
app.get('/',(req,res) => {res.end();});
app.get("/api/Document",GetListing);
app.get("/api/Document/:doc_name",GetDocument);
app.put("/api/Document/:doc_name",SaveDocument);
app.delete("/api/Document/:doc_name",DeleteDocument);

app.listen(3000,(req,res) => {console.log("Listening on port 3000.");});