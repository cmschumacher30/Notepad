    var mongoose = require("mongoose");
    
    //initalize schema if it doesn't already exist
    var conn = mongoose.createConnection('mongodb://localhost:27017/notepad');
    conn.on('open', function() {
    mongoose.connection.db.listCollections({name: 'mycollectionname'})
        .next(function(err,collectionInfo)
        {          
            if (!collectionInfo)
                {
                    console.log('nope.');
                }
                else
                    {
                        console.log('yep.');
                    }});
    });