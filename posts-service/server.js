const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://localhost:27017/products', (err, database) => {
  if (err) return console.log(err)
  db = database // from version 3 : db = database.db('products')
  app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// to resolve the CORS error
// https://medium.com/@ahsan.ayaz/how-to-handle-cors-in-an-angular2-and-node-express-applications-eb3de412abef
var originsWhitelist = [
  'http://localhost:3000'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}

app.use(cors(corsOptions));

// list all products
app.get('/list', (req, res) => {
  db.collection('products').find().toArray((err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// add a product to the db
app.post('/add', (req, res) => {
  db.collection('products').save(req.body, (err, result) => {
     if (err) throw err
  })
})

// find a product
app.post('/search', (req, res) => {
 var query = { name: req.body.name }
 db.collection('products').find(query).toArray(function(err, result) {
   if (err) throw err
   if (result == '')
       res.json({})
   else
       res.json(result[0])
 });
})

// delete a product
app.post('/delete', (req, res) => {
  db.collection('products').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) throw err
  })
})
