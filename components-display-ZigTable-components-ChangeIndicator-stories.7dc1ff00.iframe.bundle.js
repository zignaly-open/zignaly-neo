"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[3630],{"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),extendSxProp=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx_m.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_getThemeValue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/getThemeValue.js");const _excluded=["sx"],splitProps=props=>{const result={systemProps:{},otherProps:{}};return Object.keys(props).forEach((prop=>{_getThemeValue__WEBPACK_IMPORTED_MODULE_0__.Gc[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"./src/components/display/ZigTable/components/ChangeIndicator/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>components_ChangeIndicator});var react=__webpack_require__("../../node_modules/react/index.js"),react_number_format_es=__webpack_require__("../../node_modules/react-number-format/dist/react-number-format.es.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),bignumber=__webpack_require__("../../node_modules/bignumber.js/bignumber.mjs");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var emotion_styled_browser_esm=__webpack_require__("../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx");const Layout=styled_components_browser_esm.ZP.div`
  display: grid;
  grid-row: auto;
  justify-content: center;
`,Container=styled_components_browser_esm.ZP.div`
  text-align: center;
`,Row=(styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`,(0,emotion_styled_browser_esm.Z)(ZigTypography.Z)`
  display: inline;
  ${props=>`\n    font-size: 12px;\n    font-weight: 500;\n    color: ${props.isPositive?props.theme.palette.greenGraph:props.theme.palette.redGraphOrError};\n  `}
`,styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`),Inline=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`,Subtitle=(0,emotion_styled_browser_esm.Z)(ZigTypography.Z)`
  display: block;
`,Indicator=(0,styled_components_browser_esm.ZP)((function SvgCaretTriangleIcon(props){return react.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 5 5",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"zig-icon"},props),react.createElement("path",{d:"M0.425539 5L4.68785 5C4.9196 5 5.07033 4.74288 4.96669 4.52434L2.96089 0.295021C2.84911 0.0593252 2.53288 0.0511985 2.41034 0.280873L0.153824 4.51019C0.0369277 4.72929 0.187103 5 0.425539 5Z",fill:props.color}))}))`
  margin-right: 6px;
  vertical-align: middle;

  ${({isPositive})=>`\n    transform: ${isPositive?"rotateX(0deg)":"rotateX(180deg)"};\n  `}

  &.graph {
    margin-left: 6px;
    width: 8px;
    height: 8px;
  }
`;var styled=__webpack_require__("./src/components/styled.ts"),Tooltip=__webpack_require__("../../node_modules/@mui/material/Tooltip/Tooltip.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ChangeIndicator=({id,value="0",label,type="graph",normalized=!1,stableCoinOperative=!1,style,labelTooltip="",decimalScale=stableCoinOperative?2:8})=>{let bigNumberValue=new bignumber.Z(value);normalized&&(bigNumberValue=bigNumberValue.multipliedBy(100));const isPositiveValue=bigNumberValue.isPositive(),theme=(0,styled_components_browser_esm.Fg)();return(0,jsx_runtime.jsx)(Layout,{children:(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(Tooltip.Z,{title:labelTooltip,children:(0,jsx_runtime.jsx)(Row,{children:isNaN(+value)?(0,jsx_runtime.jsx)(ZigTypography.Z,{variant:"body2",color:"neutral400",children:"-"}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(()=>{const isZero=bigNumberValue.isZero(),indicatorClassName=isZero?"zero":isPositiveValue?"positive":"negative";switch(type){case"graph":return(0,jsx_runtime.jsxs)(Inline,{children:[(0,jsx_runtime.jsx)(styled.D0,{variant:"body2",className:indicatorClassName,children:(0,jsx_runtime.jsx)(react_number_format_es.h3,{style,value:bigNumberValue.toFixed(),displayType:"text",suffix:"%",decimalScale:2,thousandSeparator:",",id})}),!isZero&&(0,jsx_runtime.jsx)(Indicator,{className:`${type} ${indicatorClassName}`,width:"5",height:"5",isPositive:isPositiveValue,color:isZero?theme.palette.neutral300:isPositiveValue?theme.palette.greenGraph:theme.palette.redGraphOrError})]});case"only_number":return(0,jsx_runtime.jsx)(Inline,{children:(0,jsx_runtime.jsx)(styled.D0,{variant:"body1",className:indicatorClassName,children:(0,jsx_runtime.jsx)(react_number_format_es.h3,{style,value:bigNumberValue.toFixed(),displayType:"text",thousandSeparator:",",decimalScale,fixedDecimalScale:stableCoinOperative,id})})});default:return(0,jsx_runtime.jsx)(Inline,{children:(0,jsx_runtime.jsx)(styled.D0,{variant:"body1",className:indicatorClassName,children:(0,jsx_runtime.jsx)(react_number_format_es.h3,{style,value:bigNumberValue.toFixed(),displayType:"text",suffix:"%",thousandSeparator:",",decimalScale,fixedDecimalScale:stableCoinOperative,id})})})}})(),label&&(0,jsx_runtime.jsx)(Subtitle,{variant:"caption",color:"neutral400",children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:label})})]})})})})})};ChangeIndicator.displayName="ChangeIndicator";const components_ChangeIndicator=ChangeIndicator;try{ChangeIndicator.displayName="ChangeIndicator",ChangeIndicator.__docgenInfo={description:"",displayName:"ChangeIndicator",props:{labelTooltip:{defaultValue:{value:""},description:"",name:"labelTooltip",required:!1,type:{name:"string | undefined"}},value:{defaultValue:{value:"0"},description:"",name:"value",required:!1,type:{name:"string | number"}},type:{defaultValue:{value:"graph"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"default"'},{value:'"graph"'},{value:'"only_number"'}]}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | undefined"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties | undefined"}},normalized:{defaultValue:{value:"false"},description:"",name:"normalized",required:!1,type:{name:"boolean | undefined"}},stableCoinOperative:{defaultValue:{value:"false"},description:"",name:"stableCoinOperative",required:!1,type:{name:"boolean | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},decimalScale:{defaultValue:{value:"stableCoinOperative ? 2 : 8"},description:"",name:"decimalScale",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigTable/components/ChangeIndicator/index.tsx#ChangeIndicator"]={docgenInfo:ChangeIndicator.__docgenInfo,name:"ChangeIndicator",path:"src/components/display/ZigTable/components/ChangeIndicator/index.tsx#ChangeIndicator"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigTable/components/ChangeIndicator/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NegativeDefault:()=>NegativeDefault,NegativeGraph:()=>NegativeGraph,NegativeNumber:()=>NegativeNumber,PositiveDefault:()=>PositiveDefault,PositiveGraph:()=>PositiveGraph,PositiveNumber:()=>PositiveNumber,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _index__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/ZigTable/components/ChangeIndicator/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Display/Table/Components/ChangeIndicator",component:_index__WEBPACK_IMPORTED_MODULE_2__.Z},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{display:"grid",justifyContent:"start"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{...args})});Template.displayName="Template";const PositiveGraph=Template.bind({});PositiveGraph.args={value:50,type:"graph"};const NegativeGraph=Template.bind({});NegativeGraph.args={value:-50,type:"graph"};const NegativeDefault=Template.bind({});NegativeDefault.args={value:-50,type:"default"};const PositiveDefault=Template.bind({});PositiveDefault.args={value:50,type:"default"};const NegativeNumber=Template.bind({});NegativeNumber.args={value:50,type:"only_number"};const PositiveNumber=Template.bind({});PositiveNumber.args={value:50,type:"only_number"}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D0:()=>ValueIndicator,Us:()=>MarginContainer});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/styled.js"),_display_ZigTypography__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/display/ZigTypography/index.tsx");const MarginContainer=(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)("div")`
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
`)}}]);
//# sourceMappingURL=components-display-ZigTable-components-ChangeIndicator-stories.7dc1ff00.iframe.bundle.js.map