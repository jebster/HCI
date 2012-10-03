var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	app.SingleDayView = Backbone.View.extend({

		el: '#content',

		events: {

		},

		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 50);
		},
		
		render: function() {
			var view = new app.BarChartSingleView( { model: this.model } );
			$('#single-day ul.bar-chart-single').html(view.render().el);
			
			$('#single-day ul#single-day-activities').html('');			
			var activities = this.model.get('activities');
			app.Activities.fetch();
			for (var index in activities) {
				var activityModel = app.Activities.get(activities[index]);
				var singleView = new app.SingleDayActivityView( { model: activityModel } );
				$('#single-day ul#single-day-activities').append(singleView.render().el);
			}
		}

	});

	//new app.SingleDayView();

});
