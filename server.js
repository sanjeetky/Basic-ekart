const express=require('express');
const app=express();
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://sanjeet:sanjeet@cluster0-ri3n6.mongodb.net/test?retryWrites=true&w=majority";
app.use(express.static(__dirname+'/public'));
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors());


app.post('/userslogin',(req, res) => {
    
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var username=req.body.username;
    var password=req.body.password;
    var dbo = db.db("users");
    var query = {username:username,password:password};
    dbo.collection("user").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    })
  })
});

app.post('/find',(req, res) => {
    
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var username=req.body.username;
    var dbo = db.db("users");
    var query = {username:username};
    dbo.collection("user").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    })
  })
});

app.post('/users',(req,res)=>{
 var name=req.body.name;
 var username=req.body.username;
 var password=req.body.password;
 var paisa=0;
    var obj={
      name:name,
      username:username,
      password:password,
      paisa:paisa
    }
    console.log(name);
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo=db.db("users");
        dbo.collection("user").insertOne(obj,function(err,result){
            if(err) throw err;
               console.log("Successfully Logged In");
            db.close();
        })
    })
      res.send(obj);
});

app.put('/users',(req,res)=>{
  var username=req.body.username;
  var password=req.body.password;
  var rupee=req.body.rupee;
  var pp={
paisa:rupee
  }
  MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("users");
    var old={username:username,password:password};
    var neww={$set:{paisa:rupee}};
    dbo.collection("user").updateOne(old,neww,function(err,res){
      if(err) throw err;
      console.log("updated");
      db.close();
     
    })
  })
  res.send(pp);
});

app.put('/users',(req,res)=>{
  var username=req.body.username;
  var rupee=req.body.rupee;

  MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("users");
    var old={username:username,password:password};
    var neww={$set:{paisa:+rupee+ +paisa}};
    dbo.collection("user").updateOne(old,neww,function(err,res){
      if(err) throw err;
      console.log("updated");
      db.close();
    })
  })
});


app.delete('/del',(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
  MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("users");
    var obj={username:username,password:password};
    dbo.collection("user").deleteOne(obj,function(err,obb){
      if(err) throw err;
      console.log("deleted");
      db.close();
    })
  });
  res.send({deleted:"deleted"});
});

///shopping krna hai re baba
app.get('/shopping',(req, res) => {
    
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("shopping");
      dbo.collection("item").find({}).toArray( function(err, result) {
        if (err) throw err;
       res.send(result);
        db.close();
      })
    })
});

//find items

app.post('/itemfind',(req, res) => {
    var item=req.body.itemid;
    console.log(item);
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("shopping");
      
       dbo.collection("item").find({itemid:item}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      })
    })
});


app.post('/itempost',(req,res)=>{
  
  var username=req.body.username;
  var password=req.body.password;
  var itemname=req.body.itemname;
  var itemimg=req.body.itemimg;
  var itemcost=req.body.itemcost;
  var itemid=req.body.itemid;
  
     var obj={
       username:username,
       password:password,
       itemname:itemname,
       itemimg:itemimg,
       itemcost:itemcost,
       itemid:itemid
     }
     
     MongoClient.connect(url,function(err,db){
         if(err) throw err;
         var dbo=db.db("cart");
         dbo.collection("item").insertOne(obj,function(err,result){
             if(err) throw err;
                console.log("inserted");
             db.close();
         })
     })
       res.send(obj);
 });

//cart


app.post('/cartdekho',(req, res) => {
     var username=req.body.username;
     var password=req.body.password;
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("cart");
      dbo.collection("item").find({username:username,password:password}).toArray( function(err, result) {
        if (err) throw err;
       res.send(result);
        db.close();
      })
    })
});

app.delete('/itemhatao',(req,res)=>{
 var itemid=req.body.itemid;
 var username=req.body.username;
 var password=req.body.password;
MongoClient.connect(url,function(err,db){
  if(err) throw err;
  var dbo=db.db("cart");
  var obj={itemid:itemid,username:username,password:password};
  dbo.collection("item").deleteOne(obj,function(err,obb){
    if(err) throw err;
    console.log("deleted");
    db.close();
  })
});
res.send({deleted:"deleted"});
});

app.listen(8000,function()
{
    console.log("Our server has started on port 8000")
})