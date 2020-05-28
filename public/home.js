
var nam="";
var paisa=0;
var password3="";
var username3="";
var para=document.getElementById('wrapper');
var aadmi=document.getElementById('aadmi');
var inam=document.getElementById('inam');
var ipaisa=document.getElementById('ipaisa');




function dikhao(g)
{
    console.log("clicked");
     inam.innerHTML=nam;
     console.log(paisa);
     ipaisa.innerHTML=paisa;
    if(g==0)
       {
         aadmi.style.dispaly="none";
         para.style.display="block";
       }
    else
    {
        aadmi.style.dispaly="block";
         para.style.display="none";
    }
    
}

function create()
{
    console.log("aa gaya")
   var name=document.getElementById('name').value;
   var userid=document.getElementById('userid').value;
   var pass=document.getElementById('pass').value;
var user={
    name:name,
    username:userid,
    password:pass
}
   fetch('/users',{
       method:'POST',
       headers:{ 'Content-Type':'application/json'},
       body:JSON.stringify(user)
   })
   .then((res)=>res.json())
   .then((data)=>{
         paisa=0;
         nam=data[0].name;
         pasword=data[0].password;
         
         dikhao(1);
   } )
   .catch(err=>console.log(err));
};


function login()
{
    var userid=document.getElementById('userid2').value;
   var pass=document.getElementById('pass2').value;

   var user={
    username:userid,
    password:pass
}
   fetch('/userslogin',{
       method:'POST',
       headers:{ 'Content-Type':'application/json'},
       body:JSON.stringify(user)
   })
   .then((res)=>res.json())
   .then((data)=>{
       console.log(data);
       nam=data[0].name;
       password3=data[0].password;
       username3=data[0].username;
       paisa=data[0].paisa;
       dikhao(1);
   })
   .catch(err=>console.log(err));
};

function mango()
{
   let rupee=+document.getElementById('mango').value+  +paisa;
    var user={
        username:username3,
        password:password3,
        rupee:rupee
    }
    
    console.log("clicked");
    fetch('/users',{
        method:'PUT',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(user)
    })
    .then((res)=>res.json())
    .then(data=>{
        paisa=data.paisa;
        dikhao(1);
    })
    .catch(err=>console.log(err));
    
}
function bhejo()
{
   let rupee=document.getElementById('mango3').value;
   let username4=document.getElementById('username3').value;
 
     
   var aaadmi={
    username:username3,
    password:password3,
    rupee:+paisa - +rupee
}

fetch('/users',{
    method:'PUT',
    headers:{ 'Content-Type':'application/json'},
    body:JSON.stringify(aaadmi)
})
.then((res)=>res.json())
.then(data=>{
    paisa=data.paisa;
    dikhao(1);
})
.catch(err=>console.log(err));




    console.log("clicked");

       var user={
        username:username4
    }
       fetch('/find',{
           method:'POST',
           headers:{ 'Content-Type':'application/json'},
           body:JSON.stringify(user)
       })
       .then((res)=>res.json())
       .then((data)=>{
    
        var temp={
            username:data[0].username,
            password:data[0].password,
            rupee:+data[0].paisa+ +rupee
        }
        fetch('/users',{
            method:'PUT',
            headers:{ 'Content-Type':'application/json'},
            body:JSON.stringify(temp)
        })
        .then((res)=>res.json())
        .then(data=>{
           console.log(data);
        })
        .catch(err=>console.log(err));

       })
       .catch(err=>console.log(err));


    }

   
    
