//builtTue 02 Dec 2014 10:24:40
(function() {function f(a,c,b){return a.call.apply(a.bind,arguments)}function g(a,c,b){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(b,d);return a.apply(c,b)}}return function(){return a.apply(c,arguments)}}function m(a,c,b){m=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?f:g;return m.apply(null,arguments)}var n=Date.now||function(){return+new Date};var p={eurusd:{id:"eurusd",c:1.25,b:1.25},gbpusd:{id:"gbpusd",c:1.57,b:1.57},eurgbp:{id:"eurgbp",c:.79,b:.79}};function q(a,c){var b;(b=c in a)&&delete a[c];return b};function r(){this.a={}}r.prototype.start=function(a){if(!this.a[a]){a=this.a[a]={id:a};var c=a.f=m(this.g,this,a);a.e=window.setTimeout(c,1E3*Math.random())}};r.prototype.stop=function(a){var c=this.a[a];a=q(this.a,a);c&&a&&window.clearTimeout(c.e)};
r.prototype.g=function(a){var c=n(),b=p[a.id];if(b){var d=b.c*(1+(1-2*Math.random())*Math.random()/1E4),e=b.b*(1+(1-2*Math.random())*Math.random()/1E4),h=void 0,k=void 0,l=Math.min(d,e),d=Math.max(d,e);.6>Math.random()&&(h=l,b.c=h);if(.5>Math.random()||b.c>b.b||void 0===h)k=d,b.b=k;b=b.id;(l=this.h.a[b])&&l.call(null,{id:b,time:c,bid:""+h,ask:""+k});a.e=window.setTimeout(a.f,1E3*Math.random())}else console.error("### no stream available for %o",a.id)};function s(){this.d=new r;this.d.h=this;this.a={}}var t;function u(){t||(t=new s);return t}window.subscribeToMarket=function(a,c,b){var d=u(),e=d.a[a];b&&(c=m(c,b));d.a[a]=c;e||d.d.start(a,d)};window.unsubscribeFromMarket=function(a){var c=u(),b=c.a[a],d=q(c.a,a);b&&d&&c.d.stop(a)};
})();