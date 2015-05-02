$(document).ready(function() {
	var jobs = getJobs();
	var locations = getLocations();

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


	Handlebars.registerHelper('dateId', function(id) {
  		return id+"_date";
	});
	Handlebars.registerHelper('locId', function(id) {
  		return id+"_loc";
	});
	Handlebars.registerHelper('timeFromId', function(id) {
  		return id+"_time_from";
	});
	Handlebars.registerHelper('timeToId', function(id) {
  		return id+"_time_to";
	});
	Handlebars.registerHelper('descId', function(id) {
  		return id+"_desc";
	});
		Handlebars.registerHelper('rateId', function(id) {
  		return id+"_rate";
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

 	$("#owl-example").owlCarousel({
 		navigation:true,
 		items: 3,
 	});


});