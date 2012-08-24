(function(){var e,t,n,r,i,s,o,u,a,f,l=Array.prototype.slice,c=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},h=Object.prototype.hasOwnProperty,p=function(e,t){function n(){this.constructor=e}for(var r in t)h.call(t,r)&&(e[r]=t[r]);n.prototype=t.prototype;e.prototype=new n;e.__super__=t.prototype;return e},d=function(e,t){return function(){return e.apply(t,arguments)}};n={bind:function(e,t){var n,r,i,s,o;r=e.split(" ");n=this.hasOwnProperty("_callbacks")&&this._callbacks||(this._callbacks={});s=0;for(o=r.length;s<o;s++)i=r[s],n[i]||(n[i]=[]),n[i].push(t);return this},one:function(e,t){return this.bind(e,function(){this.unbind(e,arguments.callee);return t.apply(this,arguments)})},trigger:function(){var e,t,n,r,i;e=1<=arguments.length?l.call(arguments,0):[];n=e.shift();if(n=this.hasOwnProperty("_callbacks")&&(null!=(t=this._callbacks)?t[n]:void 0)){r=0;for(i=n.length;r<i&&(t=n[r],!1!==t.apply(this,e));r++);return!0}},unbind:function(e,t){var n,r,i,s;if(!e)return this._callbacks={},this;i=null!=(n=this._callbacks)?n[e]:void 0;if(!i)return this;if(!t)return delete this._callbacks[e],this;r=0;for(s=i.length;r<s;r++)if(n=i[r],n===t){i=i.slice();i.splice(r,1);this._callbacks[e]=i;break}return this}};r={trace:!0,logPrefix:"(App)",log:function(){var e;e=1<=arguments.length?l.call(arguments,0):[];if(this.trace)return this.logPrefix&&e.unshift(this.logPrefix),"undefined"!=typeof console&&null!==console&&"function"==typeof console.log&&console.log.apply(console,e),this}};f=["included","extended"];s=function(){function e(){"function"==typeof this.init&&this.init.apply(this,arguments)}e.include=function(e){var t,n,r;if(!e)throw"include(obj) requires obj";for(t in e)n=e[t],0>c.call(f,t)&&(this.prototype[t]=n);null!=(r=e.included)&&r.apply(this);return this};e.extend=function(e){var t,n,r;if(!e)throw"extend(obj) requires obj";for(t in e)n=e[t],0>c.call(f,t)&&(this[t]=n);null!=(r=e.extended)&&r.apply(this);return this};e.proxy=function(e){var t=this;return function(){return e.apply(t,arguments)}};e.prototype.proxy=function(e){var t=this;return function(){return e.apply(t,arguments)}};return e}();i=function(t){function r(e){r.__super__.constructor.apply(this,arguments);e&&this.load(e);this.cid||(this.cid="c-"+this.constructor.uid())}p(r,t);r.extend(n);r.records={};r.crecords={};r.attributes=[];r.configure=function(){var e,t;t=arguments[0];e=2<=arguments.length?l.call(arguments,1):[];this.className=t;this.records={};this.crecords={};e.length&&(this.attributes=e);this.attributes&&(this.attributes=a(this.attributes));this.attributes||(this.attributes=[]);this.unbind();return this};r.toString=function(){return""+this.className+"("+this.attributes.join(", ")+")"};r.find=function(e){var t;t=this.records[e];if(!t&&(""+e).match(/c-\d+/))return this.findCID(e);if(!t)throw"Unknown record";return t.clone()};r.findCID=function(e){e=this.crecords[e];if(!e)throw"Unknown record";return e.clone()};r.exists=function(e){try{return this.find(e)}catch(t){return!1}};r.refresh=function(e,t){var n,r,i,s;null==t&&(t={});t.clear&&(this.records={},this.crecords={});r=this.fromJSON(e);u(r)||(r=[r]);i=0;for(s=r.length;i<s;i++)n=r[i],n.id||(n.id=n.cid),this.records[n.id]=n,this.crecords[n.cid]=n;this.trigger("refresh",!t.clear&&this.cloneArray(r));return this};r.select=function(e){var t,n,r,i;r=this.records;i=[];for(t in r)n=r[t],e(n)&&i.push(n);return this.cloneArray(i)};r.findByAttribute=function(e,t){var n,r,i;i=this.records;for(n in i)if(r=i[n],r[e]===t)return r.clone();return null};r.findAllByAttribute=function(e,t){return this.select(function(n){return n[e]===t})};r.each=function(e){var t,n,r,i;r=this.records;i=[];for(t in r)n=r[t],i.push(e(n.clone()));return i};r.all=function(){return this.cloneArray(this.recordsValues())};r.first=function(){var e;e=this.recordsValues()[0];return null!=e?e.clone():void 0};r.last=function(){var e;e=this.recordsValues();e=e[e.length-1];return null!=e?e.clone():void 0};r.count=function(){return this.recordsValues().length};r.deleteAll=function(){var e,t,n;t=this.records;n=[];for(e in t)n.push(delete this.records[e]);return n};r.destroyAll=function(){var e,t,n;t=this.records;n=[];for(e in t)n.push(this.records[e].destroy());return n};r.update=function(e,t,n){return this.find(e).updateAttributes(t,n)};r.create=function(e,t){return(new this(e)).save(t)};r.destroy=function(e,t){return this.find(e).destroy(t)};r.change=function(e){return"function"==typeof e?this.bind("change",e):this.trigger("change",e)};r.fetch=function(e){return"function"==typeof e?this.bind("fetch",e):this.trigger("fetch",e)};r.toJSON=function(){return this.recordsValues()};r.fromJSON=function(e){var t,n,r,i;if(e){"string"==typeof e&&(e=JSON.parse(e));if(u(e)){i=[];n=0;for(r=e.length;n<r;n++)t=e[n],i.push(new this(t));return i}return new this(e)}};r.fromForm=function(){var e;return(e=new this).fromForm.apply(e,arguments)};r.recordsValues=function(){var e,t,n,r;t=[];r=this.records;for(e in r)n=r[e],t.push(n);return t};r.cloneArray=function(e){var t,n,r,i;i=[];n=0;for(r=e.length;n<r;n++)t=e[n],i.push(t.clone());return i};r.idCounter=0;r.uid=function(){return this.idCounter++};r.prototype.isNew=function(){return!this.exists()};r.prototype.isValid=function(){return!this.validate()};r.prototype.validate=function(){};r.prototype.load=function(e){var t,n;for(t in e)(n=e[t],"function"==typeof this[t])?this[t](n):this[t]=n;return this};r.prototype.attributes=function(){var e,t,n,r,i;t={};i=this.constructor.attributes;n=0;for(r=i.length;n<r;n++)e=i[n],e in this&&(t[e]="function"==typeof this[e]?this[e]():this[e]);this.id&&(t.id=this.id);return t};r.prototype.eql=function(e){return!(!e||e.constructor!==this.constructor||e.id!==this.id&&e.cid!==this.cid)};r.prototype.save=function(e){var t;null==e&&(e={});if(!1!==e.validate&&(t=this.validate()))return this.trigger("error",t),!1;this.trigger("beforeSave",e);t=this.isNew()?this.create(e):this.update(e);this.trigger("save",e);return t};r.prototype.updateAttribute=function(e,t){this[e]=t;return this.save()};r.prototype.updateAttributes=function(e,t){this.load(e);return this.save(t)};r.prototype.changeID=function(e){var t;t=this.constructor.records;t[e]=t[this.id];delete t[this.id];this.id=e;return this.save()};r.prototype.destroy=function(e){null==e&&(e={});this.trigger("beforeDestroy",e);delete this.constructor.records[this.id];delete this.constructor.crecords[this.cid];this.destroyed=!0;this.trigger("destroy",e);this.trigger("change","destroy",e);this.unbind();return this};r.prototype.dup=function(e){var t;t=new this.constructor(this.attributes());!1===e?t.cid=this.cid:delete t.id;return t};r.prototype.clone=function(){return Object.create(this)};r.prototype.reload=function(){var e;if(this.isNew())return this;e=this.constructor.find(this.id);this.load(e.attributes());return e};r.prototype.toJSON=function(){return this.attributes()};r.prototype.toString=function(){return"<"+this.constructor.className+" ("+JSON.stringify(this)+")>"};r.prototype.fromForm=function(t){var n,r,i,s;n={};s=e(t).serializeArray();r=0;for(i=s.length;r<i;r++)t=s[r],n[t.name]=t.value;return this.load(n)};r.prototype.exists=function(){return this.id&&this.id in this.constructor.records};r.prototype.update=function(e){var t;this.trigger("beforeUpdate",e);t=this.constructor.records;t[this.id].load(this.attributes());t=t[this.id].clone();t.trigger("update",e);t.trigger("change","update",e);return t};r.prototype.create=function(e){var t;this.trigger("beforeCreate",e);this.id||(this.id=this.cid);t=this.dup(!1);this.constructor.records[this.id]=t;this.constructor.crecords[this.cid]=t;t=t.clone();t.trigger("create",e);t.trigger("change","create",e);return t};r.prototype.bind=function(e,t){var n,r,i=this;this.constructor.bind(e,n=function(e){if(e&&i.eql(e))return t.apply(i,arguments)});this.constructor.bind("unbind",r=function(t){if(t&&i.eql(t))return i.constructor.unbind(e,n),i.constructor.unbind("unbind",r)});return n};r.prototype.one=function(e,t){var n,r=this;return n=this.bind(e,function(){r.constructor.unbind(e,n);return t.apply(r)})};r.prototype.trigger=function(){var e,t;e=1<=arguments.length?l.call(arguments,0):[];e.splice(1,0,this);return(t=this.constructor).trigger.apply(t,e)};r.prototype.unbind=function(){return this.trigger("unbind")};return r}(s);t=function(t){function i(t){this.release=d(this.release,this);var n,r,s;s=this.options=t;for(n in s)r=s[n],this[n]=r;this.el||(this.el=document.createElement(this.tag));this.el=e(this.el);this.className&&this.el.addClass(this.className);this.attributes&&this.el.attr(this.attributes);this.release(function(){return this.el.remove()});this.events||(this.events=this.constructor.events);this.elements||(this.elements=this.constructor.elements);this.events&&this.delegateEvents();this.elements&&this.refreshElements();i.__super__.constructor.apply(this,arguments)}p(i,t);i.include(n);i.include(r);i.prototype.eventSplitter=/^(\S+)\s*(.*)$/;i.prototype.tag="div";i.prototype.release=function(e){return"function"==typeof e?this.bind("release",e):this.trigger("release")};i.prototype.$=function(t){return e(t,this.el)};i.prototype.delegateEvents=function(){var e,t,n,r,i,s;i=this.events;s=[];for(t in i)r=i[t],"function"!=typeof r&&(r=this.proxy(this[r])),n=t.match(this.eventSplitter),e=n[1],n=n[2],""===n?s.push(this.el.bind(e,r)):s.push(this.el.delegate(n,e,r));return s};i.prototype.refreshElements=function(){var e,t,n,r;n=this.elements;r=[];for(e in n)t=n[e],r.push(this[t]=this.$(e));return r};i.prototype.delay=function(e,t){return setTimeout(this.proxy(e),t||0)};i.prototype.html=function(e){this.el.html(e.el||e);this.refreshElements();return this.el};i.prototype.append=function(){var e,t,n;t=1<=arguments.length?l.call(arguments,0):[];var r,i,s;s=[];r=0;for(i=t.length;r<i;r++)e=t[r],s.push(e.el||e);(n=this.el).append.apply(n,s);this.refreshElements();return this.el};i.prototype.appendTo=function(e){this.el.appendTo(e.el||e);this.refreshElements();return this.el};i.prototype.prepend=function(){var e,t,n;t=1<=arguments.length?l.call(arguments,0):[];var r,i,s;s=[];r=0;for(i=t.length;r<i;r++)e=t[r],s.push(e.el||e);(n=this.el).prepend.apply(n,s);this.refreshElements();return this.el};i.prototype.replace=function(t){var n;n=[this.el,e(t.el||t)];t=n[0];this.el=n[1];t.replaceWith(this.el);this.delegateEvents();this.refreshElements();return this.el};return i}(s);e=("undefined"!=typeof window&&null!==window?window.jQuery:void 0)||("undefined"!=typeof window&&null!==window?window.Zepto:void 0)||function(e){return e};"function"!=typeof Object.create&&(Object.create=function(e){var t;t=function(){};t.prototype=e;return new t});u=function(e){return Object.prototype.toString.call(e)==="[object Array]"};a=function(e){return Array.prototype.slice.call(e,0)};o=this.Spine={};"undefined"!=typeof module&&null!==module&&(module.exports=o);o.version="1.0.6";o.isArray=u;o.isBlank=function(e){var t;if(!e)return!0;for(t in e)return!1;return!0};o.$=e;o.Events=n;o.Log=r;o.Module=s;o.Controller=t;o.Model=i;s.extend.call(o,n);s.create=s.sub=t.create=t.sub=i.sub=function(e,t){var n;n=function(e){function t(){t.__super__.constructor.apply(this,arguments)}p(t,e);return t}(this);e&&n.include(e);t&&n.extend(t);typeof n.unbind=="function"&&n.unbind();return n};i.setup=function(e,t){var n;t==null&&(t=[]);n=function(e){function t(){t.__super__.constructor.apply(this,arguments)}p(t,e);return t}(this);n.configure.apply(n,[e].concat(l.call(t)));return n};s.init=t.init=i.init=function(e,t,n,r,i){return new this(e,t,n,r,i)};o.Class=s}).call(this);