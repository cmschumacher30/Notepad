exports.FileAdapter = function()
{
    var _fs = require("fs");
    var documentDirectory = '/notepadData';
    this.save = function(documentName, documentBody)
    {
        var dFileName = this.GetFullPath(documentName);
        var wStream = _fs.createWriteStream(dFileName);
        wStream.write(documentBody);
        wStream.close();
    }

    this.list = function()
    {
        var dirFiles =  _fs.readdirSync(documentDirectory);
        dirFiles = dirFiles.map((x) => {return x.replace('//','').replace('.txt','')});     
        return dirFiles;        
    }

    this.get = function(documentName)
    {
        var dFileName = this.GetFullPath(documentName);
        _fs.accessSync(dFileName);
        var documentBody  = _fs.readFileSync(dFileName,'utf8');
        return documentBody;
    }
    
    this.delete = function(documentName)
    {
        var fileName = this.GetFullPath(documentName);
        _fs.accessSync(fileName);
        _fs.unlinkSync(fileName);
    }

    this.GetFullPath = function(fileName)
    {
        var result = fileName;
        result = result.replace('/','');
        result = result.replace('.','');
        result = documentDirectory + "/" + result + '.txt';
        return result;
    }
}

