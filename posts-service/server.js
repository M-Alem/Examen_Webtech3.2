const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://localhost:27017/posts', (err, database) => {
  if (err) return console.log(err)
  db = database // from version 3 : db = database.db('products')
  app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port 4000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

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

// list all posts
app.get('/list', (req, res) => {
  db.collection('posts').find().toArray((err, result) => {
    if (err) throw console.log(err)
    res.render('list.ejs', {posts: title, body})
  })
})

// Show the add posts form
app.get('/add', (req, res) => {
   res.render('add.ejs', {})
})

// add a post to the db
app.post('/add', (req, res) => {
  db.collection('posts').save(req.body, (err, result) => {
     if (err) throw err
  })
})

// find a post
app.post('/search', (req, res) => {
 var query = { name: req.body.name }
 db.collection('posts').find(query).toArray(function(err, result) {
   if (err) return console.log(err)
   if (result == '')
       res.render('search_not_found.ejs', {})
   else
       res.render('search_result.ejs', { product: result[0] })
 });
})

// delete a post
app.post('/delete', (req, res) => {
  db.collection('posts').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) throw err
  })
})
