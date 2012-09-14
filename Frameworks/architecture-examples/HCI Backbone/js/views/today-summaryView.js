var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.todaySummaryView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {

		},

		initialize: function() {

			//get the value from previous view
			var new_activities = this.options.new_activities;



			var happinessScore = this.options.happinessScore;
			console.log(happinessScore);

			this.appendActivities(new_activities, happinessScore);

		},

		appendActivities: function(new_activities, happinessScore) {
			
			setTimeout(function(){
				for (var index in new_activities) {

					//loop through the Activities collection, and find title of activities matching their IDs
					var one_activity = app.Activities.get(new_activities[index]).attributes.title; 

					$('#today-summary ul').append('<li>' +one_activity + '</li>');

					$('#happiness-score-summary span').text(happinessScore);
				}
			}, 0);


		}
	});

	//new app.todaySummaryView();

});
