var app = app || {};


$(function() {
	'use strict';
	
	app.ActivityView = Backbone.View.extend({

		//model: 'hello' (activity) //Model is equivalent to this.
		//gets model : 
		template: _.template( $('#activity-template').html() ),

		events: {
			'click .destroy': 'clear',
			'dblclick .edit':	'edit',
			'keypress .edit':	'updateOnEnter',
			'blur .edit':		'close'
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

	app.todayCategoryView = Backbone.View.extend({
		
	})


});
