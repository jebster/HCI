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

	var formatted_date = /*app.returnTodayDate()*/"5.21.9.2012";
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
}

});
