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
		},

		initialize: function() {			
		},

		todayHappiness: function() {
			
			var happinessScore = $('#happiness-score').text();
			if (this.options.pastDay) {
				app.todayCategoryViewVar = new app.todayCategoryView({ happinessScore : happinessScore, pastDay : this.options.pastDay });
				app.router.todayCategory(true, this.options.pastDay.get('activities'));
			} else {
				app.todayCategoryViewVar = new app.todayCategoryView({ happinessScore : happinessScore });
				app.router.todayCategory();
			}
		}

	});

	app.todayHappinessViewVar = new app.todayHappinessView();

});
