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
			app.Activities.each(this.addOne, this);
		},
		
		addOne: function(activity) {
			activity.feeling = app.getFeelings(activity);
			var view = new app.MetricView( { model: activity } );
//			console.log(view.render().el);
			$('#activities-metrics ul').append(view.render().el);
		}

	});

	new app.ActivityMetricsView();

});
