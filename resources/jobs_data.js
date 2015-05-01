/*
 * LOCATIONS (predefined)
 * functions for locations
 */
var locations = ["Maseeh", "Baker", "Ashdown", "Tang", "Sidney-Pacific"];

function getLocations(){
	return locations;
}

/*
 * BABYSITTERS (predefined)
 * functions for babysitters
 */

//people

var babysitter1 = {
	firstName: "Katie", 
	lastName: "Tyrell",
	favorite: true,
	experience: "Babysitted 3-year old girl during summer 2014",
	rating: 4.5
};

var babysitter2 = {
	firstName: "Arya", 
	lastName: "Stark",
	favorite: true,
	experience: "Babysitted housemaster's babies twice a week for a term",
	rating: 5
};

var babysitter3 = {
	firstName: "Sansa", 
	lastName: "Stark",
	favorite: false,
	experience: "Watched my little brothers and a sister (5,9,11 years old)",
	rating: 4
};

var babysitter4 = {
	firstName: "Anna", 
	lastName: "Johnson", 	
	favorite: false,
	experience: "Babysitted 5-year old boy for 3 months before college",
	rating: 2
};

var babysitter5 = {
	firstName: "Kevin", 
	lastName: "Stark", 	
	favorite: false,
	experience: "None",
	rating: 1
};

//list of all people
var babysitters = [babysitter1, babysitter2, babysitter3, babysitter4];

function getBabysitters(){
	return babysitters;
}

function getBabysitterFullName(b){
	if (b.firstName && b.lastName){
		return b.firstName+" "+b.lastName;
	}
	else{
		alert("Babysitter's name is undefined");
	}
}
/*
 * JOBS (predefined)
 * functions for jobs
 */

//individual jobs
//NOTE: Javascript date format:
//new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
var job1 = {title: "Lab meeting", 
			time: {from: new Date(2015, 04, 14, 18, 00), to: new Date(2015, 04, 14, 20, 00)}, 
			location:"Ashdown", 
			rate: 18, 
			primary: undefined, 
			backup: undefined, 
			description: "Need to watch twins and possible give them dinner (already prepared)", 
			current_flag: true,
			applicants: [babysitter1, babysitter5]
		};

var job2 = {title: "Ned's birthday", 
			time: {from: new Date(2015, 03, 22, 19, 00), to: new Date(2015, 03, 22, 23, 00)}, 
			location:"Ashdown", 
			rate: 22, 
			primary: getBabysitterFullName(babysitter1), 
			backup: getBabysitterFullName(babysitter2), 
			description: "Watch twins, give them dinner and get them to bed by 10pm", 
			current_flag: false,
			applicants: [babysitter3, babysitter4]
		};	

var job3 = {title: "Dinner with wife for Valentine's", 
			time: {from: new Date(2015, 01, 14, 20, 00), to: new Date(2015, 01, 14, 22, 00)}, 
			location:"Ashdown", 
			rate: 21, 
			primary: getBabysitterFullName(babysitter3), 
			backup: getBabysitterFullName(babysitter4),
			description: "Watch a movie with twins and send them to bed", 
			current_flag: false,
			applicants: [babysitter3, babysitter4]
		};		
//list of jobs
var jobs = [job1, job2, job3];

function getJobs(){
	return jobs;
}

