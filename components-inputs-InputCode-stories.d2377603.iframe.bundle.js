"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[2910],{"../../node_modules/@mui/material/Box/Box.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Box_Box});var esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),styled_engine=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),styleFunctionSx_styleFunctionSx=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"),extendSxProp=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),useTheme=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/useTheme.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["className","component"];var ClassNameGenerator=__webpack_require__("../../node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js");const Box=function createBox(options={}){const{defaultTheme,defaultClassName="MuiBox-root",generateClassName,styleFunctionSx=styleFunctionSx_styleFunctionSx.Z}=options,BoxRoot=(0,styled_engine.ZP)("div")(styleFunctionSx);return react.forwardRef((function Box(inProps,ref){const theme=(0,useTheme.Z)(defaultTheme),_extendSxProp=(0,extendSxProp.Z)(inProps),{className,component="div"}=_extendSxProp,other=(0,objectWithoutPropertiesLoose.Z)(_extendSxProp,_excluded);return(0,jsx_runtime.jsx)(BoxRoot,(0,esm_extends.Z)({as:component,ref,className:(0,clsx_m.Z)(className,generateClassName?generateClassName(defaultClassName):defaultClassName),theme},other))}))}({defaultTheme:(0,__webpack_require__("../../node_modules/@mui/material/styles/createTheme.js").Z)(),defaultClassName:"MuiBox-root",generateClassName:ClassNameGenerator.Z.generate}),Box_Box=Box},"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),extendSxProp=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx_m.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_getThemeValue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/getThemeValue.js");const _excluded=["sx"],splitProps=props=>{const result={systemProps:{},otherProps:{}};return Object.keys(props).forEach((prop=>{_getThemeValue__WEBPACK_IMPORTED_MODULE_0__.Gc[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"../../node_modules/@mui/system/esm/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>esm_styled});var esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),styled_engine=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),createTheme=__webpack_require__("../../node_modules/@mui/system/esm/createTheme/createTheme.js"),capitalize=__webpack_require__("../../node_modules/@mui/utils/esm/capitalize.js");const _excluded=["variant"];function isEmpty(string){return 0===string.length}function propsToClassKey(props){const{variant}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded);let classKey=variant||"";return Object.keys(other).sort().forEach((key=>{classKey+="color"===key?isEmpty(classKey)?props[key]:(0,capitalize.Z)(props[key]):`${isEmpty(classKey)?key:(0,capitalize.Z)(key)}${(0,capitalize.Z)(props[key].toString())}`})),classKey}var styleFunctionSx_styleFunctionSx=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");const createStyled_excluded=["name","slot","skipVariantsResolver","skipSx","overridesResolver"],_excluded2=["theme"],_excluded3=["theme"];function createStyled_isEmpty(obj){return 0===Object.keys(obj).length}function shouldForwardProp(prop){return"ownerState"!==prop&&"theme"!==prop&&"sx"!==prop&&"as"!==prop}const systemDefaultTheme=(0,createTheme.Z)();const esm_styled=function createStyled(input={}){const{defaultTheme=systemDefaultTheme,rootShouldForwardProp=shouldForwardProp,slotShouldForwardProp=shouldForwardProp,styleFunctionSx=styleFunctionSx_styleFunctionSx.Z}=input;return(tag,inputOptions={})=>{const{name:componentName,slot:componentSlot,skipVariantsResolver:inputSkipVariantsResolver,skipSx:inputSkipSx,overridesResolver}=inputOptions,options=(0,objectWithoutPropertiesLoose.Z)(inputOptions,createStyled_excluded),skipVariantsResolver=void 0!==inputSkipVariantsResolver?inputSkipVariantsResolver:componentSlot&&"Root"!==componentSlot||!1,skipSx=inputSkipSx||!1;let shouldForwardPropOption=shouldForwardProp;"Root"===componentSlot?shouldForwardPropOption=rootShouldForwardProp:componentSlot&&(shouldForwardPropOption=slotShouldForwardProp);const defaultStyledResolver=(0,styled_engine.ZP)(tag,(0,esm_extends.Z)({shouldForwardProp:shouldForwardPropOption,label:undefined},options)),muiStyledResolver=(styleArg,...expressions)=>{const expressionsWithDefaultTheme=expressions?expressions.map((stylesArg=>"function"==typeof stylesArg&&stylesArg.__emotion_real!==stylesArg?_ref=>{let{theme:themeInput}=_ref,other=(0,objectWithoutPropertiesLoose.Z)(_ref,_excluded2);return stylesArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))}:stylesArg)):[];let transformedStyleArg=styleArg;componentName&&overridesResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme,styleOverrides=((name,theme)=>theme.components&&theme.components[name]&&theme.components[name].styleOverrides?theme.components[name].styleOverrides:null)(componentName,theme);if(styleOverrides){const resolvedStyleOverrides={};return Object.entries(styleOverrides).forEach((([slotKey,slotStyle])=>{resolvedStyleOverrides[slotKey]="function"==typeof slotStyle?slotStyle((0,esm_extends.Z)({},props,{theme})):slotStyle})),overridesResolver(props,resolvedStyleOverrides)}return null})),componentName&&!skipVariantsResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return((props,styles,theme,name)=>{var _theme$components,_theme$components$nam;const{ownerState={}}=props,variantsStyles=[],themeVariants=null==theme||null==(_theme$components=theme.components)||null==(_theme$components$nam=_theme$components[name])?void 0:_theme$components$nam.variants;return themeVariants&&themeVariants.forEach((themeVariant=>{let isMatch=!0;Object.keys(themeVariant.props).forEach((key=>{ownerState[key]!==themeVariant.props[key]&&props[key]!==themeVariant.props[key]&&(isMatch=!1)})),isMatch&&variantsStyles.push(styles[propsToClassKey(themeVariant.props)])})),variantsStyles})(props,((name,theme)=>{let variants=[];theme&&theme.components&&theme.components[name]&&theme.components[name].variants&&(variants=theme.components[name].variants);const variantsStyles={};return variants.forEach((definition=>{const key=propsToClassKey(definition.props);variantsStyles[key]=definition.style})),variantsStyles})(componentName,theme),theme,componentName)})),skipSx||expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return styleFunctionSx((0,esm_extends.Z)({},props,{theme}))}));const numOfCustomFnsApplied=expressionsWithDefaultTheme.length-expressions.length;if(Array.isArray(styleArg)&&numOfCustomFnsApplied>0){const placeholders=new Array(numOfCustomFnsApplied).fill("");transformedStyleArg=[...styleArg,...placeholders],transformedStyleArg.raw=[...styleArg.raw,...placeholders]}else"function"==typeof styleArg&&styleArg.__emotion_real!==styleArg&&(transformedStyleArg=_ref2=>{let{theme:themeInput}=_ref2,other=(0,objectWithoutPropertiesLoose.Z)(_ref2,_excluded3);return styleArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))});return defaultStyledResolver(transformedStyleArg,...expressionsWithDefaultTheme)};return defaultStyledResolver.withConfig&&(muiStyledResolver.withConfig=defaultStyledResolver.withConfig),muiStyledResolver}}()},"./src/components/display/ZigAlertMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>ErrorMessage,Z:()=>display_ZigAlertMessage});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const Layout=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`,Icon=styled_components_browser_esm.ZP.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;var error_alert_icon=__webpack_require__("./src/assets/icons/error-alert-icon.svg"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),useTheme=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigAlertMessage({text,error,warning,id}){const{palette}=(0,useTheme.Z)();return(0,jsx_runtime.jsxs)(Layout,{id,children:[(0,jsx_runtime.jsx)(Icon,{children:(0,jsx_runtime.jsx)(error_alert_icon.r,{height:"24px",width:"24px",color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400})}),(0,jsx_runtime.jsx)(ZigTypography.Z,{variant:"body2",sx:{color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400},children:text})]})}ZigAlertMessage.displayName="ZigAlertMessage";const display_ZigAlertMessage=ZigAlertMessage,ErrorMessage=({text,id})=>(0,jsx_runtime.jsx)(ZigAlertMessage,{text,error:!0,id});ErrorMessage.displayName="ErrorMessage";try{ZigAlertMessage.displayName="ZigAlertMessage",ZigAlertMessage.__docgenInfo={description:"",displayName:"ZigAlertMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},warning:{defaultValue:null,description:"",name:"warning",required:!1,type:{name:"boolean | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"]={docgenInfo:ZigAlertMessage.__docgenInfo,name:"ZigAlertMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"})}catch(__react_docgen_typescript_loader_error){}try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/inputs/InputCode/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),prop_types=__webpack_require__("../../node_modules/prop-types/index.js"),prop_types_default=__webpack_require__.n(prop_types);var styles_react_code_input_container="styles_react-code-input-container__tpiKG",styles_react_code_input="styles_react-code-input__CRulA",styles_loading="styles_loading__Z65VQ",styles_blur="styles_blur__19vMK",styles_title="styles_title__1cca0",styles_spin="styles_spin__6y_8G";!function styleInject(css,ref){void 0===ref&&(ref={});var insertAt=ref.insertAt;if(css&&"undefined"!=typeof document){var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.type="text/css","top"===insertAt&&head.firstChild?head.insertBefore(style,head.firstChild):head.appendChild(style),style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css))}}("/* add css styles here (optional) */\n\n.styles_react-code-input-container__tpiKG {\n  position: relative;\n}\n\n.styles_react-code-input__CRulA > input {\n  border: solid 1px #a8adb7;\n  border-right: none;\n  font-family: 'Lato';\n  font-size: 20px;\n  color: #525461;\n  text-align: center;\n  box-sizing: border-box;\n  border-radius: 0;\n  -webkit-appearance: initial;\n}\n\n.styles_react-code-input__CRulA > input:last-child {\n  border-right: solid 1px #a8adb7;\n  border-top-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n}\n\n.styles_react-code-input__CRulA > input:first-child {\n  border-top-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n\n.styles_react-code-input__CRulA > input:focus {\n  outline: none;\n  border: 1px solid #006fff;\n  caret-color: #006fff;\n}\n\n.styles_react-code-input__CRulA > input:focus + input {\n  border-left: none;\n}\n\n.styles_loading__Z65VQ {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  text-align: center;\n}\n\n.styles_blur__19vMK {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #fff;\n  opacity: 0.5;\n  filter: blur(0.5px);\n  transition: opacity 0.3s;\n}\n\n.styles_title__1cca0 {\n  margin: 0;\n  height: 20px;\n  padding-bottom: 10px;\n}\n\n.styles_spin__6y_8G {\n  display: inline-block;\n  animation: styles_loadingCircle__293ky 1s infinite linear;\n}\n\n@keyframes styles_loadingCircle__293ky {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n");var createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),KEY_CODE_backspace=8,KEY_CODE_left=37,KEY_CODE_up=38,KEY_CODE_right=39,KEY_CODE_down=40,ReactCodeInput=function(_Component){function ReactCodeInput(props){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,ReactCodeInput);var _this=function(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}(this,(ReactCodeInput.__proto__||Object.getPrototypeOf(ReactCodeInput)).call(this,props));_initialiseProps.call(_this);var fields=props.fields,values=props.values,vals=void 0,autoFocusIndex=0;if(values&&values.length){vals=[];for(var i=0;i<fields;i++)vals.push(values[i]||"");autoFocusIndex=values.length>=fields?0:values.length}else vals=Array(fields).fill("");_this.state={values:vals,autoFocusIndex},_this.iRefs=[];for(var _i=0;_i<fields;_i++)_this.iRefs.push(react.createRef());return _this.id=+new Date,_this}return function(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}(ReactCodeInput,_Component),createClass(ReactCodeInput,[{key:"render",value:function render(){var _this2=this,_state=this.state,values=_state.values,autoFocusIndex=_state.autoFocusIndex,_props=this.props,loading=_props.loading,title=_props.title,fieldHeight=_props.fieldHeight,fieldWidth=_props.fieldWidth,fields=_props.fields,autoFocus=_props.autoFocus,className=_props.className,type=_props.type,INPUT_STYLE={width:fieldWidth,height:fieldHeight},ROOT_STYLE={width:fields*fieldWidth},LOADING_STYLE={lineHeight:fieldHeight+"px"};return react.createElement("div",{className:styles_react_code_input_container+" "+className,style:ROOT_STYLE},title&&react.createElement("p",{className:styles_title},title),react.createElement("div",{className:styles_react_code_input},values.map((function(value,index){return react.createElement("input",{type:"number"===type?"tel":type,pattern:"number"===type?"[0-9]*":null,autoFocus:autoFocus&&index===autoFocusIndex,style:INPUT_STYLE,key:_this2.id+"-"+index,"data-id":index,value,id:_this2.props.id?_this2.props.id+"-"+index:null,ref:_this2.iRefs[index],onChange:_this2.onChange,onKeyDown:_this2.onKeyDown,onFocus:_this2.onFocus,disabled:_this2.props.disabled,required:_this2.props.required,placeholder:_this2.props.placeholder[index],autoComplete:_this2.props.autoComplete})}))),loading&&react.createElement("div",{className:styles_loading,style:LOADING_STYLE},react.createElement("div",{className:styles_blur}),react.createElement("svg",{className:styles_spin,viewBox:"0 0 1024 1024","data-icon":"loading",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},react.createElement("path",{fill:"#006fff",d:"M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"}))))}}]),ReactCodeInput}(react.Component);ReactCodeInput.propTypes={type:prop_types_default().oneOf(["text","number"]),onChange:prop_types_default().func,onComplete:prop_types_default().func,fields:prop_types_default().number,loading:prop_types_default().bool,title:prop_types_default().string,fieldWidth:prop_types_default().number,id:prop_types_default().string,fieldHeight:prop_types_default().number,autoFocus:prop_types_default().bool,className:prop_types_default().string,values:prop_types_default().arrayOf(prop_types_default().string),disabled:prop_types_default().bool,required:prop_types_default().bool,placeholder:prop_types_default().arrayOf(prop_types_default().string),autoComplete:prop_types_default().string},ReactCodeInput.defaultProps={type:"number",fields:6,fieldWidth:58,fieldHeight:54,autoFocus:!0,disabled:!1,required:!1,autoComplete:"one-time-code",placeholder:[]};var _initialiseProps=function _initialiseProps(){var _this3=this;this.__clearvalues__=function(){var fields=_this3.props.fields;_this3.setState({values:Array(fields).fill("")}),_this3.iRefs[0].current.focus()},this.triggerChange=function(){var values=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_this3.state.values,_props2=_this3.props,onChange=_props2.onChange,onComplete=_props2.onComplete,fields=_props2.fields,val=values.join("");onChange&&onChange(val),onComplete&&val.length>=fields&&onComplete(val)},this.onChange=function(e){var index=parseInt(e.target.dataset.id);if("number"===_this3.props.type&&(e.target.value=e.target.value.replace(/[^\d]/gi,"")),""!==e.target.value&&("number"!==_this3.props.type||e.target.validity.valid)){var fields=_this3.props.fields,next=void 0,value=e.target.value,values=_this3.state.values;if(values=Object.assign([],values),value.length>1){var nextIndex=value.length+index-1;nextIndex>=fields&&(nextIndex=fields-1),next=_this3.iRefs[nextIndex],value.split("").forEach((function(item,i){var cursor=index+i;cursor<fields&&(values[cursor]=item)})),_this3.setState({values})}else next=_this3.iRefs[index+1],values[index]=value,_this3.setState({values});next&&(next.current.focus(),next.current.select()),_this3.triggerChange(values)}},this.onKeyDown=function(e){var index=parseInt(e.target.dataset.id),prevIndex=index-1,nextIndex=index+1,prev=_this3.iRefs[prevIndex],next=_this3.iRefs[nextIndex];switch(e.keyCode){case KEY_CODE_backspace:e.preventDefault();var vals=[].concat(function(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}(_this3.state.values));_this3.state.values[index]?(vals[index]="",_this3.setState({values:vals}),_this3.triggerChange(vals)):prev&&(vals[prevIndex]="",prev.current.focus(),_this3.setState({values:vals}),_this3.triggerChange(vals));break;case KEY_CODE_left:e.preventDefault(),prev&&prev.current.focus();break;case KEY_CODE_right:e.preventDefault(),next&&next.current.focus();break;case KEY_CODE_up:case KEY_CODE_down:e.preventDefault()}},this.onFocus=function(e){e.target.select(e)}};const index_es=ReactCodeInput;var styled=__webpack_require__("./src/utils/styled.ts");const Layout=(0,__webpack_require__("../../node_modules/@mui/system/esm/styled.js").Z)("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
  .input-box {
    background: ${props=>props.theme.palette.backgrounds.input2fa};
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content !important;
    position: relative;

    ${props=>`\n    ${(0,styled.W)(props.loading,"\n        div:last-of-type {\n          height: 64px;\n          border-radius: 8px;\n          background: unset;\n        }\n    ")}\n  `}
    div:first-child {
      display: flex;
      gap: 8px;
    }

    input {
      background: ${props=>props.theme.palette.backgrounds.input2fa};
      background: linear-gradient(
        90deg,
        ${props=>props.theme.palette.backgrounds.input2fa} 0%,
        ${props=>props.theme.palette.backgrounds.input2fa} 100%
      );
      border-radius: 8px;
      border: 1px solid ${props=>props.theme.palette.neutral600} !important;
      color: ${props=>`${props.theme.palette.neutral100}`};
      width: 64px !important;
      font-family: ${props=>props.theme.typography.fontFamily};
      height: 64px !important;
      font-size: 26px;
    }

    input:not(:placeholder-shown):valid {
      border-width: 1px;
      border-image-source: ${props=>props.theme.palette.input2faGradientBorder};
      border-image-slice: 1;
      background-image: linear-gradient(
          to bottom,
          ${props=>props.theme.palette.backgrounds.modal},
          ${props=>props.theme.palette.backgrounds.modal}
        ),
        ${props=>props.theme.palette.backgrounds.input2faGradient};
      background-origin: border-box;
      background-clip: content-box, border-box;
      border: none !important;
    }
  }

  ${props=>`\n    ${(0,styled.W)(props.error,`\n       .input-box {\n          margin-bottom: 10px;\n          input {\n            border-color: ${props.theme.palette.redGraphOrError} !important;\n          }\n       }\n    `)}\n  `}
`;var ZigAlertMessage=__webpack_require__("./src/components/display/ZigAlertMessage/index.tsx"),Box=__webpack_require__("../../node_modules/@mui/material/Box/Box.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function InputCode({fields,loading,onComplete,autoFocus=!1,clearOnError=!1,error=null,prefixId}){const inputRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{if(inputRef.current){const input=inputRef.current;input.iRefs.length&&autoFocus&&setTimeout((()=>{input.iRefs[0].current?.focus()}),300)}}),[inputRef]),(0,react.useEffect)((()=>{error&&clearOnError&&inputRef.current?.__clearvalues__()}),[error,clearOnError]),(0,jsx_runtime.jsxs)(Layout,{error:error||void 0,loading,children:[(0,jsx_runtime.jsx)(Box.Z,{id:prefixId&&`${prefixId}__code-input`,children:(0,jsx_runtime.jsx)(index_es,{ref:inputRef,className:"input-box",fields,loading,disabled:loading,autoFocus,onComplete,placeholder:new Array(fields).fill(" ")})}),error&&(0,jsx_runtime.jsx)(ZigAlertMessage.B,{text:error,id:prefixId&&`${prefixId}__error-message`})]})}InputCode.displayName="InputCode";const inputs_InputCode=InputCode;try{InputCode.displayName="InputCode",InputCode.__docgenInfo={description:"",displayName:"InputCode",props:{fields:{defaultValue:null,description:"",name:"fields",required:!0,type:{name:"number"}},onComplete:{defaultValue:null,description:"",name:"onComplete",required:!0,type:{name:"any"}},loading:{defaultValue:null,description:"",name:"loading",required:!0,type:{name:"boolean"}},clearOnError:{defaultValue:{value:"false"},description:"",name:"clearOnError",required:!1,type:{name:"boolean | undefined"}},error:{defaultValue:{value:"null"},description:"",name:"error",required:!1,type:{name:"string | null | undefined"}},autoFocus:{defaultValue:{value:"false"},description:"",name:"autoFocus",required:!1,type:{name:"boolean | undefined"}},prefixId:{defaultValue:null,description:"",name:"prefixId",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/InputCode/index.tsx#InputCode"]={docgenInfo:InputCode.__docgenInfo,name:"InputCode",path:"src/components/inputs/InputCode/index.tsx#InputCode"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Inputs/InputCode",component:inputs_InputCode,argTypes:{fields:{type:"number"},onComplete:{type:"function"},loading:{type:"boolean",defaultValue:!1}}},Template=args=>(0,jsx_runtime.jsx)(inputs_InputCode,{...args});Template.displayName="Template";const Basic=Template.bind({});Basic.args={fields:6,loading:!1,onComplete:()=>{}}},"./src/utils/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>styledIf});const styledIf=(cond,primaryQuery,secondaryQuery)=>secondaryQuery?cond?primaryQuery:secondaryQuery:cond?primaryQuery:""},"./src/assets/icons/error-alert-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>SvgErrorAlertIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgErrorAlertIcon=function SvgErrorAlertIcon(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"zig-icon"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 3C7.02979 3 3 7.03124 3 12C3 16.9717 7.02979 21 12 21C16.9702 21 21 16.9717 21 12C21 7.03124 16.9702 3 12 3ZM12 19.2581C7.98876 19.2581 4.74194 16.0126 4.74194 12C4.74194 7.9901 7.9889 4.74194 12 4.74194C16.0098 4.74194 19.2581 7.98887 19.2581 12C19.2581 16.0112 16.0126 19.2581 12 19.2581ZM13.5242 15.4839C13.5242 16.3243 12.8404 17.0081 12 17.0081C11.1596 17.0081 10.4758 16.3243 10.4758 15.4839C10.4758 14.6434 11.1596 13.9597 12 13.9597C12.8404 13.9597 13.5242 14.6434 13.5242 15.4839ZM10.5712 7.81206L10.818 12.7475C10.8296 12.9793 11.0209 13.1613 11.253 13.1613H12.747C12.9791 13.1613 13.1704 12.9793 13.182 12.7475L13.4287 7.81206C13.4412 7.56333 13.2429 7.35484 12.9938 7.35484H11.0062C10.7571 7.35484 10.5588 7.56333 10.5712 7.81206Z",fill:props.color}))}}}]);
//# sourceMappingURL=components-inputs-InputCode-stories.d2377603.iframe.bundle.js.map