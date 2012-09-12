var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.todayCategoryView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click #submit-today': 'submitToday'

		},

		initialize: function() {

			window.app.Activities.on( 'add', this.addAll, this ); //add is triggered by "create"
			window.app.Activities.on( 'reset', this.addAll, this );
			window.app.Activities.on( 'change:completed', this.addAll, this );
			window.app.Activities.on( 'all', this.addAll, this ); //fetch() will trigger this

		},

		// Add all items in the **Todos** collection at once.
		//Purpose is to create a view and inject it into the DOM
		addAll: function() {
			this.$('#today-category ul').html(''); //clear html
			app.Activities.each( this.addOne, this ); //latter this = an activity model, get it from Database

		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( activity ) { //activity = an activity model
			var view = new app.ActivityStaticView({ model: activity }); //model is a random variable
			$('#today-category ul').append( view.render().el );
		},

		submitToday: function() {
			
			var todayActivities = []; //an array of today's activities ID

			//get all the checked input
			$('#today-category input:checked').each(function(){
				var currentActivity = $(this).val(); //store the ID of activities

				todayActivities.push(currentActivity); //stores ID ONLY
			});

			app.Days.create( //a new model Day is created by the Days collection
				{ activities: todayActivities }, //this model stores activity list as their IDs
				{
					success: function(model, response) { //upon creation...
						var new_day_id = model.id; //get today's ID
						app.Days.fetch(); //Days collection will sync everything between local and server
						var new_activities = app.Days.get(new_day_id).attributes.activities; //from all the days, get a specific day using today's ID. And then get the list of activities (their IDs) from today 

						//** call today Summary View
						new app.todaySummaryView({ new_activities: new_activities });

					}
				}
			); //throw a bunch of ids (pointer to activities) into the activities array attribute in one DAY


			var todayActivitiesJSON;
		}
	});

	new app.todayCategoryView();

});
