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

app.post('/users',(req,res)=>{
 var name=req.body.name;
 var username=req.body.username;
 var password=req.body.password;
    var obj={
      name:name,
      username:username,
      password:password
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
      res.redirect('/home.html');
})



app.listen(8000,function()
{
    console.log("Our server has started on port 8000")
})