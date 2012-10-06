var app = app || {};

    var touch = 'ontouchstart' in document.documentElement;
    var startEvent = touch ? "touchstart" : "mousedown";
    var moveEvent = touch ? "touchmove" : "mousemove";
    var endEvent = touch ? "touchend" : "mouseup";

    var coords = function(evt)
    {
        while (evt.originalEvent)
            evt = evt.originalEvent;

        if (evt.type == "touchend")
        {
            return {
                x : evt.changedTouches[0].screenX,
                y : evt.changedTouches[0].screenY
            };
        }

        if (/^touch/.test(evt.type))
        {
            return {
                x : evt.touches[0].screenX,
                y : evt.touches[0].screenY
            };
        }

        return {
            x : evt.screenX,
            y : evt.screenY
        };
    };

$(function() {
	'use strict';
	
	app.ActivityView = Backbone.View.extend({

		tagName: 'li',

		//model: 'hello' (activity) //Model is equivalent to this.
		//gets model : 
		template: _.template( $('#activity-template').html() ),

		events: {
			'click .destroy': 'clear',
			'dblclick .edit': 'edit',
			'keypress .edit': 'updateOnEnter',
			'blur .edit':	  'close',
            'focus input':    'inputFocus',
            'blur input':     'inputBlur'
		},

		initialize: function() {
            var me = this;
            setTimeout(function() {
                me.$el.clearAnimateItem();
                me.$el.on(startEvent, function(evt) {
                    $(this).clearAnimateItem("startPoint", coords(evt));
                    $(this).clearAnimateItem("clearAnimate");
                    $(this).on(moveEvent, function(evt) {
                        $(this).clearAnimateItem("swipeMove", evt);
                    });
                    $(this).on(endEvent, function(evt) {
                        $(this).clearAnimateItem("swipeEnd", evt);
                    });
                });
            }, 100);
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) ); //model is passed from category.js under addOne(), get it from database to render it to become HTML
			return this;
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function() {
			this.model.destroy();
            this.$el.html("");
			this.render();
		},

		edit: function() {
			this.$('.edit').addClass('editing');
			this.$('.edit').focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close: function() {

			var value = this.$('.edit').val().trim();

			if ( value ) {
				this.model.save({ title: value });
			} else {
				this.clear();
			}

			this.$('.edit').removeClass('editing');
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function( e ) {
			if ( e.which === ENTER_KEY ) {
				this.close();
			}
		},

        inputFocus: function() {
            $("header").css("position", "absolute");
            $("footer").css("position", "absolute");
        },
        inputBlur: function() {
            $("header").css("position", "fixed");
            $("footer").css("position", "fixed");
        }
	});

	//Only renders the html of every single select item (under today-category )
	app.ActivityStaticView = Backbone.View.extend({

		tagName: 'li',

		template: _.template( $('#activity-static-view-template').html() ),

		events: {
		},

		initialize: function() {

		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) ); //model is passed from category.js under addOne(), get it from database to render it to become HTML
			return this;
		},


	});

	app.ActivityTodayView = Backbone.View.extend({


	});


});
