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

		login: function() {

		},

		createAccount: function() {
			
		}


	});

	new app.loginView();

});
