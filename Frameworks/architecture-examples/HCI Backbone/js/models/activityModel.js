var app = app || {};

(function() {
	'use strict';


	app.Day = Backbone.Model.extend({
//		localStorage: new Store("days-backbone"),
		defaults: {
			date: '',
			feelings: '',
			activities: []
		}
	});

	app.Activity = Backbone.Model.extend({
//		localStorage: new Store("activities-backbone"),
		defaults: {
			title: '',
		}

	});

	



}());
