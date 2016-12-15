if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function($){"use strict";var t=$.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1==t[0]&&9==t[1]&&t[2]<1||t[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function($){"use strict";function t(t){var e=t.attr("data-target");e||(e=t.attr("href"),e=e&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var n=e&&$(e);return n&&n.length?n:t.parent()}function e(e){e&&3===e.which||($(a).remove(),$(i).each(function(){var n=$(this),a=t(n),i={relatedTarget:this};a.hasClass("open")&&(e&&"click"==e.type&&/input|textarea/i.test(e.target.tagName)&&$.contains(a[0],e.target)||(a.trigger(e=$.Event("hide.bs.dropdown",i)),e.isDefaultPrevented()||(n.attr("aria-expanded","false"),a.removeClass("open").trigger($.Event("hidden.bs.dropdown",i)))))}))}function n(t){return this.each(function(){var e=$(this),n=e.data("bs.dropdown");n||e.data("bs.dropdown",n=new r(this)),"string"==typeof t&&n[t].call(e)})}var a=".dropdown-backdrop",i='[data-toggle="dropdown"]',r=function(t){$(t).on("click.bs.dropdown",this.toggle)};r.VERSION="3.3.7",r.prototype.toggle=function(n){var a=$(this);if(!a.is(".disabled, :disabled")){var i=t(a),r=i.hasClass("open");if(e(),!r){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&$(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click",e);var s={relatedTarget:this};if(i.trigger(n=$.Event("show.bs.dropdown",s)),n.isDefaultPrevented())return;a.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger($.Event("shown.bs.dropdown",s))}return!1}},r.prototype.keydown=function(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)){var n=$(this);if(e.preventDefault(),e.stopPropagation(),!n.is(".disabled, :disabled")){var a=t(n),r=a.hasClass("open");if(!r&&27!=e.which||r&&27==e.which)return 27==e.which&&a.find(i).trigger("focus"),n.trigger("click");var s=" li:not(.disabled):visible a",o=a.find(".dropdown-menu"+s);if(o.length){var d=o.index(e.target);38==e.which&&d>0&&d--,40==e.which&&d<o.length-1&&d++,~d||(d=0),o.eq(d).trigger("focus")}}}};var s=$.fn.dropdown;$.fn.dropdown=n,$.fn.dropdown.Constructor=r,$.fn.dropdown.noConflict=function(){return $.fn.dropdown=s,this},$(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",i,r.prototype.toggle).on("keydown.bs.dropdown.data-api",i,r.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",r.prototype.keydown)}(jQuery),+function($){"use strict";function t(t){return this.each(function(){var n=$(this),a=n.data("bs.tab");a||n.data("bs.tab",a=new e(this)),"string"==typeof t&&a[t]()})}var e=function(t){this.element=$(t)};e.VERSION="3.3.6",e.TRANSITION_DURATION=150,e.prototype.show=function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),n=t.data("target");if(n||(n=t.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var a=e.find(".active:last a"),i=$.Event("hide.bs.tab",{relatedTarget:t[0]}),r=$.Event("show.bs.tab",{relatedTarget:a[0]});if(a.trigger(i),t.trigger(r),!r.isDefaultPrevented()&&!i.isDefaultPrevented()){var s=$(n);this.activate(t.closest("li"),e),this.activate(s,s.parent(),function(){a.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:a[0]})})}}},e.prototype.activate=function(t,n,a){function i(){r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),a&&a()}var r=n.find("> .active"),s=a&&$.support.transition&&(r.length&&r.hasClass("fade")||!!n.find("> .fade").length);r.length&&s?r.one("bsTransitionEnd",i).emulateTransitionEnd(e.TRANSITION_DURATION):i(),r.removeClass("in")};var n=$.fn.tab;$.fn.tab=t,$.fn.tab.Constructor=e,$.fn.tab.noConflict=function(){return $.fn.tab=n,this};var a=function(e){e.preventDefault(),t.call($(this),"show")};$(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',a).on("click.bs.tab.data-api",'[data-toggle="pill"]',a)}(jQuery),+function($){"use strict";function t(t){var e,n=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"");return $(n)}function e(t){return this.each(function(){var e=$(this),a=e.data("bs.collapse"),i=$.extend({},n.DEFAULTS,e.data(),"object"==typeof t&&t);!a&&i.toggle&&/show|hide/.test(t)&&(i.toggle=!1),a||e.data("bs.collapse",a=new n(this,i)),"string"==typeof t&&a[t]()})}var n=function(t,e){this.$element=$(t),this.options=$.extend({},n.DEFAULTS,e),this.$trigger=$('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};n.VERSION="3.3.6",n.TRANSITION_DURATION=350,n.DEFAULTS={toggle:!0},n.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},n.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,a=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(a&&a.length&&(t=a.data("bs.collapse"),t&&t.transitioning))){var i=$.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){a&&a.length&&(e.call(a,"hide"),t||a.data("bs.collapse",null));var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var s=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!$.support.transition)return s.call(this);var o=$.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",$.proxy(s,this)).emulateTransitionEnd(n.TRANSITION_DURATION)[r](this.$element[0][o])}}}},n.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=$.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var a=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return $.support.transition?void this.$element[e](0).one("bsTransitionEnd",$.proxy(a,this)).emulateTransitionEnd(n.TRANSITION_DURATION):a.call(this)}}},n.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},n.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(e,n){var a=$(n);this.addAriaAndCollapsedClass(t(a),a)},this)).end()},n.prototype.addAriaAndCollapsedClass=function(t,e){var n=t.hasClass("in");t.attr("aria-expanded",n),e.toggleClass("collapsed",!n).attr("aria-expanded",n)};var a=$.fn.collapse;$.fn.collapse=e,$.fn.collapse.Constructor=n,$.fn.collapse.noConflict=function(){return $.fn.collapse=a,this},$(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(n){var a=$(this);a.attr("data-target")||n.preventDefault();var i=t(a),r=i.data("bs.collapse"),s=r?"toggle":a.data();e.call(i,s)})}(jQuery),+function($){"use strict";function t(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in e)if(void 0!==t.style[n])return{end:e[n]};return!1}$.fn.emulateTransitionEnd=function(t){var e=!1,n=this;$(this).one("bsTransitionEnd",function(){e=!0});var a=function(){e||$(n).trigger($.support.transition.end)};return setTimeout(a,t),this},$(function(){$.support.transition=t(),$.support.transition&&($.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(t){if($(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery);