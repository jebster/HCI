// Generated by CoffeeScript 1.3.3
(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}},t={}.hasOwnProperty,n=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);i.prototype=n.prototype;e.prototype=new i;e.__super__=n.prototype;return e};window.Todos=function(t){function s(){this.render=e(this.render,this);s.__super__.constructor.apply(this,arguments);this.todo.bind("update",this.render);this.todo.bind("destroy",this.release)}var r,i;n(s,t);r=13;i=Handlebars.compile($("#todo-template").html());s.prototype.elements={".edit":"editElem"};s.prototype.events={"click    .destroy":"remove","click    .toggle":"toggleStatus","dblclick label":"edit","keyup    .edit":"finishEditOnEnter","blur     .edit":"finishEdit"};s.prototype.render=function(){this.replace(i(this.todo));return this};s.prototype.remove=function(){return this.todo.destroy()};s.prototype.toggleStatus=function(){return this.todo.updateAttribute("completed",!this.todo.completed)};s.prototype.edit=function(){this.el.addClass("editing");return this.editElem.focus()};s.prototype.finishEdit=function(){var e;this.el.removeClass("editing");e=$.trim(this.editElem.val());return e?this.todo.updateAttribute("title",e):this.remove()};s.prototype.finishEditOnEnter=function(e){if(e.which===r)return this.finishEdit()};return s}(Spine.Controller)}).call(this);