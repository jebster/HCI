var app = app || {};

(function() {
	'use strict';

	var dayList = Backbone.Collection.extend({

		model: app.Day,

		localStorage: new Store('days-backbone'),

	});

	// Create our global collection of **Todos**.
	app.Days = new dayList();



}());
