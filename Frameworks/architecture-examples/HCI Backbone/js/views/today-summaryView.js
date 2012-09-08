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

			var new_activities = this.options.new_activities;

			this.appendActivities(new_activities);

		},

		appendActivities: function(new_activities) {
			
			setTimeout(function(){
				for (var index in new_activities) {

					//loop through the Activities collection, and find title of activities matching their IDs
					var one_activity = app.Activities.get(new_activities[index]).attributes.title; 

					$('#today-summary ul').append('<li>' +one_activity + '</li>');
					console.log(one_activity);
				}
			}, 0);


		}
	});

	//new app.todaySummaryView();

});
