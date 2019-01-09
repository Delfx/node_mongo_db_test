var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


function seedcustomer() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        var myobj = [
            {_id: '1', name: 'John'},
            {_id: '2', name: 'Tim'},
            {_id: '3', name: 'Luce'}
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
            {_id: '11',products: 'XboxOne', quantity: 15, price: 200},
            {_id: '22',products: 'Playstaion', quantity: 25, price: 250},
            {_id: '33',products: 'Nintendo Switch', quantity: 35, price: 350}
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
            {customer_id: "1", item_id: ["11", "11"]},
            {customer_id: "2", item_id: ["22", "33"]} 
        ];
        dbo.collection("order").insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}


seedOrder();
seedcustomer();
seedinvntory();
