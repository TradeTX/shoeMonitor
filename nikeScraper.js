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
var status = [];


casper.start('https://www.nike.com/launch/?s=upcoming', function(){
  casper.waitFor(function() {
  return this.fetchText('.mod-h1.ncss-brand.test-day.fs30-sm.fs40-md') !== "";
}, function() {
    days = this.evaluate(function(){
      var nodes = document.querySelectorAll(".mod-h1.ncss-brand.test-day.fs30-sm.fs40-md")
      return [].map.call(nodes, function(node) {
            return node.innerHTML;
        });
    });

});
  
  casper.waitFor(function(){
   return this.fetchText('.mod-h2.u-uppercase.ncss-brand.test-month.fs19-sm.fs28-md.fs34-lg') !== "";
  }, function(){
      months = this.evaluate(function(){
      var nodes2 = document.querySelectorAll(".mod-h2.u-uppercase.ncss-brand.test-month.fs19-sm.fs28-md.fs34-lg")
      return [].map.call(nodes2, function(node) {
            return node.innerHTML;
        });
    });
  });
  
    casper.waitFor(function(){
   return this.fetchText('h3.ncss-brand.u-uppercase.test-name.mb-1-sm.fs16-sm.fs24-md.fs28-lg') !== "";
  }, function(){
      names = this.evaluate(function(){
      var nodes3 = document.querySelectorAll("h3.ncss-brand.u-uppercase.test-name.mb-1-sm.fs16-sm.fs24-md.fs28-lg")
      return [].map.call(nodes3, function(node) {
            return node.innerHTML;
        });
    });
  });
   
    casper.waitFor(function(){
   return this.fetchText(".js-buying-tools.buying-tools-container.bg-white.pt0-sm.pb0-sm.pt8-lg.pb6-lg.ta-sm-c") !== "";
  }, function(){
      status = this.evaluate(function(){
      var nodes4 = document.querySelectorAll(".js-buying-tools.buying-tools-container.bg-white.pt0-sm.pb0-sm.pt8-lg.pb6-lg.ta-sm-c")
      return [].map.call(nodes4, function(node) {
            if(node.firstChild.innerHTML != "Sold Out"){
              return "Available";
            }else{
              return "Sold Out";
            }
              
        });
    });
  });


});


casper.run(function() {
  this.echo(JSON.stringify({days:days, months: months, names: names, status: status.split(",")}))
    this.exit();
});