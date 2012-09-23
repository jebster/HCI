var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.SingleDayView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {

		},

		initialize: function() {
			console.log("single day view");
		},

	});

	new app.SingleDayView();

});
