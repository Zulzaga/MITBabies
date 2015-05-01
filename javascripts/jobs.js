$(document).ready(function() {
	var jobs = getJobs();
	var locations = getLocations();


	Handlebars.registerHelper('getTime', function(date) {
		//get list of the time (hh mm sss ) and the pm/am value
		var timeString = date.toLocaleTimeString().split(" ");
		var separate = timeString[0].split(":");
  		return separate[0]+":"+separate[1]+timeString[1];
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
	
	$(function(){
		$( ".datepicker" ).datepicker({
    		changeMonth: true,//this option for allowing user to select month
    		changeYear: true,
    		dateFormat: "M dd yy" //this option for allowing user to select from year range
    	});

    	$('.selectpicker').selectpicker();
    		for (var i=0;  i< locations.length; i++){
    			var option = $("<option>"+locations[i]+"</option>");
    			$('.selectpicker').append(option);
    		}
    	$('.selectpicker').selectpicker('deselectAll');
    	$('.selectpicker').selectpicker("refresh");

	});


	
	// sets variable source to the animalTemplate id in index.html
	var source = document.getElementById("job-template").innerHTML;
	 
	// Handlebars compiles the above source into a template
	var template = Handlebars.compile(source);
	 

	var jobs_container = $("#jobs");
	for (var i = 0; i < jobs.length; i++){
		var j = jobs[i];
		var job_id = "job"+i;
		j.id = job_id;
		var job = $("<div></div>").attr("id", job_id).addClass("individualJob");
		var output = template(j);
		jobs_container.append(job);
		document.getElementById(job_id).innerHTML = output;

		var date_picker = $("#"+job_id+"_date");
		date_picker.val(j.time.to.toDateString().substring(4, j.time.to.length));

	}


	

});