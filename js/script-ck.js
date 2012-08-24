/* Author: 

*/// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.
// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){$("footer .nav li").click(function(){$("#container").find(".cat-display").removeClass("cat-display");$("footer .nav").find(".active").removeClass("active");$(this).addClass("active");var e=$(this).index();switch(e){case 1:$("#graphs").addClass("cat-display");break;case 2:$("#category").addClass("cat-display");break;default:$("#today").addClass("cat-display")}})});