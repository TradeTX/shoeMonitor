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

var days = [];
var months = [];
var names = [];
var prices = [];



casper.start('https://solecollector.com/sneaker-release-dates/all-release-dates/', function(){
  casper.waitFor(function() {
  return this.fetchText('.sneaker-release__title') !== "";
}, function() {
    names = this.evaluate(function(){
      var nodes = document.querySelectorAll(".sneaker-release__title")
      return [].map.call(nodes, function(node) {
            return node.innerHTML;
        });
    });

});
  
  casper.waitFor(function() {
  return this.fetchText('.clg-releases__date__day') !== "";
}, function() {
    days = this.evaluate(function(){
      var nodes2 = document.querySelectorAll(".clg-releases__date__day")
      return [].map.call(nodes2, function(node) {
            return node.innerHTML;
        });
    });

});
  
  casper.waitFor(function() {
  return this.fetchText('.clg-releases__date__month') !== "";
}, function() {
    months = this.evaluate(function(){
      var nodes3 = document.querySelectorAll(".clg-releases__date__month")
      return [].map.call(nodes3, function(node) {
            return node.innerHTML;
        });
    });

});
  
  casper.waitFor(function() {
  return this.fetchText('.sneaker-release__option.sneaker-release__option--price') !== "";
}, function() {
    prices = this.evaluate(function(){
      var nodes4 = document.querySelectorAll(".sneaker-release__option.sneaker-release__option--price")
      return [].map.call(nodes4, function(node) {
            return node.innerText;
        });
    });

});

});//casper start end


casper.run(function() {
   this.echo(JSON.stringify({days: days, months: months, prices: prices, names: names}));
  this.exit();
});