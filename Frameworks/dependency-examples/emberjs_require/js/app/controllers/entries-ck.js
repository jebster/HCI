define("app/controllers/entries",["ember"],function(){return Ember.ArrayProxy.extend({store:null,content:[],createNew:function(e){if(!e.trim())return;var t=this.get("store").createFromTitle(e);this.pushObject(t)},pushObject:function(e,t){t||this.get("store").create(e);return this._super(e)},removeObject:function(e){this.get("store").remove(e);return this._super(e)},clearCompleted:function(){this.filterProperty("completed",!0).forEach(this.removeObject,this)},total:function(){return this.get("length")}.property("@each.length"),remaining:function(){return this.filterProperty("completed",!1).get("length")}.property("@each.completed"),completed:function(){return this.filterProperty("completed",!0).get("length")}.property("@each.completed"),noneLeft:function(){return this.get("total")===0}.property("total"),allAreDone:function(e,t){if(t!==undefined){this.setEach("completed",t);return t}return!!this.get("length")&&this.everyProperty("completed",!0)}.property("@each.completed"),init:function(){this._super();var e=this.get("store").findAll();e.get("length")&&this.set("[]",e)}})});