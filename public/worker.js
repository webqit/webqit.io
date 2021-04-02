!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){t.exports=l,l.Minimatch=f;var r={sep:"/"};try{r=n(1)}catch(t){}var i=l.GLOBSTAR=f.GLOBSTAR={},o=n(3),s={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},a="().*{}+?[]^$\\!".split("").reduce((function(t,e){return t[e]=!0,t}),{});var c=/\/+/;function u(t,e){t=t||{},e=e||{};var n={};return Object.keys(e).forEach((function(t){n[t]=e[t]})),Object.keys(t).forEach((function(e){n[e]=t[e]})),n}function l(t,e,n){if("string"!=typeof e)throw new TypeError("glob pattern string required");return n||(n={}),!(!n.nocomment&&"#"===e.charAt(0))&&(""===e.trim()?""===t:new f(e,n).match(t))}function f(t,e){if(!(this instanceof f))return new f(t,e);if("string"!=typeof t)throw new TypeError("glob pattern string required");e||(e={}),t=t.trim(),"/"!==r.sep&&(t=t.split(r.sep).join("/")),this.options=e,this.set=[],this.pattern=t,this.regexp=null,this.negate=!1,this.comment=!1,this.empty=!1,this.make()}function h(t,e){if(e||(e=this instanceof f?this.options:{}),void 0===(t=void 0===t?this.pattern:t))throw new TypeError("undefined pattern");return e.nobrace||!t.match(/\{.*\}/)?[t]:o(t)}l.filter=function(t,e){return e=e||{},function(n,r,i){return l(n,t,e)}},l.defaults=function(t){if(!t||!Object.keys(t).length)return l;var e=l,n=function(n,r,i){return e.minimatch(n,r,u(t,i))};return n.Minimatch=function(n,r){return new e.Minimatch(n,u(t,r))},n},f.defaults=function(t){return t&&Object.keys(t).length?l.defaults(t).Minimatch:f},f.prototype.debug=function(){},f.prototype.make=function(){if(this._made)return;var t=this.pattern,e=this.options;if(!e.nocomment&&"#"===t.charAt(0))return void(this.comment=!0);if(!t)return void(this.empty=!0);this.parseNegate();var n=this.globSet=this.braceExpand();e.debug&&(this.debug=console.error);this.debug(this.pattern,n),n=this.globParts=n.map((function(t){return t.split(c)})),this.debug(this.pattern,n),n=n.map((function(t,e,n){return t.map(this.parse,this)}),this),this.debug(this.pattern,n),n=n.filter((function(t){return-1===t.indexOf(!1)})),this.debug(this.pattern,n),this.set=n},f.prototype.parseNegate=function(){var t=this.pattern,e=!1,n=this.options,r=0;if(n.nonegate)return;for(var i=0,o=t.length;i<o&&"!"===t.charAt(i);i++)e=!e,r++;r&&(this.pattern=t.substr(r));this.negate=e},l.braceExpand=function(t,e){return h(t,e)},f.prototype.braceExpand=h,f.prototype.parse=function(t,e){if(t.length>65536)throw new TypeError("pattern is too long");var n=this.options;if(!n.noglobstar&&"**"===t)return i;if(""===t)return"";var r,o="",c=!!n.nocase,u=!1,l=[],f=[],h=!1,g=-1,d=-1,m="."===t.charAt(0)?"":n.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",v=this;function y(){if(r){switch(r){case"*":o+="[^/]*?",c=!0;break;case"?":o+="[^/]",c=!0;break;default:o+="\\"+r}v.debug("clearStateChar %j %j",r,o),r=!1}}for(var b,w=0,j=t.length;w<j&&(b=t.charAt(w));w++)if(this.debug("%s\t%s %s %j",t,w,o,b),u&&a[b])o+="\\"+b,u=!1;else switch(b){case"/":return!1;case"\\":y(),u=!0;continue;case"?":case"*":case"+":case"@":case"!":if(this.debug("%s\t%s %s %j <-- stateChar",t,w,o,b),h){this.debug("  in class"),"!"===b&&w===d+1&&(b="^"),o+=b;continue}v.debug("call clearStateChar %j",r),y(),r=b,n.noext&&y();continue;case"(":if(h){o+="(";continue}if(!r){o+="\\(";continue}l.push({type:r,start:w-1,reStart:o.length,open:s[r].open,close:s[r].close}),o+="!"===r?"(?:(?!(?:":"(?:",this.debug("plType %j %j",r,o),r=!1;continue;case")":if(h||!l.length){o+="\\)";continue}y(),c=!0;var _=l.pop();o+=_.close,"!"===_.type&&f.push(_),_.reEnd=o.length;continue;case"|":if(h||!l.length||u){o+="\\|",u=!1;continue}y(),o+="|";continue;case"[":if(y(),h){o+="\\"+b;continue}h=!0,d=w,g=o.length,o+=b;continue;case"]":if(w===d+1||!h){o+="\\"+b,u=!1;continue}if(h){var A=t.substring(d+1,w);try{RegExp("["+A+"]")}catch(t){var x=this.parse(A,p);o=o.substr(0,g)+"\\["+x[0]+"\\]",c=c||x[1],h=!1;continue}}c=!0,h=!1,o+=b;continue;default:y(),u?u=!1:!a[b]||"^"===b&&h||(o+="\\"),o+=b}h&&(A=t.substr(d+1),x=this.parse(A,p),o=o.substr(0,g)+"\\["+x[0],c=c||x[1]);for(_=l.pop();_;_=l.pop()){var E=o.slice(_.reStart+_.open.length);this.debug("setting tail",o,_),E=E.replace(/((?:\\{2}){0,64})(\\?)\|/g,(function(t,e,n){return n||(n="\\"),e+e+n+"|"})),this.debug("tail=%j\n   %s",E,E,_,o);var O="*"===_.type?"[^/]*?":"?"===_.type?"[^/]":"\\"+_.type;c=!0,o=o.slice(0,_.reStart)+O+"\\("+E}y(),u&&(o+="\\\\");var k=!1;switch(o.charAt(0)){case".":case"[":case"(":k=!0}for(var T=f.length-1;T>-1;T--){var S=f[T],L=o.slice(0,S.reStart),M=o.slice(S.reStart,S.reEnd-8),R=o.slice(S.reEnd-8,S.reEnd),C=o.slice(S.reEnd);R+=C;var $=L.split("(").length-1,q=C;for(w=0;w<$;w++)q=q.replace(/\)[+*?]?/,"");var P="";""===(C=q)&&e!==p&&(P="$"),o=L+M+C+P+R}""!==o&&c&&(o="(?=.)"+o);k&&(o=m+o);if(e===p)return[o,c];if(!c)return function(t){return t.replace(/\\(.)/g,"$1")}(t);var N=n.nocase?"i":"";try{var U=new RegExp("^"+o+"$",N)}catch(t){return new RegExp("$.")}return U._glob=t,U._src=o,U};var p={};l.makeRe=function(t,e){return new f(t,e||{}).makeRe()},f.prototype.makeRe=function(){if(this.regexp||!1===this.regexp)return this.regexp;var t=this.set;if(!t.length)return this.regexp=!1,this.regexp;var e=this.options,n=e.noglobstar?"[^/]*?":e.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",r=e.nocase?"i":"",o=t.map((function(t){return t.map((function(t){return t===i?n:"string"==typeof t?function(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}(t):t._src})).join("\\/")})).join("|");o="^(?:"+o+")$",this.negate&&(o="^(?!"+o+").*$");try{this.regexp=new RegExp(o,r)}catch(t){this.regexp=!1}return this.regexp},l.match=function(t,e,n){var r=new f(e,n=n||{});return t=t.filter((function(t){return r.match(t)})),r.options.nonull&&!t.length&&t.push(e),t},f.prototype.match=function(t,e){if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;var n=this.options;"/"!==r.sep&&(t=t.split(r.sep).join("/"));t=t.split(c),this.debug(this.pattern,"split",t);var i,o,s=this.set;for(this.debug(this.pattern,"set",s),o=t.length-1;o>=0&&!(i=t[o]);o--);for(o=0;o<s.length;o++){var a=s[o],u=t;if(n.matchBase&&1===a.length&&(u=[i]),this.matchOne(u,a,e))return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate},f.prototype.matchOne=function(t,e,n){var r=this.options;this.debug("matchOne",{this:this,file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var o=0,s=0,a=t.length,c=e.length;o<a&&s<c;o++,s++){this.debug("matchOne loop");var u,l=e[s],f=t[o];if(this.debug(e,l,f),!1===l)return!1;if(l===i){this.debug("GLOBSTAR",[e,l,f]);var h=o,p=s+1;if(p===c){for(this.debug("** at the end");o<a;o++)if("."===t[o]||".."===t[o]||!r.dot&&"."===t[o].charAt(0))return!1;return!0}for(;h<a;){var g=t[h];if(this.debug("\nglobstar while",t,h,e,p,g),this.matchOne(t.slice(h),e.slice(p),n))return this.debug("globstar found match!",h,a,g),!0;if("."===g||".."===g||!r.dot&&"."===g.charAt(0)){this.debug("dot detected!",t,h,e,p);break}this.debug("globstar swallow a segment, and continue"),h++}return!(!n||(this.debug("\n>>> no match, partial?",t,h,e,p),h!==a))}if("string"==typeof l?(u=r.nocase?f.toLowerCase()===l.toLowerCase():f===l,this.debug("string match",l,f,u)):(u=f.match(l),this.debug("pattern match",l,f,u)),!u)return!1}if(o===a&&s===c)return!0;if(o===a)return n;if(s===c)return o===a-1&&""===t[o];throw new Error("wtf?")}},function(t,e,n){(function(t){function n(t,e){for(var n=0,r=t.length-1;r>=0;r--){var i=t[r];"."===i?t.splice(r,1):".."===i?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function r(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}e.resolve=function(){for(var e="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var s=o>=0?arguments[o]:t.cwd();if("string"!=typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(e=s+"/"+e,i="/"===s.charAt(0))}return(i?"/":"")+(e=n(r(e.split("/"),(function(t){return!!t})),!i).join("/"))||"."},e.normalize=function(t){var o=e.isAbsolute(t),s="/"===i(t,-1);return(t=n(r(t.split("/"),(function(t){return!!t})),!o).join("/"))||o||(t="."),t&&s&&(t+="/"),(o?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(r(t,(function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},e.relative=function(t,n){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var i=r(t.split("/")),o=r(n.split("/")),s=Math.min(i.length,o.length),a=s,c=0;c<s;c++)if(i[c]!==o[c]){a=c;break}var u=[];for(c=a;c<i.length;c++)u.push("..");return(u=u.concat(o.slice(a))).join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){if("string"!=typeof t&&(t+=""),0===t.length)return".";for(var e=t.charCodeAt(0),n=47===e,r=-1,i=!0,o=t.length-1;o>=1;--o)if(47===(e=t.charCodeAt(o))){if(!i){r=o;break}}else i=!1;return-1===r?n?"/":".":n&&1===r?"/":t.slice(0,r)},e.basename=function(t,e){var n=function(t){"string"!=typeof t&&(t+="");var e,n=0,r=-1,i=!0;for(e=t.length-1;e>=0;--e)if(47===t.charCodeAt(e)){if(!i){n=e+1;break}}else-1===r&&(i=!1,r=e+1);return-1===r?"":t.slice(n,r)}(t);return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){"string"!=typeof t&&(t+="");for(var e=-1,n=0,r=-1,i=!0,o=0,s=t.length-1;s>=0;--s){var a=t.charCodeAt(s);if(47!==a)-1===r&&(i=!1,r=s+1),46===a?-1===e?e=s:1!==o&&(o=1):-1!==e&&(o=-1);else if(!i){n=s+1;break}}return-1===e||-1===r||0===o||1===o&&e===r-1&&e===n+1?"":t.slice(e,r)};var i="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n(2))},function(t,e){var n,r,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(t){r=s}}();var c,u=[],l=!1,f=-1;function h(){l&&c&&(l=!1,c.length?u=c.concat(u):f=-1,u.length&&p())}function p(){if(!l){var t=a(h);l=!0;for(var e=u.length;e;){for(c=u,u=[];++f<e;)c&&c[f].run();f=-1,e=u.length}c=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function g(t,e){this.fun=t,this.array=e}function d(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new g(t,e)),1!==u.length||l||a(p)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=d,i.addListener=d,i.once=d,i.off=d,i.removeListener=d,i.removeAllListeners=d,i.emit=d,i.prependListener=d,i.prependOnceListener=d,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(t,e,n){var r=n(4),i=n(5);t.exports=function(t){if(!t)return[];"{}"===t.substr(0,2)&&(t="\\{\\}"+t.substr(2));return function t(e,n){var o=[],s=i("{","}",e);if(!s||/\$$/.test(s.pre))return[e];var c,u=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body),f=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body),m=u||f,v=s.body.indexOf(",")>=0;if(!m&&!v)return s.post.match(/,.*\}/)?(e=s.pre+"{"+s.body+a+s.post,t(e)):[e];if(m)c=s.body.split(/\.\./);else{if(1===(c=function t(e){if(!e)return[""];var n=[],r=i("{","}",e);if(!r)return e.split(",");var o=r.pre,s=r.body,a=r.post,c=o.split(",");c[c.length-1]+="{"+s+"}";var u=t(a);a.length&&(c[c.length-1]+=u.shift(),c.push.apply(c,u));return n.push.apply(n,c),n}(s.body)).length)if(1===(c=t(c[0],!1).map(h)).length)return(w=s.post.length?t(s.post,!1):[""]).map((function(t){return s.pre+c[0]+t}))}var y,b=s.pre,w=s.post.length?t(s.post,!1):[""];if(m){var j=l(c[0]),_=l(c[1]),A=Math.max(c[0].length,c[1].length),x=3==c.length?Math.abs(l(c[2])):1,E=g;_<j&&(x*=-1,E=d);var O=c.some(p);y=[];for(var k=j;E(k,_);k+=x){var T;if(f)"\\"===(T=String.fromCharCode(k))&&(T="");else if(T=String(k),O){var S=A-T.length;if(S>0){var L=new Array(S+1).join("0");T=k<0?"-"+L+T.slice(1):L+T}}y.push(T)}}else y=r(c,(function(e){return t(e,!1)}));for(var M=0;M<y.length;M++)for(var R=0;R<w.length;R++){var C=b+y[M]+w[R];(!n||m||C)&&o.push(C)}return o}(function(t){return t.split("\\\\").join(o).split("\\{").join(s).split("\\}").join(a).split("\\,").join(c).split("\\.").join(u)}(t),!0).map(f)};var o="\0SLASH"+Math.random()+"\0",s="\0OPEN"+Math.random()+"\0",a="\0CLOSE"+Math.random()+"\0",c="\0COMMA"+Math.random()+"\0",u="\0PERIOD"+Math.random()+"\0";function l(t){return parseInt(t,10)==t?parseInt(t,10):t.charCodeAt(0)}function f(t){return t.split(o).join("\\").split(s).join("{").split(a).join("}").split(c).join(",").split(u).join(".")}function h(t){return"{"+t+"}"}function p(t){return/^-?0\d/.test(t)}function g(t,e){return t<=e}function d(t,e){return t>=e}},function(t,e){t.exports=function(t,e){for(var r=[],i=0;i<t.length;i++){var o=e(t[i],i);n(o)?r.push.apply(r,o):r.push(o)}return r};var n=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},function(t,e,n){"use strict";function r(t,e,n){t instanceof RegExp&&(t=i(t,n)),e instanceof RegExp&&(e=i(e,n));var r=o(t,e,n);return r&&{start:r[0],end:r[1],pre:n.slice(0,r[0]),body:n.slice(r[0]+t.length,r[1]),post:n.slice(r[1]+e.length)}}function i(t,e){var n=e.match(t);return n?n[0]:null}function o(t,e,n){var r,i,o,s,a,c=n.indexOf(t),u=n.indexOf(e,c+1),l=c;if(c>=0&&u>0){for(r=[],o=n.length;l>=0&&!a;)l==c?(r.push(l),c=n.indexOf(t,l+1)):1==r.length?a=[r.pop(),u]:((i=r.pop())<o&&(o=i,s=u),u=n.indexOf(e,l+1)),l=c<u&&c>=0?c:u;r.length&&(a=[o,s])}return a}t.exports=r,r.range=o},function(t,e,n){"use strict";n.r(e);var r=function(t){return t instanceof String||"string"==typeof t&&null!==t},i=function(t){return"function"==typeof t},o=function(t){return Array.isArray(t)},s=function(t){return arguments.length&&(void 0===t||void 0===t)},a=function(t){return function(t){return null===t||""===t}(t)||s(t)||!1===t||0===t||function(t){return Array.isArray(t)||"object"==typeof t&&t||i(t)}(t)&&!Object.keys(t).length},c=function(t){return!Array.isArray(t)&&"object"==typeof t&&t},u=function(t,e=!0){return o(t)?t:!e&&c(t)?[t]:!1!==t&&0!==t&&a(t)?[]:function(t){return!r(t)&&!s(t.length)}(t)?Array.prototype.slice.call(t):c(t)?Object.values(t):[t]};class l{constructor(t,e,n){this.path=o(t)?t:(t+"").split("/").filter(t=>t),this.layout=e,this.context=n}async route(t,e,n,o,s=[]){t=u(t);var a=this.layout,c=this.context;const l=async function(n,u,f){var h,p;if(0===n)h=a["/"];else if(f[n-1]){var g="/"+f.slice(0,n).join("/"),d=f.slice(0,n-1).concat("_").join("/");h=a[g]||a[d]}if(h){const o=(i(p=h)||p&&"[object function]"==={}.toString.call(p))&&t.includes("default")?h:t.reduce((t,e)=>t||h[e],null);if(o){const t=(...t)=>{if(t.length>1){if(!r(t[1]))throw new Error("Router redirect must be a string!");if(t[1].startsWith("/"))throw new Error("Router redirect must NOT be an absolute path!");t[1]=f.slice(0,n).concat(t[1].split("/").map(t=>t.trim()).filter(t=>t))}else t[1]=f;return l(n+1,...t)};t.pathname=f.slice(n).join("/");const i={pathname:"/"+f.slice(0,n).join("/"),...c};return await o.bind(i)(...e.concat([u,t].concat(s)))}}if(o){const t={pathname:"/"+f.join("/"),...c};return await o.call(t,u)}return u};return l(0,n,this.path)}}var f=n(0),h=n.n(f);(function(t,e){t={...t},e={...e},self.addEventListener("install",t=>{e.skip_waiting&&self.skipWaiting(),e.cache_name&&e.static_caching_list&&t.waitUntil(self.caches.open(e.cache_name).then(t=>(e.lifecycle_logs&&console.log("[ServiceWorker] Pre-caching resources."),t.addAll(e.static_caching_list))))}),self.addEventListener("activate",t=>{t.waitUntil(new Promise(async t=>{e.skip_waiting&&await self.clients.claim(),e.cache_name&&await self.caches.keys().then(t=>Promise.all(t.map(t=>{if(t!==e.cache_name&&t!==e.cache_name+"_json")return e.lifecycle_logs&&console.log("[ServiceWorker] Removing old cache:",t),self.caches.delete(t)}))),t()}))}),self.addEventListener("fetch",async t=>{t.respondWith(n(t))});const n=async n=>{const r={layout:t},s=new l(n.request.url,t,r);n.request;return await s.route("default",[n.request],null,(async function(){switch(e.fetching_strategy){case"cache_first":return i(n);case"network_first":default:return o(n)}}))},r=t=>"application/json"===t.headers.get("Accept")?e.cache_name+"_json":e.cache_name,i=t=>self.caches.open(r(t.request)).then(e=>e.match(t.request).then(e=>e||self.fetch(t.request).then(e=>s(t.request,e)))),o=t=>self.fetch(t.request).then(e=>s(t.request,e)).catch(()=>self.caches.open(r(t.request)).then(e=>e.match(t.request))),s=(t,n)=>{if(!n||200!==n.status||"basic"!==n.type||!(e.dynamic_caching_list||[]).map(t=>t.trim()).filter(t=>t).reduce((e,n)=>e||h()(t.url,n,{dot:!0}),!1))return n;var i=n.clone();return self.caches.open(r(t)).then(n=>{e.lifecycle_logs&&console.log("[ServiceWorker] Caching new resource:",t.url),n.put(t,i)}),n};self.addEventListener("message",e=>{const n=new l("/",t,{layout:t});e.waitUntil(n.route("postmessage",[e],null,(function(){return self})))}),self.addEventListener("push",e=>{const n=new l("/",t,{layout:t});e.waitUntil(n.route("notificationpush",[e],null,(function(){return self})))}),self.addEventListener("notificationclick",e=>{const n=new l("/",t,{layout:t});e.waitUntil(n.route("notificationclick",[e],null,(function(){return self})))}),self.addEventListener("notificationclose",e=>{const n=new l("/",t,{layout:t});e.waitUntil(n.route("notificationclose",[e],null,(function(){return self})))})}).call(null,{},{dir:"",lifecycle_logs:!1,__advanced:!0,scope:"/",cache_name:"",fetching_strategy:"network_first",caching_strategy:"dynamic",caching_list:"",skip_waiting:!0,support_messaging:!1,support_notification:!1})}]);