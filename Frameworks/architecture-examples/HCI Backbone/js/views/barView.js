var app = app || {};

$(function() {
	'use strict';
	
	app.BarView = Backbone.View.extend({

		tagName: 'li',
		
		template: _.template( $('#bar-template').html() ),

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
				this.$el.attr('id', id).attr('style', 'height:'+height+'px').html( this.template( {'weekday':weekday, 'feelings':feelings } ) );
				return this;
			} else {
				return false;
			}
		}
	});
});
