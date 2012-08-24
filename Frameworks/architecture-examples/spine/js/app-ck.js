// Generated by CoffeeScript 1.3.3
(function(){var e,t=function(e,t){return function(){return e.apply(t,arguments)}},n={}.hasOwnProperty,r=function(e,t){function i(){this.constructor=e}for(var r in t)n.call(t,r)&&(e[r]=t[r]);i.prototype=t.prototype;e.prototype=new i;e.__super__=t.prototype;return e};e=function(e){function i(){this.renderFooter=t(this.renderFooter,this);this.toggleElems=t(this.toggleElems,this);this.addAll=t(this.addAll,this);this.addNew=t(this.addNew,this);i.__super__.constructor.apply(this,arguments);Todo.bind("create",this.addNew);Todo.bind("refresh change",this.addAll);Todo.bind("refresh change",this.toggleElems);Todo.bind("refresh change",this.renderFooter);Todo.fetch();this.routes({"/:filter":function(e){this.filter=e.filter;Todo.trigger("refresh");return this.filters.removeClass("selected").filter("[href='#/"+this.filter+"']").addClass("selected")}})}var n;r(i,e);n=13;i.prototype.elements={"#new-todo":"newTodoInput","#toggle-all":"toggleAllElem","#main":"main","#todo-list":"todos","#footer":"footer","#todo-count":"count","#filters a":"filters","#clear-completed":"clearCompleted"};i.prototype.events={"keyup #new-todo":"new","click #toggle-all":"toggleAll","click #clear-completed":"clearCompleted"};i.prototype["new"]=function(e){var t;t=$.trim(this.newTodoInput.val());if(e.which===n&&t){Todo.create({title:t});return this.newTodoInput.val("")}};i.prototype.getByFilter=function(){switch(this.filter){case"active":return Todo.active();case"completed":return Todo.completed();default:return Todo.all()}};i.prototype.addNew=function(e){var t;t=new Todos({todo:e});return this.todos.append(t.render().el)};i.prototype.addAll=function(){var e,t,n,r,i;this.todos.empty();r=this.getByFilter();i=[];for(t=0,n=r.length;t<n;t++){e=r[t];i.push(this.addNew(e))}return i};i.prototype.toggleAll=function(e){return Todo.each(function(t){t.updateAttribute("completed",e.target.checked);return t.trigger("update",t)})};i.prototype.clearCompleted=function(){return Todo.destroyCompleted()};i.prototype.toggleElems=function(){var e;e=!!Todo.count();this.main.toggle(e);this.footer.toggle(e);this.clearCompleted.toggle(!!Todo.completed().length);if(!Todo.completed().length)return this.toggleAllElem.removeAttr("checked")};i.prototype.renderFooter=function(){var e,t,n;n=function(e){return e===1?"item":"items"};e=Todo.active().length;t=Todo.completed().length;this.count.html("<b>"+e+"</b> "+n(e)+" left");return this.clearCompleted.text("Clear completed ("+t+")")};return i}(Spine.Controller);$(function(){new e({el:$("#todoapp")});return Spine.Route.setup()})}).call(this);