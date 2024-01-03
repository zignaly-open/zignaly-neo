"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[2664],{"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx=__webpack_require__("../../node_modules/clsx/dist/clsx.mjs"),extendSxProp=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClasses=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,generateUtilityClasses.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},"inherit"===ownerState.variant&&{font:"inherit"},"inherit"!==ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/material/styles/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Dz:()=>slotShouldForwardProp,FO:()=>rootShouldForwardProp,ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/createStyled.js"),_defaultTheme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/defaultTheme.js"),_identifier__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/material/styles/identifier.js");const rootShouldForwardProp=prop=>(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.x9)(prop)&&"classes"!==prop,slotShouldForwardProp=_mui_system__WEBPACK_IMPORTED_MODULE_0__.x9,__WEBPACK_DEFAULT_EXPORT__=(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.ZP)({themeId:_identifier__WEBPACK_IMPORTED_MODULE_1__.Z,defaultTheme:_defaultTheme__WEBPACK_IMPORTED_MODULE_2__.Z,rootShouldForwardProp})},"../../node_modules/@mui/material/styles/useThemeProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useThemeProps});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/useThemeProps/useThemeProps.js"),_defaultTheme__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/material/styles/defaultTheme.js"),_identifier__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/identifier.js");function useThemeProps({props,name}){return(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)({props,name,defaultTheme:_defaultTheme__WEBPACK_IMPORTED_MODULE_1__.Z,themeId:_identifier__WEBPACK_IMPORTED_MODULE_2__.Z})}},"../../node_modules/@mui/material/utils/capitalize.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/utils/esm/capitalize/capitalize.js").Z},"../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js");const _excluded=["sx"],splitProps=props=>{var _props$theme$unstable,_props$theme;const result={systemProps:{},otherProps:{}},config=null!=(_props$theme$unstable=null==props||null==(_props$theme=props.theme)?void 0:_props$theme.unstable_sxConfig)?_props$theme$unstable:_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__.Z;return Object.keys(props).forEach((prop=>{config[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"../../node_modules/@mui/system/esm/useThemeProps/getThemeProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>getThemeProps});var _mui_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/utils/esm/resolveProps.js");function getThemeProps(params){const{theme,name,props}=params;return theme&&theme.components&&theme.components[name]&&theme.components[name].defaultProps?(0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__.Z)(theme.components[name].defaultProps,props):props}},"../../node_modules/@mui/system/esm/useThemeProps/useThemeProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useThemeProps});var _getThemeProps__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/system/esm/useThemeProps/getThemeProps.js"),_useTheme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/useTheme.js");function useThemeProps({props,name,defaultTheme,themeId}){let theme=(0,_useTheme__WEBPACK_IMPORTED_MODULE_0__.Z)(defaultTheme);themeId&&(theme=theme[themeId]||theme);return(0,_getThemeProps__WEBPACK_IMPORTED_MODULE_1__.Z)({theme,name,props})}},"../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function composeClasses(slots,getUtilityClass,classes=void 0){const output={};return Object.keys(slots).forEach((slot=>{output[slot]=slots[slot].reduce(((acc,key)=>{if(key){const utilityClass=getUtilityClass(key);""!==utilityClass&&acc.push(utilityClass),classes&&classes[key]&&acc.push(classes[key])}return acc}),[]).join(" ")})),output}__webpack_require__.d(__webpack_exports__,{Z:()=>composeClasses})},"../../node_modules/@mui/utils/esm/resolveProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>resolveProps});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/utils/node_modules/@babel/runtime/helpers/esm/extends.js");function resolveProps(defaultProps,props){const output=(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.Z)({},props);return Object.keys(defaultProps).forEach((propName=>{if(propName.toString().match(/^(components|slots)$/))output[propName]=(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.Z)({},defaultProps[propName],output[propName]);else if(propName.toString().match(/^(componentsProps|slotProps)$/)){const defaultSlotProps=defaultProps[propName]||{},slotProps=props[propName];output[propName]={},slotProps&&Object.keys(slotProps)?defaultSlotProps&&Object.keys(defaultSlotProps)?(output[propName]=(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.Z)({},slotProps),Object.keys(defaultSlotProps).forEach((slotPropName=>{output[propName][slotPropName]=resolveProps(defaultSlotProps[slotPropName],slotProps[slotPropName])}))):output[propName]=slotProps:output[propName]=defaultSlotProps}else void 0===output[propName]&&(output[propName]=defaultProps[propName])})),output}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/display/ZigTypography/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,Showcase:()=>Showcase,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _index__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Display/ZigTypography",component:_index__WEBPACK_IMPORTED_MODULE_2__.Z,argTypes:{text:{control:"text",defaultValue:"Hello"},variant:{options:["body1","body2","bigNumber","h1","h2","h3","h4","caption"],control:{type:"select"},defaultValue:"body1"}},parameters:{jest:["typography"]}},Template=({variant,text})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{component:"p",variant,children:text});Template.displayName="Template";const Basic=Template.bind({});Basic.args={text:"Example text"};const Showcase=(({text})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"bigNumber",children:["bigNumber: ",text]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"h1",children:["h1: ",text]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"h2",children:["h2: ",text]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"h3",children:["h3: ",text]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"h4",children:["h4: ",text]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"body1",component:"p",children:["body1: ",text]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"body2",component:"p",children:["body2: ",text]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{variant:"caption",children:["caption: ",text]})]})).bind({});Showcase.args={text:"Example text"}},"../../node_modules/clsx/dist/clsx.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}}}]);