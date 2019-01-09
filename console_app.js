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
        dbo.collection("customer").find({name: customerName}, function (err, result) {
            var customerId = result._id;
            console.log(customerId);
            db.close()
        })
    })
}


/////////////////////// MAIN LOGIC //////////////////


if ('help' in options) {
    help()
} else if ('customer' in options) {
    findOrderbyCustomerName('Tim')
} else {
    help()
}






