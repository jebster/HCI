var app = app || {};

$(function() {
	'use strict';
	
	app.BarView = Backbone.View.extend({

		tagName: 'li',
		
		template: _.template( $('#bar-template').html() ),

		events: {
			'click': 'switchView'
		},

		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 10);
		},

		render: function() {
			if(this.model) {
				var weekday = this.model.get("date").substring(0, 1);
				var id;
				var feelings = this.model.get('feelings');
				var height = feelings * 15;
				switch(weekday) {
					case '1': weekday = 'M'; id = 'mon'; break;
					case '2': weekday = 'T'; id = 'tue'; break;
					case '3': weekday = 'W'; id = 'wed'; break;
					case '4': weekday = 'T'; id = 'thu'; break;
					case '5': weekday = 'F'; id = 'fri'; break;
					case '6': weekday = 'S'; id = 'sat'; break;
					case '0': weekday = 'S'; id = 'sun'; break;
				}
				this.$el.attr('id', id).attr('style', 'height:'+height+'px').html( this.template( {'weekday':weekday, 'feelings':feelings } ) );
				return this;
			} else {
				return false;
			}
		},
		
		switchView: function() {
			new app.SingleDayView( { model: this.model } );
		}
		
	});
	
  app.weekControlView = Backbone.View.extend({

		tagName: 'section',
		
		template: _.template( $('#week-template').html() ),

		events: {
			
		},

		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 10);
		},

		render: function() {
			if(this.model) {
				var weekday = this.model.get("date").substring(0, 1);
				var mon_date = app.manipulateDate(this.model.get("date"), 1-weekday);
				var sun_date = app.manipulateDate(this.model.get("date"), 7-weekday);
				this.$el.html( this.template( { 'week_duration':this.getMonthDate(mon_date) + ' - ' +this.getMonthDate(sun_date) } ) );
				return this;
			} else {
				return false;
			}
		},
		
		getMonthDate: function(formatted_date) {
				var parts = formatted_date.split('.');
				var day = parseInt(parts[1]);
				var month = parseInt(parts[2]);

				switch(month) {
					case 1: month = "Jan"; break;
					case 2: month = "Feb"; break;
					case 3: month = "Mar"; break;
					case 4: month = "Apr"; break;
					case 5: month = "May"; break;
					case 6: month = "Jun"; break;
					case 7: month = "Jul"; break;
					case 8: month = "Aug"; break;
					case 9: month = "Sep"; break;
					case 10: month = "Oct"; break;
					case 11: month = "Nov"; break;
					case 12: month = "Dec"; break;
				}
				
				return month + " " + day;
		}
		
	});
	
	app.SingleDayActivityView = Backbone.View.extend({
		
		tagName: 'li',
		
		template: _.template( $('#single-day-activity-template').html() ),
	
		events: {
		
		},
		
		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 10);
		},
		
		render: function() {
			if(this.model) {
				var title = this.model.get('title');
				this.$el.html( this.template( { 'title': title } ) );
				return this;
			} else return false;
		}
	});
	
	app.BarChartSingleView = Backbone.View.extend({
		
		tagName: 'li',
		
		template: _.template( $('#bar-char-single-template').html() ),
	
		events: {
		
		},
		
		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 10);
		},
		
		render: function() {
			if(this.model) {
				var weekday = this.model.get("date").substring(0, 1);
				var id;
				var feelings = this.model.get('feelings');
				var height = feelings * 15;
				switch(weekday) {
					case '1': weekday = 'M'; id = 'mon'; break;
					case '2': weekday = 'T'; id = 'tue'; break;
					case '3': weekday = 'W'; id = 'wed'; break;
					case '4': weekday = 'T'; id = 'thu'; break;
					case '5': weekday = 'F'; id = 'fri'; break;
					case '6': weekday = 'S'; id = 'sat'; break;
					case '0': weekday = 'S'; id = 'sun'; break;
				}
				this.$el.attr('id', id).html( this.template( {'weekday':weekday, 'feelings':feelings } ) );
				return this;
			} else {
				return false;
			}
		}
	});
	
	app.MetricView = Backbone.View.extend({
		
		tagName: 'li',
		
		template: _.template( $('#metric-template').html() ),
	
		events: {
		
		},
		
		initialize: function() {
			var _this = this;
			setTimeout(function() {_this.render();}, 10);
		},
		
		render: function() {
			if(this.model) {
				var title = this.model.get('title');
				var feeling = this.model.feeling;
				this.$el.html( this.template( { 'title': title, 'feeling':feeling } ) );
				return this;
			} else return false;
		}
	});
	
});
