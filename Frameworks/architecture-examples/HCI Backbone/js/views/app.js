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

			'keypress #new-activity': 'createOnEnter'

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

			//alert(app.Activities.get('b78173cd-b503-0b6c-44dc-ccb676313b22').toJSON().title);
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function() {

			//return this;
			//add an activity to the list
			//$('#category ul').append(this.activityTemplate);


			//var completed = app.Todos.completed().length;
			//var remaining = app.Todos.remaining().length;


		},

		// If you hit return in the main input field, create new **Todo** model,
		// persisting it to *localStorage*.
		createOnEnter: function( e ) {
			if ( e.which !== ENTER_KEY || ! this.$('#new-activity').val().trim() ) {

				return;
			}
			
			app.Activities.create( this.newAttributes() ); //returns an object {title: 'what u key'}
			this.$('#new-activity').val('');

			//update Today Page
			//this.todayPage();
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
			var view = new app.ActivityView({ model: activity }); //model is a random variable
			$('#category ul').append( view.render().el );
			console.log('here');
		},



		todayPage: function() {
			var activityList = $('#category ul').html();
			$('#today ul').append(activityList);
		}


	});


//ROUTING VIEWS ONE FILE

	var ContentView = Backbone.View.extend({
		/*
		 * Initialize with the template-id
		 */
		initialize: function(view) {
			this.view = view;
		},
		
		/*
		 * Get the template content and render it into a new div-element
		 */
		render: function() {
			var template = $(this.view).html();
			$(this.el).html(template);

			return this;
		}
	});

	// Override View.remove()'s default behavior
	Backbone.View = Backbone.View.extend({
		remove: function() {
			// Empty the element and remove it from the DOM while preserving events
			$(this.el).empty().detach();

			return this;
		}
	});


	var ApplicationRouter = Backbone.Router.extend({
		initialize: function(el) {
			this.el = el;
			
			this.categoryView = new ContentView('#category-template');
			this.todayView = new ContentView('#today-template');
			this.todayCategoryView = new ContentView ('#today-category-template');
			this.graphsView = new ContentView('#graphs-template');
		},
		
		routes: {
			"": "today", 
			"today": "today", //reads the URL, and then call the function
			"today-category": "todayCategory",
			"category": "category",
			"graphs": "graphs",
		},
		
		currentView: null,

		switchView: function(view) {
			if (this.currentView) {
				// Detach the old view
				this.currentView.remove();
			}

			// Move the view element into the DOM (replacing the old content)
			this.el.html(view.el);

			// Render view after it is in the DOM (styles are applied)
			view.render();

			this.currentView = view;
		},
		
		/*
		 * Change the active element in the topbar 
		 */
		setActiveEntry: function(url) {
			// Unmark all entries
			$('footer .nav li').removeClass('active');

			// Mark active entry
			$("footer .nav li a[href='" + url + "']").parents('li').addClass('active');
		},
		
		today: function() {
			this.switchView(this.todayView); //load the HTML to the page
			this.setActiveEntry('#today'); //add active class to nav bar
		},
		
		todayCategory: function() {
			this.switchView(this.todayCategoryView);
			this.setActiveEntry('#today');
		},
		
		category: function() {
			this.switchView(this.categoryView);
			this.setActiveEntry('#category');
			app.Activities.fetch();
		},
		
		graphs: function() {
			this.switchView(this.graphsView);
			this.setActiveEntry('#graphs');		}
	});

		
		//load all views
		
		//new app.TodayView();
		//	new app.TodayCategoryView();
		//new app.GraphsView();
		new app.CategoryView();

	    var router = new ApplicationRouter($('#content'));
        Backbone.history.start();


});
