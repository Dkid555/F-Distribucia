(self.webpackChunkCreatile=self.webpackChunkCreatile||[]).push([[7970],{7234:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.NativeScreenNavigationContainer=t.NativeScreenContainer=void 0;var n=r(35281);t.NativeScreenContainer=n.View,t.NativeScreenNavigationContainer=n.View,t.default=n.View},7327:(e,t,r)=>{var n=r(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=n(e)&&"function"!=typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var a={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&{}.hasOwnProperty.call(e,u)){var c=o?Object.getOwnPropertyDescriptor(e,u):null;c&&(c.get||c.set)?Object.defineProperty(a,u,c):a[u]=e[u]}return a.default=e,r&&r.set(e,a),a}(r(96540));function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}t.default=a.createContext(void 0)},9381:(e,t,r)=>{var n=r(24994),a=r(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.SafeAreaInsetsContext=t.SafeAreaFrameContext=t.SafeAreaContext=t.SafeAreaConsumer=void 0,t.SafeAreaProvider=function(e){var t,r,n,a,d,S=e.children,g=e.initialMetrics,m=e.initialSafeAreaInsets,y=e.style,h=(0,o.default)(e,f),O=u.useContext(v),w=u.useContext(p),P=u.useState(null!=(t=null!=(r=null!=(n=null==g?void 0:g.insets)?n:m)?r:O)?t:null),j=(0,i.default)(P,2),k=j[0],_=j[1],C=u.useState(null!=(a=null!=(d=null==g?void 0:g.frame)?d:w)?a:{x:0,y:0,width:c.Dimensions.get("window").width,height:c.Dimensions.get("window").height}),M=(0,i.default)(C,2),B=M[0],E=M[1],N=u.useCallback((function(e){var t=e.nativeEvent,r=t.frame,n=t.insets;E((function(e){return!r||r.height===e.height&&r.width===e.width&&r.x===e.x&&r.y===e.y?e:r})),_((function(e){return e&&n.bottom===e.bottom&&n.left===e.left&&n.right===e.right&&n.top===e.top?e:n}))}),[]);return u.createElement(l.NativeSafeAreaProvider,s({style:[b.fill,y],onInsetsChange:N},h),null!=k?u.createElement(p.Provider,{value:B},u.createElement(v.Provider,{value:k},S)):null)},t.useSafeArea=function(){return g()},t.useSafeAreaFrame=function(){var e=u.useContext(p);if(null==e)throw new Error(S);return e},t.useSafeAreaInsets=g,t.withSafeAreaInsets=function(e){return u.forwardRef((function(t,r){var n=g();return u.createElement(e,s({},t,{insets:n,ref:r}))}))};var i=n(r(85715)),o=n(r(91847)),u=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=a(e)&&"function"!=typeof e)return{default:e};var r=d(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&{}.hasOwnProperty.call(e,o)){var u=i?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(n,o,u):n[o]=e[o]}return n.default=e,r&&r.set(e,n),n}(r(96540)),c=r(35281),l=r(53490),f=["children","initialMetrics","initialSafeAreaInsets","style"];function d(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(d=function(e){return e?r:t})(e)}function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(null,arguments)}var v=t.SafeAreaInsetsContext=u.createContext(null),p=t.SafeAreaFrameContext=u.createContext(null),b=c.StyleSheet.create({fill:{flex:1}}),S="No safe area value available. Make sure you are rendering `<SafeAreaProvider>` at the top of your app.";function g(){var e=u.useContext(v);if(null==e)throw new Error(S);return e}t.SafeAreaConsumer=v.Consumer,t.SafeAreaContext=v},42130:(e,t,r)=>{var n=r(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.ScreenStackHeaderSubview=t.ScreenStackHeaderSearchBarView=t.ScreenStackHeaderRightView=t.ScreenStackHeaderLeftView=t.ScreenStackHeaderConfig=t.ScreenStackHeaderCenterView=t.ScreenStackHeaderBackButtonImage=void 0;var a=r(35281),i=n(r(96540));function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}t.ScreenStackHeaderBackButtonImage=function(e){return i.default.createElement(a.View,null,i.default.createElement(a.Image,o({resizeMode:"center",fadeDuration:0},e)))},t.ScreenStackHeaderRightView=function(e){return i.default.createElement(a.View,e)},t.ScreenStackHeaderLeftView=function(e){return i.default.createElement(a.View,e)},t.ScreenStackHeaderCenterView=function(e){return i.default.createElement(a.View,e)},t.ScreenStackHeaderSearchBarView=function(e){return i.default.createElement(a.View,e)},t.ScreenStackHeaderConfig=function(e){return i.default.createElement(a.View,e)},t.ScreenStackHeaderSubview=a.View},51419:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},53490:(e,t,r)=>{var n=r(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.NativeSafeAreaProvider=function(e){var t=e.children,r=e.style,n=e.onInsetsChange;return a.useEffect((function(){if("undefined"!=typeof document){var e=function(){var e=document.createElement("div"),t=e.style;return t.position="fixed",t.left="0",t.top="0",t.width="0",t.height="0",t.zIndex="-1",t.overflow="hidden",t.visibility="hidden",t.transitionDuration="0.05s",t.transitionProperty="padding",t.transitionDelay="0s",t.paddingTop=d("top"),t.paddingBottom=d("bottom"),t.paddingLeft=d("left"),t.paddingRight=d("right"),e}();document.body.appendChild(e);var t=function(){var t=window.getComputedStyle(e),r=t.paddingTop,a=t.paddingBottom,i=t.paddingLeft,o=t.paddingRight,u={top:r?parseInt(r,10):0,bottom:a?parseInt(a,10):0,left:i?parseInt(i,10):0,right:o?parseInt(o,10):0},c={x:0,y:0,width:document.documentElement.offsetWidth,height:document.documentElement.offsetHeight};n({nativeEvent:{insets:u,frame:c}})};return e.addEventListener(l(),t),t(),function(){document.body.removeChild(e),e.removeEventListener(l(),t)}}}),[n]),a.createElement(i.View,{style:r},t)};var a=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=n(e)&&"function"!=typeof e)return{default:e};var r=o(t);if(r&&r.has(e))return r.get(e);var a={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&{}.hasOwnProperty.call(e,u)){var c=i?Object.getOwnPropertyDescriptor(e,u):null;c&&(c.get||c.set)?Object.defineProperty(a,u,c):a[u]=e[u]}return a.default=e,r&&r.set(e,a),a}(r(96540)),i=r(35281);function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(o=function(e){return e?r:t})(e)}var u={WebkitTransition:"webkitTransitionEnd",Transition:"transitionEnd",MozTransition:"transitionend",MSTransition:"msTransitionEnd",OTransition:"oTransitionEnd"},c=null;function l(){if(null!=c)return c;var e=document.createElement("invalidtype");for(var t in c=u.Transition,u)if(void 0!==e.style[t]){c=u[t];break}return c}var f=null;function d(e){return"".concat(function(){if(null!==f)return f;var e=window.CSS;return f=e&&e.supports&&e.supports("top: constant(safe-area-inset-top)")?"constant":"env"}(),"(safe-area-inset-").concat(e,")")}},57360:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.NativeSearchBarCommands=t.NativeSearchBar=void 0;var n=r(35281);t.NativeSearchBar=n.View,t.NativeSearchBarCommands=n.View,t.default=n.View},58661:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(35281);t.default=n.View},60065:(e,t,r)=>{var n=r(24994),a=r(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.SafeAreaView=void 0;var i=n(r(91847)),o=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=a(e)&&"function"!=typeof e)return{default:e};var r=f(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&{}.hasOwnProperty.call(e,o)){var u=i?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(n,o,u):n[o]=e[o]}return n.default=e,r&&r.set(e,n),n}(r(96540)),u=r(35281),c=r(9381),l=["style","mode","edges"];function f(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(f=function(e){return e?r:t})(e)}function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},d.apply(null,arguments)}var s={top:"additive",left:"additive",bottom:"additive",right:"additive"};function v(e,t,r){switch(r){case"off":return t;case"maximum":return Math.max(t,e);default:return t+e}}t.SafeAreaView=o.forwardRef((function(e,t){var r=e.style,n=void 0===r?{}:r,a=e.mode,f=e.edges,p=(0,i.default)(e,l),b=(0,c.useSafeAreaInsets)(),S=o.useMemo((function(){return null==f?s:Array.isArray(f)?f.reduce((function(e,t){return e[t]="additive",e}),{}):f}),[f]),g=o.useMemo((function(){var e=u.StyleSheet.flatten(n);if("margin"===a){var t=e.margin,r=void 0===t?0:t,i=e.marginVertical,o=void 0===i?r:i,c=e.marginHorizontal,l=void 0===c?r:c,f=e.marginTop,d=void 0===f?o:f,s=e.marginRight,p=void 0===s?l:s,g=e.marginBottom,m=void 0===g?o:g,y=e.marginLeft,h=void 0===y?l:y,O={marginTop:v(b.top,d,S.top),marginRight:v(b.right,p,S.right),marginBottom:v(b.bottom,m,S.bottom),marginLeft:v(b.left,h,S.left)};return[n,O]}var w=e.padding,P=void 0===w?0:w,j=e.paddingVertical,k=void 0===j?P:j,_=e.paddingHorizontal,C=void 0===_?P:_,M=e.paddingTop,B=void 0===M?k:M,E=e.paddingRight,N=void 0===E?C:E,V=e.paddingBottom,H=void 0===V?k:V,x=e.paddingLeft,A=void 0===x?C:x,I={paddingTop:v(b.top,B,S.top),paddingRight:v(b.right,N,S.right),paddingBottom:v(b.bottom,H,S.bottom),paddingLeft:v(b.left,A,S.left)};return[n,I]}),[S.bottom,S.left,S.right,S.top,b.bottom,b.left,b.right,b.top,a,n]);return o.createElement(u.View,d({style:g},p,{ref:t}))}))},63701:(e,t,r)=>{var n=r(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.ScreenContext=t.NativeScreen=t.InnerScreen=void 0;var a=n(r(91847)),i=n(r(17383)),o=n(r(34579)),u=n(r(28452)),c=n(r(63072)),l=n(r(29511)),f=r(35281),d=n(r(96540)),s=r(97277),v=["active","activityState","style","enabled"];function p(e,t,r){return t=(0,c.default)(t),(0,u.default)(e,b()?Reflect.construct(t,r||[],(0,c.default)(e).constructor):t.apply(e,r))}function b(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(e){}return(b=function(){return!!e})()}function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},S.apply(this,arguments)}t.InnerScreen=f.View;var g=t.NativeScreen=function(e){function t(){return(0,i.default)(this,t),p(this,t,arguments)}return(0,l.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this.props,t=e.active,r=e.activityState,n=e.style,i=e.enabled,o=void 0===i?(0,s.screensEnabled)():i,u=(0,a.default)(e,v);return o?(void 0!==t&&void 0===r&&(r=0!==t?2:0),d.default.createElement(f.View,S({hidden:0===r,style:[n,{display:0!==r?"flex":"none"}]},u))):d.default.createElement(f.View,u)}}])}(d.default.Component),m=f.Animated.createAnimatedComponent(g);t.ScreenContext=d.default.createContext(m),t.default=m},64818:(e,t,r)=>{var n=r(24994);Object.defineProperty(t,"__esModule",{value:!0}),t.GHContext=void 0;var a=n(r(96540));t.GHContext=a.default.createContext((function(e){return a.default.createElement(a.default.Fragment,null,e.children)}))},72310:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(35281);t.default=n.View},73962:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initialWindowSafeAreaInsets=t.initialWindowMetrics=void 0,t.initialWindowMetrics=null,t.initialWindowSafeAreaInsets=null},76218:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=r(9381);Object.keys(n).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in t&&t[e]===n[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}}))}));var a=r(60065);Object.keys(a).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in t&&t[e]===a[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}}))}));var i=r(73962);Object.keys(i).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in t&&t[e]===i[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}}))}));var o=r(51419);Object.keys(o).forEach((function(e){"default"!==e&&"__esModule"!==e&&(e in t&&t[e]===o[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}}))}))},78932:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default={}},87757:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.executeNativeBackPress=function(){return n.BackHandler.exitApp(),!0},t.isSearchBarAvailableForCurrentPlatform=t.isNewBackTitleImplementation=void 0;var n=r(35281);t.isSearchBarAvailableForCurrentPlatform=["ios","android"].includes(n.Platform.OS),t.isNewBackTitleImplementation=!0},92513:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},94067:(e,t,r)=>{var n=r(24994),a=r(73738);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=i.useContext(o.default);if(void 0===e)throw new Error("Couldn't find values for transition progress. Are you inside a screen in Native Stack?");return e};var i=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=a(e)&&"function"!=typeof e)return{default:e};var r=u(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&{}.hasOwnProperty.call(e,o)){var c=i?Object.getOwnPropertyDescriptor(e,o):null;c&&(c.get||c.set)?Object.defineProperty(n,o,c):n[o]=e[o]}return n.default=e,r&&r.set(e,n),n}(r(96540)),o=n(r(7327));function u(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(u=function(e){return e?r:t})(e)}},97277:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.enableFreeze=function(){a&&(o=!(arguments.length>0&&void 0!==arguments[0])||arguments[0])},t.enableScreens=function(){i=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a&&i&&!n.UIManager.getViewManagerConfig("RNSScreen")&&console.error("Screen native module hasn't been linked. Please check the react-native-screens README for more details")},t.freezeEnabled=function(){return o},t.isNativePlatformSupported=void 0,t.screensEnabled=function(){return i},t.shouldUseActivityState=void 0;var n=r(35281),a=(t.shouldUseActivityState=!0,t.isNativePlatformSupported="ios"===n.Platform.OS||"android"===n.Platform.OS||"windows"===n.Platform.OS),i=a,o=!1},97860:(e,t,r)=>{var n=r(24994),a=r(73738);Object.defineProperty(t,"__esModule",{value:!0});var i={enableScreens:!0,enableFreeze:!0,screensEnabled:!0,freezeEnabled:!0,shouldUseActivityState:!0,Screen:!0,NativeScreen:!0,InnerScreen:!0,ScreenContext:!0,ScreenContainer:!0,NativeScreenContainer:!0,NativeScreenNavigationContainer:!0,ScreenStack:!0,ScreenStackHeaderConfig:!0,ScreenStackHeaderSubview:!0,ScreenStackHeaderLeftView:!0,ScreenStackHeaderCenterView:!0,ScreenStackHeaderRightView:!0,ScreenStackHeaderBackButtonImage:!0,ScreenStackHeaderSearchBarView:!0,SearchBar:!0,NativeSearchBar:!0,NativeSearchBarCommands:!0,FullWindowOverlay:!0,NativeScreensModule:!0,GHContext:!0,isSearchBarAvailableForCurrentPlatform:!0,isNewBackTitleImplementation:!0,executeNativeBackPress:!0,useTransitionProgress:!0};Object.defineProperty(t,"FullWindowOverlay",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"GHContext",{enumerable:!0,get:function(){return b.GHContext}}),Object.defineProperty(t,"InnerScreen",{enumerable:!0,get:function(){return c.InnerScreen}}),Object.defineProperty(t,"NativeScreen",{enumerable:!0,get:function(){return c.NativeScreen}}),Object.defineProperty(t,"NativeScreenContainer",{enumerable:!0,get:function(){return l.NativeScreenContainer}}),Object.defineProperty(t,"NativeScreenNavigationContainer",{enumerable:!0,get:function(){return l.NativeScreenNavigationContainer}}),Object.defineProperty(t,"NativeScreensModule",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"NativeSearchBar",{enumerable:!0,get:function(){return s.NativeSearchBar}}),Object.defineProperty(t,"NativeSearchBarCommands",{enumerable:!0,get:function(){return s.NativeSearchBarCommands}}),Object.defineProperty(t,"Screen",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"ScreenContainer",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"ScreenContext",{enumerable:!0,get:function(){return c.ScreenContext}}),Object.defineProperty(t,"ScreenStack",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"ScreenStackHeaderBackButtonImage",{enumerable:!0,get:function(){return d.ScreenStackHeaderBackButtonImage}}),Object.defineProperty(t,"ScreenStackHeaderCenterView",{enumerable:!0,get:function(){return d.ScreenStackHeaderCenterView}}),Object.defineProperty(t,"ScreenStackHeaderConfig",{enumerable:!0,get:function(){return d.ScreenStackHeaderConfig}}),Object.defineProperty(t,"ScreenStackHeaderLeftView",{enumerable:!0,get:function(){return d.ScreenStackHeaderLeftView}}),Object.defineProperty(t,"ScreenStackHeaderRightView",{enumerable:!0,get:function(){return d.ScreenStackHeaderRightView}}),Object.defineProperty(t,"ScreenStackHeaderSearchBarView",{enumerable:!0,get:function(){return d.ScreenStackHeaderSearchBarView}}),Object.defineProperty(t,"ScreenStackHeaderSubview",{enumerable:!0,get:function(){return d.ScreenStackHeaderSubview}}),Object.defineProperty(t,"SearchBar",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"enableFreeze",{enumerable:!0,get:function(){return u.enableFreeze}}),Object.defineProperty(t,"enableScreens",{enumerable:!0,get:function(){return u.enableScreens}}),Object.defineProperty(t,"executeNativeBackPress",{enumerable:!0,get:function(){return S.executeNativeBackPress}}),Object.defineProperty(t,"freezeEnabled",{enumerable:!0,get:function(){return u.freezeEnabled}}),Object.defineProperty(t,"isNewBackTitleImplementation",{enumerable:!0,get:function(){return S.isNewBackTitleImplementation}}),Object.defineProperty(t,"isSearchBarAvailableForCurrentPlatform",{enumerable:!0,get:function(){return S.isSearchBarAvailableForCurrentPlatform}}),Object.defineProperty(t,"screensEnabled",{enumerable:!0,get:function(){return u.screensEnabled}}),Object.defineProperty(t,"shouldUseActivityState",{enumerable:!0,get:function(){return u.shouldUseActivityState}}),Object.defineProperty(t,"useTransitionProgress",{enumerable:!0,get:function(){return g.default}});var o=r(92513);Object.keys(o).forEach((function(e){"default"!==e&&"__esModule"!==e&&(Object.prototype.hasOwnProperty.call(i,e)||e in t&&t[e]===o[e]||Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}}))}));var u=r(97277),c=y(r(63701)),l=y(r(7234)),f=n(r(58661)),d=r(42130),s=y(r(57360)),v=n(r(72310)),p=n(r(78932)),b=r(64818),S=r(87757),g=n(r(94067));function m(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(m=function(e){return e?r:t})(e)}function y(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=a(e)&&"function"!=typeof e)return{default:e};var r=m(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&{}.hasOwnProperty.call(e,o)){var u=i?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(n,o,u):n[o]=e[o]}return n.default=e,r&&r.set(e,n),n}}}]);