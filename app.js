const express = require('express');
const app     = express();
const request = require('request');
const bodyParser = require('body-parser');
const port = 4000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
   res.sendFile(__dirname+'/signup.html');
   console.log("Open file success");
})


app.post("/",function(req,res){
 
    console.log(req.body);
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    console.log(fname,lname,email);
var data = {
    members :[{
        email_address:email,
        status: 'subscribed',
        merge_fields : {
            FNAME : fname,
            LNAME : lname
        }
    }]
}
 var jsonData = JSON.stringify(data);

    var option = {
        url : 'https://us20.api.mailchimp.com/3.0/lists/0ff284b0d8',
        method : 'post',
        headers : {
              "Authorization" : "saurav 12b90785af5a55e7df605e72b459b309-us20"
        },
        body : jsonData

    }
    request(option,function(error,response,body){
      if(error){
          res.send("Error found");
          console.log(error);
      }else{
          if(response.statusCode === 200){
              res.sendFile(__dirname+'/success.html');
          }else{
             res.sendFile(__dirname+"/failure.html");
          }   
         
      }
    });    
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 4000,(req,res)=>{console.log("started")})

// 12b90785af5a55e7df605e72b459b309-us20

// 0ff284b0d8