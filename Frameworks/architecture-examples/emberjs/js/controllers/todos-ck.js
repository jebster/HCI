(function(e){"use strict";var t=Ember.Controller.extend({entries:function(){var e=this.getPath("content.filterBy");if(Ember.empty(e))return this.get("content");if(!Ember.compare(e,"completed"))return this.get("content").filterProperty("completed",!0);if(!Ember.compare(e,"active"))return this.get("content").filterProperty("completed",!1)}.property("content.remaining","content.filterBy")});e.TodosController=t})(window.Todos);