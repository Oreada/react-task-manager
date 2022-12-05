"use strict";(self.webpackChunkproject_management_app=self.webpackChunkproject_management_app||[]).push([[60],{1508:function(e,t,n){n.d(t,{Z:function(){return A}});var o=n(4942),r=n(3366),i=n(7462),a=n(2791),s=n(8182),c=n(4419),l=n(2065),u=n(277),d=n(5513),f=n(9853),v=n(6650),p=n(5878),m=n(1217);function h(e){return(0,m.Z)("MuiAlert",e)}var g=(0,p.Z)("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),Z=n(3811),x=n(1245),b=n(184),C=(0,x.Z)((0,b.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),k=(0,x.Z)((0,b.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),S=(0,x.Z)((0,b.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),w=(0,x.Z)((0,b.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),y=(0,x.Z)((0,b.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),M=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],E=(0,u.ZP)(v.Z,{name:"MuiAlert",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t[n.variant],t["".concat(n.variant).concat((0,f.Z)(n.color||n.severity))]]}})((function(e){var t=e.theme,n=e.ownerState,r="light"===t.palette.mode?l._j:l.$n,a="light"===t.palette.mode?l.$n:l._j,s=n.color||n.severity;return(0,i.Z)({},t.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},s&&"standard"===n.variant&&(0,o.Z)({color:t.vars?t.vars.palette.Alert["".concat(s,"Color")]:r(t.palette[s].light,.6),backgroundColor:t.vars?t.vars.palette.Alert["".concat(s,"StandardBg")]:a(t.palette[s].light,.9)},"& .".concat(g.icon),t.vars?{color:t.vars.palette.Alert["".concat(s,"IconColor")]}:{color:"dark"===t.palette.mode?t.palette[s].main:t.palette[s].light}),s&&"outlined"===n.variant&&(0,o.Z)({color:t.vars?t.vars.palette.Alert["".concat(s,"Color")]:r(t.palette[s].light,.6),border:"1px solid ".concat((t.vars||t).palette[s].light)},"& .".concat(g.icon),t.vars?{color:t.vars.palette.Alert["".concat(s,"IconColor")]}:{color:"dark"===t.palette.mode?t.palette[s].main:t.palette[s].light}),s&&"filled"===n.variant&&(0,i.Z)({fontWeight:t.typography.fontWeightMedium},t.vars?{color:t.vars.palette.Alert["".concat(s,"FilledColor")],backgroundColor:t.vars.palette.Alert["".concat(s,"FilledBg")]}:{backgroundColor:"dark"===t.palette.mode?t.palette[s].dark:t.palette[s].main,color:t.palette.getContrastText("dark"===t.palette.mode?t.palette[s].dark:t.palette[s].main)}))})),L=(0,u.ZP)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:function(e,t){return t.icon}})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),j=(0,u.ZP)("div",{name:"MuiAlert",slot:"Message",overridesResolver:function(e,t){return t.message}})({padding:"8px 0",minWidth:0,overflow:"auto"}),R=(0,u.ZP)("div",{name:"MuiAlert",slot:"Action",overridesResolver:function(e,t){return t.action}})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),O={success:(0,b.jsx)(C,{fontSize:"inherit"}),warning:(0,b.jsx)(k,{fontSize:"inherit"}),error:(0,b.jsx)(S,{fontSize:"inherit"}),info:(0,b.jsx)(w,{fontSize:"inherit"})},A=a.forwardRef((function(e,t){var n,o,a,l,u,v,p=(0,d.Z)({props:e,name:"MuiAlert"}),m=p.action,g=p.children,x=p.className,C=p.closeText,k=void 0===C?"Close":C,S=p.color,w=p.components,A=void 0===w?{}:w,P=p.componentsProps,z=void 0===P?{}:P,W=p.icon,T=p.iconMapping,N=void 0===T?O:T,I=p.onClose,B=p.role,G=void 0===B?"alert":B,H=p.severity,D=void 0===H?"success":H,_=p.slotProps,F=void 0===_?{}:_,V=p.slots,X=void 0===V?{}:V,$=p.variant,q=void 0===$?"standard":$,K=(0,r.Z)(p,M),Y=(0,i.Z)({},p,{color:S,severity:D,variant:q}),J=function(e){var t=e.variant,n=e.color,o=e.severity,r=e.classes,i={root:["root","".concat(t).concat((0,f.Z)(n||o)),"".concat(t)],icon:["icon"],message:["message"],action:["action"]};return(0,c.Z)(i,h,r)}(Y),Q=null!=(n=null!=(o=X.closeButton)?o:A.CloseButton)?n:Z.Z,U=null!=(a=null!=(l=X.closeIcon)?l:A.CloseIcon)?a:y,ee=null!=(u=F.closeButton)?u:z.closeButton,te=null!=(v=F.closeIcon)?v:z.closeIcon;return(0,b.jsxs)(E,(0,i.Z)({role:G,elevation:0,ownerState:Y,className:(0,s.Z)(J.root,x),ref:t},K,{children:[!1!==W?(0,b.jsx)(L,{ownerState:Y,className:J.icon,children:W||N[D]||O[D]}):null,(0,b.jsx)(j,{ownerState:Y,className:J.message,children:g}),null!=m?(0,b.jsx)(R,{ownerState:Y,className:J.action,children:m}):null,null==m&&I?(0,b.jsx)(R,{ownerState:Y,className:J.action,children:(0,b.jsx)(Q,(0,i.Z)({size:"small","aria-label":k,title:k,color:"inherit",onClick:I},ee,{children:(0,b.jsx)(U,(0,i.Z)({fontSize:"small"},te))}))}):null]}))}))},803:function(e,t,n){n.d(t,{Z:function(){return w}});var o=n(4942),r=n(3366),i=n(7462),a=n(2791),s=n(8182),c=n(7312),l=n(1217),u=n(4419),d=n(6083),f=(0,n(4046).ZP)(),v=n(5080),p=n(184),m=["className","component","disableGutters","fixed","maxWidth","classes"],h=(0,v.Z)(),g=f("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,c.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),Z=function(e){return(0,d.Z)({props:e,name:"MuiContainer",defaultTheme:h})},x=function(e,t){var n=e.classes,o=e.fixed,r=e.disableGutters,i=e.maxWidth,a={root:["root",i&&"maxWidth".concat((0,c.Z)(String(i))),o&&"fixed",r&&"disableGutters"]};return(0,u.Z)(a,(function(e){return(0,l.Z)(t,e)}),n)};var b=n(9853),C=n(277),k=n(5513),S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,n=void 0===t?g:t,c=e.useThemeProps,l=void 0===c?Z:c,u=e.componentName,d=void 0===u?"MuiContainer":u,f=n((function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&(0,o.Z)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}))}),(function(e){var t=e.theme;return e.ownerState.fixed&&Object.keys(t.breakpoints.values).reduce((function(e,n){var o=n,r=t.breakpoints.values[o];return 0!==r&&(e[t.breakpoints.up(o)]={maxWidth:"".concat(r).concat(t.breakpoints.unit)}),e}),{})}),(function(e){var t=e.theme,n=e.ownerState;return(0,i.Z)({},"xs"===n.maxWidth&&(0,o.Z)({},t.breakpoints.up("xs"),{maxWidth:Math.max(t.breakpoints.values.xs,444)}),n.maxWidth&&"xs"!==n.maxWidth&&(0,o.Z)({},t.breakpoints.up(n.maxWidth),{maxWidth:"".concat(t.breakpoints.values[n.maxWidth]).concat(t.breakpoints.unit)}))})),v=a.forwardRef((function(e,t){var n=l(e),o=n.className,a=n.component,c=void 0===a?"div":a,u=n.disableGutters,v=void 0!==u&&u,h=n.fixed,g=void 0!==h&&h,Z=n.maxWidth,b=void 0===Z?"lg":Z,C=(0,r.Z)(n,m),k=(0,i.Z)({},n,{component:c,disableGutters:v,fixed:g,maxWidth:b}),S=x(k,d);return(0,p.jsx)(f,(0,i.Z)({as:c,ownerState:k,className:(0,s.Z)(S.root,o),ref:t},C))}));return v}({createStyledComponent:(0,C.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["maxWidth".concat((0,b.Z)(String(n.maxWidth)))],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:function(e){return(0,k.Z)({props:e,name:"MuiContainer"})}}),w=S},1647:function(e,t,n){n.d(t,{Z:function(){return N}});var o=n(9439),r=n(4942),i=n(3366),a=n(7462),s=n(2791),c=n(8182),l=n(4419),u=n(7563),d=n(8956),f=n(9723),v=n(184);function p(e){return e.substring(2).toLowerCase()}var m=function(e){var t=e.children,n=e.disableReactTree,o=void 0!==n&&n,r=e.mouseEvent,i=void 0===r?"onClick":r,a=e.onClickAway,c=e.touchEvent,l=void 0===c?"onTouchEnd":c,m=s.useRef(!1),h=s.useRef(null),g=s.useRef(!1),Z=s.useRef(!1);s.useEffect((function(){return setTimeout((function(){g.current=!0}),0),function(){g.current=!1}}),[]);var x=(0,u.Z)(t.ref,h),b=(0,d.Z)((function(e){var t=Z.current;Z.current=!1;var n=(0,f.Z)(h.current);!g.current||!h.current||"clientX"in e&&function(e,t){return t.documentElement.clientWidth<e.clientX||t.documentElement.clientHeight<e.clientY}(e,n)||(m.current?m.current=!1:(e.composedPath?e.composedPath().indexOf(h.current)>-1:!n.documentElement.contains(e.target)||h.current.contains(e.target))||!o&&t||a(e))})),C=function(e){return function(n){Z.current=!0;var o=t.props[e];o&&o(n)}},k={ref:x};return!1!==l&&(k[l]=C(l)),s.useEffect((function(){if(!1!==l){var e=p(l),t=(0,f.Z)(h.current),n=function(){m.current=!0};return t.addEventListener(e,b),t.addEventListener("touchmove",n),function(){t.removeEventListener(e,b),t.removeEventListener("touchmove",n)}}}),[b,l]),!1!==i&&(k[i]=C(i)),s.useEffect((function(){if(!1!==i){var e=p(i),t=(0,f.Z)(h.current);return t.addEventListener(e,b),function(){t.removeEventListener(e,b)}}}),[b,i]),(0,v.jsx)(s.Fragment,{children:s.cloneElement(t,k)})},h=n(277),g=n(4142),Z=n(5513),x=n(9511),b=n(9853),C=n(8085),k=n(2065),S=n(6650),w=n(5878),y=n(1217);function M(e){return(0,y.Z)("MuiSnackbarContent",e)}(0,w.Z)("MuiSnackbarContent",["root","message","action"]);var E=["action","className","message","role"],L=(0,h.ZP)(S.Z,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(e){var t=e.theme,n="light"===t.palette.mode?.8:.98,o=(0,k._4)(t.palette.background.default,n);return(0,a.Z)({},t.typography.body2,(0,r.Z)({color:t.vars?t.vars.palette.SnackbarContent.color:t.palette.getContrastText(o),backgroundColor:t.vars?t.vars.palette.SnackbarContent.bg:o,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(t.vars||t).shape.borderRadius,flexGrow:1},t.breakpoints.up("sm"),{flexGrow:"initial",minWidth:288}))})),j=(0,h.ZP)("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:function(e,t){return t.message}})({padding:"8px 0"}),R=(0,h.ZP)("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:function(e,t){return t.action}})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),O=s.forwardRef((function(e,t){var n=(0,Z.Z)({props:e,name:"MuiSnackbarContent"}),o=n.action,r=n.className,s=n.message,u=n.role,d=void 0===u?"alert":u,f=(0,i.Z)(n,E),p=n,m=function(e){var t=e.classes;return(0,l.Z)({root:["root"],action:["action"],message:["message"]},M,t)}(p);return(0,v.jsxs)(L,(0,a.Z)({role:d,square:!0,elevation:6,className:(0,c.Z)(m.root,r),ownerState:p,ref:t},f,{children:[(0,v.jsx)(j,{className:m.message,ownerState:p,children:s}),o?(0,v.jsx)(R,{className:m.action,ownerState:p,children:o}):null]}))}));function A(e){return(0,y.Z)("MuiSnackbar",e)}(0,w.Z)("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);var P=["onEnter","onExited"],z=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],W=(0,h.ZP)("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["anchorOrigin".concat((0,b.Z)(n.anchorOrigin.vertical)).concat((0,b.Z)(n.anchorOrigin.horizontal))]]}})((function(e){var t=e.theme,n=e.ownerState;return(0,a.Z)({zIndex:(t.vars||t).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},"top"===n.anchorOrigin.vertical?{top:8}:{bottom:8},"left"===n.anchorOrigin.horizontal&&{justifyContent:"flex-start"},"right"===n.anchorOrigin.horizontal&&{justifyContent:"flex-end"},(0,r.Z)({},t.breakpoints.up("sm"),(0,a.Z)({},"top"===n.anchorOrigin.vertical?{top:24}:{bottom:24},"center"===n.anchorOrigin.horizontal&&{left:"50%",right:"auto",transform:"translateX(-50%)"},"left"===n.anchorOrigin.horizontal&&{left:24,right:"auto"},"right"===n.anchorOrigin.horizontal&&{right:24,left:"auto"})))})),T=s.forwardRef((function(e,t){var n=(0,Z.Z)({props:e,name:"MuiSnackbar"}),r=(0,g.Z)(),u={enter:r.transitions.duration.enteringScreen,exit:r.transitions.duration.leavingScreen},d=n.action,f=n.anchorOrigin,p=(f=void 0===f?{vertical:"bottom",horizontal:"left"}:f).vertical,h=f.horizontal,k=n.autoHideDuration,S=void 0===k?null:k,w=n.children,y=n.className,M=n.ClickAwayListenerProps,E=n.ContentProps,L=n.disableWindowBlurListener,j=void 0!==L&&L,R=n.message,T=n.onBlur,N=n.onClose,I=n.onFocus,B=n.onMouseEnter,G=n.onMouseLeave,H=n.open,D=n.resumeHideDuration,_=n.TransitionComponent,F=void 0===_?C.Z:_,V=n.transitionDuration,X=void 0===V?u:V,$=n.TransitionProps,q=($=void 0===$?{}:$).onEnter,K=$.onExited,Y=(0,i.Z)(n.TransitionProps,P),J=(0,i.Z)(n,z),Q=(0,a.Z)({},n,{anchorOrigin:{vertical:p,horizontal:h}}),U=function(e){var t=e.classes,n=e.anchorOrigin,o={root:["root","anchorOrigin".concat((0,b.Z)(n.vertical)).concat((0,b.Z)(n.horizontal))]};return(0,l.Z)(o,A,t)}(Q),ee=s.useRef(),te=s.useState(!0),ne=(0,o.Z)(te,2),oe=ne[0],re=ne[1],ie=(0,x.Z)((function(){N&&N.apply(void 0,arguments)})),ae=(0,x.Z)((function(e){N&&null!=e&&(clearTimeout(ee.current),ee.current=setTimeout((function(){ie(null,"timeout")}),e))}));s.useEffect((function(){return H&&ae(S),function(){clearTimeout(ee.current)}}),[H,S,ae]);var se=function(){clearTimeout(ee.current)},ce=s.useCallback((function(){null!=S&&ae(null!=D?D:.5*S)}),[S,D,ae]);return s.useEffect((function(){if(!j&&H)return window.addEventListener("focus",ce),window.addEventListener("blur",se),function(){window.removeEventListener("focus",ce),window.removeEventListener("blur",se)}}),[j,ce,H]),s.useEffect((function(){if(H)return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)};function e(e){e.defaultPrevented||"Escape"!==e.key&&"Esc"!==e.key||N&&N(e,"escapeKeyDown")}}),[oe,H,N]),!H&&oe?null:(0,v.jsx)(m,(0,a.Z)({onClickAway:function(e){N&&N(e,"clickaway")}},M,{children:(0,v.jsx)(W,(0,a.Z)({className:(0,c.Z)(U.root,y),onBlur:function(e){T&&T(e),ce()},onFocus:function(e){I&&I(e),se()},onMouseEnter:function(e){B&&B(e),se()},onMouseLeave:function(e){G&&G(e),ce()},ownerState:Q,ref:t,role:"presentation"},J,{children:(0,v.jsx)(F,(0,a.Z)({appear:!0,in:H,timeout:X,direction:"top"===p?"down":"up",onEnter:function(e,t){re(!1),q&&q(e,t)},onExited:function(e){re(!0),K&&K(e)}},Y,{children:w||(0,v.jsx)(O,(0,a.Z)({message:R,action:d},E))}))}))}))})),N=T},5987:function(e,t,n){n.d(t,{Z:function(){return r}});var o=n(3366);function r(e,t){if(null==e)return{};var n,r,i=(0,o.Z)(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}}}]);
//# sourceMappingURL=60.f796898c.chunk.js.map