$(document).ready(function() {
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

	$("#jobCreation").submit(function() {
		event.preventDefault();
		var from_date = $("#example").find("input").val();
		var to_date = $("#example").find("input").val();
		
		// var from_time = $("#timepicker1").val();
		// var to_time = $("#timepicker2").val();
		// var from_hour = from_time.substring(0,2);
		// var from_minute = from_time.substring(3, 5);
		// var from_denoter = from_time.substring(5);
		// console.log(from_hour, from_minute, from_denoter);

		var location = $("#location").val();
		var description = $("#description").val();
		var title = $("#title").val();
		var rate = $("#rate_val").val();
		console.log(rate);
		var job = {
			title: title,
			time: {from: new Date(from_date), to: new Date(to_date)},
			location: location,
			rate: rate,
			primary: undefined,
			backup: undefined,
			description: description,
			current_flag: true,
			applicants: []
		};

		jobs = getJobs();
		jobs.splice(0, 0, job);
		localStorage['jobs'] = JSON.stringify(jobs);

		// window.location.href="jobs.html";
	})

	$("#clear").click(function() {
		console.log("reset");
	})

	$('#example').datetimepicker();
	$('#ex').datetimepicker();
	$('#ex2').datetimepicker();
	$('#example1').datetimepicker();

	// $('#timepicker1').timepicker();
	// $('#timepicker2').timepicker();

	// $('#timepicker').timepicker();

	// $("#datepicker").datepicker();
});

