"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[2222],{"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),extendSxProp=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx_m.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_getThemeValue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/getThemeValue.js");const _excluded=["sx"],splitProps=props=>{const result={systemProps:{},otherProps:{}};return Object.keys(props).forEach((prop=>{_getThemeValue__WEBPACK_IMPORTED_MODULE_0__.Gc[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"../../node_modules/@mui/system/esm/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>esm_styled});var esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),styled_engine=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),createTheme=__webpack_require__("../../node_modules/@mui/system/esm/createTheme/createTheme.js"),capitalize=__webpack_require__("../../node_modules/@mui/utils/esm/capitalize.js");const _excluded=["variant"];function isEmpty(string){return 0===string.length}function propsToClassKey(props){const{variant}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded);let classKey=variant||"";return Object.keys(other).sort().forEach((key=>{classKey+="color"===key?isEmpty(classKey)?props[key]:(0,capitalize.Z)(props[key]):`${isEmpty(classKey)?key:(0,capitalize.Z)(key)}${(0,capitalize.Z)(props[key].toString())}`})),classKey}var styleFunctionSx_styleFunctionSx=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");const createStyled_excluded=["name","slot","skipVariantsResolver","skipSx","overridesResolver"],_excluded2=["theme"],_excluded3=["theme"];function createStyled_isEmpty(obj){return 0===Object.keys(obj).length}function shouldForwardProp(prop){return"ownerState"!==prop&&"theme"!==prop&&"sx"!==prop&&"as"!==prop}const systemDefaultTheme=(0,createTheme.Z)();const esm_styled=function createStyled(input={}){const{defaultTheme=systemDefaultTheme,rootShouldForwardProp=shouldForwardProp,slotShouldForwardProp=shouldForwardProp,styleFunctionSx=styleFunctionSx_styleFunctionSx.Z}=input;return(tag,inputOptions={})=>{const{name:componentName,slot:componentSlot,skipVariantsResolver:inputSkipVariantsResolver,skipSx:inputSkipSx,overridesResolver}=inputOptions,options=(0,objectWithoutPropertiesLoose.Z)(inputOptions,createStyled_excluded),skipVariantsResolver=void 0!==inputSkipVariantsResolver?inputSkipVariantsResolver:componentSlot&&"Root"!==componentSlot||!1,skipSx=inputSkipSx||!1;let shouldForwardPropOption=shouldForwardProp;"Root"===componentSlot?shouldForwardPropOption=rootShouldForwardProp:componentSlot&&(shouldForwardPropOption=slotShouldForwardProp);const defaultStyledResolver=(0,styled_engine.ZP)(tag,(0,esm_extends.Z)({shouldForwardProp:shouldForwardPropOption,label:undefined},options)),muiStyledResolver=(styleArg,...expressions)=>{const expressionsWithDefaultTheme=expressions?expressions.map((stylesArg=>"function"==typeof stylesArg&&stylesArg.__emotion_real!==stylesArg?_ref=>{let{theme:themeInput}=_ref,other=(0,objectWithoutPropertiesLoose.Z)(_ref,_excluded2);return stylesArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))}:stylesArg)):[];let transformedStyleArg=styleArg;componentName&&overridesResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme,styleOverrides=((name,theme)=>theme.components&&theme.components[name]&&theme.components[name].styleOverrides?theme.components[name].styleOverrides:null)(componentName,theme);if(styleOverrides){const resolvedStyleOverrides={};return Object.entries(styleOverrides).forEach((([slotKey,slotStyle])=>{resolvedStyleOverrides[slotKey]="function"==typeof slotStyle?slotStyle((0,esm_extends.Z)({},props,{theme})):slotStyle})),overridesResolver(props,resolvedStyleOverrides)}return null})),componentName&&!skipVariantsResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return((props,styles,theme,name)=>{var _theme$components,_theme$components$nam;const{ownerState={}}=props,variantsStyles=[],themeVariants=null==theme||null==(_theme$components=theme.components)||null==(_theme$components$nam=_theme$components[name])?void 0:_theme$components$nam.variants;return themeVariants&&themeVariants.forEach((themeVariant=>{let isMatch=!0;Object.keys(themeVariant.props).forEach((key=>{ownerState[key]!==themeVariant.props[key]&&props[key]!==themeVariant.props[key]&&(isMatch=!1)})),isMatch&&variantsStyles.push(styles[propsToClassKey(themeVariant.props)])})),variantsStyles})(props,((name,theme)=>{let variants=[];theme&&theme.components&&theme.components[name]&&theme.components[name].variants&&(variants=theme.components[name].variants);const variantsStyles={};return variants.forEach((definition=>{const key=propsToClassKey(definition.props);variantsStyles[key]=definition.style})),variantsStyles})(componentName,theme),theme,componentName)})),skipSx||expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return styleFunctionSx((0,esm_extends.Z)({},props,{theme}))}));const numOfCustomFnsApplied=expressionsWithDefaultTheme.length-expressions.length;if(Array.isArray(styleArg)&&numOfCustomFnsApplied>0){const placeholders=new Array(numOfCustomFnsApplied).fill("");transformedStyleArg=[...styleArg,...placeholders],transformedStyleArg.raw=[...styleArg.raw,...placeholders]}else"function"==typeof styleArg&&styleArg.__emotion_real!==styleArg&&(transformedStyleArg=_ref2=>{let{theme:themeInput}=_ref2,other=(0,objectWithoutPropertiesLoose.Z)(_ref2,_excluded3);return styleArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))});return defaultStyledResolver(transformedStyleArg,...expressionsWithDefaultTheme)};return defaultStyledResolver.withConfig&&(muiStyledResolver.withConfig=defaultStyledResolver.withConfig),muiStyledResolver}}()},"./src/components/display/ZigCoinIcon/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>display_ZigCoinIcon});var react=__webpack_require__("../../node_modules/react/index.js"),styled=__webpack_require__("../../node_modules/@mui/system/esm/styled.js");const Icon=(0,styled.Z)("img")`
  ${({size})=>`\n    width: ${size}px;\n    height: ${size}px;\n  `}
  border-radius: 50%;
`,Placeholder=(0,styled.Z)(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #324054;
  font-size: 16px;
`;var _path,_path2,_defs,types=__webpack_require__("./src/components/display/ZigCoinIcon/types.ts");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgZignalyCoin=function SvgZignalyCoin(props){return react.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 36 36",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),_path||(_path=react.createElement("path",{d:"M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05888 0 0 8.05887 0 18C0 27.9411 8.05888 36 18 36Z",fill:"#F3F4F6"})),_path2||(_path2=react.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M28.0361 13.3155C29.1408 13.3155 30 14.2139 30 15.369V19.6043C30 20.7594 29.1408 21.6578 28.0361 21.6578C26.9313 21.6578 26.0721 20.7594 26.0721 19.6043V15.369C26.0721 14.2139 26.9313 13.3155 28.0361 13.3155ZM23.1262 16.0749C24.2309 16.0749 25.0901 16.9733 25.0901 18.1283V25.3797C25.0901 26.5348 24.2309 27.4332 23.1262 27.4332C22.0215 27.4332 21.1623 26.5348 21.1623 25.3797V18.1283C21.1623 16.9733 22.0215 16.0749 23.1262 16.0749ZM17.9709 7.73262C19.0756 7.73262 19.9348 8.63102 19.9348 9.7861V27.9465C19.9348 29.1016 19.0756 30 17.9709 30C16.8661 30 16.0069 29.1016 16.0069 27.9465V9.7861C16.0069 8.63102 16.8661 7.73262 17.9709 7.73262ZM13.061 6C14.1657 6 15.0249 6.89839 15.0249 8.05348V18.0642C15.0249 19.2193 14.1657 20.1176 13.061 20.1176C11.9563 20.1176 11.0971 19.2193 11.0971 18.0642V8.05348C11.0971 6.96257 11.9563 6 13.061 6ZM7.90566 13.123C9.01038 13.123 9.8696 14.0214 9.8696 15.1765V20.3102C9.8696 21.4652 9.01038 22.3636 7.96704 22.3636C6.86232 22.3636 6.00309 21.4652 6.00309 20.3743V20.3102V15.1765C5.94172 14.0214 6.80094 13.123 7.90566 13.123Z",fill:"url(#paint0_linear_1609_15428)"})),_defs||(_defs=react.createElement("defs",null,react.createElement("linearGradient",{id:"paint0_linear_1609_15428",x1:10.125,y1:6,x2:32.4194,y2:19.5085,gradientUnits:"userSpaceOnUse"},react.createElement("stop",{stopColor:"#A600FB"}),react.createElement("stop",{offset:.260417,stopColor:"#6F06FC"}),react.createElement("stop",{offset:.625,stopColor:"#4959F5"}),react.createElement("stop",{offset:.828125,stopColor:"#2E8DDF"}),react.createElement("stop",{offset:1,stopColor:"#12C1C9"})))))},jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigCoinIcon=({size=types.V.Medium,coin,className="",bucket="coins-binance"})=>{const s="number"==typeof size?size:types.J[size],[src,setSrc]=(0,react.useState)(`https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${s},h_${s},r_max/${bucket}/${coin}`),onError=(0,react.useCallback)((()=>setSrc("")),[]);return coin?src?(0,jsx_runtime.jsx)(Icon,{src,alt:coin,size:s,className,onError}):"zig"===coin.toLowerCase()?(0,jsx_runtime.jsx)(SvgZignalyCoin,{width:types.J[size],height:types.J[size]}):(0,jsx_runtime.jsx)(Placeholder,{size:s,className,as:"div",children:coin[0]}):null},display_ZigCoinIcon=ZigCoinIcon;try{ZigCoinIcon.displayName="ZigCoinIcon",ZigCoinIcon.__docgenInfo={description:"",displayName:"ZigCoinIcon",props:{size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"number | CoinSizes | undefined"}},coin:{defaultValue:null,description:"",name:"coin",required:!0,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string | undefined"}},bucket:{defaultValue:{value:"coins-binance"},description:"",name:"bucket",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigCoinIcon/index.tsx#ZigCoinIcon"]={docgenInfo:ZigCoinIcon.__docgenInfo,name:"ZigCoinIcon",path:"src/components/display/ZigCoinIcon/index.tsx#ZigCoinIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigCoinIcon/types.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>sizes,V:()=>COIN_SIZES});const COIN_SIZES={Small:"small",Medium:"medium",Large:"large"},sizes={[COIN_SIZES.Small]:24,[COIN_SIZES.Medium]:36,[COIN_SIZES.Large]:42}},"./src/components/display/ZigTable/components/CoinLabel/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>components_CoinLabel});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),emotion_styled_browser_esm=__webpack_require__("../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),ZigCoinIcon=__webpack_require__("./src/components/display/ZigCoinIcon/index.tsx");const Layout=styled_components_browser_esm.ZP.div`
  flex-direction: row;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`,WrapCoin=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`,Icon=(0,styled_components_browser_esm.ZP)(ZigCoinIcon.Z)`
  display: flex;
  margin-right: 12px;
`,Name=(0,emotion_styled_browser_esm.Z)(ZigTypography.Z)`
  display: flex;
`,Coin=styled_components_browser_esm.ZP.span`
  display: flex;
  text-transform: uppercase;
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const CoinLabel=({name="TEATHER",coin="USDT"})=>(0,jsx_runtime.jsxs)(Layout,{children:[(0,jsx_runtime.jsx)(Icon,{coin}),(0,jsx_runtime.jsxs)(WrapCoin,{children:[(0,jsx_runtime.jsx)(Coin,{children:coin}),(0,jsx_runtime.jsx)(Name,{variant:"body2",fontWeight:"regular",color:"neutral300",children:name})]})]});CoinLabel.displayName="CoinLabel";const components_CoinLabel=CoinLabel;try{CoinLabel.displayName="CoinLabel",CoinLabel.__docgenInfo={description:"",displayName:"CoinLabel",props:{name:{defaultValue:{value:"TEATHER"},description:"",name:"name",required:!1,type:{name:"string"}},coin:{defaultValue:{value:"USDT"},description:"",name:"coin",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigTable/components/CoinLabel/index.tsx#CoinLabel"]={docgenInfo:CoinLabel.__docgenInfo,name:"CoinLabel",path:"src/components/display/ZigTable/components/CoinLabel/index.tsx#CoinLabel"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigTable/components/CoinLabel/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BNB:()=>BNB,BTC:()=>BTC,ETH:()=>ETH,USDT:()=>USDT,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _index__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/ZigTable/components/CoinLabel/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Display/Table/Components/CoinLabel",component:_index__WEBPACK_IMPORTED_MODULE_2__.Z,argTypes:{name:{control:"text",default:"Teather"},coin:{control:"text",default:"USDT"}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{...args});Template.displayName="Template";const USDT=Template.bind({});USDT.args={name:"Teather",coin:"USDT"};const BTC=Template.bind({});BTC.args={name:"Bitcoin",coin:"BTC"};const ETH=Template.bind({});ETH.args={name:"Ethereum",coin:"ETH"};const BNB=Template.bind({});BNB.args={name:"Binance Coin",coin:"BNB"}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z}}]);
//# sourceMappingURL=components-display-ZigTable-components-CoinLabel-stories.dd6da2eb.iframe.bundle.js.map