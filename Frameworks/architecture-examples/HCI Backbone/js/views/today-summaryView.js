var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	app.TodaySummaryView = Backbone.View.extend({

		el: '#content',

		events: {
			'click #edit-today' : 'backToday',
			'click #today-summary .btn-back' : 'backtoCategory'
		},

		initialize: function() {
			if(this.model != null) {
			var new_activities = this.model.get('activities');
			var happinessScore = this.model.get('feelings');
			var date = this.model.get('date');

			var tidyDateObject = app.tidyDate(date);

			var niceDate = tidyDateObject.Tday + ", " + tidyDateObject.month + " " + tidyDateObject.day;

			this.appendActivities(new_activities, happinessScore, niceDate);
			}
		},

		appendActivities: function(new_activities, happinessScore, niceDate) {			
			setTimeout(function(){
				$('#today-summary ul').html('');
        	$('#happiness-score-summary span').text(happinessScore); 
        	$('#today-summary h3 span').text(niceDate);

				for (var index in new_activities) {
					var activityModel = app.Activities.get(new_activities[index]);
					var one_activity = app.Activities.get(new_activities[index]).attributes.title; 

					$('#today-summary ul').append('<li>' +one_activity + '</li>');
				}
			}, 10);
		},

		backToday: function() {
      //delete app.todayHappinessViewVar.options.pastDay;
			app.router.today(this.model);
		},

		backtoCategory: function() {
			app.todayCategoryView = new app.TodayCategoryView({ model: this.model });
			app.router.todayCategory(this.model);
		}
	});

	app.todaySummaryView = new app.TodaySummaryView({ model:app.pullToday() });

});
