// *** Constant Require Section:
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
// *** Static Folder ***
app.use(express.static("public"));
// *** Body Parser ***
app.use(bodyParser.urlencoded({extended:true}));
// *** Tracking HTML File ***
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});
 
// *** Signup Route ***
app.post("/",(req,res)=>{

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

// *** Construct Requesting data ***
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName 
                }
            }
        ]
    };
// *** Stringify inputed data ***
    const jsonData = JSON.stringify(data);
// *** url = "https://<data center>.api.mailchimp.com/3.0/lists/{listID}";
    const url = "https://us18.api.mailchimp.com/3.0/lists/0292fb8bce";

    const options = {
        method: "POST",
        auth: "jj:3b7d758b175f11b2ba47b4b142f354e2-us18"
    }

    // *** Requesting and send back our data to mailchimp ***
    const request = https.request(url, options, (response)=>{
        if(response.statusCode === 200 ){
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        });
    });
// *** Showing the status code on hyper terminal ***
    request.write(jsonData);
    // *** Ending Code ***
    request.end();

});
// *** Redirecting Codes: ***
// *** from Failure page to Signup page ***
app.post("/failure",(req,res)=>{
    res.redirect("/");
});
// *** from Success page to Signup page ***
app.post("/success", function(req, res){
    res.redirect("/");
});
// *** Our Server PORT Starter ***
app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server running at port 3000.");
});

// *** API 3b7d758b175f11b2ba47b4b142f354e2-us18 ***
// *** id 0292fb8bce ***