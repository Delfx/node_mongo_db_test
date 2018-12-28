var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


function seedcustomer() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        var myobj = [
            {name: 'John'},
            {name: 'Tim'},
            {name: 'Luce'}
        ];
        dbo.collection("customer").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}


function seedinvntory() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        var myobj = [
            {products: 'XboxOne', quantity: 15, price: 200},
            {products: 'Playstaion', quantity: 25, price: 250},
            {products: 'Nintendo Switch', quantity: 35, price: 350}
        ];
        dbo.collection("inventory").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}

function findoneCustomer() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        dbo.collection("customer").findOne({}, function (err, result) {
            if (err) throw err;
            console.log(result._id);
            db.close();
        });
    });
}

function findmanyCustomer() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        dbo.collection("customer").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}


function orderseed() {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        dbo.collection("customer").aggregate( [
            {
                $addFields: {
                    totalHomework: { _id: "5c1bcdbd41f66706b00b3f0e"}

                }
            },
            { $out : "order" }
        ] );
        // console.log(cursor);
        db.close();
    });
}


function seedOrder() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        var myobj = [
            {customer_id: "5c1b855b608e0f418e168e96", item_id: "5c1bcdbd41f66706b00b3f0e"},
            {customer_id: "5c1b855b608e0f418e168e97", item_id: ["5c1bcdbd41f66706b00b3f10", "5c1bcf3043c06606ed709393"]} 
        ];
        dbo.collection("order").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}


seedOrder();

