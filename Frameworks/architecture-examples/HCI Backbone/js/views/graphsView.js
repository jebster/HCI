var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.GraphsView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click button.left': 'showPrev',
			'click button.right': 'showNext',
		},

		initialize: function() {
			this.date = app.returnTodayDate();
			this.render();
		},
		
		render: function() {
			this.showWeekData(this.date);
		},
		
		showPrev: function(e) {
			console.log("button left clicked!");
			this.date = this.manipulateDate(this.date, -7);
			this.showWeekData(this.date);
		},
		
		showNext: function(e) {
			console.log("button right clicked!");
			this.date = this.manipulateDate(this.date, 7);
			this.showWeekData(this.date);
		},
		
		showWeekData: function(date) {
			var mon = 1, sun = 7;
			var weekday = parseInt(date.substr(0, 1));
			
			$('#graphs ul').html('');
/*			for(var i = mon-weekday; i<0; i++) {			
				var new_date = this.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				var view = new app.BarView( { model: day } );
				$('#graphs ul.bar-chart').append( view.render());
			}
			for(var i = 0; i<= sun-weekday; i++) {
				var new_date = this.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				var view = new app.BarView( { model: day } );
				console.log(view.model);
				$('#graphs ul.bar-chart').append( view.render());
			}*/
			for(var i=0; i<7; i++) {
				var day = app.pullToday();
				var view = new app.BarView( { model: day } );
				$('#graphs ul').append( view.render().el);
			}
		},

		manipulateDate: function(date, count) {
			var parts = date.split('.');
			var old_date = new Date((parts[3])+"/"+parseInt(parts[2])+"/"+parseInt(parts[1]));
			var new_date = new Date(old_date.getTime() + count * 24 * 60 * 60 * 1000);
			return app.formatDate(new_date);
		}


	});

	app.graphsView = new app.GraphsView()
});
