
var nam="";
var paisa=0;
var password3="";
var username3="";
var para=document.getElementById('wrapper');
var aadmi=document.getElementById('aadmi');
var inam=document.getElementById('inam');
var ipaisa=document.getElementById('ipaisa');
var shoppara=document.getElementById('shop');
var cart=document.getElementById('cart');


function dikhao(g)
{
    console.log("clicked");
    inam.innerHTML="Welcome"+" "+nam;
    ipaisa.innerHTML="Current Balance"+": "+paisa;
    if(g==0)
       {
         aadmi.style.display="none";
         shoppara.style.display="none";
         para.style.display="block";
         cart.style.display="none";
       }
    else if(g==1)
    {
       
        aadmi.style.display="block";
        shoppara.style.display="none";
         para.style.display="none";
         cart.style.display="none";
    }
    else if(g==2)
    {
        aadmi.style.display="none";
        shoppara.style.display="block";
         para.style.display="none";
         cart.style.display="none";
    }
    else{
        aadmi.style.display="none";
        shoppara.style.display="none";
         para.style.display="none";
         cart.style.display="block";
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
document.getElementById('name').value="";
document.getElementById('userid').value="";
document.getElementById('pass').value="";
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
document.getElementById('userid2').value="";
document.getElementById('pass2').value="";
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
    document.getElementById('mango').value="";
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
  
document.getElementById('mango3').value="";
document.getElementById('username3').value="";


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
           if(+paisa - +rupee >0)
           {
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
          }
       })
       .catch(err=>console.log(err));


    };



   function mitao()
   {
       var user={
           username:username3,
           password:password3
       }
      
       fetch('/del',{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
      })
      .then((res)=>res.json())
      .then(data=>{
          dikhao(0);
      })
      .catch(err=>console.log(err));

   }
   
    //////shopping start karo re baba

function  lelo(data)
{
     var item={
         itemid:data
     }
     fetch('/itemfind',{
        method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(item)
    })
    .then((res)=>res.json())
    .then((data)=>{
         console.log(data);
        var item={
            username:username3,
            password:password3,
            itemname:data[0].name,
            itemimg:data[0].img,
            itemcost:data[0].amount,
            itemid:data[0].itemid
        }
           fetch('/itempost',{
               method:'POST',
               headers:{ 'Content-Type':'application/json'},
               body:JSON.stringify(item)
           })
           .then((res)=>res.json())
           .then((data)=>{
                 console.log(data);
           } )
           .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err));
};

// cart me jao

//buy
function buy(rupee)
{
   if(rupee>paisa)
   console.log("Not sufficient Balance");
   else{
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
        console.log("successfully bought");
        paisa=data.paisa;
        dikhao(1);
    })
    .catch(err=>console.log(err));
}  
};

function itemhatao(data)
{
    console.log(data);
     let item={
         itemid:data,
         username:username3,
         password:password3
     }
    fetch('/itemhatao',{
        method:'DELETE',
        headers:{ 'Content-Type':'application/json'},
        body:JSON.stringify(item)
    })
    .then((res)=>res.json())
    .then((data)=>{
          console.log("deleted");

          cartjao()
    } )
    .catch(err=>console.log(err));
};

function cartdikhao(arr)
{

    cart.innerHTML=''; 
    const temp=`
        <h1 style="text-align: center; margin-left: 5%; margin-top: 0%; padding-top: 1%;" id="inam">Welcome ${nam}</h1>
        <h3  style="text-align: center; margin-left: 5%;" id="ipaisa">Current Amount:  ${  paisa}</h3>
        `
        cart.innerHTML+=temp;
        var sum=0;
        arr.forEach(temp=>{
            sum=+sum + +temp.itemcost;
            const card = document.createElement('div');
            card.classList = 'card-body';
            const content=`
            <div class="card">
             
                <img class="card-img-bottom" src="${temp.itemimg}"/>
                    <div class="card-body">
                       <h1>${temp.itemname}</h1>
                        <h5>Cost:${temp.itemcost}</h5>
                        <button onclick= "itemhatao(${temp.itemid})" >Remove this item</button>
                     </div>
            </div>
            `;

            cart.innerHTML+=content;
        });
       
        const temp1=`
        <h3 style="text-align: center; margin-left: 5%; margin-top: 0%; padding-top: 1%;" id="inam">Total Amount ${sum}</h3>
        <button style="position: relative; left: 40%; " onclick="buy(${sum})" > Buy</button>
        <button style="position: relative; left: 44%; " onclick="dikhao(1)" > Dashboard</button>
        <button style="position: relative; left: 48%; " onclick="dikhao(2)" > Continue Shopping</button>
        `
        cart.innerHTML+=temp1;
        
        dikhao(3);

};

function cartjao()
{

    fetch('/cartdekho')
    .then((res)=>res.json())
    .then((data)=>cartdikhao(data))
    .catch((err)=>console.log(err));
  
};

       function  func1(arr)
       {
            shoppara.innerHTML=''; 
             arr.forEach(temp=>{
          console.log(temp);
            const card = document.createElement('div');
            card.classList = 'card-body';
            const content=`
            <div class="card">
             
                <img class="card-img-bottom" src="${temp.img}"/>
                    <div class="card-body">
                       <h1>${temp.name}</h1>
                        <h5>Cost:${temp.amount}</h5>
                       <button onclick= "lelo(${temp.itemid})" >Add to Cart</button>
                     </div>
            </div>
            `;

            shoppara.innerHTML+=content;
        });
        const element=`<button style="position: absolute; top:2rem; right:2rem; " onclick="cartjao()" > Go to Cart</button>`;
        shoppara.innerHTML+=element;
        dikhao(2);
       };



    function shop()
    {
        fetch('/shopping')
         .then((res)=>res.json())
         .then((data)=>func1(data))
         .catch((err)=>console.log(err));


    }
