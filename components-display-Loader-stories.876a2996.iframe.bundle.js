/*! For license information please see components-display-Loader-stories.876a2996.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[8426],{"../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>emotion_styled_browser_esm});var react=__webpack_require__("../../node_modules/react/index.js"),react_namespaceObject=__webpack_require__.t(react,2),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),emotion_is_prop_valid_esm=__webpack_require__("../../node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js"),emotion_element_cbed451f_browser_esm=__webpack_require__("../../node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js"),emotion_utils_browser_esm=__webpack_require__("../../node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js"),emotion_serialize_browser_esm=__webpack_require__("../../node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js"),testOmitPropsOnStringTag=emotion_is_prop_valid_esm.Z,testOmitPropsOnComponent=function testOmitPropsOnComponent(key){return"theme"!==key},getDefaultShouldForwardProp=function getDefaultShouldForwardProp(tag){return"string"==typeof tag&&tag.charCodeAt(0)>96?testOmitPropsOnStringTag:testOmitPropsOnComponent},composeShouldForwardProps=function composeShouldForwardProps(tag,options,isReal){var shouldForwardProp;if(options){var optionsShouldForwardProp=options.shouldForwardProp;shouldForwardProp=tag.__emotion_forwardProp&&optionsShouldForwardProp?function(propName){return tag.__emotion_forwardProp(propName)&&optionsShouldForwardProp(propName)}:optionsShouldForwardProp}return"function"!=typeof shouldForwardProp&&isReal&&(shouldForwardProp=tag.__emotion_forwardProp),shouldForwardProp},useInsertionEffect=react_namespaceObject.useInsertionEffect?react_namespaceObject.useInsertionEffect:function useInsertionEffect(create){create()};var Insertion=function Insertion(_ref){var cache=_ref.cache,serialized=_ref.serialized,isStringTag=_ref.isStringTag;(0,emotion_utils_browser_esm.hC)(cache,serialized,isStringTag);(function useInsertionEffectMaybe(create){useInsertionEffect(create)})((function(){return(0,emotion_utils_browser_esm.My)(cache,serialized,isStringTag)}));return null};const emotion_styled_base_browser_esm=function createStyled(tag,options){var identifierName,targetClassName,isReal=tag.__emotion_real===tag,baseTag=isReal&&tag.__emotion_base||tag;void 0!==options&&(identifierName=options.label,targetClassName=options.target);var shouldForwardProp=composeShouldForwardProps(tag,options,isReal),defaultShouldForwardProp=shouldForwardProp||getDefaultShouldForwardProp(baseTag),shouldUseAs=!defaultShouldForwardProp("as");return function(){var args=arguments,styles=isReal&&void 0!==tag.__emotion_styles?tag.__emotion_styles.slice(0):[];if(void 0!==identifierName&&styles.push("label:"+identifierName+";"),null==args[0]||void 0===args[0].raw)styles.push.apply(styles,args);else{0,styles.push(args[0][0]);for(var len=args.length,i=1;i<len;i++)styles.push(args[i],args[0][i])}var Styled=(0,emotion_element_cbed451f_browser_esm.w)((function(props,cache,ref){var FinalTag=shouldUseAs&&props.as||baseTag,className="",classInterpolations=[],mergedProps=props;if(null==props.theme){for(var key in mergedProps={},props)mergedProps[key]=props[key];mergedProps.theme=(0,react.useContext)(emotion_element_cbed451f_browser_esm.T)}"string"==typeof props.className?className=(0,emotion_utils_browser_esm.fp)(cache.registered,classInterpolations,props.className):null!=props.className&&(className=props.className+" ");var serialized=(0,emotion_serialize_browser_esm.O)(styles.concat(classInterpolations),cache.registered,mergedProps);className+=cache.key+"-"+serialized.name,void 0!==targetClassName&&(className+=" "+targetClassName);var finalShouldForwardProp=shouldUseAs&&void 0===shouldForwardProp?getDefaultShouldForwardProp(FinalTag):defaultShouldForwardProp,newProps={};for(var _key in props)shouldUseAs&&"as"===_key||finalShouldForwardProp(_key)&&(newProps[_key]=props[_key]);return newProps.className=className,newProps.ref=ref,(0,react.createElement)(react.Fragment,null,(0,react.createElement)(Insertion,{cache,serialized,isStringTag:"string"==typeof FinalTag}),(0,react.createElement)(FinalTag,newProps))}));return Styled.displayName=void 0!==identifierName?identifierName:"Styled("+("string"==typeof baseTag?baseTag:baseTag.displayName||baseTag.name||"Component")+")",Styled.defaultProps=tag.defaultProps,Styled.__emotion_real=Styled,Styled.__emotion_base=baseTag,Styled.__emotion_styles=styles,Styled.__emotion_forwardProp=shouldForwardProp,Object.defineProperty(Styled,"toString",{value:function value(){return"."+targetClassName}}),Styled.withComponent=function(nextTag,nextOptions){return createStyled(nextTag,(0,esm_extends.Z)({},options,nextOptions,{shouldForwardProp:composeShouldForwardProps(Styled,nextOptions,!0)})).apply(void 0,styles)},Styled}};var newStyled=emotion_styled_base_browser_esm.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(tagName){newStyled[tagName]=newStyled(tagName)}));const emotion_styled_browser_esm=newStyled},"../../node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{My:()=>insertStyles,fp:()=>getRegisteredStyles,hC:()=>registerStyles});function getRegisteredStyles(registered,registeredStyles,classNames){var rawClassName="";return classNames.split(" ").forEach((function(className){void 0!==registered[className]?registeredStyles.push(registered[className]+";"):rawClassName+=className+" "})),rawClassName}var registerStyles=function registerStyles(cache,serialized,isStringTag){var className=cache.key+"-"+serialized.name;!1===isStringTag&&void 0===cache.registered[className]&&(cache.registered[className]=serialized.styles)},insertStyles=function insertStyles(cache,serialized,isStringTag){registerStyles(cache,serialized,isStringTag);var className=cache.key+"-"+serialized.name;if(void 0===cache.inserted[serialized.name]){var current=serialized;do{cache.insert(serialized===current?"."+className:"",current,cache.sheet,!0);current=current.next}while(void 0!==current)}}},"../../node_modules/@mui/styled-engine/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Co:()=>internal_processStyles,ZP:()=>styled});var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js");function styled(tag,options){return(0,_emotion_styled__WEBPACK_IMPORTED_MODULE_0__.Z)(tag,options)}const internal_processStyles=(tag,processor)=>{Array.isArray(tag.__emotion_styles)&&(tag.__emotion_styles=processor(tag.__emotion_styles))}},"../../node_modules/@mui/system/esm/createBox.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>createBox});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),clsx__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/clsx/dist/clsx.mjs"),_mui_styled_engine__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),_styleFunctionSx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"),_styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),_useTheme__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mui/system/esm/useTheme.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["className","component"];function createBox(options={}){const{themeId,defaultTheme,defaultClassName="MuiBox-root",generateClassName}=options,BoxRoot=(0,_mui_styled_engine__WEBPACK_IMPORTED_MODULE_2__.ZP)("div",{shouldForwardProp:prop=>"theme"!==prop&&"sx"!==prop&&"as"!==prop})(_styleFunctionSx__WEBPACK_IMPORTED_MODULE_3__.Z);return react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function Box(inProps,ref){const theme=(0,_useTheme__WEBPACK_IMPORTED_MODULE_4__.Z)(defaultTheme),_extendSxProp=(0,_styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__.Z)(inProps),{className,component="div"}=_extendSxProp,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__.Z)(_extendSxProp,_excluded);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BoxRoot,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__.Z)({as:component,ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_8__.Z)(className,generateClassName?generateClassName(defaultClassName):defaultClassName),theme:themeId&&theme[themeId]||theme},other))}))}},"../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js");const _excluded=["sx"],splitProps=props=>{var _props$theme$unstable,_props$theme;const result={systemProps:{},otherProps:{}},config=null!=(_props$theme$unstable=null==props||null==(_props$theme=props.theme)?void 0:_props$theme.unstable_sxConfig)?_props$theme$unstable:_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__.Z;return Object.keys(props).forEach((prop=>{config[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"./src/components/display/Loader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>Loader,l:()=>CenteredLoader});__webpack_require__("../../node_modules/react/index.js");var react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react-loader-spinner/dist/react-loader-spinner.esm.js"),_mui_system__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mui/system/esm/Box/Box.js"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const Loader=({width=40,height=40})=>{const{palette}=(0,_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_loader_spinner__WEBPACK_IMPORTED_MODULE_1__.iT,{wrapperClass:"simple-loader",width:width+"px",height:height+"px",color:palette.contrasting,secondaryColor:palette.contrasting+"33",ariaLabel:"Loading..."})};Loader.displayName="Loader";const CenteredLoader=({width=40,height=40})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_mui_system__WEBPACK_IMPORTED_MODULE_4__.Z,{className:"centered-loader-wrapper",sx:{display:"flex",padding:"8em 0",alignItems:"center",justifyContent:"center"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Loader,{width,height})});CenteredLoader.displayName="CenteredLoader";try{Loader.displayName="Loader",Loader.__docgenInfo={description:"",displayName:"Loader",props:{width:{defaultValue:{value:"40"},description:"",name:"width",required:!1,type:{name:"number | undefined"}},height:{defaultValue:{value:"40"},description:"",name:"height",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Loader/index.tsx#Loader"]={docgenInfo:Loader.__docgenInfo,name:"Loader",path:"src/components/display/Loader/index.tsx#Loader"})}catch(__react_docgen_typescript_loader_error){}try{CenteredLoader.displayName="CenteredLoader",CenteredLoader.__docgenInfo={description:"",displayName:"CenteredLoader",props:{width:{defaultValue:{value:"40"},description:"",name:"width",required:!1,type:{name:"number | undefined"}},height:{defaultValue:{value:"40"},description:"",name:"height",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Loader/index.tsx#CenteredLoader"]={docgenInfo:CenteredLoader.__docgenInfo,name:"CenteredLoader",path:"src/components/display/Loader/index.tsx#CenteredLoader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/Loader/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Centered:()=>Centered,Small:()=>Small,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var ___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/Loader/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Display/Loaders",component:___WEBPACK_IMPORTED_MODULE_2__.l},TemplateSmall=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.a,{...args});TemplateSmall.displayName="TemplateSmall";const TemplateCentered=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.l,{...args});TemplateCentered.displayName="TemplateCentered";const Small=TemplateSmall.bind({});Small.args={};const Centered=TemplateCentered.bind({});Centered.args={}},"../../node_modules/clsx/dist/clsx.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}}}]);