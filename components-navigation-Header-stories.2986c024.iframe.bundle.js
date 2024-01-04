"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[8402],{"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx=__webpack_require__("../../node_modules/clsx/dist/clsx.mjs"),extendSxProp=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClasses=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,generateUtilityClasses.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},"inherit"===ownerState.variant&&{font:"inherit"},"inherit"!==ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/material/styles/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Dz:()=>slotShouldForwardProp,FO:()=>rootShouldForwardProp,ZP:()=>__WEBPACK_DEFAULT_EXPORT__});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/createStyled.js"),_defaultTheme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/defaultTheme.js"),_identifier__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/material/styles/identifier.js");const rootShouldForwardProp=prop=>(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.x9)(prop)&&"classes"!==prop,slotShouldForwardProp=_mui_system__WEBPACK_IMPORTED_MODULE_0__.x9,__WEBPACK_DEFAULT_EXPORT__=(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.ZP)({themeId:_identifier__WEBPACK_IMPORTED_MODULE_1__.Z,defaultTheme:_defaultTheme__WEBPACK_IMPORTED_MODULE_2__.Z,rootShouldForwardProp})},"../../node_modules/@mui/material/styles/useThemeProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useThemeProps});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/useThemeProps/useThemeProps.js"),_defaultTheme__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/material/styles/defaultTheme.js"),_identifier__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/identifier.js");function useThemeProps({props,name}){return(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)({props,name,defaultTheme:_defaultTheme__WEBPACK_IMPORTED_MODULE_1__.Z,themeId:_identifier__WEBPACK_IMPORTED_MODULE_2__.Z})}},"../../node_modules/@mui/material/utils/capitalize.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/utils/esm/capitalize/capitalize.js").Z},"../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js");const _excluded=["sx"],splitProps=props=>{var _props$theme$unstable,_props$theme;const result={systemProps:{},otherProps:{}},config=null!=(_props$theme$unstable=null==props||null==(_props$theme=props.theme)?void 0:_props$theme.unstable_sxConfig)?_props$theme$unstable:_defaultSxConfig__WEBPACK_IMPORTED_MODULE_0__.Z;return Object.keys(props).forEach((prop=>{config[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"../../node_modules/@mui/system/esm/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("../../node_modules/@mui/system/esm/createStyled.js").ZP)()},"../../node_modules/@mui/system/esm/useThemeProps/getThemeProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>getThemeProps});var _mui_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/utils/esm/resolveProps.js");function getThemeProps(params){const{theme,name,props}=params;return theme&&theme.components&&theme.components[name]&&theme.components[name].defaultProps?(0,_mui_utils__WEBPACK_IMPORTED_MODULE_0__.Z)(theme.components[name].defaultProps,props):props}},"../../node_modules/@mui/system/esm/useThemeProps/useThemeProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>useThemeProps});var _getThemeProps__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/system/esm/useThemeProps/getThemeProps.js"),_useTheme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/useTheme.js");function useThemeProps({props,name,defaultTheme,themeId}){let theme=(0,_useTheme__WEBPACK_IMPORTED_MODULE_0__.Z)(defaultTheme);themeId&&(theme=theme[themeId]||theme);return(0,_getThemeProps__WEBPACK_IMPORTED_MODULE_1__.Z)({theme,name,props})}},"../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function composeClasses(slots,getUtilityClass,classes=void 0){const output={};return Object.keys(slots).forEach((slot=>{output[slot]=slots[slot].reduce(((acc,key)=>{if(key){const utilityClass=getUtilityClass(key);""!==utilityClass&&acc.push(utilityClass),classes&&classes[key]&&acc.push(classes[key])}return acc}),[]).join(" ")})),output}__webpack_require__.d(__webpack_exports__,{Z:()=>composeClasses})},"../../node_modules/@mui/utils/esm/resolveProps.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>resolveProps});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/utils/node_modules/@babel/runtime/helpers/esm/extends.js");function resolveProps(defaultProps,props){const output=(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.Z)({},props);return Object.keys(defaultProps).forEach((propName=>{if(propName.toString().match(/^(components|slots)$/))output[propName]=(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.Z)({},defaultProps[propName],output[propName]);else if(propName.toString().match(/^(componentsProps|slotProps)$/)){const defaultSlotProps=defaultProps[propName]||{},slotProps=props[propName];output[propName]={},slotProps&&Object.keys(slotProps)?defaultSlotProps&&Object.keys(defaultSlotProps)?(output[propName]=(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.Z)({},slotProps),Object.keys(defaultSlotProps).forEach((slotPropName=>{output[propName][slotPropName]=resolveProps(defaultSlotProps[slotPropName],slotProps[slotPropName])}))):output[propName]=slotProps:output[propName]=defaultSlotProps}else void 0===output[propName]&&(output[propName]=defaultProps[propName])})),output}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/navigation/Header/components/BrandImage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>BrandImage});__webpack_require__("../../node_modules/react/index.js");var _types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/navigation/Header/components/BrandImage/types.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function BrandImage({type,width,height,id}){const Icon=_types__WEBPACK_IMPORTED_MODULE_2__.J[type];return Icon?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Icon,{width,height,id}):null}try{BrandImage.displayName="BrandImage",BrandImage.__docgenInfo={description:"",displayName:"BrandImage",props:{type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"enum",value:[{value:'"isotype"'},{value:'"logotype"'}]}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string | undefined"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/navigation/Header/components/BrandImage/index.tsx#BrandImage"]={docgenInfo:BrandImage.__docgenInfo,name:"BrandImage",path:"src/components/navigation/Header/components/BrandImage/index.tsx#BrandImage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/navigation/Header/components/BrandImage/types.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>iconsByType});var _path,_defs,react=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var zignaly_logotype_defs,_g,_g2;function zignaly_logotype_extends(){return zignaly_logotype_extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},zignaly_logotype_extends.apply(this,arguments)}const iconsByType={isotype:function SvgZignalyIsotype(props){return react.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 32 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),_path||(_path=react.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M29.3814 9.75401C30.8544 9.75401 32 10.9519 32 12.492V18.139C32 19.6791 30.8544 20.877 29.3814 20.877C27.9085 20.877 26.7628 19.6791 26.7628 18.139V12.492C26.7628 10.9519 27.9085 9.75401 29.3814 9.75401ZM22.8349 13.4332C24.3079 13.4332 25.4535 14.631 25.4535 16.1711V25.8396C25.4535 27.3797 24.3079 28.5775 22.8349 28.5775C21.362 28.5775 20.2164 27.3797 20.2164 25.8396V16.1711C20.2164 14.631 21.362 13.4332 22.8349 13.4332ZM15.9611 2.31016C17.4341 2.31016 18.5797 3.50802 18.5797 5.04813V29.262C18.5797 30.8021 17.4341 32 15.9611 32C14.4882 32 13.3426 30.8021 13.3426 29.262V5.04813C13.3426 3.50802 14.4882 2.31016 15.9611 2.31016ZM9.41468 0C10.8876 0 12.0333 1.19786 12.0333 2.73797V16.0856C12.0333 17.6257 10.8876 18.8235 9.41468 18.8235C7.94172 18.8235 6.79609 17.6257 6.79609 16.0856V2.73797C6.79609 1.28342 7.94172 0 9.41468 0ZM2.54088 9.49733C4.01384 9.49733 5.15947 10.6952 5.15947 12.2353V19.0802C5.15947 20.6203 4.01384 21.8182 2.62271 21.8182C1.14976 21.8182 0.00412551 20.6203 0.00412551 19.1658V19.0802V12.2353C-0.0777054 10.6952 1.06793 9.49733 2.54088 9.49733Z",fill:"url(#paint0_linear_1203_7683)"})),_defs||(_defs=react.createElement("defs",null,react.createElement("linearGradient",{id:"paint0_linear_1203_7683",x1:27.7008,y1:25.0139,x2:2.90077,y2:7.14064,gradientUnits:"userSpaceOnUse"},react.createElement("stop",{offset:.04,stopColor:"#11CED0"}),react.createElement("stop",{offset:.43,stopColor:"#4053C1"}),react.createElement("stop",{offset:.69,stopColor:"#7D33D6"}),react.createElement("stop",{offset:.95,stopColor:"#CF61DC"})))))},logotype:function SvgZignalyLogotype(props){return react.createElement("svg",zignaly_logotype_extends({id:"uuid-2fe9f0cd-65fa-4e9b-a7ac-a022cbb38dca",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",viewBox:"0 0 857.41 337.53",width:"1em",height:"1em"},props),zignaly_logotype_defs||(zignaly_logotype_defs=react.createElement("defs",null,react.createElement("style",null,".uuid-b414f11c-77ef-4abd-924b-318e4b7961d3{fill:#fff;}.uuid-e559c2bf-a35b-4512-846e-6cf0474367b7{fill:url(#uuid-f637730e-8596-4bdc-9f92-539bb3825146);}.uuid-bc325453-c466-460c-940e-2cee977f8ea3{fill:url(#uuid-7253ba0d-3f30-450e-827e-b6f166b4f53e);}.uuid-2d50c48e-633b-480f-b0fa-c337102b019e{fill:url(#uuid-6045e0e9-d2de-4068-90b3-0c1a243977dd);}.uuid-06ad72d7-da42-47a4-8d58-372914a0d218{fill:url(#uuid-d39223f3-1b22-4161-b05d-d388b89d36db);}.uuid-9242cdcf-97ae-453a-a939-b32b35d2dfbd{fill:url(#uuid-561bd4ee-0d41-4ea5-a0e3-979dab82733c);}"),react.createElement("linearGradient",{id:"uuid-d39223f3-1b22-4161-b05d-d388b89d36db",x1:71.76,y1:14093.52,x2:201.02,y2:14009.48,gradientTransform:"translate(0 14251.62) scale(1 -1)",gradientUnits:"userSpaceOnUse"},react.createElement("stop",{offset:.04,stopColor:"#da70ff"}),react.createElement("stop",{offset:.45,stopColor:"#7b0eff"}),react.createElement("stop",{offset:1,stopColor:"#1be7e7"})),react.createElement("linearGradient",{id:"uuid-7253ba0d-3f30-450e-827e-b6f166b4f53e",x1:98.24,y1:14134.25,x2:227.5,y2:14050.21,xlinkHref:"#uuid-d39223f3-1b22-4161-b05d-d388b89d36db"}),react.createElement("linearGradient",{id:"uuid-6045e0e9-d2de-4068-90b3-0c1a243977dd",x1:90.52,y1:14122.38,x2:219.79,y2:14038.34,xlinkHref:"#uuid-d39223f3-1b22-4161-b05d-d388b89d36db"}),react.createElement("linearGradient",{id:"uuid-f637730e-8596-4bdc-9f92-539bb3825146",x1:92.06,y1:14124.75,x2:221.33,y2:14040.71,xlinkHref:"#uuid-d39223f3-1b22-4161-b05d-d388b89d36db"}),react.createElement("linearGradient",{id:"uuid-561bd4ee-0d41-4ea5-a0e3-979dab82733c",x1:118.79,y1:14165.87,x2:248.06,y2:14081.83,xlinkHref:"#uuid-d39223f3-1b22-4161-b05d-d388b89d36db"}))),_g||(_g=react.createElement("g",null,react.createElement("path",{className:"uuid-06ad72d7-da42-47a4-8d58-372914a0d218",d:"m85.63,134.26c-8.28,0-14.99,6.62-14.99,14.79v36.15c0,8.17,6.71,14.79,14.99,14.79s14.99-6.62,14.99-14.79v-36.15c0-8.17-6.71-14.79-14.99-14.79Z"}),react.createElement("path",{className:"uuid-bc325453-c466-460c-940e-2cee977f8ea3",d:"m123.38,83.88c-7.97,0-14.44,6.38-14.44,14.24v71.2c0,7.87,6.46,14.24,14.44,14.24s14.43-6.38,14.43-14.24v-71.2c0-7.87-6.46-14.24-14.43-14.24Z"}),react.createElement("path",{className:"uuid-2d50c48e-633b-480f-b0fa-c337102b019e",d:"m160.58,95.92c-7.97,0-14.43,6.38-14.43,14.24v129.26c0,7.87,6.46,14.24,14.43,14.24s14.43-6.38,14.43-14.24V110.16c0-7.87-6.46-14.24-14.43-14.24Z"}),react.createElement("path",{className:"uuid-e559c2bf-a35b-4512-846e-6cf0474367b7",d:"m197.78,155.08c-7.97,0-14.43,6.38-14.43,14.24v52.58c0,7.87,6.46,14.24,14.43,14.24s14.44-6.38,14.44-14.24v-52.58c0-7.87-6.46-14.24-14.44-14.24Z"}),react.createElement("path",{className:"uuid-9242cdcf-97ae-453a-a939-b32b35d2dfbd",d:"m235.53,134.26c-8.28,0-14.99,6.62-14.99,14.79v25.2c0,8.17,6.71,14.79,14.99,14.79s14.99-6.62,14.99-14.79v-25.2c0-8.17-6.71-14.79-14.99-14.79Z"}))),_g2||(_g2=react.createElement("g",null,react.createElement("path",{className:"uuid-b414f11c-77ef-4abd-924b-318e4b7961d3",d:"m373.89,194.29v14.65c0,1.11-.9,2.01-2.01,2.01h-65.83c-1.11,0-2.01-.9-2.01-2.01v-12.54c0-1.21.44-2.38,1.24-3.3l38.44-44.05c1.13-1.3.21-3.32-1.51-3.32h-35.68c-1.11,0-2.01-.9-2.01-2.01v-14.65c0-1.11.9-2.01,2.01-2.01h64.88c1.11,0,2.01.9,2.01,2.01v12.74c0,1.19-.42,2.33-1.19,3.24l-37.16,43.93c-1.1,1.3-.18,3.3,1.53,3.3h35.29c1.11,0,2.01.9,2.01,2.01Z"}),react.createElement("path",{className:"uuid-b414f11c-77ef-4abd-924b-318e4b7961d3",d:"m383.55,115.18v-16.72c0-1.11.9-2.01,2.01-2.01h18.79c1.11,0,2.01.9,2.01,2.01v16.72c0,1.11-.9,2.01-2.01,2.01h-18.79c-1.11,0-2.01-.9-2.01-2.01Zm22.64,13.9v79.86c0,1.11-.9,2.01-2.01,2.01h-18.31c-1.11,0-2.01-.9-2.01-2.01v-79.86c0-1.11.9-2.01,2.01-2.01h18.31c1.11,0,2.01.9,2.01,2.01Z"}),react.createElement("path",{className:"uuid-b414f11c-77ef-4abd-924b-318e4b7961d3",d:"m497.08,201.7c0,12.23-3.83,21.85-11.48,28.86s-17.97,10.52-30.94,10.52c-10.31,0-18.82-2.1-25.51-6.3-6.12-3.84-10.43-9.3-12.91-16.39-.38-1.09.23-2.28,1.34-2.6l17.08-4.95c1.01-.29,2.05.25,2.43,1.22,1.33,3.42,3.36,6.13,6.1,8.13,3.19,2.34,7.12,3.51,11.8,3.51,6.38,0,11.27-1.67,14.67-5.02,3.4-3.35,5.1-8.21,5.1-14.59v-.75c0-1.68-1.98-2.65-3.26-1.56-1.83,1.55-3.99,2.88-6.47,3.99-4.15,1.86-8.66,2.79-13.55,2.79-5.53,0-10.6-1.06-15.23-3.19-4.62-2.13-8.58-5.26-11.88-9.41-2.98-3.72-5.26-8.08-6.86-13.08s-2.39-10.31-2.39-15.95.8-10.92,2.39-15.87c1.59-4.94,3.88-9.28,6.86-13,3.3-4.15,7.26-7.28,11.88-9.41s9.7-3.19,15.23-3.19c4.89,0,9.41.93,13.55,2.79,2.48,1.11,4.63,2.44,6.47,3.99,1.29,1.09,3.26.12,3.26-1.56v-1.62c0-1.11.9-2.01,2.01-2.01h18.31c1.11,0,2.01.9,2.01,2.01v72.62Zm-22.17-35.72c0-6.7-1.65-11.99-4.94-15.87s-7.71-5.82-13.24-5.82c-5.95,0-10.6,1.99-13.95,5.98-3.35,3.99-5.02,9.54-5.02,16.66s1.67,12.7,5.02,16.74c3.35,4.04,8,6.06,13.95,6.06,5.53,0,9.94-1.94,13.24-5.82s4.94-9.12,4.94-15.71v-2.23Z"}),react.createElement("path",{className:"uuid-b414f11c-77ef-4abd-924b-318e4b7961d3",d:"m507.44,208.94v-79.86c0-1.11.9-2.01,2.01-2.01h18.31c1.11,0,2.01.9,2.01,2.01v1.75c0,1.7,1.99,2.64,3.29,1.53,2.02-1.72,4.27-3.14,6.76-4.25,3.93-1.75,8.24-2.63,12.92-2.63,8.61,0,15.47,2.71,20.57,8.13,5.1,5.42,7.65,12.76,7.65,22.01v53.33c0,1.11-.9,2.01-2.01,2.01h-18.31c-1.11,0-2.01-.9-2.01-2.01v-46.95c0-5.21-1.14-9.2-3.43-11.96-2.29-2.76-5.61-4.15-9.97-4.15s-8.16,1.51-11.08,4.54c-2.92,3.03-4.39,7.04-4.39,12.04v46.47c0,1.11-.9,2.01-2.01,2.01h-18.31c-1.11,0-2.01-.9-2.01-2.01Z"}),react.createElement("path",{className:"uuid-b414f11c-77ef-4abd-924b-318e4b7961d3",d:"m631.84,209.99c-4.25,1.59-9.04,2.39-14.35,2.39-8.4,0-15.26-2.29-20.57-6.86s-7.97-10.52-7.97-17.86,2.47-13.05,7.42-17.46c4.94-4.41,12.57-7.52,22.88-9.33l20.89-3.99v-1.28c0-3.93-1.06-6.86-3.19-8.77-2.13-1.91-5.37-2.87-9.73-2.87-4.04,0-7.23.9-9.57,2.71-1.98,1.53-3.47,3.79-4.46,6.77-.32.95-1.28,1.54-2.27,1.35l-17.21-3.24c-1.2-.23-1.93-1.47-1.53-2.62,2.31-6.74,6.41-12.23,12.32-16.45,6.54-4.68,14.38-7.02,23.52-7.02,10.95,0,19.35,2.5,25.19,7.49,5.85,5,8.77,12.23,8.77,21.69v34.28c0,2.23.53,3.75,1.59,4.54.74.56,1.82.84,3.24.85,1.11,0,2.02.89,2.02,2v12.84c0,1.03-.78,1.88-1.8,2-6.1.69-11.16.46-15.18-.71-3.58-1.04-6.34-2.84-8.27-5.42-.7-.93-2.05-1.03-2.92-.25-2.46,2.18-5.4,3.91-8.82,5.19Zm3.11-18.5c3.46-2.66,5.18-6.11,5.18-10.36v-6.15c0-1.27-1.16-2.22-2.41-1.97l-14.02,2.86c-4.57.85-7.84,2.13-9.81,3.83s-2.95,3.93-2.95,6.7.98,5.1,2.95,6.7,4.65,2.39,8.05,2.39c5.21,0,9.54-1.33,13-3.99Z"}),react.createElement("path",{className:"uuid-b414f11c-77ef-4abd-924b-318e4b7961d3",d:"m699.86,98.46v110.48c0,1.11-.9,2.01-2.01,2.01h-18.31c-1.11,0-2.01-.9-2.01-2.01v-110.48c0-1.11.9-2.01,2.01-2.01h18.31c1.11,0,2.01.9,2.01,2.01Z"}),react.createElement("path",{className:"uuid-b414f11c-77ef-4abd-924b-318e4b7961d3",d:"m754.49,215.73c-3.3,8.93-7.39,15.23-12.28,18.9-4.89,3.67-11.32,5.5-19.29,5.5-1.7,0-3.11-.03-4.23-.08-.73-.03-1.64-.1-2.72-.21s-1.82-.96-1.82-2v-14.07c0-1.16.98-2.07,2.13-2,.69.04,1.31.08,1.85.1,1.06.05,1.86.08,2.39.08,3.19,0,5.63-.58,7.34-1.75,1.7-1.17,3.08-3.14,4.15-5.9l1.54-3.8c.75-1.86.78-3.94.08-5.82l-28.03-74.89c-.49-1.31.48-2.71,1.88-2.71h18.8c.86,0,1.62.54,1.9,1.35l16.59,48.23c.62,1.81,3.19,1.8,3.8-.01l16.16-48.2c.27-.82,1.04-1.37,1.9-1.37h18.15c1.4,0,2.37,1.4,1.88,2.71l-32.15,85.95Z"}))))}}},"./src/components/navigation/Header/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Main:()=>Main,default:()=>stories});__webpack_require__("../../node_modules/react/index.js");var styled=__webpack_require__("./src/components/styled.ts"),esm_styled=__webpack_require__("../../node_modules/@mui/system/esm/styled.js");const Layout=(0,esm_styled.Z)("header")`
  background: linear-gradient(269.14deg, #080810 0%, #11122b 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 12;
  height: ${"52px"};

  @media only screen and (min-width: 600px) {
    padding: 0 32px;
  }
`,Container=(0,esm_styled.Z)(styled.Us)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`,Side=(0,esm_styled.Z)("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 28px;
`,HeaderLinksContainer=(0,esm_styled.Z)("nav")`
  display: flex;
  flex-direction: row;
  gap: 28px;
  user-select: none;

  a {
    color: ${({theme})=>theme.palette.neutral200};
    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: 0.55px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${({theme})=>theme.palette.neutral100};
    }

    &.active {
      &,
      &:hover {
        color: ${({theme})=>theme.palette.highlighted};
      }
    }
  }
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Header({leftElements=[],rightElements=[],className}){return(0,jsx_runtime.jsx)(Layout,{className,children:(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Side,{children:leftElements?.length>0&&leftElements}),(0,jsx_runtime.jsx)(Side,{children:rightElements?.length>0&&rightElements})]})})}Header.displayName="Header";const navigation_Header=Header;try{Header.displayName="Header",Header.__docgenInfo={description:"",displayName:"Header",props:{leftElements:{defaultValue:{value:"[]"},description:"",name:"leftElements",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>[]"}},rightElements:{defaultValue:{value:"[]"},description:"",name:"rightElements",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>[]"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/navigation/Header/index.tsx#Header"]={docgenInfo:Header.__docgenInfo,name:"Header",path:"src/components/navigation/Header/index.tsx#Header"})}catch(__react_docgen_typescript_loader_error){}var BrandImage=__webpack_require__("./src/components/navigation/Header/components/BrandImage/index.tsx");const stories={title:"Navigation/___FIXME____Header",component:navigation_Header},Template=args=>(0,jsx_runtime.jsx)(navigation_Header,{...args});Template.displayName="Template";const Main=Template.bind({});Main.args={leftElements:[(0,jsx_runtime.jsx)(BrandImage.Z,{type:"isotype",width:"32px",height:"32px"},"logo"),(0,jsx_runtime.jsxs)(HeaderLinksContainer,{children:[(0,jsx_runtime.jsx)("a",{href:"javascript:void(0)",className:"active",children:"Menu 1"},"header-link-1"),(0,jsx_runtime.jsx)("a",{href:"javascript:void(0)",children:"Menu 2"},"header-link-2"),(0,jsx_runtime.jsx)("a",{href:"javascript:void(0)",children:"Menu 3"},"header-link-3")]},"links")]}},"./src/components/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D0:()=>ValueIndicator,Us:()=>MarginContainer});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/styled.js"),_display_ZigTypography__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/display/ZigTypography/index.tsx");const MarginContainer=(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)("div")`
  margin: 0 auto;
  max-width: 1430px;
  @media (min-width: ${({theme})=>theme.breakpoints.values.md}px) {
    padding: 0 22px;
  }
  padding: 0 2px 0;
  width: 100%;
`,ValueIndicator=((0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)(MarginContainer)`
  @media (min-width: ${({theme})=>theme.breakpoints.values.md}px) {
    padding: 52px 22px 40px;
  }
  padding: 52px 4px 40px;
`,(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)(_display_ZigTypography__WEBPACK_IMPORTED_MODULE_1__.Z)`
  display: inline;
  font-size: 15px !important;
  line-height: 24px !important;
  font-weight: 500;

  ${props=>`\n    \n    &.zero {\n      color: ${props.theme.palette.neutral300}\n    }\n    \n    &.positive {\n      color: ${props.theme.palette.greenGraph};\n    }\n    \n    &.negative {\n      color: ${props.theme.palette.redGraphOrError};\n    }\n  `}
`)},"../../node_modules/clsx/dist/clsx.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}}}]);
//# sourceMappingURL=components-navigation-Header-stories.2986c024.iframe.bundle.js.map