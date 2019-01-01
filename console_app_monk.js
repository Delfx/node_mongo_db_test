/**
 * Created by motie on 2018-12-27.
 */
// /////////////////////// LIBRARIES ////////////////////
// const db = require('monk')('localhost/inventory')
//
// // Connection URL
// const users = db.get('customer')
//
//
// db.then(() => {
//   console.log('Connected correctly to server')
// });
//
// // users.find({ name: 'Tim' }, '-bigdata').then(function () {
// //   // exclude bigdata field
// // })
//
// users.findOne()
//
// db.close();


  
  
const db = require('monk')('localhost/mydb')
// or
// const db = require('monk')('user:pass@localhost:port/mydb')

const users = db.get('users')

users.createIndex('name last')
users.insert({ name: 'Tobi', bigdata: {} })
users.find({ name: 'Loki' }, '-bigdata').then(function () {
  // exclude bigdata field
})
users.find({}, {sort: {name: 1}}).then(function () {
  // sorted by name field
})
users.remove({ name: 'Loki' })

db.close()