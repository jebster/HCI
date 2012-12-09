var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	app.TodayCategoryView = Backbone.View.extend({

		el: '#content',

		events: {
			'click #submit-today': 'submit',
			'click .checkbox input': 'selectInput',
			'click #today-category .btn-back' : 'backEmoticons'
		},

		initialize: function() {
			window.app.Activities.on( 'add', this.addAll, this );
//			window.app.Activities.on( 'reset', this.addAll, this );
//			window.app.Activities.on( 'change:completed', this.addAll, this );
//			window.app.Activities.on( 'all', this.addAll, this );
				this.addAll();
		},

		addAll: function() {
			this.$('#today-category ul').html('');
			
      if (app.Activities.length == 0) {
          $("#submit-today").hide();
          $("#submit-today-empty").show();
      } else {
          $("#submit-today").show();
          $("#submit-today-empty").hide();
      }
			app.Activities.each( this.addOne, this);
		},

		addOne: function( activity ) {
		    if (activity.id) {
			    var view = new app.ActivityStaticView({ model: activity });
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
		
		submit: function() {
			var activities = [];
			var day = this.model;
			
			$('#today-category input:checked').each(function(){
				activities.push($(this).val());
			});


			if (day != null) {
					var happinessScore = day.get("feelings");
					day.set('feelings', happinessScore);
					day.set('activities', activities);
					app.Days.create(day);
					app.todaySummaryView = new app.TodaySummaryView({ model:day });
					app.router.todaySummary( { model:day } );
/*					day.save( { activities: activities, feelings: happinessScore},
						{
							success: function(model, response) {
								setTimeout(function() {
										app.Days.fetch({ success: function(){
												day.set('feelings', happinessScore);
												day.set('activities', activities);
												app.todaySummaryView = new app.TodaySummaryView({ model:day });
												app.router.todaySummary( { model:day } );
											}
										});
								}, 100);
							}
						});
*/			}

//			var todayActivitiesJSON;
		},

/*		submitToday: function() {
			var todayActivities = [];
			var happinessScore = this.model.get('happinessScore');

			$('#today-category input:checked').each(function(){
				var currentActivity = $(this).val();
				todayActivities.push(currentActivity);
			});

			if (this.model) {
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
*/
		loadExisting: function(day) {

			setTimeout(function(){
				var activities = day.get('activities');
				for (var index in activities) {
					var activityID = activities[index];

					if (!$("#today-category li input[value=" + activityID + "]").is(":checked")) {
						$("#today-category li input[value=" + activityID + "]").attr("checked", "checked").parent().parent().addClass("input-selected");
					}
				}
				
			}, 100);

		},

		backEmoticons: function() {
			app.router.today(this.model);
		},
		
	});

	app.todayCategoryView = new app.TodayCategoryView();

});
