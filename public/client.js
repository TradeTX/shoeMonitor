$(function(){
	//scroll-nav highlighting
	$(".nav li").click(function(){
		  $(".nav li").removeClass("active");
		$(this).addClass('active');
	})
	
	//search bar
	$('#shoes').submit(function(e) {
e.preventDefault();
    // get all the inputs into an array.
    var $inputs = $('#shoes :input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
		var name = $inputs[0].value.toLowerCase();
    $("a[href='#"+name+"']").click();

});
	
	
	//smooth scroll
	$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
	
	//nike section table
	$.ajax({
    method: "POST",
    url:window.location.origin+"/data",
		data: {"type": "nike"}
  }).done(function(data){
		console.log(data);
		var nike = JSON.parse(data);
		
		var table = $(".nike")
		for(var i = 0; i < nike.names.length; i++){
			table.append(`
			    <tr>
      <th scope="row">`+(i+1)+`</th>
      <td>`+nike.names[i]+`</td>
      <td>`+nike.months[i]+` `+nike.days[i]+`</td>
  		<td>`+nike.status[i]+`</td>
    </tr>

			`)
		}
  }).fail(function(err){
    console.log(err);
  });
	
	//eastbay section table
	$.ajax({
		method: "POST",
		url:window.location.origin+"/data",
		data: {"type": "kicks"}
	}).done(function(data){
		var kicksonfire = JSON.parse(data);

		kicksonfire.dates = kicksonfire.dates.map(function(date){
			return date.replace("\n", "");
		})
		
			var table = $(".kicks")
		for(var i = 0; i < kicksonfire.names.length; i++){
			table.append(`
			    <tr>
      <th scope="row">`+(i+1)+`</th>
      <td>`+kicksonfire.names[i]+`</td>
      <td>`+kicksonfire.dates[i]+`</td>
    </tr>

			`)
		}
		$(".loading").remove();
	}).fail(function(err){
		console.log(err);
	});
	
	//solecollector section table
	$.ajax({
    method: "POST",
    url:window.location.origin+"/data",
		data: {"type": "sole"}
  }).done(function(data){
		var sole = JSON.parse(data);
		
		var table = $(".sole")
		for(var i = 0; i < sole.names.length; i++){
			if(!sole.months[i]){
				sole.months[i] = ""
				sole.days[i]="N/A"
			}
			table.append(`
			    <tr>
      <th scope="row">`+(i+1)+`</th>
      <td>`+sole.names[i]+`</td>
      <td>`+sole.months[i]+` `+sole.days[i]+`</td>
  		<td>`+sole.prices[i]+`</td>
    </tr>

			`)
		}
  }).fail(function(err){
    console.log(err);
  });

	
});