var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.todaySummaryView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click #edit-today' : 'backToday',
		},

		initialize: function() {

			//get the value from previous view
			app.Days.fetch(); //Days collection will sync everything between local and server
			//** call today Summary View, call from previous views

			var getToday = app.pullToday();

			var new_activities = getToday.attributes.activities;
			var happinessScore = getToday.attributes.feelings;
			var date = getToday.attributes.date;

			this.appendActivities(new_activities, happinessScore, date);

		},

		appendActivities: function(new_activities, happinessScore, date) {
			setTimeout(function(){

                $('#happiness-score-summary span').text(happinessScore);
    
                $('#today-summary h3 span').text(date);

				for (var index in new_activities) {

					var activityModel = app.Activities.get(new_activities[index]);

					//loop through the Activities collection, and find title of activities matching their IDs
					var one_activity = app.Activities.get(new_activities[index]).attributes.title; 

					$('#today-summary ul').append('<li>' +one_activity + '</li>');

				}
				
			}, 10);


		},

		backToday: function() {
			app.router.today(true);
		}
	});

	//new app.todaySummaryView();

});
