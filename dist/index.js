!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).onScreenness=e()}(this,function(){"use strict";var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,e){return t(e={exports:{}},e.exports),e.exports}var n,r,o,i="object",c=function(t){return t&&t.Math==Math&&t},u=c(typeof globalThis==i&&globalThis)||c(typeof window==i&&window)||c(typeof self==i&&self)||c(typeof t==i&&t)||Function("return this")(),a=function(t){try{return!!t()}catch(t){return!0}},l=!a(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),s={}.propertyIsEnumerable,f=Object.getOwnPropertyDescriptor,p={f:f&&!s.call({1:2},1)?function(t){var e=f(this,t);return!!e&&e.enumerable}:s},h=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}},d={}.toString,v=function(t){return d.call(t).slice(8,-1)},g="".split,y=a(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==v(t)?g.call(t,""):Object(t)}:Object,m=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},b=function(t){return y(m(t))},S=function(t){return"object"==typeof t?null!==t:"function"==typeof t},x=function(t,e){if(!S(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!S(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!S(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!S(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},E={}.hasOwnProperty,L=function(t,e){return E.call(t,e)},w=u.document,O=S(w)&&S(w.createElement),I=function(t){return O?w.createElement(t):{}},M=!l&&!a(function(){return 7!=Object.defineProperty(I("div"),"a",{get:function(){return 7}}).a}),A=Object.getOwnPropertyDescriptor,T={f:l?A:function(t,e){if(t=b(t),e=x(e,!0),M)try{return A(t,e)}catch(t){}if(L(t,e))return h(!p.f.call(t,e),t[e])}},j=function(t){if(!S(t))throw TypeError(String(t)+" is not an object");return t},N=Object.defineProperty,P={f:l?N:function(t,e,n){if(j(t),e=x(e,!0),j(n),M)try{return N(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},_=l?function(t,e,n){return P.f(t,e,h(1,n))}:function(t,e,n){return t[e]=n,t},R=function(t,e){try{_(u,t,e)}catch(n){u[t]=e}return e},C=e(function(t){var e=u["__core-js_shared__"]||R("__core-js_shared__",{});(t.exports=function(t,n){return e[t]||(e[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.1.3",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),k=C("native-function-to-string",Function.toString),F=u.WeakMap,V="function"==typeof F&&/native code/.test(k.call(F)),G=0,z=Math.random(),D=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++G+z).toString(36))},$=C("keys"),H=function(t){return $[t]||($[t]=D(t))},W={},q=u.WeakMap;if(V){var B=new q,Y=B.get,U=B.has,X=B.set;n=function(t,e){return X.call(B,t,e),e},r=function(t){return Y.call(B,t)||{}},o=function(t){return U.call(B,t)}}else{var K=H("state");W[K]=!0,n=function(t,e){return _(t,K,e),e},r=function(t){return L(t,K)?t[K]:{}},o=function(t){return L(t,K)}}var J={set:n,get:r,has:o,enforce:function(t){return o(t)?r(t):n(t,{})},getterFor:function(t){return function(e){var n;if(!S(e)||(n=r(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}},Q=e(function(t){var e=J.get,n=J.enforce,r=String(k).split("toString");C("inspectSource",function(t){return k.call(t)}),(t.exports=function(t,e,o,i){var c=!!i&&!!i.unsafe,a=!!i&&!!i.enumerable,l=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof e||L(o,"name")||_(o,"name",e),n(o).source=r.join("string"==typeof e?e:"")),t!==u?(c?!l&&t[e]&&(a=!0):delete t[e],a?t[e]=o:_(t,e,o)):a?t[e]=o:R(e,o)})(Function.prototype,"toString",function(){return"function"==typeof this&&e(this).source||k.call(this)})}),Z=Math.ceil,tt=Math.floor,et=function(t){return isNaN(t=+t)?0:(t>0?tt:Z)(t)},nt=Math.min,rt=function(t){return t>0?nt(et(t),9007199254740991):0},ot=Math.max,it=Math.min,ct=function(t,e){var n=et(t);return n<0?ot(n+e,0):it(n,e)},ut=function(t){return function(e,n,r){var o,i=b(e),c=rt(i.length),u=ct(r,c);if(t&&n!=n){for(;c>u;)if((o=i[u++])!=o)return!0}else for(;c>u;u++)if((t||u in i)&&i[u]===n)return t||u||0;return!t&&-1}},at=ut(!1),lt=function(t,e){var n,r=b(t),o=0,i=[];for(n in r)!L(W,n)&&L(r,n)&&i.push(n);for(;e.length>o;)L(r,n=e[o++])&&(~at(i,n)||i.push(n));return i},st=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],ft=st.concat("length","prototype"),pt={f:Object.getOwnPropertyNames||function(t){return lt(t,ft)}},ht={f:Object.getOwnPropertySymbols},dt=u.Reflect,vt=dt&&dt.ownKeys||function(t){var e=pt.f(j(t)),n=ht.f;return n?e.concat(n(t)):e},gt=function(t,e){for(var n=vt(e),r=P.f,o=T.f,i=0;i<n.length;i++){var c=n[i];L(t,c)||r(t,c,o(e,c))}},yt=/#|\.prototype\./,mt=function(t,e){var n=St[bt(t)];return n==Et||n!=xt&&("function"==typeof e?a(e):!!e)},bt=mt.normalize=function(t){return String(t).replace(yt,".").toLowerCase()},St=mt.data={},xt=mt.NATIVE="N",Et=mt.POLYFILL="P",Lt=mt,wt=T.f,Ot=function(t,e){var n,r,o,i,c,a=t.target,l=t.global,s=t.stat;if(n=l?u:s?u[a]||R(a,{}):(u[a]||{}).prototype)for(r in e){if(i=e[r],o=t.noTargetGet?(c=wt(n,r))&&c.value:n[r],!Lt(l?r:a+(s?".":"#")+r,t.forced)&&void 0!==o){if(typeof i==typeof o)continue;gt(i,o)}(t.sham||o&&o.sham)&&_(i,"sham",!0),Q(n,r,i,t)}},It=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t},Mt=function(t){return Object(m(t))},At=Array.isArray||function(t){return"Array"==v(t)},Tt=!!Object.getOwnPropertySymbols&&!a(function(){return!String(Symbol())}),jt=u.Symbol,Nt=C("wks"),Pt=function(t){return Nt[t]||(Nt[t]=Tt&&jt[t]||(Tt?jt:D)("Symbol."+t))},_t=Pt("species"),Rt=function(t,e){var n;return At(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!At(n.prototype)?S(n)&&null===(n=n[_t])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===e?0:e)},Ct=function(t,e){var n=1==t,r=2==t,o=3==t,i=4==t,c=6==t,u=5==t||c,a=e||Rt;return function(e,l,s){for(var f,p,h=Mt(e),d=y(h),v=function(t,e,n){if(It(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}(l,s,3),g=rt(d.length),m=0,b=n?a(e,g):r?a(e,0):void 0;g>m;m++)if((u||m in d)&&(p=v(f=d[m],m,h),t))if(n)b[m]=p;else if(p)switch(t){case 3:return!0;case 5:return f;case 6:return m;case 2:b.push(f)}else if(i)return!1;return c?-1:o||i?i:b}},kt=Pt("species"),Ft=function(t){return!a(function(){var e=[];return(e.constructor={})[kt]=function(){return{foo:1}},1!==e[t](Boolean).foo})},Vt=Ct(2);Ot({target:"Array",proto:!0,forced:!Ft("filter")},{filter:function(t){return Vt(this,t,arguments[1])}});var Gt=function(t,e){var n=[][t];return!n||!a(function(){n.call(null,e||function(){throw 1},1)})},zt=Ct(0),Dt=Gt("forEach")?function(t){return zt(this,t,arguments[1])}:[].forEach;Ot({target:"Array",proto:!0,forced:[].forEach!=Dt},{forEach:Dt});var $t=Object.keys||function(t){return lt(t,st)},Ht=l?Object.defineProperties:function(t,e){j(t);for(var n,r=$t(e),o=r.length,i=0;o>i;)P.f(t,n=r[i++],e[n]);return t},Wt=u.document,qt=Wt&&Wt.documentElement,Bt=H("IE_PROTO"),Yt=function(){},Ut=function(){var t,e=I("iframe"),n=st.length;for(e.style.display="none",qt.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),Ut=t.F;n--;)delete Ut.prototype[st[n]];return Ut()},Xt=Object.create||function(t,e){var n;return null!==t?(Yt.prototype=j(t),n=new Yt,Yt.prototype=null,n[Bt]=t):n=Ut(),void 0===e?n:Ht(n,e)};W[Bt]=!0;var Kt=Pt("unscopables"),Jt=Array.prototype;null==Jt[Kt]&&_(Jt,Kt,Xt(null));var Qt=ut(!0);Ot({target:"Array",proto:!0},{includes:function(t){return Qt(this,t,arguments.length>1?arguments[1]:void 0)}}),function(t){Jt[Kt][t]=!0}("includes");var Zt=ut(!1),te=[].indexOf,ee=!!te&&1/[1].indexOf(1,-0)<0,ne=Gt("indexOf");Ot({target:"Array",proto:!0,forced:ee||ne},{indexOf:function(t){return ee?te.apply(this,arguments)||0:Zt(this,t,arguments[1])}});var re=[].join,oe=y!=Object,ie=Gt("join",",");Ot({target:"Array",proto:!0,forced:oe||ie},{join:function(t){return re.call(b(this),void 0===t?",":t)}});var ce=function(t,e,n){var r=x(e);r in t?P.f(t,r,h(0,n)):t[r]=n},ue=Math.max,ae=Math.min;Ot({target:"Array",proto:!0,forced:!Ft("splice")},{splice:function(t,e){var n,r,o,i,c,u,a=Mt(this),l=rt(a.length),s=ct(t,l),f=arguments.length;if(0===f?n=r=0:1===f?(n=0,r=l-s):(n=f-2,r=ae(ue(et(e),0),l-s)),l+n-r>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(o=Rt(a,r),i=0;i<r;i++)(c=s+i)in a&&ce(o,i,a[c]);if(o.length=r,n<r){for(i=s;i<l-r;i++)u=i+n,(c=i+r)in a?a[u]=a[c]:delete a[u];for(i=l;i>l-r+n;i--)delete a[i-1]}else if(n>r)for(i=l-r;i>s;i--)u=i+n-1,(c=i+r-1)in a?a[u]=a[c]:delete a[u];for(i=0;i<n;i++)a[i+s]=arguments[i+2];return a.length=l-r+n,o}});var le=Pt("match"),se=function(t){var e;return S(t)&&(void 0!==(e=t[le])?!!e:"RegExp"==v(t))},fe=Pt("match");Ot({target:"String",proto:!0,forced:!function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[fe]=!1,"/./"[t](e)}catch(t){}}return!1}("includes")},{includes:function(t){return!!~function(t,e,n){if(se(e))throw TypeError("String.prototype."+n+" doesn't accept regex");return String(m(t))}(this,t,"includes").indexOf(t,arguments.length>1?arguments[1]:void 0)}});for(var pe in{CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}){var he=u[pe],de=he&&he.prototype;if(de&&de.forEach!==Dt)try{_(de,"forEach",Dt)}catch(t){de.forEach=Dt}}var ve=Ct(1);Ot({target:"Array",proto:!0,forced:!Ft("map")},{map:function(t){return ve(this,t,arguments[1])}});var ge=Object.setPrototypeOf||("__proto__"in{}?function(){var t,e=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),e=n instanceof Array}catch(t){}return function(n,r){return function(t,e){if(j(t),!S(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype")}(n,r),e?t.call(n,r):n.__proto__=r,n}}():void 0),ye="\t\n\v\f\r                　\u2028\u2029\ufeff",me="["+ye+"]",be=RegExp("^"+me+me+"*"),Se=RegExp(me+me+"*$"),xe=function(t,e){return t=String(m(t)),1&e&&(t=t.replace(be,"")),2&e&&(t=t.replace(Se,"")),t},Ee=pt.f,Le=T.f,we=P.f,Oe=u.Number,Ie=Oe.prototype,Me="Number"==v(Xt(Ie)),Ae="trim"in String.prototype,Te=function(t){var e,n,r,o,i,c,u,a,l=x(t,!1);if("string"==typeof l&&l.length>2)if(43===(e=(l=Ae?l.trim():xe(l,3)).charCodeAt(0))||45===e){if(88===(n=l.charCodeAt(2))||120===n)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+l}for(c=(i=l.slice(2)).length,u=0;u<c;u++)if((a=i.charCodeAt(u))<48||a>o)return NaN;return parseInt(i,r)}return+l};if(Lt("Number",!Oe(" 0o1")||!Oe("0b1")||Oe("+0x1"))){for(var je,Ne=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof Ne&&(Me?a(function(){Ie.valueOf.call(n)}):"Number"!=v(n))?function(t,e,n){var r,o=e.constructor;return o!==n&&"function"==typeof o&&(r=o.prototype)!==n.prototype&&S(r)&&ge&&ge(t,r),t}(new Oe(Te(e)),n,Ne):Te(e)},Pe=l?Ee(Oe):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),_e=0;Pe.length>_e;_e++)L(Oe,je=Pe[_e])&&!L(Ne,je)&&we(Ne,je,Le(Oe,je));Ne.prototype=Ie,Ie.constructor=Ne,Q(u,"Number",Ne)}var Re,Ce,ke=RegExp.prototype.exec,Fe=String.prototype.replace,Ve=ke,Ge=(Re=/a/,Ce=/b*/g,ke.call(Re,"a"),ke.call(Ce,"a"),0!==Re.lastIndex||0!==Ce.lastIndex),ze=void 0!==/()??/.exec("")[1];(Ge||ze)&&(Ve=function(t){var e,n,r,o,i=this;return ze&&(n=new RegExp("^"+i.source+"$(?!\\s)",function(){var t=j(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}.call(i))),Ge&&(e=i.lastIndex),r=ke.call(i,t),Ge&&r&&(i.lastIndex=i.global?r.index+r[0].length:e),ze&&r&&r.length>1&&Fe.call(r[0],n,function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0)}),r});var De=Ve;Ot({target:"RegExp",proto:!0,forced:/./.exec!==De},{exec:De});var $e=Pt("species"),He=!a(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),We=!a(function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}),qe=function(t,e,n,r){var o=Pt(t),i=!a(function(){var e={};return e[o]=function(){return 7},7!=""[t](e)}),c=i&&!a(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[$e]=function(){return n}),n[o](""),!e});if(!i||!c||"replace"===t&&!He||"split"===t&&!We){var u=/./[o],l=n(o,""[t],function(t,e,n,r,o){return e.exec===De?i&&!o?{done:!0,value:u.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),s=l[0],f=l[1];Q(String.prototype,t,s),Q(RegExp.prototype,o,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}),r&&_(RegExp.prototype[o],"sham",!0)}},Be=function(t,e,n){return e+(n?function(t,e,n){var r,o,i=String(m(t)),c=et(e),u=i.length;return c<0||c>=u?n?"":void 0:(r=i.charCodeAt(c))<55296||r>56319||c+1===u||(o=i.charCodeAt(c+1))<56320||o>57343?n?i.charAt(c):r:n?i.slice(c,c+2):o-56320+(r-55296<<10)+65536}(t,e,!0).length:1)},Ye=function(t,e){var n=t.exec;if("function"==typeof n){var r=n.call(t,e);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==v(t))throw TypeError("RegExp#exec called on incompatible receiver");return De.call(t,e)},Ue=Math.max,Xe=Math.min,Ke=Math.floor,Je=/\$([$&'`]|\d\d?|<[^>]*>)/g,Qe=/\$([$&'`]|\d\d?)/g;qe("replace",2,function(t,e,n){return[function(n,r){var o=m(this),i=null==n?void 0:n[t];return void 0!==i?i.call(n,o,r):e.call(String(o),n,r)},function(t,o){var i=n(e,t,this,o);if(i.done)return i.value;var c=j(t),u=String(this),a="function"==typeof o;a||(o=String(o));var l=c.global;if(l){var s=c.unicode;c.lastIndex=0}for(var f=[];;){var p=Ye(c,u);if(null===p)break;if(f.push(p),!l)break;""===String(p[0])&&(c.lastIndex=Be(u,rt(c.lastIndex),s))}for(var h,d="",v=0,g=0;g<f.length;g++){p=f[g];for(var y=String(p[0]),m=Ue(Xe(et(p.index),u.length),0),b=[],S=1;S<p.length;S++)b.push(void 0===(h=p[S])?h:String(h));var x=p.groups;if(a){var E=[y].concat(b,m,u);void 0!==x&&E.push(x);var L=String(o.apply(void 0,E))}else L=r(y,u,m,b,x,o);m>=v&&(d+=u.slice(v,m)+L,v=m+y.length)}return d+u.slice(v)}];function r(t,n,r,o,i,c){var u=r+t.length,a=o.length,l=Qe;return void 0!==i&&(i=Mt(i),l=Je),e.call(c,l,function(e,c){var l;switch(c.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,r);case"'":return n.slice(u);case"<":l=i[c.slice(1,-1)];break;default:var s=+c;if(0===s)return e;if(s>a){var f=Ke(s/10);return 0===f?e:f<=a?void 0===o[f-1]?c.charAt(1):o[f-1]+c.charAt(1):e}l=o[s-1]}return void 0===l?"":l})}});var Ze=Pt("species"),tn=[].push,en=Math.min,nn=!a(function(){return!RegExp(4294967295,"y")});qe("split",2,function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(m(this)),o=void 0===n?4294967295:n>>>0;if(0===o)return[];if(void 0===t)return[r];if(!se(t))return e.call(r,t,o);for(var i,c,u,a=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),s=0,f=new RegExp(t.source,l+"g");(i=De.call(f,r))&&!((c=f.lastIndex)>s&&(a.push(r.slice(s,i.index)),i.length>1&&i.index<r.length&&tn.apply(a,i.slice(1)),u=i[0].length,s=c,a.length>=o));)f.lastIndex===i.index&&f.lastIndex++;return s===r.length?!u&&f.test("")||a.push(""):a.push(r.slice(s)),a.length>o?a.slice(0,o):a}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var o=m(this),i=null==e?void 0:e[t];return void 0!==i?i.call(e,o,n):r.call(String(o),e,n)},function(t,o){var i=n(r,t,this,o,r!==e);if(i.done)return i.value;var c=j(t),u=String(this),a=function(t,e){var n,r=j(t).constructor;return void 0===r||null==(n=j(r)[Ze])?e:It(n)}(c,RegExp),l=c.unicode,s=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(nn?"y":"g"),f=new a(nn?c:"^(?:"+c.source+")",s),p=void 0===o?4294967295:o>>>0;if(0===p)return[];if(0===u.length)return null===Ye(f,u)?[u]:[];for(var h=0,d=0,v=[];d<u.length;){f.lastIndex=nn?d:0;var g,y=Ye(f,nn?u:u.slice(d));if(null===y||(g=en(rt(f.lastIndex+(nn?0:d)),u.length))===h)d=Be(u,d,l);else{if(v.push(u.slice(h,d)),v.length===p)return v;for(var m=1;m<=y.length-1;m++)if(v.push(y[m]),v.length===p)return v;d=h=g}}return v.push(u.slice(h)),v}]},!nn);var rn;Ot({target:"String",proto:!0,forced:(rn="trim",a(function(){return!!ye[rn]()||"​᠎"!="​᠎"[rn]()||ye[rn].name!==rn}))},{trim:function(){return xe(this,3)}});var on=function(t,e){return Number(Math.round(t+"e"+e)+"e-"+e)},cn=function(t){return t.split(",").map(function(t){return t.trim().replace(/\s+/g," ")}).filter(function(t){return t.length})},un=function(t){var e=[];return e.push.apply(e,document.querySelectorAll(t)),e};return function(){var t=[],e=[],n=function(t){(t.length?un(t.join(",")):[]).forEach(function(t){t&&(t.classList.remove("onscreen"),t.classList.remove("offscreen"),t.classList.remove("crossscreen"),t.classList.remove("overscreen"),delete t.dataset.onscreenness,delete t.dataset.overlapping)})},r=function(t,e){e.forEach(function(e){t.includes(e)||t.push(e)})},o=function(t){var e={left:0-t.left,right:t.right-document.documentElement.clientWidth,top:0-t.top,bottom:t.bottom-document.documentElement.clientHeight},n=Math.min(Math.max(e.left,0),t.width),r=Math.min(Math.max(e.right,0),t.width),o=Math.min(Math.max(e.top,0),t.height),i=Math.min(Math.max(e.bottom,0),t.height),c=1-n/t.width-r/t.width,u=1-o/t.height-i/t.height,a=(t.width-n-r)/document.documentElement.clientWidth,l=(t.height-o-i)/document.documentElement.clientHeight;return{horizonOverlap:a,verticaOverlap:l,surfaceOverlap:a*l,horizonPresence:c,verticaPresence:u,surfacePresence:c*u}},i=function(t,e){var n=on(e.surfacePresence,3);t.dataset.onscreenness=String(n);var r=t.classList.contains("onscreen");1!==n||r||t.classList.add("onscreen"),n<1&&r&&t.classList.remove("onscreen");var o=t.classList.contains("crossscreen");n>0&&n<1&&!o&&t.classList.add("crossscreen"),0!==n&&1!==n||!o||t.classList.remove("crossscreen");var i=t.classList.contains("offscreen");0!==n||i||t.classList.add("offscreen"),n>0&&i&&t.classList.remove("offscreen");var c=on(e.surfaceOverlap,3);t.dataset.overlapping=String(c);var u=1===e.verticaOverlap&&1===e.horizonOverlap||1===e.verticaOverlap&&1===e.horizonPresence||1===e.horizonOverlap&&1===e.verticaPresence,a=t.classList.contains("overscreen");u&&!a&&t.classList.add("overscreen"),!u&&a&&t.classList.remove("overscreen")},c=function(){var n=t.length?un(t.join(",")):[],r=e.length?un(e.join(",")):[];return n.length?n.filter(function(t){return!r.includes(t)}):[]},u=function(){c().forEach(function(t){var e=t.getBoundingClientRect(),n=o(e);i(t,n)})};document.addEventListener("readystatechange",function(){"interactive"===document.readyState&&u()},!1),window.addEventListener("resize",u,!1),window.addEventListener("scroll",u,!0);var a=new MutationObserver(function(t,e){t.length&&u()});return window.addEventListener("load",function(){a.observe(document.body,{childList:!0,subtree:!0})},!0),{publicAPI:{collect:function(e){var n=cn(e);r(t,n)},exclude:function(t){var o=cn(t);n(o),r(e,o)},remove:function(e){cn(e).forEach(function(e){t.includes(e)&&(n([e]),t.splice(t.indexOf(e),1))})},reset:function(){n(t),t=[],e=[]}},testSuite:{getVariables:function(){return{queryList:t,blackList:e}},triggerEvent:u,makeNodeList:c,calculatePresence:o,treatElement:i,cleanElements:n}}}().publicAPI});
