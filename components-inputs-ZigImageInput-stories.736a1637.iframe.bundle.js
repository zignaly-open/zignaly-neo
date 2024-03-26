"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[2094],{"../../node_modules/@mui/icons-material/esm/Close.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/material/utils/createSvgIcon.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_utils_createSvgIcon__WEBPACK_IMPORTED_MODULE_1__.Z)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},"../../node_modules/@mui/material/Box/Box.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Box_Box});var createBox=__webpack_require__("../../node_modules/@mui/system/esm/createBox.js"),ClassNameGenerator=__webpack_require__("../../node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js"),createTheme=__webpack_require__("../../node_modules/@mui/material/styles/createTheme.js"),identifier=__webpack_require__("../../node_modules/@mui/material/styles/identifier.js");const Box_boxClasses=(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiBox",["root"]),defaultTheme=(0,createTheme.Z)(),Box_Box=(0,createBox.Z)({themeId:identifier.Z,defaultTheme,defaultClassName:Box_boxClasses.root,generateClassName:ClassNameGenerator.Z.generate})},"../../node_modules/@mui/material/IconButton/IconButton.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton_IconButton});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx=__webpack_require__("../../node_modules/clsx/dist/clsx.mjs"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),colorManipulator=__webpack_require__("../../node_modules/@mui/system/esm/colorManipulator.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),ButtonBase=__webpack_require__("../../node_modules/@mui/material/ButtonBase/ButtonBase.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClasses=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getIconButtonUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiIconButton",slot)}const IconButton_iconButtonClasses=(0,generateUtilityClasses.Z)("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["edge","children","className","color","disabled","disableFocusRipple","size"],IconButtonRoot=(0,styled.ZP)(ButtonBase.Z,{name:"MuiIconButton",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,"default"!==ownerState.color&&styles[`color${(0,capitalize.Z)(ownerState.color)}`],ownerState.edge&&styles[`edge${(0,capitalize.Z)(ownerState.edge)}`],styles[`size${(0,capitalize.Z)(ownerState.size)}`]]}})((({theme,ownerState})=>(0,esm_extends.Z)({textAlign:"center",flex:"0 0 auto",fontSize:theme.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(theme.vars||theme).palette.action.active,transition:theme.transitions.create("background-color",{duration:theme.transitions.duration.shortest})},!ownerState.disableRipple&&{"&:hover":{backgroundColor:theme.vars?`rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,colorManipulator.Fq)(theme.palette.action.active,theme.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"start"===ownerState.edge&&{marginLeft:"small"===ownerState.size?-3:-12},"end"===ownerState.edge&&{marginRight:"small"===ownerState.size?-3:-12})),(({theme,ownerState})=>{var _palette;const palette=null==(_palette=(theme.vars||theme).palette)?void 0:_palette[ownerState.color];return(0,esm_extends.Z)({},"inherit"===ownerState.color&&{color:"inherit"},"inherit"!==ownerState.color&&"default"!==ownerState.color&&(0,esm_extends.Z)({color:null==palette?void 0:palette.main},!ownerState.disableRipple&&{"&:hover":(0,esm_extends.Z)({},palette&&{backgroundColor:theme.vars?`rgba(${palette.mainChannel} / ${theme.vars.palette.action.hoverOpacity})`:(0,colorManipulator.Fq)(palette.main,theme.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),"small"===ownerState.size&&{padding:5,fontSize:theme.typography.pxToRem(18)},"large"===ownerState.size&&{padding:12,fontSize:theme.typography.pxToRem(28)},{[`&.${IconButton_iconButtonClasses.disabled}`]:{backgroundColor:"transparent",color:(theme.vars||theme).palette.action.disabled}})})),IconButton_IconButton=react.forwardRef((function IconButton(inProps,ref){const props=(0,useThemeProps.Z)({props:inProps,name:"MuiIconButton"}),{edge=!1,children,className,color="default",disabled=!1,disableFocusRipple=!1,size="medium"}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{edge,color,disabled,disableFocusRipple,size}),classes=(ownerState=>{const{classes,disabled,color,edge,size}=ownerState,slots={root:["root",disabled&&"disabled","default"!==color&&`color${(0,capitalize.Z)(color)}`,edge&&`edge${(0,capitalize.Z)(edge)}`,`size${(0,capitalize.Z)(size)}`]};return(0,composeClasses.Z)(slots,getIconButtonUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(IconButtonRoot,(0,esm_extends.Z)({className:(0,clsx.Z)(classes.root,className),centerRipple:!0,focusRipple:!disableFocusRipple,disabled,ref,ownerState},other,{children}))}))},"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@mui/material/node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx=__webpack_require__("../../node_modules/clsx/dist/clsx.mjs"),extendSxProp=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClasses=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,generateUtilityClasses.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},"inherit"===ownerState.variant&&{font:"inherit"},"inherit"!==ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/system/esm/createBox.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>createBox});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/@mui/system/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),clsx__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/clsx/dist/clsx.mjs"),_mui_styled_engine__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),_styleFunctionSx__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"),_styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),_useTheme__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mui/system/esm/useTheme.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["className","component"];function createBox(options={}){const{themeId,defaultTheme,defaultClassName="MuiBox-root",generateClassName}=options,BoxRoot=(0,_mui_styled_engine__WEBPACK_IMPORTED_MODULE_2__.ZP)("div",{shouldForwardProp:prop=>"theme"!==prop&&"sx"!==prop&&"as"!==prop})(_styleFunctionSx__WEBPACK_IMPORTED_MODULE_3__.Z);return react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((function Box(inProps,ref){const theme=(0,_useTheme__WEBPACK_IMPORTED_MODULE_4__.Z)(defaultTheme),_extendSxProp=(0,_styleFunctionSx__WEBPACK_IMPORTED_MODULE_5__.Z)(inProps),{className,component="div"}=_extendSxProp,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__.Z)(_extendSxProp,_excluded);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BoxRoot,(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__.Z)({as:component,ref,className:(0,clsx__WEBPACK_IMPORTED_MODULE_8__.Z)(className,generateClassName?generateClassName(defaultClassName):defaultClassName),theme:themeId&&theme[themeId]||theme},other))}))}},"../../node_modules/@mui/system/esm/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=(0,__webpack_require__("../../node_modules/@mui/system/esm/createStyled.js").ZP)()},"./src/components/display/ZigAlertMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>ErrorMessage,Z:()=>display_ZigAlertMessage});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const Layout=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`,Icon=styled_components_browser_esm.ZP.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;var error_alert_icon=__webpack_require__("./src/assets/icons/error-alert-icon.svg"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),useTheme=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigAlertMessage({text,error,warning,id,variant="body2"}){const{palette}=(0,useTheme.Z)();return(0,jsx_runtime.jsxs)(Layout,{id,children:[(0,jsx_runtime.jsx)(Icon,{children:(0,jsx_runtime.jsx)(error_alert_icon.r,{height:"24px",width:"24px",color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400})}),(0,jsx_runtime.jsx)(ZigTypography.Z,{variant,sx:{color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400},children:text})]})}ZigAlertMessage.displayName="ZigAlertMessage";const display_ZigAlertMessage=ZigAlertMessage,ErrorMessage=({text,id,variant="body2"})=>(0,jsx_runtime.jsx)(ZigAlertMessage,{text,error:!0,id,variant});ErrorMessage.displayName="ErrorMessage";try{ZigAlertMessage.displayName="ZigAlertMessage",ZigAlertMessage.__docgenInfo={description:"",displayName:"ZigAlertMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},warning:{defaultValue:null,description:"",name:"warning",required:!1,type:{name:"boolean | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},variant:{defaultValue:{value:"body2"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"button"'},{value:'"caption"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"overline"'},{value:'"subtitle1"'},{value:'"subtitle2"'},{value:'"body1"'},{value:'"body2"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"]={docgenInfo:ZigAlertMessage.__docgenInfo,name:"ZigAlertMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"})}catch(__react_docgen_typescript_loader_error){}try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{variant:{defaultValue:{value:"body2"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"button"'},{value:'"caption"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"overline"'},{value:'"subtitle1"'},{value:'"subtitle2"'},{value:'"body1"'},{value:'"body2"'}]}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/inputs/ZigButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>ZigButtonGroup});__webpack_require__("../../node_modules/react/index.js");var _mui_lab__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/lab/LoadingButton/LoadingButton.js"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/material/Tooltip/Tooltip.js"),_mui_material__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mui/material/ButtonGroup/ButtonGroup.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigButton=({active,tooltip,ctaId,color,size,narrow,variant="contained",linkTarget,linkRel,...props})=>{const button=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_lab__WEBPACK_IMPORTED_MODULE_2__.Z,{"data-tack-cta":ctaId,size,variant,...props,...narrow?{sx:{...props.sx,minWidth:"0 !important",padding:"6px"}}:{},...props.href?{rel:linkRel??"noopener noreferrer",target:linkTarget??"_blank"}:{},"data-testid":props["data-testid"]||void 0,color:"outlined"!==variant||color?color:"secondary",className:active?`${props.className} MuiButton-active`:props.className});return tooltip?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,{title:tooltip,children:props.disabled?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{children:button}):button}):button},ZigButtonGroup=(0,_mui_material__WEBPACK_IMPORTED_MODULE_4__.ZP)(_mui_material__WEBPACK_IMPORTED_MODULE_5__.Z)`
  outline: 1px solid ${({theme})=>theme.palette.neutral600};
  outline-offset: -1px;

  .MuiButton-root {
    font-weight: 400;
    text-transform: capitalize !important;

    &:hover,
    &.MuiButton-active {
      z-index: 3;
      border-color: ${({theme})=>theme.palette.backgrounds.greyedOutBorder} !important;
      border-radius: 5px;
      background: ${({theme})=>theme.palette.neutral750};
      color: ${({theme})=>theme.palette.highlighted};

      + button,
      + span button {
        border-left-color: transparent;
      }
    }

    &:not(:last-child) {
      border-right-color: transparent;
    }

    &.Mui-disabled {
      border-color: ${({theme})=>theme.palette.neutral600};
      color: ${({theme})=>theme.palette.contrasting}33;
    }
  }

  span button {
    height: 100%;
  }
`,__WEBPACK_DEFAULT_EXPORT__=ZigButton;try{ZigButtonGroup.displayName="ZigButtonGroup",ZigButtonGroup.__docgenInfo={description:"",displayName:"ZigButtonGroup",props:{component:{defaultValue:null,description:"The component used for the root node.\nEither a string to use a HTML element or a component.",name:"component",required:!0,type:{name:"ElementType<any>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigButton/index.tsx#ZigButtonGroup"]={docgenInfo:ZigButtonGroup.__docgenInfo,name:"ZigButtonGroup",path:"src/components/inputs/ZigButton/index.tsx#ZigButtonGroup"})}catch(__react_docgen_typescript_loader_error){}try{ZigButton.displayName="ZigButton",ZigButton.__docgenInfo={description:"",displayName:"ZigButton",props:{href:{defaultValue:null,description:"The URL to link to when the button is clicked.\nIf defined, an `a` element will be used as the root node.",name:"href",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLAnchorElement | null) => void) | RefObject<HTMLAnchorElement> | null | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigButton/index.tsx#ZigButton"]={docgenInfo:ZigButton.__docgenInfo,name:"ZigButton",path:"src/components/inputs/ZigButton/index.tsx#ZigButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/inputs/ZigImageInput/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Example:()=>Example,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),useTheme=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),Box=__webpack_require__("../../node_modules/@mui/material/Box/Box.js"),CircularProgress=__webpack_require__("../../node_modules/@mui/material/CircularProgress/CircularProgress.js"),IconButton=__webpack_require__("../../node_modules/@mui/material/IconButton/IconButton.js"),Close=__webpack_require__("../../node_modules/@mui/icons-material/esm/Close.js"),createSvgIcon=__webpack_require__("../../node_modules/@mui/material/utils/createSvgIcon.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const Edit=(0,createSvgIcon.Z)((0,jsx_runtime.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");const LogoContainer=(0,__webpack_require__("../../node_modules/@mui/system/esm/styled.js").Z)("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiCircularProgress-root {
    position: absolute;
  }

  img {
    object-fit: contain;
  }

  button {
    opacity: 0;
    position: absolute;
    top: -6px;
    right: -12px;
    padding: 4px;
    transition: opacity 0.25s;
  }

  &:hover {
    button {
      opacity: 1;
    }
  }
`;var ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),ZigAlertMessage=__webpack_require__("./src/components/display/ZigAlertMessage/index.tsx"),ZigButton=__webpack_require__("./src/components/inputs/ZigButton/index.tsx"),es=__webpack_require__("../../node_modules/react-i18next/dist/es/index.js");const ZigImageInput=({label,buttonLabel,description,value,info,size,onChange,renderer,disabled,buttonTooltip,error,uploadFn,id,sx})=>{const{t}=(0,es.$G)("zignaly-ui",{keyPrefix:"ZigImageInput"}),theme=(0,useTheme.Z)(),[uploading,setUploading]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Box.Z,{display:"flex",justifyContent:"center",alignItems:"flex-start",flexDirection:"column",gap:1,sx,children:[(0,jsx_runtime.jsxs)(Box.Z,{children:[!!label&&("string"==typeof label?(0,jsx_runtime.jsx)(ZigTypography.Z,{component:"p",variant:"body1",children:label}):label),!!description&&("string"==typeof description?(0,jsx_runtime.jsx)(ZigTypography.Z,{component:"p",variant:"body2",children:description}):description)]}),!!value&&(0,jsx_runtime.jsxs)(LogoContainer,{children:[(0,jsx_runtime.jsx)(Box.Z,{sx:{opacity:uploading?.3:1},children:renderer?renderer(value):(0,jsx_runtime.jsx)("img",{width:size,height:size,src:value,alt:""})}),uploading?(0,jsx_runtime.jsx)(CircularProgress.Z,{size:24}):value&&(0,jsx_runtime.jsx)(IconButton.Z,{sx:{transition:"background .25s",background:theme.palette.neutral800,"&:hover":{background:theme.palette.neutral700}},onClick:()=>onChange(""),children:(0,jsx_runtime.jsx)(Close.Z,{})})]}),(0,jsx_runtime.jsxs)(Box.Z,{children:[(0,jsx_runtime.jsxs)(ZigButton.Z,{disabled,startIcon:(0,jsx_runtime.jsx)(Edit,{sx:{width:"12px",height:"12px"}}),variant:"text",component:"label",tooltip:buttonTooltip,id:id&&`${id}-edit`,children:[buttonLabel||t("image-input-"+(value?"edit":"add")),(0,jsx_runtime.jsx)("input",{hidden:!0,type:"file",onChange:async function uploadLogo(e){const file=e.target.files?.[0];if(file){setUploading(!0);try{onChange(await uploadFn(file))}finally{setUploading(!1)}}}})]}),error?(0,jsx_runtime.jsx)(Box.Z,{alignSelf:"flex-start",children:(0,jsx_runtime.jsx)(ZigAlertMessage.B,{text:error,id:id&&`${id}-error`})}):!!info&&("string"==typeof info?(0,jsx_runtime.jsx)(ZigAlertMessage.Z,{variant:"body2",text:info}):info)]})]})};ZigImageInput.displayName="ZigImageInput";const inputs_ZigImageInput=ZigImageInput;try{ZigImageInput.displayName="ZigImageInput",ZigImageInput.__docgenInfo={description:"",displayName:"ZigImageInput",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | Element | undefined"}},buttonLabel:{defaultValue:null,description:"",name:"buttonLabel",required:!1,type:{name:"string | Element | undefined"}},description:{defaultValue:null,description:"",name:"description",required:!1,type:{name:"string | Element | undefined"}},info:{defaultValue:null,description:"",name:"info",required:!1,type:{name:"string | Element | undefined"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},buttonTooltip:{defaultValue:null,description:"",name:"buttonTooltip",required:!1,type:{name:"string | undefined"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean | undefined"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | undefined"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(image: string) => void"}},renderer:{defaultValue:null,description:"",name:"renderer",required:!1,type:{name:"((image: string) => Element) | undefined"}},uploadFn:{defaultValue:null,description:"",name:"uploadFn",required:!0,type:{name:"(file: File) => Promise<string>"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<{}> | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigImageInput/index.tsx#ZigImageInput"]={docgenInfo:ZigImageInput.__docgenInfo,name:"ZigImageInput",path:"src/components/inputs/ZigImageInput/index.tsx#ZigImageInput"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Inputs/ZigImageInput",component:inputs_ZigImageInput,argTypes:{label:{type:"string"},description:{type:"string"},size:{type:"number",defaultValue:32},disabled:{type:"boolean",defaultValue:!1},value:{type:"string"}}},ZigImageInputStory=props=>{const[value,setValue]=(0,react.useState)("https://upload.wikimedia.org/wikipedia/ru/thumb/c/c6/Vento_Aureo.jpg/500px-Vento_Aureo.jpg");return(0,jsx_runtime.jsx)(inputs_ZigImageInput,{...props,uploadFn:async file=>URL.createObjectURL(file),value,onChange:setValue})};ZigImageInputStory.displayName="ZigImageInputStory";const Example={args:{label:"A label",description:"Description lorem ipsum lorem ipsum",buttonLabel:"Change image",buttonTooltip:"Change image tooltip",info:"Additional info",error:"Image too cool to be saved",size:300},render:props=>(0,jsx_runtime.jsx)(ZigImageInputStory,{...props})}},"./src/assets/icons/error-alert-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>SvgErrorAlertIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgErrorAlertIcon=function SvgErrorAlertIcon(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"zig-icon"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 3C7.02979 3 3 7.03124 3 12C3 16.9717 7.02979 21 12 21C16.9702 21 21 16.9717 21 12C21 7.03124 16.9702 3 12 3ZM12 19.2581C7.98876 19.2581 4.74194 16.0126 4.74194 12C4.74194 7.9901 7.9889 4.74194 12 4.74194C16.0098 4.74194 19.2581 7.98887 19.2581 12C19.2581 16.0112 16.0126 19.2581 12 19.2581ZM13.5242 15.4839C13.5242 16.3243 12.8404 17.0081 12 17.0081C11.1596 17.0081 10.4758 16.3243 10.4758 15.4839C10.4758 14.6434 11.1596 13.9597 12 13.9597C12.8404 13.9597 13.5242 14.6434 13.5242 15.4839ZM10.5712 7.81206L10.818 12.7475C10.8296 12.9793 11.0209 13.1613 11.253 13.1613H12.747C12.9791 13.1613 13.1704 12.9793 13.182 12.7475L13.4287 7.81206C13.4412 7.56333 13.2429 7.35484 12.9938 7.35484H11.0062C10.7571 7.35484 10.5588 7.56333 10.5712 7.81206Z",fill:props.color}))}}}]);
//# sourceMappingURL=components-inputs-ZigImageInput-stories.736a1637.iframe.bundle.js.map