/**
 * Created by motie on 2018-12-27.
 */
/////////////////////// LIBRARIES ////////////////////
const commandLineArgs = require('command-line-args')
var MongoClient = require('mongodb').MongoClient


/////////////////////// GLOBAL VARS //////////////////
const optionDefinitions = [
    {name: 'customer', alias: 'c', type: String},
    {name: 'help', alias: 'h', type: Boolean}
]


var url = "mongodb://localhost:27017/"

const options = commandLineArgs(optionDefinitions, {partial: true})


/////////////////////// HELPER FUNCTIONS //////////////////
function help() {
    console.log('Usage: \n' +
        '\tconsole_lab.js [-c customer_name] [-h]\n' +
        '\tconsole_lab.js [--customer customer_name] [--help]\n')
}


function findOrderbyCustomerName(customerName) {

    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("inventory");
        dbo.collection("customer").findOne({name: customerName}, (err, result) => {
            const customerId = result._id;
        dbo.collection("order").findOne({customer_id: customerId}, (err, order) => {
            const orderId = order.item_id;
        dbo.collection("inventory").find({_id: {$in: orderId}}).toArray((err, result) => {
            if (err) throw err;
        console.log(result);
        db.close();
    })
    })
    })
    });
}


/////////////////////// MAIN LOGIC //////////////////


if ('help' in options) {
    help()
} else if ('customer' in options) {
    findOrderbyCustomerName('John')
} else {
    help()
}






