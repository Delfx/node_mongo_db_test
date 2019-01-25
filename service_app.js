/**
 * Created by motie on 2018-12-27.
 */
/////////////////////// LIBRARIES ////////////////////
const commandLineArgs = require('command-line-args')
const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();


app.listen(3000, function() {
  console.log('listening on 3000')
});


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
});


