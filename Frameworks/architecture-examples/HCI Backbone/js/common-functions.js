var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {

app.returnTodayDate = function() {

	var my_date = new Date();
	var day = my_date.getDay();
	var date = my_date.getDate();
	var month = my_date.getMonth() + 1;
	var year = my_date.getFullYear();
	var formatted_date = day + '.' + date + '.' + month + '.' + year;
	return formatted_date;
},

app.pullToday = function() {

	var formatted_date = app.returnTodayDate();
	//var formatted_date = 5.21.9.2012

  app.Days.fetch();
    
	var data = app.Days.where({date : formatted_date});
	if (data.length) {
		return data[0];
	} else {
		return false;
	}

},

app.formatDate = function(date) {
	return date.getDay() + '.' + date.getDate() + '.' 
		+ (date.getMonth() + 1) + '.' + date.getFullYear();
},

app.pullFirstDay = function() {
	app.Days.fetch();
	var day = app.Days.first();
	return day.get("date");
},

app.pullDay = function(target_date) {
	app.Days.fetch();
	
	var data = app.Days.where({date: target_date});

	if (data.length) {
		return data[0];
	} else {
		return false;
	}
},

app.compareDate = function(date1, date2) {
	var parts1 = date1.split('.');
	var parts2 = date2.split('.');
	var d1 = new Date(parseInt(parts1[3]), parseInt(parts1[2]), parseInt(parts1[1]));
	var d2 = new Date(parseInt(parts2[3]), parseInt(parts2[2]), parseInt(parts2[1]));
	if(d1.getTime() <= d2.getTime()) return -1;
	if(d1.getTime() > d2.getTime()) return 1;
},

app.manipulateDate = function(date, count) {
	var parts = date.split('.');
	var old_date = new Date((parts[3])+"/"+parseInt(parts[2])+"/"+parseInt(parts[1]));
	var new_date = new Date(old_date.getTime() + count * 24 * 60 * 60 * 1000);
	return app.formatDate(new_date);
},

app.getFeelings = function(activity) {
	app.Days.fetch();
	
	app.count = 0;
	app.feelings = 0;
	app.Days.each(function(day) {
		var activities = day.get('activities');
		for (var index in activities) {
			if(activities[index] == activity.id) {
				if(day.get('feelings') !='') app.feelings += parseInt(day.get('feelings'));
				app.count++;
				break;
			}
		}
	}, this);
	
	var feelings = (app.feelings*1.0)/app.count;
	if(app.count != 0)	return feelings.toFixed(1);
	else return 0;
}

app.tidyDate = function(formatted_date) {

	var tidyDateObject = {
		day: "",
		month: "",
		year: "",
		Tday: ""
	}

	var arrayDay = formatted_date.split('.');

	var Tday = parseInt(arrayDay[0]);
	var day = parseInt(arrayDay[1]);
	var month = parseInt(arrayDay[2]);
	var year = parseInt(arrayDay[3]);

	switch(Tday) {
		case 1:
			Tday = 'Mon'
			break;
		case 2:
			Tday = 'Tue'
			break;
		case 3:
			Tday = 'Wed';
			break;
		case 4:
			Tday = 'Thu';
			break;
		case 5:
			Tday = 'Fri';
			break;
		case 6:
			Tday = 'Sat'
			break;
		case 0:
			Tday = 'Sun';
			break;
	}

	switch(month) {
		case 1:
			month = 'Jan';
			break;
		case 2:
			month = 'Feb';
			break;
		case 3:
			month = 'Mar';
			break;
		case 4:
			month = 'Apr';
			break;
		case 5:
			month = 'May';
			break;
		case 6:
			month = 'Jun';
			break;
		case 7:
			month = 'Jul';
			break;
		case 8:
			month = 'Aug';
			break;
		case 9:
			month = 'Sep';
			break;
		case 10:
			month = 'Oct';
			break;
		case 11:
			month = 'Nov';
			break;
		case 12:
			month = 'Dec';
			break;
	}

	tidyDateObject.Tday = Tday;
	tidyDateObject.month = month;
	tidyDateObject.year = year;
	tidyDateObject.day = day;

	return tidyDateObject;
}


});
