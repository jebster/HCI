var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.todayHappinessView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click #today-happiness': 'todayHappiness'
		},

		initialize: function() {


		},

		todayHappiness: function() {
			score = oForm.elements["score"].value;
			console.log(score);
		}


	});

	//new app.todaySummaryView();

});
