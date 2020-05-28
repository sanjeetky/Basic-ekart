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


app.listen(8000,function()
{
    console.log("Our server has started on port 8000")
})