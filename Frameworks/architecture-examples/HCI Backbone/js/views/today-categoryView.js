var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.todayCategoryView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click #submit-today': 'submitToday',
			'click .checkbox input': 'selectInput',
			'click #today-category .btn-back' : 'backEmoticons'
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
            if (app.Activities.length == 0) {
                $("#submit-today").hide();
                $("#submit-today-empty").show();
            } else {
                $("#submit-today").show();
                $("#submit-today-empty").hide();
            }
			app.Activities.each( this.addOne, this ); //latter this = an activity model, get it from Database
		},

		// Add a single todo item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function( activity ) { //activity = an activity model
		    if (activity.id) {
			    var view = new app.ActivityStaticView({ model: activity }); //model is a random variable
			    $('#today-category ul').append( view.render().el );
			}
		},

		selectInput: function() {
			$('#today-category input:checked').each(function(){
				$(this).parent().parent().addClass('input-selected');
			});

			$('#today-category input:not(:checked)').each(function(){
				$(this).parent().parent().removeClass('input-selected');
			});
		},

		submitToday: function() {
			var todayActivities = []; //an array of today's activities ID

			//relative to get happinessScore
			var me = this;

			//get all the checked input
			$('#today-category input:checked').each(function(){
				var currentActivity = $(this).val(); //store the ID of activities

				todayActivities.push(currentActivity); //stores ID ONLY
			});

			var happinessScore = me.options.happinessScore;


			// UPdate data from past day ====
			var pastDay = typeof this.options.pastDay !== 'undefined' ? this.options.pastDay : false;

			if (pastDay) {
				var getPastDay = app.pullDay(pastDay.get('date'));
				console.log(pastDay.get('date'));
				getPastDay.save( { activities: todayActivities, feelings: happinessScore},
					{
						success: function(model, response) { //upon creation...
							//app.Days.fetch(); //Days collection will sync everything between local and server
							//** call today Summary View, call from previous views

							setTimeout(function() {
								new app.SingleDayView( { model: model } );
								app.router.singleDay();
								delete app.todayHappinessViewVar.options.pastDay;
							}, 100);

						}
					}
				);
				//reset the past data action
				return;
			}
			//=======


			var todayGot = app.pullToday();

			if (todayGot) {

				todayGot.save( { activities: todayActivities, feelings: happinessScore},
					{
						success: function(model, response) { //upon creation...
							app.Days.fetch(); //Days collection will sync everything between local and server
							//** call today Summary View, call from previous views

							new app.todaySummaryView();

						}
					}
				);

			} else {
				
				app.Days.create( //a new model Day is created by the Days collection
					
					{ activities: todayActivities, feelings: happinessScore, date: app.returnTodayDate() }, //this model stores activity list as their IDs
					{
						success: function(model, response) { //upon creation...
							app.Days.fetch(); //Days collection will sync everything between local and server
							//** call today Summary View, call from previous views

							new app.todaySummaryView();

						}
					}
				); //throw a bunch of ids (pointer to activities) into the activities array attribute in one DAY

			}

			var todayActivitiesJSON;
		},

		loadExisting: function(new_activities) {

			setTimeout(function(){
				for (var index in new_activities) {
					var activityID = new_activities[index];

					if (!$("#today-category li input[value=" + activityID + "]").is(":checked")) {
						$("#today-category li input[value=" + activityID + "]").attr("checked", "checked").parent().parent().addClass("input-selected");
					}
				}
				
			}, 100);

		},

		backEmoticons: function() {
			app.router.today(true, this.options.happinessScore);
		},


	});

	

});
