$(document).ready(function() {
	var jobs = getJobs();
	var locations = getLocations();


	Handlebars.registerHelper('navigate_to', function(ind) {
  		return "#title_"+ind;
	});

	Handlebars.registerHelper('jobId', function(ind) {
  		return "job_"+ind;
	});

	Handlebars.registerHelper('appsId', function(ind) {
  		return "apps_"+ind;
	});

	Handlebars.registerHelper('titleId', function(ind) {
  		return "title_"+ind;
	});

	Handlebars.registerHelper('makeTitle', function(data) {
  		return data.title+" on " +getDate(data.time.from);
	});


	Handlebars.registerHelper('getTime', function(date){
		var parts = date.toLocaleTimeString().split(" ");
		var nums = parts[0].split(":");
		return nums[0]+":"+nums[1]+parts[1];
	});

	Handlebars.registerHelper('getFullName', function(data) {
  		return data.firstName+" " +this.lastName;
	});

	

	// sets variable source
	var side_template_source = document.getElementById("side-template").innerHTML;
	var jobs_template_source = document.getElementById("jobs-template").innerHTML;
	var applicants_template_source = document.getElementById("applicants-template").innerHTML; 

	// Handlebars compiles the above source into a template
	var side_template = Handlebars.compile(side_template_source);
	var jobs_template = Handlebars.compile(jobs_template_source);
	var applicants_template = Handlebars.compile(applicants_template_source);
	 


	var side_container = $("#side");
	var side_output = side_template({jobs});
	side_container.append(side_output);

	var jobs_container = $("#jobs");
	var jobs_output = jobs_template({jobs});
	jobs_container.append(jobs_output);

	for(var i = 0; i< jobs.length; i++){
		if (jobs[i].current_flag){
			var j = jobs[i];
			var applicants = j.applicants;
			var job_div = $("#apps_"+i);
			var applicants_output = applicants_template({applicants});
			job_div.append(applicants_output);
		}
	}

	$("#current_jobs_link").click(function(e){
		showHideJobs("current");
		return true;
	});

	$("#past_jobs_link").click(function(e){
		showHideJobs("past");
		return true;
	});

	function showHideJobs(kind){
		var class_string = "."+kind+"_job";
		var classes = $(class_string).attr("class").split(" ");
		
		
		for (var i=0; i< classes.length; i++){
			//shown, need to hide
			if (classes[i]=="in"){
				$(class_string).removeClass("in");
				return;

			}
		}
		//hidden, need to show 
		$(class_string).addClass("in");

		return

	}

    function getDate(date) {
		var timeString = date.toDateString();
  		return timeString;
	}

 	$(".owl-carousel").owlCarousel({
 		navigation:true,
 		items: 3,
 	});

 	$(".applicant_pic").click(function(e){
 		var divs = $(e.target).parent().parent().parent().children();
 		for (var i=0; i<divs.length; i++){
 			var div = $(divs[i]);
 			if (div.hasClass("applicantPanel")){
 				if (div.hasClass("in")){
 					div.removeClass("in");
 				}
 				else{
 					div.addClass("in");
 				}
 				break;
 			}
 		}
 	})

 	if (window.location.hash != null && window.location.hash != '' && $(window.location.hash).offset()!= null) {
        $('body').animate({
            scrollTop: $(window.location.hash).offset().top - 100
        }, 750);
    } else {
    }
});