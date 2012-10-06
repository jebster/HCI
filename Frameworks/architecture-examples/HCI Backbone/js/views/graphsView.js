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
		},
		
		showPrev: function(e) {
			this.date = app.manipulateDate(this.date, -7);
			this.showWeekData(this.date);
			this.checkData();
		},
		
		showNext: function(e) {
			this.date = app.manipulateDate(this.date, 7);
			this.showWeekData(this.date);
			this.checkData();
		},

		checkData: function() {

			if($('.bar-chart').find('li').length == 0) {
				$('#graphs h1').css('display', 'block');
			} else {
				$('#graphs h1').css('display', 'none');
				console.log('cleared');
			}
		},
	
		
		showWeekData: function(date) {
			var mon = 1, sun = 7;
			var weekday = parseInt(date.substr(0, 1));
			
			$('#graphs ul').html('');
			for(var i = mon-weekday; i<0; i++) {			
				var new_date = app.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				if(day) {
					var view = new app.BarView( { model: day } );
					$('#graphs ul.bar-chart').append( view.render().el);
				}
			}
			for(var i = 0; i<= sun-weekday; i++) {
				var new_date = app.manipulateDate(date, i);
				var day = app.pullDay(new_date);
				if(day) {
					var view = new app.BarView( { model: day } );
					console.log(view.render().el);
					$('#graphs ul.bar-chart').append( view.render().el);
				}
			}

			var day = new app.Day( { date: date } );
			var controlView = new app.weekControlView( { model: day } );
			$('#graphs section').html(controlView.render().el);
		}


	});

	app.graphsView = new app.GraphsView()
});
