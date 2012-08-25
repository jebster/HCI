var app = app || {};


$(function() {
	'use strict';
	
	app.ActivityView = Backbone.View.extend({

		//model: 'hello' (activity) //Model is equivalent to this.
		//gets model : 
		template: _.template( $('#activity-template').html() ),

		events: {
			'click .destroy': 'clear'
		},



		initialize: function() {


		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) ); //model is the word that u just keyed in, created just now
			return this;
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function() {
			this.model.destroy();
			location.reload();
		}
	});


});
