var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var fsPath = '/notepadData';
var server = http.createServer(function(req, res){
    var path = url.parse(req.url,false,true).pathname;
    if (path.toString().includes('/api/Document'))
    {
        var documentName = path.toString().replace('/api/Document','');
        //sanitize
        documentName = decodeURI(documentName);
        documentName = documentName.replace('/','');
        documentName = documentName.replace('.','');        
         res.setHeader("Access-Control-Allow-Origin", "*");
         res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");         
         switch (req.method) {
            case 'GET':
                //use stat to determine if file exists                
                if (documentName.length <= 0)
                {                                        
                    //sync needed because the async callback can't take the req object as an argument
                    var dirFiles =  fs.readdirSync(fsPath);
                    dirFiles = dirFiles.map((x) => {return x.replace('//','').replace('.txt','')});     
                     res.writeHead(200, {"Content-Type": "application/json"});
                    res.write(JSON.stringify(dirFiles));
                   
                } else
                {
                    //retrieving a specific file                   
                    try{
                        var dFileName = fsPath + "/" + documentName + '.txt';
                         fs.accessSync(dFileName);
                         var documentBody  = fs.readFileSync(dFileName,'utf8');
                         res.writeHead(200, {"Content-Type": "application/json"});
                         res.write(JSON.stringify(documentBody));

                    }catch (e)
                    {
                        res.writeHead(404);
                    }                   
                }
            break;
            case 'PUT':
            {                
                if (documentName.length >= 0)
                {
                     var dFileName = fsPath + "/" + documentName + '.txt';                   
                    var wStream = fs.createWriteStream(dFileName);
                    var jString = '';                   
                    req.on('data',function(chunk)
                    {
                        jString += chunk;

                    });                
                   req.on('end', 
                    function() { 
                        wStream.write(JSON.parse(jString));
                        wStream.close();
                    });
                   
                   
                }
            }
            break;
            case 'OPTIONS':
            {
                //necessary for dealing with cross-site requests
                var headers = {};                
                headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
                headers["Access-Control-Allow-Credentials"] = false;
                headers["Access-Control-Max-Age"] = '86400'; // 24 hours
                headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";                
                res.writeHead(200, headers);
            }
            break;
            case 'DELETE':
            {                  
                    try{
                        var dFileName = fsPath + "/" + documentName + '.txt';
                         fs.accessSync(dFileName);
                         fs.unlinkSync(dFileName);
                    }catch (e)
                    {
                        res.writeHead(404);
                    }   
            }

        }
        res.end();

    }

   
}).listen(64082, function()
{
    console.log('Listening at: http://localhost:64082');
});

