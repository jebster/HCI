var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.TodayHappinessView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click #today-happiness': 'todayHappiness',
		},

		initialize: function() {
		},

		todayHappiness: function() {
			var happinessScore = $('#happiness-score').text();
			if (this.model != null) {
				this.model.set('feelings', happinessScore);
				app.todayCategoryView = new app.TodayCategoryView({ model : this.model });
			} else {
				this.model = app.pullToday();
				if(this.model) {
					this.model.set('feelings', happinessScore);
				} else {
					this.model = app.Days.create({ activities: [], feelings: happinessScore, date: app.returnTodayDate() });
				}
				app.todayCategoryView = new app.TodayCategoryView({ model: this.model });
			}
			app.router.todayCategory(this.model);
		}

	});

	app.todayHappinessView = new app.TodayHappinessView();

});
