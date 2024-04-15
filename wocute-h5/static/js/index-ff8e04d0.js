import{c as e,d as a,p as t,G as i,aP as l,U as s,e as o,T as n,w as u,P as r,Q as v,aQ as c,S as h,V as p,W as d,C as f,D as g,L as w,g as m,t as S,n as b,a as x,a9 as y,M as C,N as M,aR as $,aS as z,j as T,a4 as I}from "./index-ee55951f.js";const[P,D]=e("swipe"),O={loop:S,width:b,height:b,vertical:Boolean,autoplay:x(0),duration:x(500),touchable:S,lazyRender:Boolean,initialSwipe:x(0),indicatorColor:String,showIndicators:S,stopPropagation:S},X=Symbol(P);const Y=T(a({name:P,props:O,emits:["change","dragStart","dragEnd"],setup(e, {emit:a,slots:S}){const b=t(),x=t(),T=i({rect:null,width:0,height:0,offset:0,active:0,swiping:!1});let I=!1;const P=l(),{children:O,linkChildren:Y}=s(X),k=o((()=>O.length)),E=o((()=>T[e.vertical?"height":"width"])),R=o((()=>e.vertical?P.deltaY.value:P.deltaX.value)),j=o((()=>{if(T.rect){return(e.vertical?T.rect.height:T.rect.width)-E.value*k.value}return 0})),B=o((()=>E.value?Math.ceil(Math.abs(j.value)/E.value):k.value)),Q=o((()=>k.value*E.value)),V=o((()=>(T.active+k.value)%k.value)),W=o((()=>{const a=e.vertical?"vertical":"horizontal";return P.direction.value===a})),A=o((()=>{const a={transitionDuration:`${T.swiping?0:e.duration}ms`,transform:`translate${e.vertical?"Y":"X"}(${T.offset}px)`};if(E.value){const t=e.vertical?"height":"width",i=e.vertical?"width":"height";a[t]=`${Q.value}px`,a[i]=e[i]?`${e[i]}px`:""}return a})),G=(a, t=0)=>{let i=a*E.value;e.loop||(i=Math.min(i,-j.value));let l=t-i;return e.loop||(l=z(l,j.value,0)),l},H=({pace:t=0,offset:i=0,emitChange:l})=>{if(k.value<=1)return;const{active:s}=T,o=(a=>{const{active:t}=T;return a?e.loop?z(t+a,-1,k.value):z(t+a,0,B.value):t})(t),n=G(o,i);if(e.loop){if(O[0]&&n!==j.value){const e=n<j.value;O[0].setOffset(e?Q.value:0)}if(O[k.value-1]&&0!==n){const e=n>0;O[k.value-1].setOffset(e?-Q.value:0)}}T.active=o,T.offset=n,l&&o!==s&&a("change",V.value)},L=()=>{T.swiping=!0,T.active<=-1?H({pace:k.value}):T.active>=k.value&&H({pace:-k.value})},N=()=>{L(),P.reset(),y((()=>{T.swiping=!1,H({pace:1,emitChange:!0})}))};let U;const q=()=>clearTimeout(U),F=()=>{q(),+e.autoplay>0&&k.value>1&&(U=setTimeout((()=>{N(),F()}),+e.autoplay))},J=(a=+e.initialSwipe)=>{if(!b.value)return;const t=()=>{var t,i;if(!C(b)){const a={width:b.value.offsetWidth,height:b.value.offsetHeight};T.rect=a,T.width=+(null!=(t=e.width)?t:a.width),T.height=+(null!=(i=e.height)?i:a.height)}k.value&&-1===(a=Math.min(k.value-1,a))&&(a=k.value-1),T.active=a,T.swiping=!0,T.offset=G(a),O.forEach((e=>{e.setOffset(0)})),F()};C(b)?M().then(t):t()},K=()=>J(T.active);let Z;const _= a=>{!e.touchable||a.touches.length>1||(P.start(a),I=!1,Z=Date.now(),q(),L())},ee=()=>{if(!e.touchable||!T.swiping)return;const t=Date.now()-Z,i=R.value/t;if((Math.abs(i)>.25||Math.abs(R.value)>E.value/2)&&W.value){const a=e.vertical?P.offsetY.value:P.offsetX.value;let t=0;t=e.loop?a>0?R.value>0?-1:1:0:-Math[R.value>0?"ceil":"floor"](R.value/E.value),H({pace:t,emitChange:!0})}else R.value&&H({pace:0});I=!1,T.swiping=!1,a("dragEnd",{index:V.value}),F()},ae=(a, t)=>{const i=t===V.value,l=i?{backgroundColor:e.indicatorColor}:void 0;return m("i",{style:l,class:D("indicator",{active:i})},null)};return n({prev:()=>{L(),P.reset(),y((()=>{T.swiping=!1,H({pace:-1,emitChange:!0})}))},next:N,state:T,resize:K,swipeTo:(a, t={})=>{L(),P.reset(),y((()=>{let i;i=e.loop&&a===k.value?0===T.active?0:a:a%k.value,t.immediate?y((()=>{T.swiping=!1})):T.swiping=!1,H({pace:i-T.active,emitChange:!0})}))}}),Y({size:E,props:e,count:k,activeIndicator:V}),u((()=>e.initialSwipe),(e=>J(+e))),u(k,(()=>J(T.active))),u((()=>e.autoplay),F),u([r,v,()=>e.width,()=>e.height],K),u(c(),(e=>{"visible"===e?F():q()})),h(J),p((()=>J(T.active))),d((()=>J(T.active))),f(q),g(q),w("touchmove",(t=>{if(e.touchable&&T.swiping&&(P.move(t),W.value)){!e.loop&&(0===T.active&&R.value>0||T.active===k.value-1&&R.value<0)||($(t,e.stopPropagation),H({offset:R.value}),I||(a("dragStart",{index:V.value}),I=!0))}}),{target:x}),()=>{var a;return m("div",{ref:b,class:D()},[m("div",{ref:x,style:A.value,class:D("track",{vertical:e.vertical}),onTouchstartPassive:_,onTouchend:ee,onTouchcancel:ee},[null==(a=S.default)?void 0:a.call(S)]),S.indicator?S.indicator({active:V.value,total:k.value}):e.showIndicators&&k.value>1?m("div",{class:D("indicators",{vertical:e.vertical})},[Array(k.value).fill("").map(ae)]):void 0])}}})),[k,E]=e("swipe-item");const R=T(a({name:k,setup(e, {slots:a}){let t;const l=i({offset:0,inited:!1,mounted:!1}),{parent:s,index:u}=I(X);if(!s)return void console.error("[Vant] <SwipeItem> must be a child component of <Swipe>.");const r=o((()=>{const e={},{vertical:a}=s.props;return s.size.value&&(e[a?"height":"width"]=`${s.size.value}px`),l.offset&&(e.transform=`translate${a?"Y":"X"}(${l.offset}px)`),e})),v=o((()=>{const{loop:e,lazyRender:a}=s.props;if(!a||t)return!0;if(!l.mounted)return!1;const i=s.activeIndicator.value,o=s.count.value-1,n=0===i&&e?o:i-1,r=i===o&&e?0:i+1;return t=u.value===i||u.value===n||u.value===r,t}));return h((()=>{M((()=>{l.mounted=!0}))})),n({setOffset: e=>{l.offset=e}}),()=>{var e;return m("div",{class:E(),style:r.value},[v.value?null==(e=a.default)?void 0:e.call(a):null])}}}));export{Y as S,R as a};
