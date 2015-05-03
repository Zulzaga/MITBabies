$(document).ready(function() {
	$('html,body').animate({scrollTop:-100});
	$("#search").submit(function() {
		event.preventDefault();
		var search = $("#babysitter-search").val();
		console.log(search);
		window.location.href="search.html#" + search; 
	});
});

