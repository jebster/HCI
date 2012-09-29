//ROUTING VIEWS ONE FILE
$(function( $ ) {

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
			
			this.loginView = new ContentView('#login-template');
			this.categoryView = new ContentView('#category-template');
			this.todayView = new ContentView('#today-template');
			this.todayCategoryView = new ContentView ('#today-category-template');
			this.todaySummaryView = new ContentView ('#today-summary-template');
			this.graphsView = new ContentView('#graphs-template');
			this.singleDayView = new ContentView('#single-day-template');
			this.activitiesMetricsView = new ContentView('#activities-metrics-template');
		},
		
		routes: {
			"": "login",
			"today": "today", //reads the URL, and then call the function
				"today-category": "todayCategory",
				"today-summary": "todaySummary",
			"category": "category",
			"graphs": "graphs",
				"single-day": "singleDay",
				"activities-metrics": "activitiesMetrics"

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
			$('footer .nav li').removeClass('footer-active');

			// Mark active entry
			$("footer .nav li a[href='" + url + "']").parents('li').addClass('footer-active');
		},

		//Navigate Graphs view with "Weekly View" and "Activities View"
		setActiveEntryGraphs: function(url) {

			$('.btn-group a').removeClass('active');

			$(".btn-group a[href='" + url + "']").addClass('active');
		},

		login: function() {
			this.switchView(this.loginView);
		},
		
		today: function(edit) {

			edit = typeof edit !== 'undefined' ? edit : false;

            var getToday = app.pullToday();

			if(!edit && getToday) {
				this.todaySummary();
				new app.todaySummaryView();
			} else {
				this.switchView(this.todayView); //load the HTML to the page
				this.setActiveEntry('#today'); //add active class to nav bar
			}

			//Initiatlize Slider
			$( "#slider" ).slider({
				value: 0,
				min: 0.0,
				max: 10.0,
				step: 0.5,

				slide: function( event, ui ) {
					$( "#happiness-score" ).val( ui.value );
				}
			});

			$( "#happiness-score" ).val( $( "#slider" ).slider( "value" ) );			
		},
		
		todayCategory: function() {

			//track latest session

			$('#btn-back-today').css('display','block');

			this.switchView(this.todayCategoryView);
			this.setActiveEntry('#today');

			app.Activities.fetch();

			
		},

		todaySummary: function() {
			//track latest session

            app.Activities.fetch();

			$('.btn').click(function(){
				$('#today-li').attr("href", "#today");
			});

			this.switchView(this.todaySummaryView);

			this.setActiveEntry('#today');

		},
		
		category: function() {
			this.switchView(this.categoryView);
			this.setActiveEntry('#category');
			app.Activities.fetch();
		},
		
		graphs: function() {
			this.switchView(this.graphsView);
			this.setActiveEntry('#graphs');	

		},

		singleDay: function() {
			$('#btn-back-graphs').css('display','block');
			this.switchView(this.singleDayView);
			this.setActiveEntryGraphs('#graphs');	

		},

		activitiesMetrics: function() {
			this.switchView(this.activitiesMetricsView);
			this.setActiveEntryGraphs('#activities-metrics');	
		}

	});

		//load all views
		
		//new app.TodayView();
		//	new app.TodayCategoryView();
		//new app.GraphsView();
		

	    app.router = new ApplicationRouter($('#content'));
        Backbone.history.start();

});
