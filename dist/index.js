!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).onScreenness=e()}(this,function(){"use strict";const t=function(t,e){return Number(Math.round(t+"e"+e)+"e-"+e)},e=function(t){return t.split(",").map(t=>t.trim().replace(/\s+/g," ")).filter(t=>t.length)},n=function(t){var e=[];return e.push.apply(e,document.querySelectorAll(t)),e};let r=function(){const t="[data-onscreenness]";let r=[],o=[];const i=function(t,e){e.forEach(e=>{t.includes(e)||t.push(e)})};return{collect:function(t){let n=e(t);return i(r,n),n},exclude:function(t){let n=e(t);return i(o,n),n},remove:function(t){let n=e(t),o=function(t,e){let n={};return t.forEach(t=>n[t]=1),e.filter(t=>{if(1===n[t])return delete n[t],t})}(r,n);return o.forEach(t=>{r.splice(r.indexOf(t),1)}),o},reset:function(){return r=[],o=[],[t]},getVariables:()=>({queryList:r.concat(),blackList:o.concat()}),buildNodeList:function(){let e=[t].concat(r),i=n(e.join(",")),c=o.length?n(o.join(",")):[];return i.filter(t=>!c.includes(t))}}}(),o={detachIdentifiers:function(t){(t.length?n(t.join(",")):[]).forEach(function(t){t&&(t.classList.remove("onscreen"),t.classList.remove("offscreen"),t.classList.remove("crossscreen"),t.classList.remove("overscreen"),delete t.dataset.onscreenness,delete t.dataset.overlapping)})},calculatePresence:function(t){var e={left:0-t.left,right:t.right-document.documentElement.clientWidth,top:0-t.top,bottom:t.bottom-document.documentElement.clientHeight},n=Math.min(Math.max(e.left,0),t.width),r=Math.min(Math.max(e.right,0),t.width),o=Math.min(Math.max(e.top,0),t.height),i=Math.min(Math.max(e.bottom,0),t.height),c=1-n/t.width-r/t.width,u=1-o/t.height-i/t.height,a=(t.width-n-r)/document.documentElement.clientWidth,s=(t.height-o-i)/document.documentElement.clientHeight;return{horizonOverlap:a,verticaOverlap:s,surfaceOverlap:a*s,horizonPresence:c,verticaPresence:u,surfacePresence:c*u}},attachIdentifiers:function(e,n){var r=t(n.surfacePresence,3);e.dataset.onscreenness=String(r);var o=e.classList.contains("onscreen");1!==r||o||e.classList.add("onscreen"),r<1&&o&&e.classList.remove("onscreen");var i=e.classList.contains("crossscreen");r>0&&r<1&&!i&&e.classList.add("crossscreen"),0!==r&&1!==r||!i||e.classList.remove("crossscreen");var c=e.classList.contains("offscreen");0!==r||c||e.classList.add("offscreen"),r>0&&c&&e.classList.remove("offscreen");var u=t(n.surfaceOverlap,3);e.dataset.overlapping=String(u);var a=1===n.verticaOverlap&&1===n.horizonOverlap||1===n.verticaOverlap&&1===n.horizonPresence||1===n.horizonOverlap&&1===n.verticaPresence,s=e.classList.contains("overscreen");a&&!s&&e.classList.add("overscreen"),!a&&s&&e.classList.remove("overscreen")}};var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function c(t,e){return t(e={exports:{}},e.exports),e.exports}var u,a,s,f,l="object",d=function(t){return t&&t.Math==Math&&t},h=d(typeof globalThis==l&&globalThis)||d(typeof window==l&&window)||d(typeof self==l&&self)||d(typeof i==l&&i)||Function("return this")(),p=function(t){try{return!!t()}catch(t){return!0}},v=!p(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),y={}.propertyIsEnumerable,g=Object.getOwnPropertyDescriptor,m={f:g&&!y.call({1:2},1)?function(t){var e=g(this,t);return!!e&&e.enumerable}:y},L=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},b={}.toString,S=function(t){return b.call(t).slice(8,-1)},w="".split,O=p(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==S(t)?w.call(t,""):Object(t)}:Object,E=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},M=function(t){return O(E(t))},P=function(t){return"object"==typeof t?null!==t:"function"==typeof t},T=function(t,e){if(!P(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!P(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!P(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!P(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},j={}.hasOwnProperty,I=function(t,e){return j.call(t,e)},x=h.document,A=P(x)&&P(x.createElement),C=!v&&!p(function(){return 7!=Object.defineProperty(("div",A?x.createElement("div"):{}),"a",{get:function(){return 7}}).a}),N=Object.getOwnPropertyDescriptor,V={f:v?N:function(t,e){if(t=M(t),e=T(e,!0),C)try{return N(t,e)}catch(t){}if(I(t,e))return L(!m.f.call(t,e),t[e])}},_=function(t){if(!P(t))throw TypeError(String(t)+" is not an object");return t},k=Object.defineProperty,z={f:v?k:function(t,e,n){if(_(t),e=T(e,!0),_(n),C)try{return k(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},D=v?function(t,e,n){return z.f(t,e,L(1,n))}:function(t,e,n){return t[e]=n,t},G=function(t,e){try{D(h,t,e)}catch(n){h[t]=e}return e},F=c(function(t){var e=h["__core-js_shared__"]||G("__core-js_shared__",{});(t.exports=function(t,n){return e[t]||(e[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.1.3",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),H=F("native-function-to-string",Function.toString),R=h.WeakMap,q="function"==typeof R&&/native code/.test(H.call(R)),W=0,B=Math.random(),K=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++W+B).toString(36)},Y=F("keys"),J={},Q=h.WeakMap;if(q){var U=new Q,X=U.get,Z=U.has,$=U.set;u=function(t,e){return $.call(U,t,e),e},a=function(t){return X.call(U,t)||{}},s=function(t){return Z.call(U,t)}}else{var tt=Y[f="state"]||(Y[f]=K(f));J[tt]=!0,u=function(t,e){return D(t,tt,e),e},a=function(t){return I(t,tt)?t[tt]:{}},s=function(t){return I(t,tt)}}var et,nt,rt,ot={set:u,get:a,has:s,enforce:function(t){return s(t)?a(t):u(t,{})},getterFor:function(t){return function(e){var n;if(!P(e)||(n=a(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},it=c(function(t){var e=ot.get,n=ot.enforce,r=String(H).split("toString");F("inspectSource",function(t){return H.call(t)}),(t.exports=function(t,e,o,i){var c=!!i&&!!i.unsafe,u=!!i&&!!i.enumerable,a=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof e||I(o,"name")||D(o,"name",e),n(o).source=r.join("string"==typeof e?e:"")),t!==h?(c?!a&&t[e]&&(u=!0):delete t[e],u?t[e]=o:D(t,e,o)):u?t[e]=o:G(e,o)})(Function.prototype,"toString",function(){return"function"==typeof this&&e(this).source||H.call(this)})}),ct=h,ut=function(t){return"function"==typeof t?t:void 0},at=Math.ceil,st=Math.floor,ft=function(t){return isNaN(t=+t)?0:(t>0?st:at)(t)},lt=Math.min,dt=function(t){return t>0?lt(ft(t),9007199254740991):0},ht=Math.max,pt=Math.min,vt=function(t){return function(e,n,r){var o,i=M(e),c=dt(i.length),u=function(t,e){var n=ft(r);return n<0?ht(n+e,0):pt(n,e)}(0,c);if(t&&n!=n){for(;c>u;)if((o=i[u++])!=o)return!0}else for(;c>u;u++)if((t||u in i)&&i[u]===n)return t||u||0;return!t&&-1}},yt=(vt(!0),vt(!1)),gt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),mt={f:Object.getOwnPropertyNames||function(t){return function(t,e){var n,r=M(t),o=0,i=[];for(n in r)!I(J,n)&&I(r,n)&&i.push(n);for(;e.length>o;)I(r,n=e[o++])&&(~yt(i,n)||i.push(n));return i}(t,gt)}},Lt={f:Object.getOwnPropertySymbols},bt=function(t,e){return arguments.length<2?ut(ct[t])||ut(h[t]):ct[t]&&ct[t][e]||h[t]&&h[t][e]}("Reflect","ownKeys")||function(t){var e=mt.f(_(t)),n=Lt.f;return n?e.concat(n(t)):e},St=function(t,e){for(var n=bt(e),r=z.f,o=V.f,i=0;i<n.length;i++){var c=n[i];I(t,c)||r(t,c,o(e,c))}},wt=/#|\.prototype\./,Ot=function(t,e){var n=Mt[Et(t)];return n==Tt||n!=Pt&&("function"==typeof e?p(e):!!e)},Et=Ot.normalize=function(t){return String(t).replace(wt,".").toLowerCase()},Mt=Ot.data={},Pt=Ot.NATIVE="N",Tt=Ot.POLYFILL="P",jt=Ot,It=V.f,xt=Array.isArray||function(t){return"Array"==S(t)},At=!!Object.getOwnPropertySymbols&&!p(function(){return!String(Symbol())}),Ct=h.Symbol,Nt=F("wks"),Vt=Nt[et="species"]||(Nt[et]=At&&Ct[et]||(At?Ct:K)("Symbol."+et)),_t=function(t,e){var n;return xt(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!xt(n.prototype)?P(n)&&null===(n=n[Vt])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},kt=[].push,zt=function(t){var e=1==t,n=2==t,r=3==t,o=4==t,i=6==t,c=5==t||i;return function(u,a,s,f){for(var l,d,h=Object(E(u)),p=O(h),v=function(t,e,n){if(function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function")}(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}(a,s,3),y=dt(p.length),g=0,m=f||_t,L=e?m(u,y):n?m(u,0):void 0;y>g;g++)if((c||g in p)&&(d=v(l=p[g],g,h),t))if(e)L[g]=d;else if(d)switch(t){case 3:return!0;case 5:return l;case 6:return g;case 2:kt.call(L,l)}else if(o)return!1;return i?-1:r||o?o:L}},Dt=[zt(0),zt(1),zt(2),zt(3),zt(4),zt(5),zt(6)][0],Gt=(nt=[].forEach)&&p(function(){nt.call(null,function(){throw 1},1)})?[].forEach:function(t){return Dt(this,t,arguments.length>1?arguments[1]:void 0)};for(var Ft in function(t,e){var n,r,o,i,c,u=t.target,a=t.global,s=t.stat;if(n=a?h:s?h[u]||G(u,{}):(h[u]||{}).prototype)for(r in e){if(i=e[r],o=t.noTargetGet?(c=It(n,r))&&c.value:n[r],!jt(a?r:u+(s?".":"#")+r,t.forced)&&void 0!==o){if(typeof i==typeof o)continue;St(i,o)}(t.sham||o&&o.sham)&&D(i,"sham",!0),it(n,r,i,t)}}({target:"Array",proto:!0,forced:[].forEach!=Gt},{forEach:Gt}),{CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}){var Ht=h[Ft],Rt=Ht&&Ht.prototype;if(Rt&&Rt.forEach!==Gt)try{D(Rt,"forEach",Gt)}catch(i){Rt.forEach=Gt}}var qt=(rt=function(t){t instanceof Array||(t=[t]),t.forEach(function(t){return t()})},{onInteractive:function(t){"loading"===document.readyState?window.addEventListener("DOMContentLoaded",function(e){rt(t)}):rt(t)},onComplete:function(t){"complete"===document.readyState?rt(t):window.addEventListener("load",function(e){rt(t)})}});return function(){var t=function(){r.buildNodeList().forEach(function(t){var e=t.getBoundingClientRect(),n=o.calculatePresence(e);o.attachIdentifiers(t,n)})};window.addEventListener("resize",t,!1),window.addEventListener("scroll",t,!0);let e=new MutationObserver(function(e,n){e.length&&t()});return qt.onInteractive([t,function(){e.observe(document.body,{childList:!0,subtree:!0})}]),{publicAPI:{collect:function(e){r.collect(e),qt.onInteractive([t])},exclude:function(e){qt.onInteractive([function(){o.detachIdentifiers(r.exclude(e))},t])},remove:function(e){qt.onInteractive([function(){o.detachIdentifiers(r.remove(e))},t])},reset:function(){qt.onInteractive([function(){o.detachIdentifiers(r.reset())}])}},testSuite:{getVariables:r.getVariables,trigger:t,liveList:r.buildNodeList,calculate:o.calculatePresence,treat:o.attachIdentifiers}}}().publicAPI});
//# sourceMappingURL=index.js.map
