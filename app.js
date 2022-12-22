const express = require("express")
const bodyParser = require("body-parser")
const https = require("https");
const { response } = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
//for using local files and images
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res){
    const Lastname = req.body.lastName
    const firstname = req.body.firstName
    const email = req.body.email
    const data = {
        members:[{
        email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME : firstname,
            LNAME : Lastname  }
          }]
        };
    const jsonData = JSON.stringify(data)
    const url= "https://us17.api.mailchimp.com/3.0/lists/9f83771691";
    const options={
        method:"POST",
        auth:"key:8dbf140894f0b94e9cc046c006d8e1ef-us17",
    }
    var request=https.request(url,options,function(response){
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html")
            }
            else{
                res.sendFile(__dirname+"/failure.html")
            }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        
    })

    request.write(jsonData);
    request.end();




})
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(3000, function () {
    console.log("server is started at port 3000");
})

//api key
// 8dbf140894f0b94e9cc046c006d8e1ef-us17

//audience id or list id
//9f83771691