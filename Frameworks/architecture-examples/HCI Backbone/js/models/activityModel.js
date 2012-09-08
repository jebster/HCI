var app = app || {};

(function() {
	'use strict';


	app.Day = Backbone.Model.extend({

		defaults: {
			date: '',
			feelings: '',
			activities: []
		}
	});

	app.Activity = Backbone.Model.extend({

		defaults: {
			title: '',
			
		}

	});



}());