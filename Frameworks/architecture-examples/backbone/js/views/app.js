var app = app || {};

$(function( $ ) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#container',

		// Our template for the line of statistics at the bottom of the app.
		//activityTemplate: _.template( $('#activity-template').html() ),

		// Delegated events for creating new items, and clearing completed ones.
		events: {

			'keypress #new-activity': 'createOnEnter',

		},

		// At initialization we bind to the relevant events on the `Todos`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.

		initialize: function() {

			  $('footer .nav li').click(function(){

			    $('#container').find('.cat-display').removeClass('cat-display');

			    $('footer .nav').find('.active').removeClass('active');
			    $(this).addClass('active');

			    var currentIndex = $(this).index();

			      switch(currentIndex)
			      {
			      case 1:
			        $('#graphs').addClass('cat-display');
			        break;
			      case 2:
			        $('#category').addClass('cat-display');
			        break;
			      default:
			        $('#today').addClass('cat-display');
			      }
			  });			


			this.input = this.$('#new-activity');


			window.app.Activities.on( 'add', this.addAll, this ); //add is triggered by "create"

			window.app.Activities.on( 'reset', this.addAll, this );
			window.app.Activities.on( 'change:completed', this.addAll, this );
			window.app.Activities.on( 'all', this.render, this );


			app.Activities.fetch();

			alert(app.Activities.get('b78173cd-b503-0b6c-44dc-ccb676313b22').toJSON().title);
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function() {

			//add an activity to the list
			//$('#category ul').append(this.activityTemplate);


			//var completed = app.Todos.completed().length;
			//var remaining = app.Todos.remaining().length;


		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( activity ) { //activity = an activity model
			var view = new app.ActivityView({ model: activity }); //model is a random variable
			$('#category ul').append( view.render().el );
		},

		// Add all items in the **Todos** collection at once.
		//Purpose is to create a view and inject it into the DOM
		addAll: function() {
			this.$('#category ul').html(''); //this = AppView

			app.Activities.each( this.addOne, this ); //latter this = an activity model
			
		},

		// Generate the attributes for a new Todo item.
		newAttributes: function() {

			return {
				title: this.input.val().trim()

			};
		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function( e ) {

			if ( e.which !== ENTER_KEY || !this.input.val().trim() ) {
				return;
			}
			
			app.Activities.create( this.newAttributes() ); //returns an object {title: 'what u key'}
			this.input.val('');
		}
	});
});
