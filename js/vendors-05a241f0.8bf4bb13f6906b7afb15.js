"use strict";(self.webpackChunkf_distribution=self.webpackChunkf_distribution||[]).push([[8366],{4345:(e,t,r)=>{r.d(t,{B:()=>o,N:()=>i});var l=r(69202);function i(e){return(0,l.lg)()?e.altKey:e.ctrlKey}function o(e){return(0,l.cX)()?e.metaKey:e.ctrlKey}},24548:(e,t,r)=>{r.d(t,{n:()=>o});class l{getItemRect(e){let t=this.ref.current,r=null!=e?t.querySelector(`[data-key="${CSS.escape(e.toString())}"]`):null;if(!r)return null;let l=t.getBoundingClientRect(),i=r.getBoundingClientRect();return{x:i.left-l.left+t.scrollLeft,y:i.top-l.top+t.scrollTop,width:i.width,height:i.height}}getContentSize(){let e=this.ref.current;return{width:e.scrollWidth,height:e.scrollHeight}}getVisibleRect(){let e=this.ref.current;return{x:e.scrollLeft,y:e.scrollTop,width:e.offsetWidth,height:e.offsetHeight}}constructor(e){this.ref=e}}var i=r(47912);class o{isDisabled(e){var t;return"all"===this.disabledBehavior&&((null===(t=e.props)||void 0===t?void 0:t.isDisabled)||this.disabledKeys.has(e.key))}getNextKey(e){for(e=this.collection.getKeyAfter(e);null!=e;){let t=this.collection.getItem(e);if("item"===t.type&&!this.isDisabled(t))return e;e=this.collection.getKeyAfter(e)}return null}getPreviousKey(e){for(e=this.collection.getKeyBefore(e);null!=e;){let t=this.collection.getItem(e);if("item"===t.type&&!this.isDisabled(t))return e;e=this.collection.getKeyBefore(e)}return null}findKey(e,t,r){let l=this.layoutDelegate.getItemRect(e);if(!l)return null;let i=l;do{e=t(e),l=this.layoutDelegate.getItemRect(e)}while(l&&r(i,l));return e}isSameRow(e,t){return e.y===t.y||e.x!==t.x}isSameColumn(e,t){return e.x===t.x||e.y!==t.y}getKeyBelow(e){return"grid"===this.layout&&"vertical"===this.orientation?this.findKey(e,(e=>this.getNextKey(e)),this.isSameRow):this.getNextKey(e)}getKeyAbove(e){return"grid"===this.layout&&"vertical"===this.orientation?this.findKey(e,(e=>this.getPreviousKey(e)),this.isSameRow):this.getPreviousKey(e)}getNextColumn(e,t){return t?this.getPreviousKey(e):this.getNextKey(e)}getKeyRightOf(e){return"grid"===this.layout?"vertical"===this.orientation?this.getNextColumn(e,"rtl"===this.direction):this.findKey(e,(e=>this.getNextColumn(e,"rtl"===this.direction)),this.isSameColumn):"horizontal"===this.orientation?this.getNextColumn(e,"rtl"===this.direction):null}getKeyLeftOf(e){return"grid"===this.layout?"vertical"===this.orientation?this.getNextColumn(e,"ltr"===this.direction):this.findKey(e,(e=>this.getNextColumn(e,"ltr"===this.direction)),this.isSameColumn):"horizontal"===this.orientation?this.getNextColumn(e,"ltr"===this.direction):null}getFirstKey(){let e=this.collection.getFirstKey();for(;null!=e;){let t=this.collection.getItem(e);if("item"===(null==t?void 0:t.type)&&!this.isDisabled(t))return e;e=this.collection.getKeyAfter(e)}return null}getLastKey(){let e=this.collection.getLastKey();for(;null!=e;){let t=this.collection.getItem(e);if("item"===t.type&&!this.isDisabled(t))return e;e=this.collection.getKeyBefore(e)}return null}getKeyPageAbove(e){let t=this.ref.current,r=this.layoutDelegate.getItemRect(e);if(!r)return null;if(!(0,i.o)(t))return this.getFirstKey();if("horizontal"===this.orientation){let t=Math.max(0,r.x+r.width-this.layoutDelegate.getVisibleRect().width);for(;r&&r.x>t;)r=null==(e=this.getKeyAbove(e))?null:this.layoutDelegate.getItemRect(e)}else{let t=Math.max(0,r.y+r.height-this.layoutDelegate.getVisibleRect().height);for(;r&&r.y>t;)r=null==(e=this.getKeyAbove(e))?null:this.layoutDelegate.getItemRect(e)}return null!=e?e:this.getFirstKey()}getKeyPageBelow(e){let t=this.ref.current,r=this.layoutDelegate.getItemRect(e);if(!r)return null;if(!(0,i.o)(t))return this.getLastKey();if("horizontal"===this.orientation){let t=Math.min(this.layoutDelegate.getContentSize().width,r.y-r.width+this.layoutDelegate.getVisibleRect().width);for(;r&&r.x<t;)r=null==(e=this.getKeyBelow(e))?null:this.layoutDelegate.getItemRect(e)}else{let t=Math.min(this.layoutDelegate.getContentSize().height,r.y-r.height+this.layoutDelegate.getVisibleRect().height);for(;r&&r.y<t;)r=null==(e=this.getKeyBelow(e))?null:this.layoutDelegate.getItemRect(e)}return null!=e?e:this.getLastKey()}getKeyForSearch(e,t){if(!this.collator)return null;let r=this.collection,l=t||this.getFirstKey();for(;null!=l;){let t=r.getItem(l),i=t.textValue.slice(0,e.length);if(t.textValue&&0===this.collator.compare(i,e))return l;l=this.getKeyBelow(l)}return null}constructor(...e){if(1===e.length){let t=e[0];this.collection=t.collection,this.ref=t.ref,this.collator=t.collator,this.disabledKeys=t.disabledKeys||new Set,this.disabledBehavior=t.disabledBehavior||"all",this.orientation=t.orientation||"vertical",this.direction=t.direction,this.layout=t.layout||"stack",this.layoutDelegate=t.layoutDelegate||new l(t.ref)}else this.collection=e[0],this.disabledKeys=e[1],this.ref=e[2],this.collator=e[3],this.layout="stack",this.orientation="vertical",this.disabledBehavior="all",this.layoutDelegate=new l(this.ref);"stack"===this.layout&&"vertical"===this.orientation&&(this.getKeyLeftOf=void 0,this.getKeyRightOf=void 0)}}},33462:(e,t,r)=>{r.d(t,{p:()=>a});var l=r(4345),i=r(58374),o=r(43831),n=r(32217),s=r(92688),u=r(60155),c=r(96540);function a(e){let{selectionManager:t,key:r,ref:a,shouldSelectOnPressUp:f,shouldUseVirtualFocus:h,focus:g,isDisabled:p,onAction:K,allowsDifferentPressOrigin:v,linkBehavior:m="action"}=e,S=(0,o.rd)(),b=e=>{if("keyboard"===e.pointerType&&(0,l.N)(e))t.toggleSelection(r);else{if("none"===t.selectionMode)return;if(t.isLink(r)){if("selection"===m){let l=t.getItemProps(r);return S.open(a.current,e,l.href,l.routerOptions),void t.setSelectedKeys(t.selectedKeys)}if("override"===m||"none"===m)return}"single"===t.selectionMode?t.isSelected(r)&&!t.disallowEmptySelection?t.toggleSelection(r):t.replaceSelection(r):e&&e.shiftKey?t.extendSelection(r):"toggle"===t.selectionBehavior||e&&((0,l.B)(e)||"touch"===e.pointerType||"virtual"===e.pointerType)?t.toggleSelection(r):t.replaceSelection(r)}};(0,c.useEffect)((()=>{r===t.focusedKey&&t.isFocused&&!h&&(g?g():document.activeElement!==a.current&&(0,i.l)(a.current))}),[a,r,t.focusedKey,t.childFocusStrategy,t.isFocused,h]),p=p||t.isDisabled(r);let D={};h||p?p&&(D.onMouseDown=e=>{e.preventDefault()}):D={tabIndex:r===t.focusedKey?0:-1,onFocus(e){e.target===a.current&&t.setFocusedKey(r)}};let w=t.isLink(r)&&"override"===m,k=t.isLink(r)&&"selection"!==m&&"none"!==m,F=!p&&t.canSelectItem(r)&&!w,P=(K||k)&&!p,x=P&&("replace"===t.selectionBehavior?!F:!F||t.isEmpty),R=P&&F&&"replace"===t.selectionBehavior,T=x||R,B=(0,c.useRef)(null),C=T&&F,L=(0,c.useRef)(!1),E=(0,c.useRef)(!1),I=e=>{if(K&&K(),k){let l=t.getItemProps(r);S.open(a.current,e,l.href,l.routerOptions)}},M={};f?(M.onPressStart=e=>{B.current=e.pointerType,L.current=C,"keyboard"!==e.pointerType||T&&!y()||b(e)},v?(M.onPressUp=x?null:e=>{"keyboard"!==e.pointerType&&F&&b(e)},M.onPress=x?I:null):M.onPress=e=>{if(x||R&&"mouse"!==e.pointerType){if("keyboard"===e.pointerType&&!d())return;I(e)}else"keyboard"!==e.pointerType&&F&&b(e)}):(M.onPressStart=e=>{B.current=e.pointerType,L.current=C,E.current=x,F&&("mouse"===e.pointerType&&!x||"keyboard"===e.pointerType&&(!P||y()))&&b(e)},M.onPress=e=>{("touch"===e.pointerType||"pen"===e.pointerType||"virtual"===e.pointerType||"keyboard"===e.pointerType&&T&&d()||"mouse"===e.pointerType&&E.current)&&(T?I(e):F&&b(e))}),D["data-key"]=r,M.preventFocusOnPress=h;let{pressProps:O,isPressed:N}=(0,s.d)(M),A=R?e=>{"mouse"===B.current&&(e.stopPropagation(),e.preventDefault(),I(e))}:void 0,{longPressProps:_}=(0,u.H)({isDisabled:!C,onLongPress(e){"touch"===e.pointerType&&(b(e),t.setSelectionBehavior("toggle"))}}),$=t.isLink(r)?e=>{o.Fe.isOpening||e.preventDefault()}:void 0;return{itemProps:(0,n.v)(D,F||x?O:{},C?_:{},{onDoubleClick:A,onDragStartCapture:e=>{"touch"===B.current&&L.current&&e.preventDefault()},onClick:$}),isPressed:N,isSelected:t.isSelected(r),isFocused:t.isFocused&&t.focusedKey===r,isDisabled:p,allowsSelection:F,hasAction:T}}function d(){let e=window.event;return"Enter"===(null==e?void 0:e.key)}function y(){let e=window.event;return" "===(null==e?void 0:e.key)||"Space"===(null==e?void 0:e.code)}},58579:(e,t,r)=>{r.d(t,{y:()=>s});var l=r(78911),i=r(24548),o=r(82627),n=r(96540);function s(e){let{selectionManager:t,collection:r,disabledKeys:s,ref:u,keyboardDelegate:c,layoutDelegate:a}=e,d=(0,o.Q)({usage:"search",sensitivity:"base"}),y=t.disabledBehavior,f=(0,n.useMemo)((()=>c||new(0,i.n)({collection:r,disabledKeys:s,disabledBehavior:y,ref:u,collator:d,layoutDelegate:a})),[c,a,r,s,u,d,y]),{collectionProps:h}=(0,l.y)({...e,ref:u,selectionManager:t,keyboardDelegate:f});return{listProps:h}}},60415:(e,t,r)=>{r.d(t,{Cc:()=>f,WX:()=>c,wR:()=>K});var l=r(96540);const i={prefix:String(Math.round(1e10*Math.random())),current:0},o=l.createContext(i),n=l.createContext(!1);function s(e){let t=(0,l.useContext)(o),r=y(t===i),[s,u]=(0,l.useState)(!0),c=(0,l.useMemo)((()=>({prefix:t===i?"":`${t.prefix}-${r}`,current:0})),[t,r]);return"undefined"!=typeof document&&(0,l.useLayoutEffect)((()=>{u(!1)}),[]),l.createElement(o.Provider,{value:c},l.createElement(n.Provider,{value:s},e.children))}let u=!1;function c(e){return"function"==typeof l.useId?(u||(console.warn("In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app."),u=!0),l.createElement(l.Fragment,null,e.children)):l.createElement(s,e)}let a=Boolean("undefined"!=typeof window&&window.document&&window.document.createElement),d=new WeakMap;function y(e=!1){let t=(0,l.useContext)(o),r=(0,l.useRef)(null);if(null===r.current&&!e){var i,n;let e=null===(n=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)||void 0===n||null===(i=n.ReactCurrentOwner)||void 0===i?void 0:i.current;if(e){let r=d.get(e);null==r?d.set(e,{id:t.current,state:e.memoizedState}):e.memoizedState!==r.state&&(t.current=r.id,d.delete(e))}r.current=++t.current}return r.current}const f="function"==typeof l.useId?function(e){let t=l.useId(),[r]=(0,l.useState)(K()),o=r?"react-aria":`react-aria${i.prefix}`;return e||`${o}-${t}`}:function(e){let t=(0,l.useContext)(o);t!==i||a||console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");let r=y(!!e),n=`react-aria${t.prefix}`;return e||`${n}-${r}`};function h(){return!1}function g(){return!0}function p(e){return()=>{}}function K(){return"function"==typeof l.useSyncExternalStore?l.useSyncExternalStore(p,h,g):(0,l.useContext)(n)}},78911:(e,t,r)=>{r.d(t,{y:()=>p});var l=r(4345),i=r(96540);const o=1e3;var n=r(40961),s=r(85690),u=r(58374),c=r(43831),a=r(32268),d=r(17460),y=r(99930),f=r(32217),h=r(95562),g=r(3080);function p(e){let{selectionManager:t,keyboardDelegate:r,ref:p,autoFocus:K=!1,shouldFocusWrap:v=!1,disallowEmptySelection:m=!1,disallowSelectAll:S=!1,selectOnFocus:b="replace"===t.selectionBehavior,disallowTypeAhead:D=!1,shouldUseVirtualFocus:w,allowsTabNavigation:k=!1,isVirtualized:F,scrollRef:P=p,linkBehavior:x="action"}=e,{direction:R}=(0,g.Y)(),T=(0,c.rd)(),B=(0,i.useRef)({top:0,left:0});(0,d._)(P,"scroll",F?null:()=>{B.current={top:P.current.scrollTop,left:P.current.scrollLeft}});const C=(0,i.useRef)(K);(0,i.useEffect)((()=>{if(C.current){let e=null;"first"===K&&(e=r.getFirstKey()),"last"===K&&(e=r.getLastKey());let l=t.selectedKeys;if(l.size)for(let r of l)if(t.canSelectItem(r)){e=r;break}t.setFocused(!0),t.setFocusedKey(e),null!=e||w||(0,u.l)(p.current)}}),[]);let L=(0,i.useRef)(t.focusedKey);(0,i.useEffect)((()=>{if(t.isFocused&&null!=t.focusedKey&&(t.focusedKey!==L.current||C.current)&&(null==P?void 0:P.current)){let e=(0,h.ME)(),r=p.current.querySelector(`[data-key="${CSS.escape(t.focusedKey.toString())}"]`);if(!r)return;("keyboard"===e||C.current)&&((0,y.R)(P.current,r),"virtual"!==e&&(0,y.o)(r,{containingElement:p.current}))}!w&&t.isFocused&&null==t.focusedKey&&null!=L.current&&(0,u.l)(p.current),L.current=t.focusedKey,C.current=!1})),(0,d._)(p,"react-aria-focus-scope-restore",(e=>{e.preventDefault(),t.setFocused(!0)}));let E,I={onKeyDown:e=>{if(e.altKey&&"Tab"===e.key&&e.preventDefault(),!p.current.contains(e.target))return;const i=(r,i)=>{if(null!=r){if(t.isLink(r)&&"selection"===x&&b&&!(0,l.N)(e)){(0,n.flushSync)((()=>{t.setFocusedKey(r,i)}));let l=P.current.querySelector(`[data-key="${CSS.escape(r.toString())}"]`),o=t.getItemProps(r);return void T.open(l,e,o.href,o.routerOptions)}if(t.setFocusedKey(r,i),t.isLink(r)&&"override"===x)return;e.shiftKey&&"multiple"===t.selectionMode?t.extendSelection(r):b&&!(0,l.N)(e)&&t.replaceSelection(r)}};switch(e.key){case"ArrowDown":if(r.getKeyBelow){var o,u;e.preventDefault();let l=null!=t.focusedKey?r.getKeyBelow(t.focusedKey):null===(o=r.getFirstKey)||void 0===o?void 0:o.call(r);null==l&&v&&(l=null===(u=r.getFirstKey)||void 0===u?void 0:u.call(r,t.focusedKey)),i(l)}break;case"ArrowUp":if(r.getKeyAbove){var c,d;e.preventDefault();let l=null!=t.focusedKey?r.getKeyAbove(t.focusedKey):null===(c=r.getLastKey)||void 0===c?void 0:c.call(r);null==l&&v&&(l=null===(d=r.getLastKey)||void 0===d?void 0:d.call(r,t.focusedKey)),i(l)}break;case"ArrowLeft":if(r.getKeyLeftOf){var y,f;e.preventDefault();let l=r.getKeyLeftOf(t.focusedKey);null==l&&v&&(l="rtl"===R?null===(y=r.getFirstKey)||void 0===y?void 0:y.call(r,t.focusedKey):null===(f=r.getLastKey)||void 0===f?void 0:f.call(r,t.focusedKey)),i(l,"rtl"===R?"first":"last")}break;case"ArrowRight":if(r.getKeyRightOf){var h,g;e.preventDefault();let l=r.getKeyRightOf(t.focusedKey);null==l&&v&&(l="rtl"===R?null===(h=r.getLastKey)||void 0===h?void 0:h.call(r,t.focusedKey):null===(g=r.getFirstKey)||void 0===g?void 0:g.call(r,t.focusedKey)),i(l,"rtl"===R?"last":"first")}break;case"Home":if(r.getFirstKey){e.preventDefault();let i=r.getFirstKey(t.focusedKey,(0,l.B)(e));t.setFocusedKey(i),(0,l.B)(e)&&e.shiftKey&&"multiple"===t.selectionMode?t.extendSelection(i):b&&t.replaceSelection(i)}break;case"End":if(r.getLastKey){e.preventDefault();let i=r.getLastKey(t.focusedKey,(0,l.B)(e));t.setFocusedKey(i),(0,l.B)(e)&&e.shiftKey&&"multiple"===t.selectionMode?t.extendSelection(i):b&&t.replaceSelection(i)}break;case"PageDown":r.getKeyPageBelow&&(e.preventDefault(),i(r.getKeyPageBelow(t.focusedKey)));break;case"PageUp":r.getKeyPageAbove&&(e.preventDefault(),i(r.getKeyPageAbove(t.focusedKey)));break;case"a":(0,l.B)(e)&&"multiple"===t.selectionMode&&!0!==S&&(e.preventDefault(),t.selectAll());break;case"Escape":m||0===t.selectedKeys.size||(e.stopPropagation(),e.preventDefault(),t.clearSelection());break;case"Tab":if(!k){if(e.shiftKey)p.current.focus();else{let e,t,r=(0,s.N$)(p.current,{tabbable:!0});do{t=r.lastChild(),t&&(e=t)}while(t);e&&!e.contains(document.activeElement)&&(0,a.e)(e)}break}}},onFocus:e=>{if(t.isFocused)e.currentTarget.contains(e.target)||t.setFocused(!1);else if(e.currentTarget.contains(e.target)){if(t.setFocused(!0),null==t.focusedKey){let o=e=>{null!=e&&(t.setFocusedKey(e),b&&t.replaceSelection(e))},n=e.relatedTarget;var l,i;n&&e.currentTarget.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING?o(null!==(l=t.lastSelectedKey)&&void 0!==l?l:r.getLastKey()):o(null!==(i=t.firstSelectedKey)&&void 0!==i?i:r.getFirstKey())}else F||(P.current.scrollTop=B.current.top,P.current.scrollLeft=B.current.left);if(null!=t.focusedKey){let e=P.current.querySelector(`[data-key="${CSS.escape(t.focusedKey.toString())}"]`);e&&(e.contains(document.activeElement)||(0,a.e)(e),"keyboard"===(0,h.ME)()&&(0,y.o)(e,{containingElement:p.current}))}}},onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||t.setFocused(!1)},onMouseDown(e){P.current===e.target&&e.preventDefault()}},{typeSelectProps:M}=function(e){let{keyboardDelegate:t,selectionManager:r,onTypeSelect:l}=e,n=(0,i.useRef)({search:"",timeout:null}).current;return{typeSelectProps:{onKeyDownCapture:t.getKeyForSearch?e=>{let i=function(e){return 1!==e.length&&/^[A-Z]/i.test(e)?"":e}(e.key);if(!i||e.ctrlKey||e.metaKey||!e.currentTarget.contains(e.target))return;" "===i&&n.search.trim().length>0&&(e.preventDefault(),"continuePropagation"in e||e.stopPropagation()),n.search+=i;let s=t.getKeyForSearch(n.search,r.focusedKey);null==s&&(s=t.getKeyForSearch(n.search)),null!=s&&(r.setFocusedKey(s),l&&l(s)),clearTimeout(n.timeout),n.timeout=setTimeout((()=>{n.search=""}),o)}:null}}}({keyboardDelegate:r,selectionManager:t});return D||(I=(0,f.v)(M,I)),w||(E=null==t.focusedKey?0:-1),{collectionProps:{...I,tabIndex:E}}}}}]);