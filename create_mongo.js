

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/inventory";

function createmongo () {
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });    
}


function createcolle(name) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("invetory");
        dbo.createCollection(name, function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    });
}

createmongo();

createcolle("products");


