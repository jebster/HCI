var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {

app.returnTodayDate = function() {

	var my_date = new Date();
	var day = my_date.getDay();
	var date = my_date.getDate();
	var month = my_date.getMonth() + 1;
	var year = my_date.getFullYear();
	return formatted_date = day + '.' + date + '.' + month + '.' + year;
}

app.pullToday = function() {

	var formatted_date = app.returnTodayDate();

	var data = app.Days.where({date : formatted_date}, {wait: true});
	if (data.length) {
		return data[0];
	} else {
		return false;
	}

}

});
