!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).onScreenness=t()}(this,function(){"use strict";const e=function(e,t){return Number(Math.round(e+"e"+t)+"e-"+t)},t=function(e){return e.split(",").map(e=>e.trim().replace(/\s+/g," ")).filter(e=>e.length)},n=function(e){let t=[];return t.push.apply(t,document.querySelectorAll(e)),t};let r=function(){const e="[data-onscreenness]";let r=[],o=[],i={};const c=function(e,t){t.forEach(t=>{e.includes(t)||e.push(t)})};return{collect:function(e,n){let o=t(e);return c(r,o),n&&"function"==typeof n&&o.forEach(e=>i[e]=n),o},exclude:function(e){let n=t(e);return c(o,n),n},remove:function(e){let n=t(e),o=function(e,t){let n={};return e.forEach(e=>n[e]=1),t.filter(e=>{if(1===n[e])return delete n[e],e})}(r,n);return o.forEach(e=>{r.splice(r.indexOf(e),1)}),o},reset:function(){return r=[],o=[],[e]},getVariables:()=>({queryList:r.concat(),blackList:o.concat(),callbackObj:Object.assign({},i)}),buildNodeList:function(){let t=[e].concat(r),i=n(t.join(",")),c=o.length?n(o.join(",")):[];return i.filter(e=>!c.includes(e))},buildCallbackMap:function(){let e=new Map;return Object.entries(i).forEach(([t,r])=>{n(t).forEach(t=>{e.set(t,r)})}),e}}}(),o=function(){let t=new WeakMap;return{detachIdentifiers:function(e){(e.length?n(e.join(",")):[]).forEach(function(e){e&&(e.classList.remove("onscreen"),e.classList.remove("offscreen"),e.classList.remove("crossscreen"),e.classList.remove("overscreen"),delete e.dataset.onscreenness,delete e.dataset.overlapping)})},calculatePresence:function(e){let t=Date.now(),n={left:0-e.left,right:e.right-document.documentElement.clientWidth,top:0-e.top,bottom:e.bottom-document.documentElement.clientHeight},r=Math.min(Math.max(n.left,0),e.width),o=Math.min(Math.max(n.right,0),e.width),i=Math.min(Math.max(n.top,0),e.height),c=Math.min(Math.max(n.bottom,0),e.height),a=1-r/e.width-o/e.width,u=1-i/e.height-c/e.height,l=(e.width-r-o)/document.documentElement.clientWidth,s=(e.height-i-c)/document.documentElement.clientHeight,f=e.width/document.documentElement.clientWidth,d=e.height/document.documentElement.clientHeight,h=e.left-document.documentElement.clientWidth/2+e.width/2,p=e.top-document.documentElement.clientHeight/2+e.height/2,g=Math.hypot(h,p);return{time:t,overhang:n,widthRatio:f,heightRatio:d,areaRatio:f*d,horizontalDecentering:h,verticalDecentering:p,surfaceDecentering:h+p>0?g:0-g,horizontalOverlap:l,verticalOverlap:s,surfaceOverlap:l*s,horizontalPresence:a,verticalPresence:u,surfacePresence:a*u}},attachIdentifiers:function(n,r){let o={},i=e=>{e.addClass?(o.addClass=o.addClass?`${o.addClass} ${e.addClass}`:e.addClass,n.classList.add(e.addClass)):(o.removeClass=o.removeClass?`${o.removeClass} ${e.removeClass}`:e.removeClass,n.classList.remove(e.removeClass))},c=(e,t)=>{let r=n.classList.contains(e);t&&!r&&i({addClass:e}),!t&&r&&i({removeClass:e})},a=e(r.surfacePresence,3);n.dataset.onscreenness=String(a),c("onscreen",1===a),c("crossscreen",a>0&&a<1),c("offscreen",0===a);let u=e(r.surfaceOverlap,3);n.dataset.overlapping=String(u);let l=r.widthRatio>1&&1===r.horizontalOverlap&&1===r.verticalPresence,s=r.heightRatio>1&&1===r.verticalOverlap&&1===r.horizontalPresence;c("overscreen",1===r.surfaceOverlap||l||s);let f=t.get(n);return f&&(o.timelapse=r.time-f.time,o.nearing=Math.abs(f.surfaceDecentering)-Math.abs(r.surfaceDecentering),o.scrollspeed=o.nearing/(o.timelapse/1e3),c("nearingscreen",o.nearing>0),c("leavingscreen",o.nearing<0)),t.set(n,r),o}}}();var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function c(e,t){return e(t={exports:{}},t.exports),t.exports}var a,u,l,s,f="object",d=function(e){return e&&e.Math==Math&&e},h=d(typeof globalThis==f&&globalThis)||d(typeof window==f&&window)||d(typeof self==f&&self)||d(typeof i==f&&i)||Function("return this")(),p=function(e){try{return!!e()}catch(e){return!0}},g=!p(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),m={}.propertyIsEnumerable,v=Object.getOwnPropertyDescriptor,y={f:v&&!m.call({1:2},1)?function(e){var t=v(this,e);return!!t&&t.enumerable}:m},b=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},L={}.toString,w=function(e){return L.call(e).slice(8,-1)},S="".split,E=p(function(){return!Object("z").propertyIsEnumerable(0)})?function(e){return"String"==w(e)?S.call(e,""):Object(e)}:Object,O=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e},M=function(e){return E(O(e))},C=function(e){return"object"==typeof e?null!==e:"function"==typeof e},P=function(e,t){if(!C(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!C(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!C(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!C(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")},j={}.hasOwnProperty,T=function(e,t){return j.call(e,t)},I=h.document,x=C(I)&&C(I.createElement),k=!g&&!p(function(){return 7!=Object.defineProperty(("div",x?I.createElement("div"):{}),"a",{get:function(){return 7}}).a}),A=Object.getOwnPropertyDescriptor,D={f:g?A:function(e,t){if(e=M(e),t=P(t,!0),k)try{return A(e,t)}catch(e){}if(T(e,t))return b(!y.f.call(e,t),e[t])}},N=function(e){if(!C(e))throw TypeError(String(e)+" is not an object");return e},R=Object.defineProperty,V={f:g?R:function(e,t,n){if(N(e),t=P(t,!0),N(n),k)try{return R(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},_=g?function(e,t,n){return V.f(e,t,b(1,n))}:function(e,t,n){return e[t]=n,e},z=function(e,t){try{_(h,e,t)}catch(n){h[e]=t}return t},G=c(function(e){var t=h["__core-js_shared__"]||z("__core-js_shared__",{});(e.exports=function(e,n){return t[e]||(t[e]=void 0!==n?n:{})})("versions",[]).push({version:"3.1.3",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),H=G("native-function-to-string",Function.toString),F=h.WeakMap,W="function"==typeof F&&/native code/.test(H.call(F)),q=0,$=Math.random(),B=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++q+$).toString(36)},K=G("keys"),Y={},J=h.WeakMap;if(W){var Q=new J,U=Q.get,X=Q.has,Z=Q.set;a=function(e,t){return Z.call(Q,e,t),t},u=function(e){return U.call(Q,e)||{}},l=function(e){return X.call(Q,e)}}else{var ee=K[s="state"]||(K[s]=B(s));Y[ee]=!0,a=function(e,t){return _(e,ee,t),t},u=function(e){return T(e,ee)?e[ee]:{}},l=function(e){return T(e,ee)}}var te,ne,re,oe={set:a,get:u,has:l,enforce:function(e){return l(e)?u(e):a(e,{})},getterFor:function(e){return function(t){var n;if(!C(t)||(n=u(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}},ie=c(function(e){var t=oe.get,n=oe.enforce,r=String(H).split("toString");G("inspectSource",function(e){return H.call(e)}),(e.exports=function(e,t,o,i){var c=!!i&&!!i.unsafe,a=!!i&&!!i.enumerable,u=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof t||T(o,"name")||_(o,"name",t),n(o).source=r.join("string"==typeof t?t:"")),e!==h?(c?!u&&e[t]&&(a=!0):delete e[t],a?e[t]=o:_(e,t,o)):a?e[t]=o:z(t,o)})(Function.prototype,"toString",function(){return"function"==typeof this&&t(this).source||H.call(this)})}),ce=h,ae=function(e){return"function"==typeof e?e:void 0},ue=Math.ceil,le=Math.floor,se=function(e){return isNaN(e=+e)?0:(e>0?le:ue)(e)},fe=Math.min,de=function(e){return e>0?fe(se(e),9007199254740991):0},he=Math.max,pe=Math.min,ge=function(e){return function(t,n,r){var o,i=M(t),c=de(i.length),a=function(e,t){var n=se(r);return n<0?he(n+t,0):pe(n,t)}(0,c);if(e&&n!=n){for(;c>a;)if((o=i[a++])!=o)return!0}else for(;c>a;a++)if((e||a in i)&&i[a]===n)return e||a||0;return!e&&-1}},me=(ge(!0),ge(!1)),ve=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),ye={f:Object.getOwnPropertyNames||function(e){return function(e,t){var n,r=M(e),o=0,i=[];for(n in r)!T(Y,n)&&T(r,n)&&i.push(n);for(;t.length>o;)T(r,n=t[o++])&&(~me(i,n)||i.push(n));return i}(e,ve)}},be={f:Object.getOwnPropertySymbols},Le=function(e,t){return arguments.length<2?ae(ce[e])||ae(h[e]):ce[e]&&ce[e][t]||h[e]&&h[e][t]}("Reflect","ownKeys")||function(e){var t=ye.f(N(e)),n=be.f;return n?t.concat(n(e)):t},we=function(e,t){for(var n=Le(t),r=V.f,o=D.f,i=0;i<n.length;i++){var c=n[i];T(e,c)||r(e,c,o(t,c))}},Se=/#|\.prototype\./,Ee=function(e,t){var n=Me[Oe(e)];return n==Pe||n!=Ce&&("function"==typeof t?p(t):!!t)},Oe=Ee.normalize=function(e){return String(e).replace(Se,".").toLowerCase()},Me=Ee.data={},Ce=Ee.NATIVE="N",Pe=Ee.POLYFILL="P",je=Ee,Te=D.f,Ie=Array.isArray||function(e){return"Array"==w(e)},xe=!!Object.getOwnPropertySymbols&&!p(function(){return!String(Symbol())}),ke=h.Symbol,Ae=G("wks"),De=Ae[te="species"]||(Ae[te]=xe&&ke[te]||(xe?ke:B)("Symbol."+te)),Ne=function(e,t){var n;return Ie(e)&&("function"!=typeof(n=e.constructor)||n!==Array&&!Ie(n.prototype)?C(n)&&null===(n=n[De])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===t?0:t)},Re=[].push,Ve=function(e){var t=1==e,n=2==e,r=3==e,o=4==e,i=6==e,c=5==e||i;return function(a,u,l,s){for(var f,d,h=Object(O(a)),p=E(h),g=function(e,t,n){if(function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function")}(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}}(u,l,3),m=de(p.length),v=0,y=s||Ne,b=t?y(a,m):n?y(a,0):void 0;m>v;v++)if((c||v in p)&&(d=g(f=p[v],v,h),e))if(t)b[v]=d;else if(d)switch(e){case 3:return!0;case 5:return f;case 6:return v;case 2:Re.call(b,f)}else if(o)return!1;return i?-1:r||o?o:b}},_e=[Ve(0),Ve(1),Ve(2),Ve(3),Ve(4),Ve(5),Ve(6)][0],ze=(ne=[].forEach)&&p(function(){ne.call(null,function(){throw 1},1)})?[].forEach:function(e){return _e(this,e,arguments.length>1?arguments[1]:void 0)};for(var Ge in function(e,t){var n,r,o,i,c,a=e.target,u=e.global,l=e.stat;if(n=u?h:l?h[a]||z(a,{}):(h[a]||{}).prototype)for(r in t){if(i=t[r],o=e.noTargetGet?(c=Te(n,r))&&c.value:n[r],!je(u?r:a+(l?".":"#")+r,e.forced)&&void 0!==o){if(typeof i==typeof o)continue;we(i,o)}(e.sham||o&&o.sham)&&_(i,"sham",!0),ie(n,r,i,e)}}({target:"Array",proto:!0,forced:[].forEach!=ze},{forEach:ze}),{CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}){var He=h[Ge],Fe=He&&He.prototype;if(Fe&&Fe.forEach!==ze)try{_(Fe,"forEach",ze)}catch(i){Fe.forEach=ze}}var We=(re=function(e){e instanceof Array||(e=[e]),e.forEach(function(e){return e()})},{onInteractive:function(e){"loading"===document.readyState?window.addEventListener("DOMContentLoaded",function(t){re(e)}):re(e)},onComplete:function(e){"complete"===document.readyState?re(e):window.addEventListener("load",function(t){re(e)})}});return function(){let e=function(){let e=r.buildCallbackMap();r.buildNodeList().forEach(function(t){let n=t.getBoundingClientRect(),r=o.calculatePresence(n),i=o.attachIdentifiers(t,r),c=e.get(t);c&&c.call(t,Object.assign(r,i))})};window.addEventListener("resize",e,!1),window.addEventListener("scroll",e,!0);let t=new MutationObserver(function(t,n){t.length&&e()});return We.onInteractive([e,function(){t.observe(document.body,{childList:!0,subtree:!0})}]),{publicAPI:{collect:function(t,n){r.collect(t,n),We.onInteractive([e])},exclude:function(t){We.onInteractive([function(){o.detachIdentifiers(r.exclude(t))},e])},remove:function(t){We.onInteractive([function(){o.detachIdentifiers(r.remove(t))},e])},reset:function(){We.onInteractive([function(){o.detachIdentifiers(r.reset())}])}},testSuite:{getVariables:r.getVariables,trigger:e,liveList:r.buildNodeList,kickList:r.buildCallbackMap,calculate:o.calculatePresence,treat:o.attachIdentifiers}}}().publicAPI});
//# sourceMappingURL=index.js.map
