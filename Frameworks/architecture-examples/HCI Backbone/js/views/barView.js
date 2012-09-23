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
			this.render();
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
			this.render();
		},

		render: function() {
			if(this.model) {
				var weekday = this.model.get("date").substring(0, 1);
				var mon_date = app.manipulateDate(this.model.get("date"), 1-weekday);
				var sun_date = app.manipulateDate(this.model.get("date"), 7-weekday);
				this.$el.html( this.template( { 'week_duration':mon_date + ' - ' +sun_date } ) );
				return this;
			} else {
				return false;
			}
		}
	});
	
	app.SingleDayActivityView = Backbone.View.extend({
		
		tagName: 'li',
		
		template: _.template( $('#single-day-activity-template').html() ),
	
		events: {
		
		},
		
		initialize: function() {
		
		},
		
		render: function() {
			if(this.model) {
			console.log(this.model);
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
