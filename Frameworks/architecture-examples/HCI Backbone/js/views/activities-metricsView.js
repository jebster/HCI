var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.ActivityMetricsView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {

		},

		initialize: function() {

			

		},


	});

	new app.ActivityMetricsView();

});
