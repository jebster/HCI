define("app/views/filters",["text!app/templates/filters.html","ember"],function(e){return Ember.View.extend({template:Ember.Handlebars.compile(e),filterBinding:"controller.namespace.entriesController.filterBy",isAll:function(){return Ember.empty(this.get("filter"))}.property("filter"),isActive:function(){return this.get("filter")==="active"}.property("filter"),isCompleted:function(){return this.get("filter")==="completed"}.property("filter")})});