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
}

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
