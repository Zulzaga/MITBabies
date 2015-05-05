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

	Handlebars.registerHelper('sideTitleId', function(ind) {
  		return "sideTitle_"+ind;
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

 	$(".title_side").click(function(e){
 		var self = $(e.target);
 		var title = self.parent().attr("id");
 		console.log(title);
		var job_index = title.split("_")[1];
		var job = jobs[job_index];
		$("#apps_"+job_index).addClass("in");

		$($("#title_"+job_index).find(".job-show")[0]).removeClass("in");
		$($("#title_"+job_index).find(".job-edit")[0]).addClass("in");
		$($("#title_"+job_index).find(".job-delete")[0]).addClass("in");
		$($("#title_"+job_index).find(".job-hide")[0]).addClass("in");

 	});
 	$(".job-hide").click(function(e){
 		var self = $(e.target);
 		var title = self.parent().attr("id");
 		console.log(title);
		var job_index = title.split("_")[1];
		var job = jobs[job_index];
		$("#apps_"+job_index).removeClass("in");

		$($("#title_"+job_index).find(".job-show")[0]).addClass("in");
		$($("#title_"+job_index).find(".job-edit")[0]).removeClass("in");
		$($("#title_"+job_index).find(".job-delete")[0]).removeClass("in");
		$($("#title_"+job_index).find(".job-hide")[0]).removeClass("in");

 	});

 	 $(".job-show").click(function(e){
 		var self = $(e.target);
 		var title = self.parent().attr("id");
 		console.log(title);
		var job_index = title.split("_")[1];
		var job = jobs[job_index];
		$("#apps_"+job_index).addClass("in");

		$($("#title_"+job_index).find(".job-show")[0]).removeClass("in");
		$($("#title_"+job_index).find(".job-edit")[0]).addClass("in");
		$($("#title_"+job_index).find(".job-delete")[0]).addClass("in");
		$($("#title_"+job_index).find(".job-hide")[0]).addClass("in");

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

			var icon_loc = $("<span>").addClass("input-group-addon").append($("<span>").addClass("glyphicon glyphicon-home"));
			var loc_msg = $("<p>").text("New location:").addClass("loc-msg");
			var loc_container = $("<div>").addClass("input-group");
			loc_container.append(icon_loc);
			loc_container.append(list);

			loc_parent.empty();
			loc_parent.append(loc_msg);
			loc_parent.append(loc_container);

			var rate_container = $("<div>").addClass("input-group").attr("id", "rate_"+job_index);
			var icon_loc = $("<span>").addClass("input-group-addon").append($("<span>").addClass("glyphicon glyphicon-usd"));
			var rate_input	= $("<input>").addClass("form-control").attr("type", "text").attr("rows", "2").attr("placeholder",jobs[job_index].rate);      	
			rate_container.append(icon_loc);
			rate_container.append(rate_input);
			rate_parent.empty();
			rate_parent.append($("<p>").text("New rate:").addClass("rate-msg"));
			rate_parent.append(rate_container);



			
			var a = $("<span>").addClass("input-group-addon");
			var b = $("<span>").addClass("glyphicon glyphicon-calendar");
			a.append(b);
			var input_from = $("<input>").attr("type", "text").addClass("form-control").attr("id", "timeFrom_"+job_index).addClass("time-from-input");
		    var time_container_from=$("<div>").addClass("input-group").attr("id", "timeFromContainer_"+job_index);
		    time_container_from.append(a);
		    time_container_from.append(input_from);
			time_parent.empty();
			//time.remove();
			time_parent.append($("<p>").text("Pick new dates:").addClass("time-from-msg"));
			time_parent.append(time_container_from);
			time_parent.append($("<p>").text("to").addClass("time-to-msg"));

			var c = $("<span>").addClass("input-group-addon");
			var d = $("<span>").addClass("glyphicon glyphicon-calendar");
			c.append(d);
			var input_to = $("<input>").attr("type", "text").addClass("form-control").attr("id", "timeTo_"+job_index).addClass("time-to-input");
		    var time_container_to=$("<div>").addClass("input-group").attr("id", "timeToContainer_"+job_index);


		    time_container_to.append(c);
		    time_container_to.append(input_to);
			
			time_parent.append(time_container_to);

			$('#timeFrom_'+job_index).datetimepicker({
	        	minDate: new Date(),
    		});
    		$('#timeFrom_'+job_index).val(formatTime(jobs[job_index].time.from));


    		$('#timeTo_'+job_index).datetimepicker({
	        	minDate: new Date(),
    		});
    		$('#timeTo_'+job_index).val(formatTime(jobs[job_index].time.to));

    		$($("#title_"+job_index).children()[0]).text(jobs[job_index].title);


 		}
 		else{
 			$(this).prop("type", "button");
 			$(this).text("Edit");

 			var loc = $("#loc_"+job_index);
 			var selected = loc.val();
 			var loc_parent = loc.parent().parent();
 			loc_parent.empty();
 			var new_loc = $('<p>').text(" At "+selected).addClass("job_details").addClass("location");
 			new_loc.prepend($("<span>").addClass("fa fa-home"));
 			loc_parent.append(new_loc);
 			jobs[job_index].location=selected;

 			var rate = $("#rate_"+job_index);
 			var rate_parent = rate.parent();
 			var rate_new_val = rate.find("input").val();
 			console.log(rate_new_val);

 			var rate_new = $('<p>').text(rate_new_val+" per hour").addClass("job_details").addClass("rate");
 			rate_new.prepend($("<span>").addClass("fa fa-usd"));
 			rate_parent.empty();
			rate_parent.prepend(rate_new);
			jobs[job_index].rate=rate_new_val;


			var from_date = $("#timeFromContainer_"+job_index).find("input").val();
			jobs[job_index].time.from = from_date;

			var to_date = $("#timeToContainer_"+job_index).find("input").val();
			jobs[job_index].time.to = to_date;

			var time_parent = $("#timeToContainer_"+job_index).parent()
			time_parent.empty();

			var new_time = $("<p>").addClass("job_details time time-icon");
			new_time.text(" "+from_date.split(" ")[1]+from_date.split(" ")[2]+" to "+to_date.split(" ")[1]+to_date.split(" ")[2]);
			time_parent.append($("<span>").addClass("glyphicon glyphicon-time time-icon"));
			time_parent.append(new_time);

			$($("#title_"+job_index).children()[0]).text(jobs[job_index].title+" on "+getDate(new Date(from_date)));

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
 					$("#sideTitle_"+job_index).remove();
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

    var formatTime = function(time){
    	var t = new Date(time);
    	var hours = t.getHours();
    	var h = hours>12?"PM":"AM";
    	if (hours==0){
    		h = "AM";
    	}
    	if (hours==12){
    		h = "PM";
    	}
    	var h_string = "";
    	var m = t.getMinutes()>9?t.getMinutes()+"":"0"+t.getMinutes();
    	if (hours>12){
    		var x = hours-12;
    		h_string = x+":"+m+" "+h;
    	}
    	else{
    		h_string = hours+":"+m+" "+h;
    	}
    	return t.toLocaleDateString()+" "+h_string;
    }
});