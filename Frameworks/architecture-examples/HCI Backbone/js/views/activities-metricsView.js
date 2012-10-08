var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	app.ActivityMetricsView = Backbone.View.extend({

		el: '#content',

		events: {

		},

		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 10);
		},

		render: function() {
			$('#activities-metrics ul').html('');	
			app.Activities.fetch();
			app.metricViews = [];
			app.Activities.each(this.addOne, this);
			app.metricViews.sort(this.compare);
			app.metricViews.forEach(this.appendOne, this);
		},
		
		addOne: function(activity) {
			activity.feeling = app.getFeelings(activity);
			var view = new app.MetricView( { model: activity } );
			app.metricViews.push(view);
		},

		compare: function(view, view1) {
			var feeling = view.model.feeling;
			var feeling1 = view1.model.feeling;
			if(feeling == feeling1) {
				return 0;
			} else if(feeling > feeling1) {
				return 1;
			} else return -1;
		},

		appendOne: function(view) {
			$('#activities-metrics ul').append(view.render().el);
		}

	});

	app.activityMetricsView = new app.ActivityMetricsView();

});
