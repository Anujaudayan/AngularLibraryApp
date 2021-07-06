const express = require('express');
const ProductData = require('./src/model/Productdata');
// const User = require('./src/model/user');
const cors = require('cors');
var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken')
var app = new express();
app.use(cors());
app.use(bodyparser.json());
username='admin';
password='1234';


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.post('/insert',verifyToken,function(req,res){
   
    console.log(req.body);
   
    var book = {       
        title : req.body.book.title,
        author : req.body.book.author,
        genre : req.body.book.genre,
        imageUrl : req.body.book.imageUrl,
   }       
   var book = new ProductData(book);
   book.save();
});
app.get('/products',function(req,res){
    
    ProductData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/authers',function(req,res){
    
  ProductData.find()
              .then(function(authors){
                  res.send(authors);
              });
});
app.get('/:id',  (req, res) => {
  
  const id = req.params.id;
    ProductData.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})

app.post('/login', (req, res) => {
    let userData = req.body
    
      
        if (!username) {
          res.status(401).send('Invalid Username')
        } else 
        if ( password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: username+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      
    })

    app.put('/update',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
      title = req.body.title,
      author = req.body.author,
      genre = req.body.genre,
      imageUrl = req.body.imageUrl
     ProductData.findByIdAndUpdate({"_id":id},
                                  {$set:{
                                  "title":title,
                                  "author":author,
                                  "genre":genre,
                                  "imageUrl":imageUrl}})
     .then(function(){
         res.send();
     })
   })
   
app.delete('/remove/:id',(req,res)=>{
   
     id = req.params.id;
     ProductData.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })
     

app.listen(3000, function(){
    console.log('listening to port 3000');
});

