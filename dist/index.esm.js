const t=function(t,e){return Number(Math.round(t+"e"+e)+"e-"+e)},e=function(t){return t.split(",").map(t=>t.trim().replace(/\s+/g," ")).filter(t=>t.length)},n=function(t){var e=[];return e.push.apply(e,document.querySelectorAll(t)),e};var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function o(t,e){return t(e={exports:{}},e.exports),e.exports}var i,c,a,u,s="object",f=function(t){return t&&t.Math==Math&&t},l=f(typeof globalThis==s&&globalThis)||f(typeof window==s&&window)||f(typeof self==s&&self)||f(typeof r==s&&r)||Function("return this")(),p=function(t){try{return!!t()}catch(t){return!0}},h=!p(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),d={}.propertyIsEnumerable,v=Object.getOwnPropertyDescriptor,y={f:v&&!d.call({1:2},1)?function(t){var e=v(this,t);return!!e&&e.enumerable}:d},g=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},m={}.toString,L=function(t){return m.call(t).slice(8,-1)},b="".split,S=p(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==L(t)?b.call(t,""):Object(t)}:Object,w=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},E=function(t){return S(w(t))},O=function(t){return"object"==typeof t?null!==t:"function"==typeof t},M=function(t,e){if(!O(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!O(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!O(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!O(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},P={}.hasOwnProperty,T=function(t,e){return P.call(t,e)},j=l.document,x=O(j)&&O(j.createElement),A=!h&&!p(function(){return 7!=Object.defineProperty(("div",x?j.createElement("div"):{}),"a",{get:function(){return 7}}).a}),C=Object.getOwnPropertyDescriptor,k={f:h?C:function(t,e){if(t=E(t),e=M(e,!0),A)try{return C(t,e)}catch(t){}if(T(t,e))return g(!y.f.call(t,e),t[e])}},I=function(t){if(!O(t))throw TypeError(String(t)+" is not an object");return t},N=Object.defineProperty,_={f:h?N:function(t,e,n){if(I(t),e=M(e,!0),I(n),A)try{return N(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},z=h?function(t,e,n){return _.f(t,e,g(1,n))}:function(t,e,n){return t[e]=n,t},D=function(t,e){try{z(l,t,e)}catch(n){l[t]=e}return e},V=o(function(t){var e=l["__core-js_shared__"]||D("__core-js_shared__",{});(t.exports=function(t,n){return e[t]||(e[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.1.3",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),G=V("native-function-to-string",Function.toString),F=l.WeakMap,H="function"==typeof F&&/native code/.test(G.call(F)),R=0,q=Math.random(),W=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++R+q).toString(36)},B=V("keys"),K={},Y=l.WeakMap;if(H){var J=new Y,Q=J.get,U=J.has,X=J.set;i=function(t,e){return X.call(J,t,e),e},c=function(t){return Q.call(J,t)||{}},a=function(t){return U.call(J,t)}}else{var Z=B[u="state"]||(B[u]=W(u));K[Z]=!0,i=function(t,e){return z(t,Z,e),e},c=function(t){return T(t,Z)?t[Z]:{}},a=function(t){return T(t,Z)}}var $,tt,et,nt={set:i,get:c,has:a,enforce:function(t){return a(t)?c(t):i(t,{})},getterFor:function(t){return function(e){var n;if(!O(e)||(n=c(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},rt=o(function(t){var e=nt.get,n=nt.enforce,r=String(G).split("toString");V("inspectSource",function(t){return G.call(t)}),(t.exports=function(t,e,o,i){var c=!!i&&!!i.unsafe,a=!!i&&!!i.enumerable,u=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof e||T(o,"name")||z(o,"name",e),n(o).source=r.join("string"==typeof e?e:"")),t!==l?(c?!u&&t[e]&&(a=!0):delete t[e],a?t[e]=o:z(t,e,o)):a?t[e]=o:D(e,o)})(Function.prototype,"toString",function(){return"function"==typeof this&&e(this).source||G.call(this)})}),ot=l,it=function(t){return"function"==typeof t?t:void 0},ct=Math.ceil,at=Math.floor,ut=function(t){return isNaN(t=+t)?0:(t>0?at:ct)(t)},st=Math.min,ft=function(t){return t>0?st(ut(t),9007199254740991):0},lt=Math.max,pt=Math.min,ht=function(t){return function(e,n,r){var o,i=E(e),c=ft(i.length),a=function(t,e){var n=ut(r);return n<0?lt(n+e,0):pt(n,e)}(0,c);if(t&&n!=n){for(;c>a;)if((o=i[a++])!=o)return!0}else for(;c>a;a++)if((t||a in i)&&i[a]===n)return t||a||0;return!t&&-1}},dt=(ht(!0),ht(!1)),vt=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype"),yt={f:Object.getOwnPropertyNames||function(t){return function(t,e){var n,r=E(t),o=0,i=[];for(n in r)!T(K,n)&&T(r,n)&&i.push(n);for(;e.length>o;)T(r,n=e[o++])&&(~dt(i,n)||i.push(n));return i}(t,vt)}},gt={f:Object.getOwnPropertySymbols},mt=function(t,e){return arguments.length<2?it(ot[t])||it(l[t]):ot[t]&&ot[t][e]||l[t]&&l[t][e]}("Reflect","ownKeys")||function(t){var e=yt.f(I(t)),n=gt.f;return n?e.concat(n(t)):e},Lt=function(t,e){for(var n=mt(e),r=_.f,o=k.f,i=0;i<n.length;i++){var c=n[i];T(t,c)||r(t,c,o(e,c))}},bt=/#|\.prototype\./,St=function(t,e){var n=Et[wt(t)];return n==Mt||n!=Ot&&("function"==typeof e?p(e):!!e)},wt=St.normalize=function(t){return String(t).replace(bt,".").toLowerCase()},Et=St.data={},Ot=St.NATIVE="N",Mt=St.POLYFILL="P",Pt=St,Tt=k.f,jt=Array.isArray||function(t){return"Array"==L(t)},xt=!!Object.getOwnPropertySymbols&&!p(function(){return!String(Symbol())}),At=l.Symbol,Ct=V("wks"),kt=Ct[$="species"]||(Ct[$]=xt&&At[$]||(xt?At:W)("Symbol."+$)),It=function(t,e){var n;return jt(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!jt(n.prototype)?O(n)&&null===(n=n[kt])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},Nt=[].push,_t=function(t){var e=1==t,n=2==t,r=3==t,o=4==t,i=6==t,c=5==t||i;return function(a,u,s,f){for(var l,p,h=Object(w(a)),d=S(h),v=function(t,e,n){if(function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function")}(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}(u,s,3),y=ft(d.length),g=0,m=f||It,L=e?m(a,y):n?m(a,0):void 0;y>g;g++)if((c||g in d)&&(p=v(l=d[g],g,h),t))if(e)L[g]=p;else if(p)switch(t){case 3:return!0;case 5:return l;case 6:return g;case 2:Nt.call(L,l)}else if(o)return!1;return i?-1:r||o?o:L}},zt=[_t(0),_t(1),_t(2),_t(3),_t(4),_t(5),_t(6)][0],Dt=(tt=[].forEach)&&p(function(){tt.call(null,function(){throw 1},1)})?[].forEach:function(t){return zt(this,t,arguments.length>1?arguments[1]:void 0)};for(var Vt in function(t,e){var n,r,o,i,c,a=t.target,u=t.global,s=t.stat;if(n=u?l:s?l[a]||D(a,{}):(l[a]||{}).prototype)for(r in e){if(i=e[r],o=t.noTargetGet?(c=Tt(n,r))&&c.value:n[r],!Pt(u?r:a+(s?".":"#")+r,t.forced)&&void 0!==o){if(typeof i==typeof o)continue;Lt(i,o)}(t.sham||o&&o.sham)&&z(i,"sham",!0),rt(n,r,i,t)}}({target:"Array",proto:!0,forced:[].forEach!=Dt},{forEach:Dt}),{CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}){var Gt=l[Vt],Ft=Gt&&Gt.prototype;if(Ft&&Ft.forEach!==Dt)try{z(Ft,"forEach",Dt)}catch(r){Ft.forEach=Dt}}var Ht=(et=function(t){t instanceof Array||(t=[t]),t.forEach(function(t){return t()})},{onInteractive:function(t){"loading"===document.readyState?window.addEventListener("DOMContentLoaded",function(e){et(t)}):et(t)},onComplete:function(t){"complete"===document.readyState?et(t):window.addEventListener("load",function(e){et(t)})}});export default function(){var r="[data-onscreenness]",o=[],i=[],c=function(t){(t.length?n(t.join(",")):[]).forEach(function(t){t&&(t.classList.remove("onscreen"),t.classList.remove("offscreen"),t.classList.remove("crossscreen"),t.classList.remove("overscreen"),delete t.dataset.onscreenness,delete t.dataset.overlapping)})},a=function(t,e){e.forEach(e=>{t.includes(e)||t.push(e)})},u=function(t){var e={left:0-t.left,right:t.right-document.documentElement.clientWidth,top:0-t.top,bottom:t.bottom-document.documentElement.clientHeight},n=Math.min(Math.max(e.left,0),t.width),r=Math.min(Math.max(e.right,0),t.width),o=Math.min(Math.max(e.top,0),t.height),i=Math.min(Math.max(e.bottom,0),t.height),c=1-n/t.width-r/t.width,a=1-o/t.height-i/t.height,u=(t.width-n-r)/document.documentElement.clientWidth,s=(t.height-o-i)/document.documentElement.clientHeight;return{horizonOverlap:u,verticaOverlap:s,surfaceOverlap:u*s,horizonPresence:c,verticaPresence:a,surfacePresence:c*a}},s=function(e,n){var r=t(n.surfacePresence,3);e.dataset.onscreenness=String(r);var o=e.classList.contains("onscreen");1!==r||o||e.classList.add("onscreen"),r<1&&o&&e.classList.remove("onscreen");var i=e.classList.contains("crossscreen");r>0&&r<1&&!i&&e.classList.add("crossscreen"),0!==r&&1!==r||!i||e.classList.remove("crossscreen");var c=e.classList.contains("offscreen");0!==r||c||e.classList.add("offscreen"),r>0&&c&&e.classList.remove("offscreen");var a=t(n.surfaceOverlap,3);e.dataset.overlapping=String(a);var u=1===n.verticaOverlap&&1===n.horizonOverlap||1===n.verticaOverlap&&1===n.horizonPresence||1===n.horizonOverlap&&1===n.verticaPresence,s=e.classList.contains("overscreen");u&&!s&&e.classList.add("overscreen"),!u&&s&&e.classList.remove("overscreen")},f=function(){var t=[r].concat(o),e=n(t.join(",")),c=i.length?n(i.join(",")):[];return e.filter(t=>!c.includes(t))},l=function(){f().forEach(function(t){var e=t.getBoundingClientRect(),n=u(e);s(t,n)})};window.addEventListener("resize",l,!1),window.addEventListener("scroll",l,!0);let p=new MutationObserver(function(t,e){t.length&&l()});return Ht.onInteractive([l,function(){p.observe(document.body,{childList:!0,subtree:!0})}]),{publicAPI:{collect:function(t){var n=e(t);a(o,n)},exclude:function(t){var n=e(t);c(n),a(i,n)},remove:function(t){e(t).forEach(t=>{o.includes(t)&&(c([t]),o.splice(o.indexOf(t),1))})},reset:function(){c(o),o=[],i=[]}},testSuite:{getVariables:function(){return{queryList:o,blackList:i}},triggerEvent:l,makeNodeList:f,calculatePresence:u,treatElement:s,cleanElements:c}}}().publicAPI;
//# sourceMappingURL=index.esm.js.map
