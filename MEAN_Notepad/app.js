/* The server segment of the project */
var express = require('express');
var app = express();
var fa = new (require("./MongoAdapter.js")).MongoAdapter;
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
    fa.list(req,res);
}

function GetDocument(req, res)
{
    fa.get(req.params.doc_name,req,res);
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
    fa.delete(req.params.doc_name,req,res);    
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