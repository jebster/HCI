//var app = app || {};

(function() {
	'use strict';

	var activityList = Backbone.Collection.extend({

		model: app.Activity,

		localStorage: new Store('activities-backbone')


	});

	// Create our global collection of **Todos**.
	app.Activities = new activityList();

}());

