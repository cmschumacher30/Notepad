var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var documentDirectory = '/notepadData';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ strict : false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/Document",GetListing);
app.get("/api/Document/:doc_name",GetDocument);
app.put("/api/Document/:doc_name",SaveDocument);
app.delete("/api/Document/:doc_name",DeleteDocument);
app.options("/api/Document/:doc_name",ReturnOptions)

function GetListing(req, res)
{
    //sync needed because the async callback can't take the req object as an argument
    var dirFiles =  fs.readdirSync(documentDirectory);
    dirFiles = dirFiles.map((x) => {return x.replace('//','').replace('.txt','')});     
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(dirFiles));
    res.end();
}

function GetDocument(req, res)
{
    try{
        var dFileName = GetFullPath(req.params.doc_name);
        fs.accessSync(dFileName);
        var documentBody  = fs.readFileSync(dFileName,'utf8');
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
    var fileName = GetFullPath(req.params.doc_name);
    var wStream = fs.createWriteStream(fileName);
    wStream.write(req.body);
    wStream.close();

    res.end();
}

function DeleteDocument(req,res)
{
     var fileName = GetFullPath(req.params.doc_name);
     try{
         fs.accessSync(fileName);
         fs.unlinkSync(fileName);
     } catch(e)
     {
         res.status(404);
     }
        res.end();
}

function ReturnOptions(req,res)
{
     //necessary for dealing with cross-site requests
    var headers = {};                
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.writeHead(200, headers);
    res.end();
}

function GetFullPath(fileName)
{
    var result = fileName;
    result = result.replace('/','');
    result = result.replace('.','');
    result = documentDirectory + "/" + result + '.txt';
    return result;
}

app.listen(64082,() => {console.log("Listening at port 64082.")});