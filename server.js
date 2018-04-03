const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'));
var shellescape = require('shell-escape');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function(req, res){
   var options = {
    root: __dirname + '/public/',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  
  res.sendFile("index.html", options, function (err) {
    if (err) {
      console.log(err);
    } 
  }); 
  
});

app.get("/about", function(req, res){
   var options = {
    root: __dirname + '/public/',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  
  res.sendFile("about.html", options, function (err) {
    if (err) {
      console.log(err);
    } 
  }); 
  
});

app.post("/data", function(req, res){
  
   var args = [
        './phantomjs/bin/phantomjs',
        req.body.type+'Scraper.js'
    ];

    var cmd = shellescape(args);

     exec(cmd, function (error, stdout) {
        if(error) console.log(error);

        res.send(stdout);
    });
});
var port = process.env.PORT || 3000
console.log("Server starting...")
app.listen(port);