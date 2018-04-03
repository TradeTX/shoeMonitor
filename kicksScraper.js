phantom.casperPath = "./node_modules/casperjs/"
phantom.injectJs(phantom.casperPath + "/bin/bootstrap.js")

var casper = require('casper').create({
    pageSettings: {
        loadImages:  false      
    }
});

casper.on('error',function(msg, backtrace){
  console.log(msg);
});

var dates = [];
var names = [];



casper.start('https://www.kicksonfire.com/app/upcoming', function(){
  casper.waitFor(function() {
  return this.fetchText('.release-date-title') !== "";
}, function() {
    names = this.evaluate(function(){
      var nodes = document.querySelectorAll(".release-date-title")
      return [].map.call(nodes, function(node) {
            return (node.innerText);
        });
    });
});
  
 casper.waitFor(function() {
  return this.fetchText('.event-date.first-event') !== "";
}, function() {
    dates = this.evaluate(function(){
      var nodes2 = document.querySelectorAll(".event-date.first-event")
      return [].map.call(nodes2, function(node) {
            return node.innerText;
        });
    });
});
  
  

});


casper.run(function() {
   this.echo(JSON.stringify({names: names, dates: dates}));
  this.exit();
});