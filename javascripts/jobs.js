$(document).ready(function() {
	var jobs = getJobs();
	var locations = getLocations();
	
	Handlebars.registerHelper('navigate_to', function(ind) {
  		return "#title_"+ind;
	});

	Handlebars.registerHelper('jobId', function(ind) {
  		return "job_"+ind;
	});

	Handlebars.registerHelper('formId', function(ind) {
  		return "form_"+ind;
	});

	Handlebars.registerHelper('jobBodyId', function(ind) {
  		return "jobBody_"+ind;
	});

	Handlebars.registerHelper('appsId', function(ind) {
  		return "apps_"+ind;
	});

	Handlebars.registerHelper('titleId', function(ind) {
  		return "title_"+ind;
	});

	Handlebars.registerHelper('makeTitle', function(data) {
  		return data.title+" on " + getDate(data.time.from);
	});


	Handlebars.registerHelper('getTime', function(date){
		var parts = (new Date(date)).toLocaleTimeString().split(" ");
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

	function addJob(job){
		jobs.push({job})
	}

    function getDate(date) {
		var timeString = (new Date(date)).toDateString();
  		return timeString;
	}

 	$(".owl-carousel").owlCarousel({
 		navigation:true,
 		items: 3,
 	});

 	// $(".applicant_pic").click(function(e){
 	// 	var divs = $(e.target).parent().parent().parent().children();
 	// 	for (var i=0; i<divs.length; i++){
 	// 		var div = $(divs[i]);
 	// 		if (div.hasClass("applicantPanel")){
 	// 			if (div.hasClass("in")){
 	// 				div.removeClass("in");
 	// 			}
 	// 			else{
 	// 				div.addClass("in");
 	// 			}
 	// 			break;
 	// 		}
 	// 	}
 	// });

 	$(".job-delete").click(function(e){
 		openConfirmationDialog(e);
 		
 	});

 	$(".job-edit").click(function(e){
 		var self = $(e.target);
		var title = self.parent().attr("id");
		var job_index = title.split("_")[1];
		var details_container = $("#jobBody_"+job_index);
		details_container.submit(function(e){
			console.log(e);
		});

 		if ($(this).text()=="Edit"){
 			$(this).text("Save");
 			$(this).prop("type", "submit");

			var loc = $(details_container.find(".location")[0]);
			var rate = $(details_container.find(".rate")[0]);
			var time = $(details_container.find(".time")[0]);
			

			var loc_parent = loc.parent();
			var rate_parent = rate.parent();
			var time_parent = time.parent();
			
			var list = $("<select/>").addClass("form-control").attr("id", "loc_"+job_index);
			for (var i=0; i<locations.length; i++){
				if(locations[i]==jobs[job_index].location){
					list.append($("<option selected/>").html(locations[i]));	
				}
				else{
					list.append($("<option/>").html(locations[i]));	
				}
				
			}

			loc_parent.append(list);
			 
			loc.remove();

			var rate_input = $('<p contenteditable="true"/>').text(rate.text()).addClass("job_details").addClass("rate");
			rate_input.addClass("vis");
			rate_parent.prepend(rate_input);
			rate.remove();
 		}
 		else{
 			$(this).prop("type", "button");
 			$(this).text("Edit");

 			var loc = $("#loc_"+job_index);
 			var selected = loc.val();
 			var loc_parent = loc.parent();
 			loc.remove();
 			var new_loc = $('<p>').text(" At "+selected).addClass("job_details").addClass("location");
 			new_loc.prepend($("<span>").addClass("fa fa-home"));
 			loc_parent.append(new_loc);
 			jobs[job_index].location=selected;

 			var rate = $(details_container.find(".rate")[0]);
 			var rate_parent = rate.parent();
 			var rate_input = $('<p>').text(rate.text()).addClass("job_details").addClass("rate");
 			rate_input.prepend($("<span>").addClass("fa fa-usd"));
			rate_parent.prepend(rate_input);
			jobs[job_index].rate=rate_input.text();
			rate.remove();
 		}
 		
 		
 	});

	function openConfirmationDialog(e) {
		// Define the Dialog and its properties.
		$("#popup").dialog({
		    resizable: false,
		    modal: true,
		    title: "Deletion confirmation",
		    height: 200,
		    width: 250,
		    open:function() {
			      var markup = 'Are you sure you want to delete this job?';
			      $(this).html(markup);
			    },
		    buttons: {
		        "Yes": function () {
		        	var self = $(e.target);
			 		var title = self.parent().attr("id");
			 		var job_index = title.split("_")[1];
			 		$("#job_"+job_index).remove();
			 		if (jobs[job_index].current_flag){
			 			$("#apps_"+job_index).remove();
 					}
		            $(this).dialog('close');
		        },
		            "No": function () {
		            $(this).dialog('close');
		        }
		    }
		});
	}

 	if (window.location.hash != null && window.location.hash != '' && $(window.location.hash).offset()!= null) {
        $('body').animate({
            scrollTop: $(window.location.hash).offset().top - 100
        }, 750);
    }
});