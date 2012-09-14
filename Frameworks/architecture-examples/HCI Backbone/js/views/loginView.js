var app = app || {};
var ENTER_KEY = 13;

$(function( $ ) {
	'use strict';

	//Display the list out as #today-category
	app.loginView = Backbone.View.extend({

		//template: _.template( $('#today-category-template').html() ),

		el: '#content',

		events: {
			'click #login-btn': 'login',
			'click #create-acc': 'createAccount'

		},

		initialize: function() {

		},

		displayLogout: function() {
			$('.btn-login').css('display', 'block');
		},

		login: function() {
			this.displayLogout();
		},

		createAccount: function() {

			var email = $('#email').val();
			var password = $('#password').val();

			var user = new Parse.User();
			user.set("username", email);
			user.set("password", password);
			 
			user.signUp(null, {

			  success: function(user) {
			    // Hooray! Let them use the app now.

			    $('#login form').css('display','none');
			    $('#login-succ').css('display','block');

			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
			  }
			});


		}




	});

	new app.loginView();

});
