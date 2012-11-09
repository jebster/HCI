var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	app.SingleDayView = Backbone.View.extend({

		el: '#content',

		events: {

			'click #edit-history' : 'editHistory'

		},

		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 50);
		},
		
		render: function() {
			var view = new app.BarChartSingleView( { model: this.model } );
			var tidyDateObject = app.tidyDate(this.model.get('date'));
			var niceDate = tidyDateObject.month + " " + tidyDateObject.day;

			$('#single-day ul.bar-chart-single').html(view.render().el);
			$('#single-day h3').html("Activities for " + niceDate);
			
			$('#single-day ul#single-day-activities').html('');			
			var activities = this.model.get('activities');
			app.Activities.fetch();
			for (var index in activities) {
				var activityModel = app.Activities.get(activities[index]);
				var singleView = new app.SingleDayActivityView( { model: activityModel } );
				$('#single-day ul#single-day-activities').append(singleView.render().el);
			}
		},

		editHistory: function() {
			app.editHistory = true;
			app.todayHappinessView.model = this.model;
			app.router.today(this.model);
//			app.todayHappinessViewVar.options.pastDay = this.model;
		}



	});

	//new app.SingleDayView();

});
