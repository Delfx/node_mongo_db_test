/**
 * Created by motie on 2018-12-27.
 */
/////////////////////// LIBRARIES ////////////////////
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()


const url = "mongodb://localhost:27017/"
let dbo
MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
  if (err) throw err
  dbo = db.db("inventory")
  app.listen(3001, ()=> {
    console.log('listening on 3001')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


app.get('/:customerName', (req, res) => {
  const customerName = req.query.customerName
  dbo.collection("customer").findOne({name: customerName}, (err, result) => {
    const customerId = result._id
    dbo.collection("order").findOne({customer_id: customerId}, (err, order) => {
      const orderId = order.item_id
      dbo.collection("inventory").find({_id: {$in: orderId}}).toArray((err, result) => {
        if (err) throw err
        res.render('index.ejs', {customerOrder: result})
        console.log(result)
      })
    })
  })
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// app.post('/quotes', (req, res) => {
//   console.log(req.body)
// })


