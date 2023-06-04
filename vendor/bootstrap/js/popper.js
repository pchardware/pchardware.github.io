/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(n,t){typeof exports=="object"&&typeof module!="undefined"?module.exports=t():typeof define=="function"&&define.amd?define(t):n.Popper=t()})(this,function(){"use strict";function ui(n){var t=!1,i=0,r=document.createElement("span"),u=new MutationObserver(function(){n();t=!1});return u.observe(r,{attributes:!0}),function(){t||(t=!0,r.setAttribute("x-index",i),i=i+1)}}function fi(n){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1;n()},ft))}}function st(n){return n&&{}.toString.call(n)==="[object Function]"}function i(n,t){if(n.nodeType!==1)return[];var i=window.getComputedStyle(n,null);return t?i[t]:i}function w(n){return n.nodeName==="HTML"?n:n.parentNode||n.host}function f(n){if(!n||["HTML","BODY","#document"].indexOf(n.nodeName)!==-1)return window.document.body;var t=i(n),r=t.overflow,u=t.overflowX,e=t.overflowY;return/(auto|scroll)/.test(r+e+u)?n:f(w(n))}function r(n){var t=n&&n.offsetParent,u=t&&t.nodeName;return!u||u==="BODY"||u==="HTML"?window.document.documentElement:["TD","TABLE"].indexOf(t.nodeName)!==-1&&i(t,"position")==="static"?r(t):t}function ei(n){var t=n.nodeName;return t==="BODY"?!1:t==="HTML"||r(n.firstElementChild)===n}function b(n){return n.parentNode!==null?b(n.parentNode):n}function s(n,t){var i,f;if(!n||!n.nodeType||!t||!t.nodeType)return window.document.documentElement;var e=n.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,o=e?n:t,h=e?t:n,u=document.createRange();return(u.setStart(o,0),u.setEnd(h,0),i=u.commonAncestorContainer,n!==i&&t!==i||o.contains(h))?ei(i)?i:r(i):(f=b(n),f.host?s(f.host,t):s(n,b(t).host))}function u(n){var f=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"top",t=f==="top"?"scrollTop":"scrollLeft",i=n.nodeName,r,u;return i==="BODY"||i==="HTML"?(r=window.document.documentElement,u=window.document.scrollingElement||r,u[t]):n[t]}function oi(n,t){var e=arguments.length>2&&arguments[2]!==undefined?arguments[2]:!1,r=u(t,"top"),f=u(t,"left"),i=e?-1:1;return n.top+=r*i,n.bottom+=r*i,n.left+=f*i,n.right+=f*i,n}function ht(n,t){var i=t==="x"?"Left":"Top",r=i==="Left"?"Right":"Bottom";return+n["border"+i+"Width"].split("px")[0]+ +n["border"+r+"Width"].split("px")[0]}function ct(n,t,i,r){return Math.max(t["offset"+n],t["scroll"+n],i["client"+n],i["offset"+n],i["scroll"+n],e()?i["offset"+n]+r["margin"+(n==="Height"?"Top":"Left")]+r["margin"+(n==="Height"?"Bottom":"Right")]:0)}function lt(){var t=window.document.body,n=window.document.documentElement,i=e()&&window.getComputedStyle(n);return{height:ct("Height",t,n,i),width:ct("Width",t,n,i)}}function t(t){return n({},t,{right:t.left+t.width,bottom:t.top+t.height})}function k(n){var r={},o,s,l;if(e())try{r=n.getBoundingClientRect();o=u(n,"top");s=u(n,"left");r.top+=o;r.left+=s;r.bottom+=o;r.right+=s}catch(p){}else r=n.getBoundingClientRect();var f={left:r.left,top:r.top,width:r.right-r.left,height:r.bottom-r.top},a=n.nodeName==="HTML"?lt():{},v=a.width||n.clientWidth||f.right-f.left,y=a.height||n.clientHeight||f.bottom-f.top,h=n.offsetWidth-v,c=n.offsetHeight-y;return(h||c)&&(l=i(n),h-=ht(l,"x"),c-=ht(l,"y"),f.width-=h,f.height-=c),t(f)}function d(n,r){var y=e(),w=r.nodeName==="HTML",o=k(n),p=k(r),l=f(n),s=i(r),a=+s.borderTopWidth.split("px")[0],v=+s.borderLeftWidth.split("px")[0],u=t({top:o.top-p.top-a,left:o.left-p.left-v,width:o.width,height:o.height}),h,c;return u.marginTop=0,u.marginLeft=0,!y&&w&&(h=+s.marginTop.split("px")[0],c=+s.marginLeft.split("px")[0],u.top-=a-h,u.bottom-=a-h,u.left-=v-c,u.right-=v-c,u.marginTop=h,u.marginLeft=c),(y?r.contains(l):r===l&&l.nodeName!=="BODY")&&(u=oi(u,r)),u}function ci(n){var i=window.document.documentElement,r=d(n,i),f=Math.max(i.clientWidth,window.innerWidth||0),e=Math.max(i.clientHeight,window.innerHeight||0),o=u(i),s=u(i,"left"),h={top:o-r.top+r.marginTop,left:s-r.left+r.marginLeft,width:f,height:e};return t(h)}function at(n){var t=n.nodeName;return t==="BODY"||t==="HTML"?!1:i(n,"position")==="fixed"?!0:at(w(n))}function g(n,t,i,r){var u={top:0,left:0},h=s(n,t),o,e;if(r==="viewport")u=ci(h);else if(o=void 0,r==="scrollParent"?(o=f(w(n)),o.nodeName==="BODY"&&(o=window.document.documentElement)):o=r==="window"?window.document.documentElement:r,e=d(o,h),o.nodeName!=="HTML"||at(h))u=e;else{var c=lt(),l=c.height,a=c.width;u.top+=e.top-e.marginTop;u.bottom=l+e.top;u.left+=e.left-e.marginLeft;u.right=a+e.left}return u.left+=i,u.top+=i,u.right-=i,u.bottom-=i,u}function li(n){var t=n.width,i=n.height;return t*i}function vt(t,i,r,u,f){var l=arguments.length>5&&arguments[5]!==undefined?arguments[5]:0;if(t.indexOf("auto")===-1)return t;var e=g(r,u,l,f),o={top:{width:e.width,height:i.top-e.top},right:{width:e.right-i.right,height:e.height},bottom:{width:e.width,height:e.bottom-i.bottom},left:{width:i.left-e.left,height:e.height}},s=Object.keys(o).map(function(t){return n({key:t},o[t],{area:li(o[t])})}).sort(function(n,t){return t.area-n.area}),h=s.filter(function(n){var t=n.width,i=n.height;return t>=r.clientWidth&&i>=r.clientHeight}),a=h.length>0?h[0].key:s[0].key,c=t.split("-")[1];return a+(c?"-"+c:"")}function yt(n,t,i){var r=s(t,i);return d(i,r)}function pt(n){var t=window.getComputedStyle(n),i=parseFloat(t.marginTop)+parseFloat(t.marginBottom),r=parseFloat(t.marginLeft)+parseFloat(t.marginRight);return{width:n.offsetWidth+r,height:n.offsetHeight+i}}function l(n){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return n.replace(/left|right|bottom|top/g,function(n){return t[n]})}function wt(n,t,i){i=i.split("-")[0];var r=pt(n),e={width:r.width,height:r.height},u=["right","left"].indexOf(i)!==-1,o=u?"top":"left",f=u?"left":"top",s=u?"height":"width",h=u?"width":"height";return e[o]=t[o]+t[s]/2-r[s]/2,e[f]=i===f?t[f]-r[h]:t[l(f)],e}function o(n,t){return Array.prototype.find?n.find(t):n.filter(t)[0]}function ai(n,t,i){if(Array.prototype.findIndex)return n.findIndex(function(n){return n[t]===i});var r=o(n,function(n){return n[t]===i});return n.indexOf(r)}function bt(n,i,r){var u=r===undefined?n:n.slice(0,ai(n,"name",r));return u.forEach(function(n){n.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var r=n.function||n.fn;n.enabled&&st(r)&&(i.offsets.popper=t(i.offsets.popper),i.offsets.reference=t(i.offsets.reference),i=r(i,n))}),i}function vi(){if(!this.state.isDestroyed){var n={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};if(n.offsets.reference=yt(this.state,this.popper,this.reference),n.placement=vt(this.options.placement,n.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),n.originalPlacement=n.placement,n.offsets.popper=wt(this.popper,n.offsets.reference,n.placement),n.offsets.popper.position="absolute",n=bt(this.modifiers,n),this.state.isCreated)this.options.onUpdate(n);else{this.state.isCreated=!0;this.options.onCreate(n)}}}function kt(n,t){return n.some(function(n){var i=n.name,r=n.enabled;return r&&i===t})}function dt(n){for(var i,r,u=[!1,"ms","Webkit","Moz","O"],f=n.charAt(0).toUpperCase()+n.slice(1),t=0;t<u.length-1;t++)if(i=u[t],r=i?""+i+f:n,typeof window.document.body.style[r]!="undefined")return r;return null}function yi(){return this.state.isDestroyed=!0,kt(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.left="",this.popper.style.position="",this.popper.style.top="",this.popper.style[dt("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function gt(n,t,i,r){var e=n.nodeName==="BODY",u=e?window:n;u.addEventListener(t,i,{passive:!0});e||gt(f(u.parentNode),t,i,r);r.push(u)}function pi(n,t,i,r){i.updateBound=r;window.addEventListener("resize",i.updateBound,{passive:!0});var u=f(n);return gt(u,"scroll",i.updateBound,i.scrollParents),i.scrollElement=u,i.eventsEnabled=!0,i}function wi(){this.state.eventsEnabled||(this.state=pi(this.reference,this.options,this.state,this.scheduleUpdate))}function bi(n,t){return window.removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(n){n.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function ki(){this.state.eventsEnabled&&(window.cancelAnimationFrame(this.scheduleUpdate),this.state=bi(this.reference,this.state))}function nt(n){return n!==""&&!isNaN(parseFloat(n))&&isFinite(n)}function tt(n,t){Object.keys(t).forEach(function(i){var r="";["width","height","top","right","bottom","left"].indexOf(i)!==-1&&nt(t[i])&&(r="px");n.style[i]=t[i]+r})}function di(n,t){Object.keys(t).forEach(function(i){var r=t[i];r!==!1?n.setAttribute(i,t[i]):n.removeAttribute(i)})}function gi(n){return tt(n.instance.popper,n.styles),di(n.instance.popper,n.attributes),n.arrowElement&&Object.keys(n.arrowStyles).length&&tt(n.arrowElement,n.arrowStyles),n}function nr(n,t,i,r,u){var f=yt(u,t,n),e=vt(i.placement,f,t,n,i.modifiers.flip.boundariesElement,i.modifiers.flip.padding);return t.setAttribute("x-placement",e),tt(t,{position:"absolute"}),i}function tr(t,i){var d=i.x,g=i.y,f=t.offsets.popper,c=o(t.instance.modifiers,function(n){return n.name==="applyStyle"}).gpuAcceleration,p,w,b;c!==undefined&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var nt=c!==undefined?c:i.gpuAcceleration,tt=r(t.instance.popper),v=k(tt),u={position:f.position},h={left:Math.floor(f.left),top:Math.floor(f.top),bottom:Math.floor(f.bottom),right:Math.floor(f.right)},e=d==="bottom"?"top":"bottom",s=g==="right"?"left":"right",y=dt("transform"),l=void 0,a=void 0;return a=e==="bottom"?-v.height+h.bottom:h.top,l=s==="right"?-v.width+h.right:h.left,nt&&y?(u[y]="translate3d("+l+"px, "+a+"px, 0)",u[e]=0,u[s]=0,u.willChange="transform"):(p=e==="bottom"?-1:1,w=s==="right"?-1:1,u[e]=a*p,u[s]=l*w,u.willChange=e+", "+s),b={"x-placement":t.placement},t.attributes=n({},b,t.attributes),t.styles=n({},u,t.styles),t.arrowStyles=n({},t.offsets.arrow,t.arrowStyles),t}function ni(n,t,i){var u=o(n,function(n){var i=n.name;return i===t}),f=!!u&&n.some(function(n){return n.name===i&&n.enabled&&n.order<u.order}),r,e;return f||(r="`"+t+"`",e="`"+i+"`",console.warn(e+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")),f}function ir(n,r){var f;if(!ni(n.instance.modifiers,"arrow","keepTogether"))return n;if(f=r.element,typeof f=="string"){if(f=n.instance.popper.querySelector(f),!f)return n}else if(!n.instance.popper.contains(f))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),n;var p=n.placement.split("-")[0],v=n.offsets,s=v.popper,e=v.reference,h=["left","right"].indexOf(p)!==-1,l=h?"height":"width",y=h?"Top":"Left",u=y.toLowerCase(),w=h?"left":"top",c=h?"bottom":"right",o=pt(f)[l];e[c]-o<s[u]&&(n.offsets.popper[u]-=s[u]-(e[c]-o));e[u]+o>s[c]&&(n.offsets.popper[u]+=e[u]+o-s[c]);var b=e[u]+e[l]/2-o/2,k=i(n.instance.popper,"margin"+y).replace("px",""),a=b-t(n.offsets.popper)[u]-k;return a=Math.max(Math.min(s[l]-o,a),0),n.arrowElement=f,n.offsets.arrow={},n.offsets.arrow[u]=Math.round(a),n.offsets.arrow[w]="",n}function rr(n){return n==="end"?"start":n==="start"?"end":n}function ti(n){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:!1,t=a.indexOf(n),i=a.slice(t+1).concat(a.slice(0,t));return r?i.reverse():i}function ur(t,i){if(kt(t.instance.modifiers,"inner")||t.flipped&&t.placement===t.originalPlacement)return t;var e=g(t.instance.popper,t.instance.reference,i.padding,i.boundariesElement),r=t.placement.split("-")[0],o=l(r),u=t.placement.split("-")[1]||"",f=[];switch(i.behavior){case v.FLIP:f=[r,o];break;case v.CLOCKWISE:f=ti(r);break;case v.COUNTERCLOCKWISE:f=ti(r,!0);break;default:f=i.behavior}return f.forEach(function(s,h){if(r!==s||f.length===h+1)return t;r=t.placement.split("-")[0];o=l(r);var a=t.offsets.popper,v=t.offsets.reference,c=Math.floor,p=r==="left"&&c(a.right)>c(v.left)||r==="right"&&c(a.left)<c(v.right)||r==="top"&&c(a.bottom)>c(v.top)||r==="bottom"&&c(a.top)<c(v.bottom),w=c(a.left)<c(e.left),b=c(a.right)>c(e.right),k=c(a.top)<c(e.top),d=c(a.bottom)>c(e.bottom),g=r==="left"&&w||r==="right"&&b||r==="top"&&k||r==="bottom"&&d,y=["top","bottom"].indexOf(r)!==-1,nt=!!i.flipVariations&&(y&&u==="start"&&w||y&&u==="end"&&b||!y&&u==="start"&&k||!y&&u==="end"&&d);(p||g||nt)&&(t.flipped=!0,(p||g)&&(r=f[h+1]),nt&&(u=rr(u)),t.placement=r+(u?"-"+u:""),t.offsets.popper=n({},t.offsets.popper,wt(t.instance.popper,t.offsets.reference,t.placement)),t=bt(t.instance.modifiers,t,"flip"))}),t}function fr(n){var o=n.offsets,u=o.popper,i=o.reference,s=n.placement.split("-")[0],r=Math.floor,f=["top","bottom"].indexOf(s)!==-1,e=f?"right":"bottom",t=f?"left":"top",h=f?"width":"height";return u[e]<r(i[t])&&(n.offsets.popper[t]=r(i[t])-u[h]),u[t]>r(i[e])&&(n.offsets.popper[t]=r(i[e])),n}function er(n,i,r,u){var h=n.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),e=+h[1],f=h[2],o,c,s;if(!e)return n;if(f.indexOf("%")===0){o=void 0;switch(f){case"%p":o=r;break;case"%":case"%r":default:o=u}return c=t(o),c[i]/100*e}return f==="vh"||f==="vw"?(s=void 0,s=f==="vh"?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0),s/100*e):e}function or(n,t,i,r){var h=[0,0],c=["right","left"].indexOf(r)!==-1,u=n.split(/(\+|\-)/).map(function(n){return n.trim()}),f=u.indexOf(o(u,function(n){return n.search(/,|\s/)!==-1})),s,e;return u[f]&&u[f].indexOf(",")===-1&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."),s=/\s*,\s*|\s+/,e=f!==-1?[u.slice(0,f).concat([u[f].split(s)[0]]),[u[f].split(s)[1]].concat(u.slice(f+1))]:[u],e=e.map(function(n,r){var f=(r===1?!c:c)?"height":"width",u=!1;return n.reduce(function(n,t){return n[n.length-1]===""&&["+","-"].indexOf(t)!==-1?(n[n.length-1]=t,u=!0,n):u?(n[n.length-1]+=t,u=!1,n):n.concat(t)},[]).map(function(n){return er(n,f,t,i)})}),e.forEach(function(n,t){n.forEach(function(i,r){nt(i)&&(h[t]+=i*(n[r-1]==="-"?-1:1))})}),h}function sr(n,t){var f=t.offset,o=n.placement,e=n.offsets,i=e.popper,s=e.reference,u=o.split("-")[0],r=void 0;return r=nt(+f)?[+f,0]:or(f,i,s,u),u==="left"?(i.top+=r[0],i.left-=r[1]):u==="right"?(i.top+=r[0],i.left+=r[1]):u==="top"?(i.left+=r[0],i.top-=r[1]):u==="bottom"&&(i.left+=r[0],i.top+=r[1]),n.popper=i,n}function hr(t,i){var e=i.boundariesElement||r(t.instance.popper),f;t.instance.reference===e&&(e=r(e));f=g(t.instance.popper,t.instance.reference,i.padding,e);i.boundaries=f;var o=i.priority,u=t.offsets.popper,s={primary:function(n){var t=u[n];return u[n]<f[n]&&!i.escapeWithReference&&(t=Math.max(u[n],f[n])),c({},n,t)},secondary:function(n){var t=n==="right"?"left":"top",r=u[t];return u[n]>f[n]&&!i.escapeWithReference&&(r=Math.min(u[t],f[n]-(n==="right"?u.width:u.height))),c({},t,r)}};return o.forEach(function(t){var i=["left","top"].indexOf(t)!==-1?"primary":"secondary";u=n({},u,s[i](t))}),t.offsets.popper=u,t}function cr(t){var u=t.placement,l=u.split("-")[0],f=u.split("-")[1];if(f){var e=t.offsets,r=e.reference,o=e.popper,s=["bottom","top"].indexOf(l)!==-1,i=s?"left":"top",h=s?"width":"height",a={start:c({},i,r[i]),end:c({},i,r[i]+r[h]-o[h])};t.offsets.popper=n({},o,a[f])}return t}function lr(n){if(!ni(n.instance.modifiers,"hide","preventOverflow"))return n;var t=n.offsets.reference,i=o(n.instance.modifiers,function(n){return n.name==="preventOverflow"}).boundaries;if(t.bottom<i.top||t.left>i.right||t.top>i.bottom||t.right<i.left){if(n.hide===!0)return n;n.hide=!0;n.attributes["x-out-of-boundaries"]=""}else{if(n.hide===!1)return n;n.hide=!1;n.attributes["x-out-of-boundaries"]=!1}return n}function ar(n){var u=n.placement,i=u.split("-")[0],f=n.offsets,r=f.popper,o=f.reference,e=["left","right"].indexOf(i)!==-1,s=["top","left"].indexOf(i)===-1;return r[e?"left":"top"]=o[i]-(s?r[e?"width":"height"]:0),n.placement=l(u),n.offsets.popper=t(r),n}for(var et,ot,h,e,it,a,v,ii=["native code","[object MutationObserverConstructor]"],ri=function(n){return ii.some(function(t){return(n||"").toString().indexOf(t)>-1})},rt=typeof window!="undefined",ut=["Edge","Trident","Firefox"],ft=0,p=0;p<ut.length;p+=1)if(rt&&navigator.userAgent.indexOf(ut[p])>=0){ft=1;break}et=rt&&ri(window.MutationObserver);ot=et?ui:fi;h=undefined;e=function(){return h===undefined&&(h=navigator.appVersion.indexOf("MSIE 10")!==-1),h};var si=function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function");},hi=function(){function n(n,t){for(var i,r=0;r<t.length;r++)i=t[r],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}return function(t,i,r){return i&&n(t.prototype,i),r&&n(t,r),t}}(),c=function(n,t,i){return t in n?Object.defineProperty(n,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[t]=i,n},n=Object.assign||function(n){for(var i,r,t=1;t<arguments.length;t++){i=arguments[t];for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n[r]=i[r])}return n};it=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"];a=it.slice(3);v={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};var vr={shift:{order:100,enabled:!0,fn:cr},offset:{order:200,enabled:!0,fn:sr,offset:0},preventOverflow:{order:300,enabled:!0,fn:hr,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:fr},arrow:{order:500,enabled:!0,fn:ir,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:ur,behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:ar},hide:{order:800,enabled:!0,fn:lr},computeStyle:{order:850,enabled:!0,fn:tr,gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:gi,onLoad:nr,gpuAcceleration:undefined}},yr={placement:"bottom",eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:vr},y=function(){function t(i,r){var u=this,f=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},e;si(this,t);this.scheduleUpdate=function(){return requestAnimationFrame(u.update)};this.update=ot(this.update.bind(this));this.options=n({},t.Defaults,f);this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]};this.reference=i.jquery?i[0]:i;this.popper=r.jquery?r[0]:r;this.options.modifiers={};Object.keys(n({},t.Defaults.modifiers,f.modifiers)).forEach(function(i){u.options.modifiers[i]=n({},t.Defaults.modifiers[i]||{},f.modifiers?f.modifiers[i]:{})});this.modifiers=Object.keys(this.options.modifiers).map(function(t){return n({name:t},u.options.modifiers[t])}).sort(function(n,t){return n.order-t.order});this.modifiers.forEach(function(n){if(n.enabled&&st(n.onLoad))n.onLoad(u.reference,u.popper,u.options,n,u.state)});this.update();e=this.options.eventsEnabled;e&&this.enableEventListeners();this.state.eventsEnabled=e}return hi(t,[{key:"update",value:function(){return vi.call(this)}},{key:"destroy",value:function(){return yi.call(this)}},{key:"enableEventListeners",value:function(){return wi.call(this)}},{key:"disableEventListeners",value:function(){return ki.call(this)}}]),t}();return y.Utils=(typeof window!="undefined"?window:global).PopperUtils,y.placements=it,y.Defaults=yr,y})