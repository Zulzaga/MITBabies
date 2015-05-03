$(document).ready(function() {

	
	$("#jobCreation").submit(function() {
		console.log($("#title").val());
	})

	function scrollToID(id, speed){
		var offSet = 100;
		var targetOffset = $(id).offset().top - offSet;
		var mainNav = $('#small-menu');
		$('html,body').animate({scrollTop:targetOffset}, speed);
		if (mainNav.hasClass("open")) {
			mainNav.css("height", "1px").removeClass("in").addClass("collapse");
			mainNav.removeClass("open");
		}
	}

	$('.scroll-link').on('click', function(event) {
		event.preventDefault();
		var sectionID = $(this).attr("data-id");
		scrollToID('#' + sectionID, 750);
	})

	$('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
});

