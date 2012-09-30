var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.todayHappinessView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click #today-happiness': 'todayHappiness',
			'click .ui-slider-handle': 'changeEmoticons'
		},

		initialize: function() {			
		},

		todayHappiness: function() {
			
			var happinessScore = $('#happiness-score').text();

			new app.todayCategoryView({ happinessScore: happinessScore });
		},

		changeEmoticons: function() {
			happinessScore
			
		}



	});

	new app.todayHappinessView();

});
