var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.CategoryView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#content',

		// Our template for the line of statistics at the bottom of the app.
		//activityTemplate: _.template( $('#activity-template').html() ),

		// Delegated events for creating new items, and clearing completed ones.
		events: {

			'keypress #new-activity': 'createOnEnter',
            'focus input': 'inputFocus',
            'blur input': 'inputBlur'
		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.

		initialize: function() {

			//this.navBar();

			window.app.Activities.on( 'add', this.addAll, this ); //add is triggered by "create"
			window.app.Activities.on( 'reset', this.addAll, this );
			window.app.Activities.on( 'change:completed', this.addAll, this );
			window.app.Activities.on( 'all', this.addAll, this ); //fetch() will trigger this


			//app.Activities.fetch();

		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function() {


		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function( e ) {
			if ( e.which !== ENTER_KEY || ! this.$('#new-activity').val().trim() ) {
				return;
			}

			app.Activities.create(this.newAttributes()); //returns an object {title: 'what u key'}

			this.$('#new-activity').val('');

		},

		// Generate the attributes for a new Todo item.
		newAttributes: function() {

			return {

				title: this.$('#new-activity').val().trim()

			};

		},

		// Add all items in the **Todos** collection at once.
		//Purpose is to create a view and inject it into the DOM
		addAll: function() {
			this.$('#category ul').html(''); //this = AppView
			app.Activities.each( this.addOne, this ); //latter this = an activity model

		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( activity ) { //activity = an activity model
		    if (activity.id) {
    			var view = new app.ActivityView({ model: activity }); //model is a random variable
	    		$('#category ul').append( view.render().el );
	    	}
		},
        inputFocus: function() {
            $("header").css("position", "absolute");
            $("footer").css("position", "absolute");
        },
        inputBlur: function() {
            $("header").css("position", "fixed");
            $("footer").css("position", "fixed");
        }


	});


	new app.CategoryView();



});
