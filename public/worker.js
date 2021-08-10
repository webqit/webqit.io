!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=8)}([function(t,e,n){t.exports=l,l.Minimatch=f;var r={sep:"/"};try{r=n(3)}catch(t){}var i=l.GLOBSTAR=f.GLOBSTAR={},o=n(5),s={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},a="().*{}+?[]^$\\!".split("").reduce((function(t,e){return t[e]=!0,t}),{});var u=/\/+/;function c(t,e){t=t||{},e=e||{};var n={};return Object.keys(e).forEach((function(t){n[t]=e[t]})),Object.keys(t).forEach((function(e){n[e]=t[e]})),n}function l(t,e,n){if("string"!=typeof e)throw new TypeError("glob pattern string required");return n||(n={}),!(!n.nocomment&&"#"===e.charAt(0))&&(""===e.trim()?""===t:new f(e,n).match(t))}function f(t,e){if(!(this instanceof f))return new f(t,e);if("string"!=typeof t)throw new TypeError("glob pattern string required");e||(e={}),t=t.trim(),"/"!==r.sep&&(t=t.split(r.sep).join("/")),this.options=e,this.set=[],this.pattern=t,this.regexp=null,this.negate=!1,this.comment=!1,this.empty=!1,this.make()}function h(t,e){if(e||(e=this instanceof f?this.options:{}),void 0===(t=void 0===t?this.pattern:t))throw new TypeError("undefined pattern");return e.nobrace||!t.match(/\{.*\}/)?[t]:o(t)}l.filter=function(t,e){return e=e||{},function(n,r,i){return l(n,t,e)}},l.defaults=function(t){if(!t||!Object.keys(t).length)return l;var e=l,n=function(n,r,i){return e.minimatch(n,r,c(t,i))};return n.Minimatch=function(n,r){return new e.Minimatch(n,c(t,r))},n},f.defaults=function(t){return t&&Object.keys(t).length?l.defaults(t).Minimatch:f},f.prototype.debug=function(){},f.prototype.make=function(){if(this._made)return;var t=this.pattern,e=this.options;if(!e.nocomment&&"#"===t.charAt(0))return void(this.comment=!0);if(!t)return void(this.empty=!0);this.parseNegate();var n=this.globSet=this.braceExpand();e.debug&&(this.debug=console.error);this.debug(this.pattern,n),n=this.globParts=n.map((function(t){return t.split(u)})),this.debug(this.pattern,n),n=n.map((function(t,e,n){return t.map(this.parse,this)}),this),this.debug(this.pattern,n),n=n.filter((function(t){return-1===t.indexOf(!1)})),this.debug(this.pattern,n),this.set=n},f.prototype.parseNegate=function(){var t=this.pattern,e=!1,n=this.options,r=0;if(n.nonegate)return;for(var i=0,o=t.length;i<o&&"!"===t.charAt(i);i++)e=!e,r++;r&&(this.pattern=t.substr(r));this.negate=e},l.braceExpand=function(t,e){return h(t,e)},f.prototype.braceExpand=h,f.prototype.parse=function(t,e){if(t.length>65536)throw new TypeError("pattern is too long");var n=this.options;if(!n.noglobstar&&"**"===t)return i;if(""===t)return"";var r,o="",u=!!n.nocase,c=!1,l=[],f=[],h=!1,g=-1,d=-1,m="."===t.charAt(0)?"":n.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",v=this;function y(){if(r){switch(r){case"*":o+="[^/]*?",u=!0;break;case"?":o+="[^/]",u=!0;break;default:o+="\\"+r}v.debug("clearStateChar %j %j",r,o),r=!1}}for(var b,w=0,j=t.length;w<j&&(b=t.charAt(w));w++)if(this.debug("%s\t%s %s %j",t,w,o,b),c&&a[b])o+="\\"+b,c=!1;else switch(b){case"/":return!1;case"\\":y(),c=!0;continue;case"?":case"*":case"+":case"@":case"!":if(this.debug("%s\t%s %s %j <-- stateChar",t,w,o,b),h){this.debug("  in class"),"!"===b&&w===d+1&&(b="^"),o+=b;continue}v.debug("call clearStateChar %j",r),y(),r=b,n.noext&&y();continue;case"(":if(h){o+="(";continue}if(!r){o+="\\(";continue}l.push({type:r,start:w-1,reStart:o.length,open:s[r].open,close:s[r].close}),o+="!"===r?"(?:(?!(?:":"(?:",this.debug("plType %j %j",r,o),r=!1;continue;case")":if(h||!l.length){o+="\\)";continue}y(),u=!0;var _=l.pop();o+=_.close,"!"===_.type&&f.push(_),_.reEnd=o.length;continue;case"|":if(h||!l.length||c){o+="\\|",c=!1;continue}y(),o+="|";continue;case"[":if(y(),h){o+="\\"+b;continue}h=!0,d=w,g=o.length,o+=b;continue;case"]":if(w===d+1||!h){o+="\\"+b,c=!1;continue}if(h){var x=t.substring(d+1,w);try{RegExp("["+x+"]")}catch(t){var A=this.parse(x,p);o=o.substr(0,g)+"\\["+A[0]+"\\]",u=u||A[1],h=!1;continue}}u=!0,h=!1,o+=b;continue;default:y(),c?c=!1:!a[b]||"^"===b&&h||(o+="\\"),o+=b}h&&(x=t.substr(d+1),A=this.parse(x,p),o=o.substr(0,g)+"\\["+A[0],u=u||A[1]);for(_=l.pop();_;_=l.pop()){var O=o.slice(_.reStart+_.open.length);this.debug("setting tail",o,_),O=O.replace(/((?:\\{2}){0,64})(\\?)\|/g,(function(t,e,n){return n||(n="\\"),e+e+n+"|"})),this.debug("tail=%j\n   %s",O,O,_,o);var E="*"===_.type?"[^/]*?":"?"===_.type?"[^/]":"\\"+_.type;u=!0,o=o.slice(0,_.reStart)+E+"\\("+O}y(),c&&(o+="\\\\");var k=!1;switch(o.charAt(0)){case".":case"[":case"(":k=!0}for(var q=f.length-1;q>-1;q--){var T=f[q],S=o.slice(0,T.reStart),M=o.slice(T.reStart,T.reEnd-8),R=o.slice(T.reEnd-8,T.reEnd),L=o.slice(T.reEnd);R+=L;var C=S.split("(").length-1,$=L;for(w=0;w<C;w++)$=$.replace(/\)[+*?]?/,"");var P="";""===(L=$)&&e!==p&&(P="$"),o=S+M+L+P+R}""!==o&&u&&(o="(?=.)"+o);k&&(o=m+o);if(e===p)return[o,u];if(!u)return function(t){return t.replace(/\\(.)/g,"$1")}(t);var N=n.nocase?"i":"";try{var W=new RegExp("^"+o+"$",N)}catch(t){return new RegExp("$.")}return W._glob=t,W._src=o,W};var p={};l.makeRe=function(t,e){return new f(t,e||{}).makeRe()},f.prototype.makeRe=function(){if(this.regexp||!1===this.regexp)return this.regexp;var t=this.set;if(!t.length)return this.regexp=!1,this.regexp;var e=this.options,n=e.noglobstar?"[^/]*?":e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",r=e.nocase?"i":"",o=t.map((function(t){return t.map((function(t){return t===i?n:"string"==typeof t?function(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}(t):t._src})).join("\\/")})).join("|");o="^(?:"+o+")$",this.negate&&(o="^(?!"+o+").*$");try{this.regexp=new RegExp(o,r)}catch(t){this.regexp=!1}return this.regexp},l.match=function(t,e,n){var r=new f(e,n=n||{});return t=t.filter((function(t){return r.match(t)})),r.options.nonull&&!t.length&&t.push(e),t},f.prototype.match=function(t,e){if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;var n=this.options;"/"!==r.sep&&(t=t.split(r.sep).join("/"));t=t.split(u),this.debug(this.pattern,"split",t);var i,o,s=this.set;for(this.debug(this.pattern,"set",s),o=t.length-1;o>=0&&!(i=t[o]);o--);for(o=0;o<s.length;o++){var a=s[o],c=t;if(n.matchBase&&1===a.length&&(c=[i]),this.matchOne(c,a,e))return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate},f.prototype.matchOne=function(t,e,n){var r=this.options;this.debug("matchOne",{this:this,file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var o=0,s=0,a=t.length,u=e.length;o<a&&s<u;o++,s++){this.debug("matchOne loop");var c,l=e[s],f=t[o];if(this.debug(e,l,f),!1===l)return!1;if(l===i){this.debug("GLOBSTAR",[e,l,f]);var h=o,p=s+1;if(p===u){for(this.debug("** at the end");o<a;o++)if("."===t[o]||".."===t[o]||!r.dot&&"."===t[o].charAt(0))return!1;return!0}for(;h<a;){var g=t[h];if(this.debug("\nglobstar while",t,h,e,p,g),this.matchOne(t.slice(h),e.slice(p),n))return this.debug("globstar found match!",h,a,g),!0;if("."===g||".."===g||!r.dot&&"."===g.charAt(0)){this.debug("dot detected!",t,h,e,p);break}this.debug("globstar swallow a segment, and continue"),h++}return!(!n||(this.debug("\n>>> no match, partial?",t,h,e,p),h!==a))}if("string"==typeof l?(c=r.nocase?f.toLowerCase()===l.toLowerCase():f===l,this.debug("string match",l,f,c)):(c=f.match(l),this.debug("pattern match",l,f,c)),!c)return!1}if(o===a&&s===u)return!0;if(o===a)return n;if(s===u)return o===a-1&&""===t[o];throw new Error("wtf?")}},function(t,e,n){
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var r=n(2),i={"{":"}","(":")","[":"]"},o=/\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/,s=/\\(.)|(^!|[*?{}()[\]]|\(\?)/;t.exports=function(t,e){if("string"!=typeof t||""===t)return!1;if(r(t))return!0;var n,a=o;for(e&&!1===e.strict&&(a=s);n=a.exec(t);){if(n[2])return!0;var u=n.index+n[0].length,c=n[1],l=c?i[c]:null;if(c&&l){var f=t.indexOf(l,u);-1!==f&&(u=f+1)}t=t.slice(u)}return!1}},function(t,e){
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
t.exports=function(t){if("string"!=typeof t||""===t)return!1;for(var e;e=/(\\).|([@?!+*]\(.*\))/g.exec(t);){if(e[2])return!0;t=t.slice(e.index+e[0].length)}return!1}},function(t,e,n){(function(t){function n(t,e){for(var n=0,r=t.length-1;r>=0;r--){var i=t[r];"."===i?t.splice(r,1):".."===i?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function r(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}e.resolve=function(){for(var e="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var s=o>=0?arguments[o]:t.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(e=s+"/"+e,i="/"===s.charAt(0))}return(i?"/":"")+(e=n(r(e.split("/"),(function(t){return!!t})),!i).join("/"))||"."},e.normalize=function(t){var o=e.isAbsolute(t),s="/"===i(t,-1);return(t=n(r(t.split("/"),(function(t){return!!t})),!o).join("/"))||o||(t="."),t&&s&&(t+="/"),(o?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(r(t,(function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},e.relative=function(t,n){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var i=r(t.split("/")),o=r(n.split("/")),s=Math.min(i.length,o.length),a=s,u=0;u<s;u++)if(i[u]!==o[u]){a=u;break}var c=[];for(u=a;u<i.length;u++)c.push("..");return(c=c.concat(o.slice(a))).join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){if("string"!=typeof t&&(t+=""),0===t.length)return".";for(var e=t.charCodeAt(0),n=47===e,r=-1,i=!0,o=t.length-1;o>=1;--o)if(47===(e=t.charCodeAt(o))){if(!i){r=o;break}}else i=!1;return-1===r?n?"/":".":n&&1===r?"/":t.slice(0,r)},e.basename=function(t,e){var n=function(t){"string"!=typeof t&&(t+="");var e,n=0,r=-1,i=!0;for(e=t.length-1;e>=0;--e)if(47===t.charCodeAt(e)){if(!i){n=e+1;break}}else-1===r&&(i=!1,r=e+1);return-1===r?"":t.slice(n,r)}(t);return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){"string"!=typeof t&&(t+="");for(var e=-1,n=0,r=-1,i=!0,o=0,s=t.length-1;s>=0;--s){var a=t.charCodeAt(s);if(47!==a)-1===r&&(i=!1,r=s+1),46===a?-1===e?e=s:1!==o&&(o=1):-1!==e&&(o=-1);else if(!i){n=s+1;break}}return-1===e||-1===r||0===o||1===o&&e===r-1&&e===n+1?"":t.slice(e,r)};var i="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n(4))},function(t,e){var n,r,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(t){r=s}}();var u,c=[],l=!1,f=-1;function h(){l&&u&&(l=!1,u.length?c=u.concat(c):f=-1,c.length&&p())}function p(){if(!l){var t=a(h);l=!0;for(var e=c.length;e;){for(u=c,c=[];++f<e;)u&&u[f].run();f=-1,e=c.length}u=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function g(t,e){this.fun=t,this.array=e}function d(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new g(t,e)),1!==c.length||l||a(p)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=d,i.addListener=d,i.once=d,i.off=d,i.removeListener=d,i.removeAllListeners=d,i.emit=d,i.prependListener=d,i.prependOnceListener=d,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(t,e,n){var r=n(6),i=n(7);t.exports=function(t){if(!t)return[];"{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2));return function t(e,n){var o=[],s=i("{","}",e);if(!s||/\$$/.test(s.pre))return[e];var u,c=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body),f=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body),m=c||f,v=s.body.indexOf(",")>=0;if(!m&&!v)return s.post.match(/,.*\}/)?(e=s.pre+"{"+s.body+a+s.post,t(e)):[e];if(m)u=s.body.split(/\.\./);else{if(1===(u=function t(e){if(!e)return[""];var n=[],r=i("{","}",e);if(!r)return e.split(",");var o=r.pre,s=r.body,a=r.post,u=o.split(",");u[u.length-1]+="{"+s+"}";var c=t(a);a.length&&(u[u.length-1]+=c.shift(),u.push.apply(u,c));return n.push.apply(n,u),n}(s.body)).length)if(1===(u=t(u[0],!1).map(h)).length)return(w=s.post.length?t(s.post,!1):[""]).map((function(t){return s.pre+u[0]+t}))}var y,b=s.pre,w=s.post.length?t(s.post,!1):[""];if(m){var j=l(u[0]),_=l(u[1]),x=Math.max(u[0].length,u[1].length),A=3==u.length?Math.abs(l(u[2])):1,O=g;_<j&&(A*=-1,O=d);var E=u.some(p);y=[];for(var k=j;O(k,_);k+=A){var q;if(f)"\\"===(q=String.fromCharCode(k))&&(q="");else if(q=String(k),E){var T=x-q.length;if(T>0){var S=new Array(T+1).join("0");q=k<0?"-"+S+q.slice(1):S+q}}y.push(q)}}else y=r(u,(function(e){return t(e,!1)}));for(var M=0;M<y.length;M++)for(var R=0;R<w.length;R++){var L=b+y[M]+w[R];(!n||m||L)&&o.push(L)}return o}(function(t){return t.split("\\\\").join(o).split("\\{").join(s).split("\\}").join(a).split("\\,").join(u).split("\\.").join(c)}(t),!0).map(f)};var o="\0SLASH"+Math.random()+"\0",s="\0OPEN"+Math.random()+"\0",a="\0CLOSE"+Math.random()+"\0",u="\0COMMA"+Math.random()+"\0",c="\0PERIOD"+Math.random()+"\0";function l(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function f(t){return t.split(o).join("\\").split(s).join("{").split(a).join("}").split(u).join(",").split(c).join(".")}function h(t){return"{"+t+"}"}function p(t){return/^-?0\d/.test(t)}function g(t,e){return t<=e}function d(t,e){return t>=e}},function(t,e){t.exports=function(t,e){for(var r=[],i=0;i<t.length;i++){var o=e(t[i],i);n(o)?r.push.apply(r,o):r.push(o)}return r};var n=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},function(t,e,n){"use strict";function r(t,e,n){t instanceof RegExp&&(t=i(t,n)),e instanceof RegExp&&(e=i(e,n));var r=o(t,e,n);return r&&{start:r[0],end:r[1],pre:n.slice(0,r[0]),body:n.slice(r[0]+t.length,r[1]),post:n.slice(r[1]+e.length)}}function i(t,e){var n=e.match(t);return n?n[0]:null}function o(t,e,n){var r,i,o,s,a,u=n.indexOf(t),c=n.indexOf(e,u+1),l=u;if(u>=0&&c>0){for(r=[],o=n.length;l>=0&&!a;)l==u?(r.push(l),u=n.indexOf(t,l+1)):1==r.length?a=[r.pop(),c]:((i=r.pop())<o&&(o=i,s=c),c=n.indexOf(e,l+1)),l=u<c&&u>=0?u:c;r.length&&(a=[o,s])}return a}t.exports=r,r.range=o},function(t,e,n){"use strict";n.r(e);var r=function(t){return t instanceof String||"string"==typeof t&&null!==t},i=function(t){return"function"==typeof t},o=function(t){return i(t)||t&&"[object function]"==={}.toString.call(t)},s=function(t){return Array.isArray(t)},a=function(t){return arguments.length&&(void 0===t||void 0===t)},u=function(t){return Array.isArray(t)||"object"==typeof t&&t||i(t)},c=function(t){return!Array.isArray(t)&&"object"==typeof t&&t},l=function(t,e=!0){return s(t)?t:!e&&c(t)?[t]:!1!==t&&0!==t&&function(t){return function(t){return null===t||""===t}(t)||a(t)||!1===t||0===t||u(t)&&!Object.keys(t).length}(t)?[]:function(t){return!r(t)&&!a(t.length)}(t)?Array.prototype.slice.call(t):c(t)?Object.values(t):[t]};class f{constructor(t,e,n){this.path=s(t)?t:(t+"").split("/").filter(t=>t),this.layout=e,this.context=n}async route(t,e,n,i,s=[]){t=l(t);var a=this.layout,u=this.context;const c=async function(n,l,f){var h;if(0===n)h=a["/"];else if(f[n-1]){var p="/"+f.slice(0,n).join("/"),g="/"+f.slice(0,n-1).concat("-").join("/");h=a[p]||a[g]}if(h){const i=o(h)&&t.includes("default")?h:t.reduce((t,e)=>t||h[e],null);if(i){const t=(...t)=>{if(t.length>1){if(!r(t[1]))throw new Error("Router redirect must be a string!");if(t[1].startsWith("/"))throw new Error("Router redirect must NOT be an absolute path!");t[1]=f.slice(0,n).concat(t[1].split("/").map(t=>t.trim()).filter(t=>t))}else t[1]=f;return c(n+1,...t)};t.pathname=f.slice(n).join("/"),t.stepname=t.pathname.split("/").shift();const o={pathname:"/"+f.slice(0,n).join("/"),...u};return o.stepname=o.pathname.split("/").pop(),await i.bind(o)(...e.concat([l,t].concat(s)))}}if(i){const t={pathname:"/"+f.join("/"),...u};return await i.call(t,l)}};return c(0,n,this.path)}}var h=n(1),p=n.n(h),g=n(0),d=n.n(g),m=function(t,e,n=!1){if(""==e)return t;var r=n?t.lastIndexOf(e):t.indexOf(e);return-1===r?"":t.substr(r+e.length)},v=function(t,e){return m(t,e,!0)},y=function(t,e,n=!1){if(""==e)return t;var r=n?t.lastIndexOf(e):t.indexOf(e);return-1===r?t:t.substr(0,r)},b=function(t,e){return t.reduce((t,n,r)=>t||e(n,r),!1)};var w=function(t){return function(t){return t instanceof Number||"number"==typeof t}(t)||!0!==t&&!1!==t&&null!==t&&""!==t&&!isNaN(1*t)};new Map;var j=function(t,e){return y(t,e,!0)};function _(t,e,n,i=!1){if(r(e)&&e.endsWith("]")){var o=j(v(e,"["),"]")||0;return w(o)&&(o=parseInt(o)),e=j(e,"[")||0,w(e)&&(e=parseInt(e)),_(t,e,(t,e)=>{if(!t[e]){if(!i)return n();t[e]=w(o)?[]:{}}return n(t[e],o)},i)}return n(t,e)}function x(t,e,n,r=!0){_(t,e,(t,e)=>{w(e)?(e=e||s(t)?t.length:Object.keys(t).filter(w).length,l(n,!1).forEach((n,r)=>{t[e+r]=n})):t[e]=r&&e in t?l(t[e],!1).concat(n):n},!0)}class A extends Request{constructor(t,e){var n;t instanceof Request&&(n=t.clone()),super(...arguments),this.src=n}get destination(){return this.src?this.src.destination:""}clone(){return new this.constructor(this.src||super.clone())}get cookies(){return this._cookies||(this._cookies=function(t,e={},n="&"){return((t=t||"").startsWith("?")?t.substr(1):t).split(n).filter(t=>t).map(t=>t.split("=").map(t=>t.trim())).forEach(t=>x(e,t[0],decodeURIComponent(t[1]))),e}(this.headers.cookie,{},";")),this._cookies}parse(){return new Promise(async t=>{request=this.clone();var e=request.headers["content-type"],n={payload:null,inputs:{},files:{},type:"application/x-www-form-urlencoded"===e||e.startsWith("multipart/")?"form-data":"application/json"===e?"json":"text/plain"===e?"plain":"other"};if("form-data"===n.type)for(var[r,i]of(n.payload=await request.formData(),n.payload.entries()))i instanceof File?x(n.files,r,i):x(n.inputs,r,i);else n.payload=await("json"===n.type?request.json():"plain"===n.type?request.text():request.arrayBuffer()),"json"===n.type&&u(n.payload)&&(n.inputs=inputs);t(n)})}}(function(t,e){t={...t},e={...e},self.addEventListener("install",t=>{e.skip_waiting&&self.skipWaiting(),e.cache_name&&e.static_caching_list&&t.waitUntil(self.caches.open(e.cache_name).then(t=>{e.lifecycle_logs&&console.log("[ServiceWorker] Pre-caching resources.");const n=(e.cache_only_url_list||[]).map(t=>t.trim()).filter(t=>t);return t.addAll(n.filter(t=>!p()(t)&&!v(t,".").includes("/")))}))}),self.addEventListener("activate",t=>{t.waitUntil(new Promise(async t=>{e.skip_waiting&&await self.clients.claim(),e.cache_name&&await self.caches.keys().then(t=>Promise.all(t.map(t=>{if(t!==e.cache_name&&t!==e.cache_name+"_json")return e.lifecycle_logs&&console.log("[ServiceWorker] Removing old cache:",t),self.caches.delete(t)}))),t()}))}),self.addEventListener("fetch",async t=>{var e=new A(t.request);Object.defineProperty(t,"request",{get:()=>e}),t.respondWith(n(t))});const n=async n=>{const r={layout:t},s=new f(y(n.request.url,"?"),t,r);return await s.route("default",[n],null,(async function(){return b((e.cache_only_url_list||[]).map(t=>t.trim()).filter(t=>t),t=>d.a.Minimatch(n.request.url,t))?i(n):"navigate"===n.request.mode&&"force-cache"===n.request.cache&&"document"===n.request.destination||b((e.cache_first_url_list||[]).map(t=>t.trim()).filter(t=>t),t=>d.a.Minimatch(n.request.url,t))?i(n,!0):b((e.network_first_url_list||[]).map(t=>t.trim()).filter(t=>t),t=>d.a.Minimatch(n.request.url,t))?o(n,!0):o(n)}))},r=t=>"application/json"===t.headers.get("Accept")?e.cache_name+"_json":e.cache_name,i=(t,e=!1)=>self.caches.open(r(t.request)).then(n=>n.match(t.request).then(n=>n?(e&&self.fetch(t.request).then(e=>s(t.request,e)),n):self.fetch(t.request).then(e=>s(t.request,e)))),o=(t,e)=>e?self.fetch(t.request).then(e=>s(t.request,e)).catch(e=>self.caches.open(r(t.request)).then(e=>e.match(t.request))):self.fetch(t.request),s=(t,n)=>{if(!n||200!==n.status||"basic"!==n.type&&"cors"!==n.type)return n;var i=n.clone();return self.caches.open(r(t)).then(n=>{e.lifecycle_logs&&console.log("[ServiceWorker] Refreshing cache:",t.url),n.put(t,i)}),n};self.addEventListener("message",e=>{const n=new f("/",t,{layout:t});e.waitUntil(n.route("postmessage",[e],null,(function(){return self})))}),self.addEventListener("push",e=>{const n=new f("/",t,{layout:t});e.waitUntil(n.route("notificationpush",[e],null,(function(){return self})))}),self.addEventListener("notificationclick",e=>{const n=new f("/",t,{layout:t});e.waitUntil(n.route("notificationclick",[e],null,(function(){return self})))}),self.addEventListener("notificationclose",e=>{const n=new f("/",t,{layout:t});e.waitUntil(n.route("notificationclose",[e],null,(function(){return self})))})}).call(null,{},{scope:"/",cache_name:"cache_v2",cache_only_url_list:[""],cache_first_url_list:[""],network_first_url_list:["/*"],network_only_url_list:[""],skip_waiting:!1,lifecycle_logs:!1,support_push:!1})}]);