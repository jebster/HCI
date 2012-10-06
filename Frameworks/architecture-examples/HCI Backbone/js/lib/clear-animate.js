(function($)
{
    var translate = function(x, y)
    {
        return {
            "transform" : "translate(" + x + "px," + y + "px)",
            "-moz-transform" : "translate(" + x + "px," + y + "px)",
            "-webkit-transform" : "translate3d(" + x + "px," + y + "px,0)"
        };
    };

    var clearTranslate = function()
    {
        return {
            "transform" : "",
            "-moz-transform" : "",
            "-webkit-transform" : ""
        };
    };

    var animate = function(duration)
    {
        if (duration === undefined)
            duration = "250ms";

        return {
            "transition" : "transform ease-out " + duration,
            "-moz-transition" : "-moz-transform ease-out " + duration,
            "-webkit-transition" : "-webkit-transform ease-out " + duration
        };
    };

    var clearAnimate = function()
    {
        return {
            "transition" : "",
            "-moz-transition" : "",
            "-webkit-transition" : ""
        };
    };

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

    $.widget("ui.clearAnimateItem", {
        options : {
            startPoint : null
        },

        startPoint : function(startPoint)
        {
            if (startPoint === undefined)
                return this.options.startPoint;

            this.options.startPoint = startPoint;
        },

        clearAnimate : function()
        {
            this.element.css(clearAnimate());
        },

        clearTranslate : function()
        {
            this.element.css(clearTranslate());
        },

        swipeMove : function(evt)
        {
            var c = coords(evt),
                dx = c.x - this.startPoint().x,
                dy = c.y - this.startPoint().y;

            if (dx > 0)
            {
                this.moveBack();
            }
            else
            {
                this.element.css(translate(dx, 0));
                evt.preventDefault();
            }
        },

        swipeEnd : function(evt)
        {
            var c = coords(evt),
                dx = c.x - this.startPoint().x,
                dy = c.y - this.startPoint().y,
                itemWidth = parseInt(this.element.css("width"));

            var completeMove = false;

            if (Math.abs(dx) > itemWidth/2)
            {
                this.element.css(animate()).css(translate(-itemWidth*2, 0));

                completeMove = true;
            }

            if (completeMove)
            {
                var me = this;
                setTimeout(function() {
                    me.element.find(".destroy").trigger("click");
                }, 200);

                this.element.off(moveEvent);
                this.element.off(endEvent);
            }
            else
            {
                this.moveBack();
            }
        },

        moveBack : function()
        {
            this.element.css(animate());
            this.element.css(clearTranslate());
            this.element.off(moveEvent);
            this.element.off(endEvent);
        }
    });
})(jQuery);
