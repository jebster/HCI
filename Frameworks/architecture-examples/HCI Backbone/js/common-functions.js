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

app.pullDay = function(target_date) {
	app.Days.fetch();
	
	var data = app.Days.where({date: target_date});

	if (data.length) {
		return data[0];
	} else {
		return false;
	}
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
	
	if(app.count != 0)	return (app.feelings*1.0)/app.count;
	else return 0;
}

});
