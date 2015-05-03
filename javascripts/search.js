$(document).ready(function() {
	console.log(window.location.hash);
    if (window.location.hash != null && window.location.hash != '' && $(window.location.hash).offset()!= null) {
        $('body').animate({
            scrollTop: $(window.location.hash).offset().top - 100
        }, 750);
    } else {
    	$("#search-num").text("No");
    	$("#searchQuery").text(window.location.hash.substring(1));
    }
});