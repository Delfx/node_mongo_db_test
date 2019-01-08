//
//
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/inventory";

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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


function findID() {
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("inventory");
    dbo.collection("customer").findOne({}, function(err, result) {
      var customerId = result._id;
      dbo.collection("order").findOne({customer_id: customerId}, function(err, order) {
        console.log(order.item_id)
        db.close();
      });
    });
  });
}

 findID();

// createmongo();
//
// createcolle("products");


