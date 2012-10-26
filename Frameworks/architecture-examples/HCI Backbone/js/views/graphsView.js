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
			var _this = this;
			setTimeout(function() {_this.render();}, 10);
		},
		
		render: function() {
			this.showWeekData(this.date);
			this.checkData(this.date);
		},
		
		showPrev: function(e) {
			if($('#graphs button.left').html().indexOf("left.png") != -1) {
				this.date = app.manipulateDate(this.date, -7);
				this.showWeekData(this.date);
				this.checkData(this.date);
			}
		},
		
		showNext: function(e) {
			if($('#graphs button.right').html().indexOf("right.png") != -1) {
				this.date = app.manipulateDate(this.date, 7);
				this.showWeekData(this.date);
				this.checkData(this.date);
			}
		},

		checkData: function(date) {
			var mon = 1, sun = 7;
			var weekday = parseInt(date.substr(0, 1));
			
			for(var i = mon-weekday; i<0; i++) {			
				var new_date = app.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				if(day) {
					$('#graphs h1').css('display', 'none');
					$('#graphs ul.bar-chart').css('display', 'block');
					return;
				}
			}	
			for(var i = 0; i<= sun-weekday; i++) {
				var new_date = app.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				if(day) {
					$('#graphs h1').css('display', 'none');
					$('#graphs ul.bar-chart').css('display', 'block');
					return;
				}
			}	

			$('#graphs h1').css('display', 'block');
			$('#graphs ul.bar-chart').css('display', 'none');
		},
	
		
		showWeekData: function(date) {
			var mon = 1, sun = 7;
			var weekday = parseInt(date.substr(0, 1));
			
			$('#graphs ul').html('');
			for(var i = mon-weekday; i<0; i++) {			
				var new_date = app.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				if(!day) {
					day = new app.Day( { date: new_date, feelings: 10, activities: [] } );
				}
				var view = new app.BarView( { model: day } );
				$('#graphs ul.bar-chart').append(view.render().el);
			}
			
			for(var i = 0; i<= sun-weekday; i++) {
				var new_date = app.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				if(!day) {
					day = new app.Day( { date: new_date, feelings: 10, activities: [] } );
				}
				var view = new app.BarView( { model: day } );
				$('#graphs ul.bar-chart').append(view.render().el);
			}

			var day = new app.Day( { date: date } );
			var controlView = new app.weekControlView( { model: day } );
			$('#graphs .control-unit').html(controlView.render().el);
		}


	});

	app.graphsView = new app.GraphsView()
});
