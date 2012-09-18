
var app = app || {};


$(function() {
	'use strict';
	
	app.ActivityView = Backbone.View.extend({

		tagName: 'li',

		//model: 'hello' (activity) //Model is equivalent to this.
		//gets model : 
		template: _.template( $('#activity-template').html() ),

		events: {
			'click .destroy': 'clear',
			'dblclick .edit': 'edit',
			'keypress .edit': 'updateOnEnter',
			'blur .edit':	  'close'
		},

		initialize: function() {

		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) ); //model is passed from category.js under addOne(), get it from database to render it to become HTML
			return this;
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function() {
			this.model.destroy();
			location.reload();
		},

		edit: function() {
			this.$('.edit').addClass('editing');
			this.$('.edit').focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close: function() {

			var value = this.$('.edit').val().trim();

			if ( value ) {
				this.model.save({ title: value });
			} else {
				this.clear();
			}

			this.$('.edit').removeClass('editing');
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function( e ) {
			if ( e.which === ENTER_KEY ) {
				this.close();
			}
		}
	});

	//Only renders the html of every single select item (under today-category )
	app.ActivityStaticView = Backbone.View.extend({

		tagName: 'li',

		template: _.template( $('#activity-static-view-template').html() ),

		events: {
		},

		initialize: function() {

		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) ); //model is passed from category.js under addOne(), get it from database to render it to become HTML
			return this;
		},


	});

	app.ActivityTodayView = Backbone.View.extend({


	});


});
