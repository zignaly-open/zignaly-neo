"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[6947],{"./src/components/display/ZigAlertMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>ErrorMessage,Z:()=>display_ZigAlertMessage});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const Layout=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`,Icon=styled_components_browser_esm.ZP.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;var error_alert_icon=__webpack_require__("./src/assets/icons/error-alert-icon.svg"),dark=__webpack_require__("./src/theme/dark.ts"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigAlertMessage({text,error,warning}){return(0,jsx_runtime.jsxs)(Layout,{children:[(0,jsx_runtime.jsx)(Icon,{children:(0,jsx_runtime.jsx)(error_alert_icon.r,{height:"24px",width:"24px",color:error?dark.Z.redGraphOrError:warning?dark.Z.yellow:dark.Z.neutral400})}),(0,jsx_runtime.jsx)(ZigTypography.Z,{variant:"body2",sx:{color:error?dark.Z.redGraphOrError:warning?dark.Z.yellow:dark.Z.neutral400},children:text})]})}ZigAlertMessage.displayName="ZigAlertMessage";const display_ZigAlertMessage=ZigAlertMessage,ErrorMessage=({text})=>(0,jsx_runtime.jsx)(ZigAlertMessage,{text,error:!0});ErrorMessage.displayName="ErrorMessage";try{ZigAlertMessage.displayName="ZigAlertMessage",ZigAlertMessage.__docgenInfo={description:"",displayName:"ZigAlertMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},warning:{defaultValue:null,description:"",name:"warning",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"]={docgenInfo:ZigAlertMessage.__docgenInfo,name:"ZigAlertMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"})}catch(__react_docgen_typescript_loader_error){}try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/inputs/ZigButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>ZigButtonGroup});__webpack_require__("../../node_modules/react/index.js");var _mui_lab__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/lab/LoadingButton/LoadingButton.js"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/material/Tooltip/Tooltip.js"),_mui_material__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mui/material/ButtonGroup/ButtonGroup.js"),_theme__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/theme/dark.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigButton=({active,tooltip,ctaId,color,size,variant="contained",linkTarget,linkRel,...props})=>{const button=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_lab__WEBPACK_IMPORTED_MODULE_2__.Z,{"data-tack-cta":ctaId,size,variant,...props,...props.href?{rel:linkRel??"noopener noreferrer",target:linkTarget??"_blank"}:{},color:"outlined"!==variant||color?color:"secondary",className:active?"MuiButton-active":""});return tooltip?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,{title:tooltip,children:props.disabled?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{children:button}):button}):button},ZigButtonGroup=(0,_mui_material__WEBPACK_IMPORTED_MODULE_4__.ZP)(_mui_material__WEBPACK_IMPORTED_MODULE_5__.Z)`
  .MuiButton-root {
    border-right-width: 0 !important;

    &:last-child {
      border-right-width: 1px !important;
    }

    &:hover,
    &.MuiButton-active {
      z-index: 3;
      box-shadow: 1px 0 0 ${_theme__WEBPACK_IMPORTED_MODULE_6__.Z.neutral400};
    }

    &.Mui-disabled {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
`,__WEBPACK_DEFAULT_EXPORT__=ZigButton;try{ZigButtonGroup.displayName="ZigButtonGroup",ZigButtonGroup.__docgenInfo={description:"",displayName:"ZigButtonGroup",props:{component:{defaultValue:null,description:"The component used for the root node.\nEither a string to use a HTML element or a component.",name:"component",required:!0,type:{name:"ElementType<any>"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<ButtonGroupClasses> & Partial<ClassNameMap<never>>) | undefined"}},color:{defaultValue:{value:"'primary'"},description:"The color of the component.\nIt supports both default and custom theme colors, which can be added as shown in the\n[palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).",name:"color",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"primary"'},{value:'"inherit"'},{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},disabled:{defaultValue:{value:"false"},description:"If `true`, the component is disabled.",name:"disabled",required:!1,type:{name:"boolean | undefined"}},disableElevation:{defaultValue:{value:"false"},description:"If `true`, no elevation is used.",name:"disableElevation",required:!1,type:{name:"boolean | undefined"}},disableFocusRipple:{defaultValue:{value:"false"},description:"If `true`, the button keyboard focus ripple is disabled.",name:"disableFocusRipple",required:!1,type:{name:"boolean | undefined"}},disableRipple:{defaultValue:{value:"false"},description:"If `true`, the button ripple effect is disabled.",name:"disableRipple",required:!1,type:{name:"boolean | undefined"}},fullWidth:{defaultValue:{value:"false"},description:"If `true`, the buttons will take up the full width of its container.",name:"fullWidth",required:!1,type:{name:"boolean | undefined"}},orientation:{defaultValue:{value:"'horizontal'"},description:"The component orientation (layout flow direction).",name:"orientation",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"vertical"'},{value:'"horizontal"'}]}},size:{defaultValue:{value:"'medium'"},description:"The size of the component.\n`small` is equivalent to the dense button styling.",name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},variant:{defaultValue:{value:"contained"},description:"The variant to use.",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"text"'},{value:'"outlined"'},{value:'"contained"'}]}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme> | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigButton/index.tsx#ZigButtonGroup"]={docgenInfo:ZigButtonGroup.__docgenInfo,name:"ZigButtonGroup",path:"src/components/inputs/ZigButton/index.tsx#ZigButtonGroup"})}catch(__react_docgen_typescript_loader_error){}try{ZigButton.displayName="ZigButton",ZigButton.__docgenInfo={description:"",displayName:"ZigButton",props:{href:{defaultValue:null,description:"The URL to link to when the button is clicked.\nIf defined, an `a` element will be used as the root node.",name:"href",required:!1,type:{name:"string"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<ButtonClasses> & { root?: string | undefined; loading?: string | undefined; loadingIndicator?: string | undefined; loadingIndicatorCenter?: string | undefined; loadingIndicatorStart?: string | undefined; loadingIndicatorEnd?: string | undefined; endIconLoadingEnd?: string | undefined; startIconLoadingStart?..."}},loading:{defaultValue:{value:"false"},description:"If `true`, the loading indicator is shown.",name:"loading",required:!1,type:{name:"boolean | undefined"}},loadingIndicator:{defaultValue:{value:'<CircularProgress color="inherit" size={16} />'},description:'Element placed before the children if the button is in loading state.\nThe node should contain an element with `role="progressbar"` with an accessible name.\nBy default we render a `CircularProgress` that is labelled by the button itself.',name:"loadingIndicator",required:!1,type:{name:"ReactNode"}},loadingPosition:{defaultValue:{value:"'center'"},description:"The loading indicator can be positioned on the start, end, or the center of the button.",name:"loadingPosition",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"center"'},{value:'"start"'},{value:'"end"'}]}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme> | undefined"}},action:{defaultValue:null,description:"A ref for imperative actions.\nIt currently only supports `focusVisible()` action.",name:"action",required:!1,type:{name:"Ref<ButtonBaseActions> | undefined"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},variant:{defaultValue:{value:"contained"},description:"The variant to use.",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"text"'},{value:'"outlined"'},{value:'"contained"'}]}},tabIndex:{defaultValue:{value:"0"},description:"",name:"tabIndex",required:!1,type:{name:"number | undefined"}},color:{defaultValue:{value:"'primary'"},description:"The color of the component.\nIt supports both default and custom theme colors, which can be added as shown in the\n[palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).",name:"color",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"primary"'},{value:'"inherit"'},{value:'"error"'},{value:'"info"'},{value:'"success"'},{value:'"warning"'}]}},centerRipple:{defaultValue:{value:"false"},description:"If `true`, the ripples are centered.\nThey won't start at the cursor interaction position.",name:"centerRipple",required:!1,type:{name:"boolean | undefined"}},disabled:{defaultValue:{value:"false\nfalse"},description:"If `true`, the component is disabled.",name:"disabled",required:!1,type:{name:"boolean | undefined"}},disableRipple:{defaultValue:{value:"false"},description:"If `true`, the ripple effect is disabled.\n\n⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure\nto highlight the element by applying separate styles with the `.Mui-focusVisible` class.",name:"disableRipple",required:!1,type:{name:"boolean | undefined"}},disableTouchRipple:{defaultValue:{value:"false"},description:"If `true`, the touch ripple effect is disabled.",name:"disableTouchRipple",required:!1,type:{name:"boolean | undefined"}},focusRipple:{defaultValue:{value:"false"},description:"If `true`, the base button will have a keyboard focus ripple.",name:"focusRipple",required:!1,type:{name:"boolean | undefined"}},focusVisibleClassName:{defaultValue:null,description:"This prop can help identify which element has keyboard focus.\nThe class name will be applied when the element gains the focus through keyboard interaction.\nIt's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).\nThe rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).\nA [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components\nif needed.",name:"focusVisibleClassName",required:!1,type:{name:"string | undefined"}},LinkComponent:{defaultValue:{value:"'a'"},description:"The component used to render a link when the `href` prop is provided.",name:"LinkComponent",required:!1,type:{name:"ElementType<any> | undefined"}},onFocusVisible:{defaultValue:null,description:"Callback fired when the component is focused with a keyboard.\nWe trigger a `onFocus` callback too.",name:"onFocusVisible",required:!1,type:{name:"FocusEventHandler<any> | undefined"}},TouchRippleProps:{defaultValue:null,description:"Props applied to the `TouchRipple` element.",name:"TouchRippleProps",required:!1,type:{name:"Partial<TouchRippleProps> | undefined"}},touchRippleRef:{defaultValue:null,description:"A ref that points to the `TouchRipple` element.",name:"touchRippleRef",required:!1,type:{name:"Ref<TouchRippleActions> | undefined"}},fullWidth:{defaultValue:{value:"false"},description:"If `true`, the button will take up the full width of its container.",name:"fullWidth",required:!1,type:{name:"boolean | undefined"}},size:{defaultValue:{value:"'medium'"},description:"The size of the component.\n`small` is equivalent to the dense button styling.",name:"size",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},disableElevation:{defaultValue:{value:"false"},description:"If `true`, no elevation is used.",name:"disableElevation",required:!1,type:{name:"boolean | undefined"}},disableFocusRipple:{defaultValue:{value:"false"},description:"If `true`, the  keyboard focus ripple is disabled.",name:"disableFocusRipple",required:!1,type:{name:"boolean | undefined"}},endIcon:{defaultValue:null,description:"Element placed after the children.",name:"endIcon",required:!1,type:{name:"ReactNode"}},startIcon:{defaultValue:null,description:"Element placed before the children.",name:"startIcon",required:!1,type:{name:"ReactNode"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLAnchorElement | null) => void) | RefObject<HTMLAnchorElement> | null | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigButton/index.tsx#ZigButton"]={docgenInfo:ZigButton.__docgenInfo,name:"ZigButton",path:"src/components/inputs/ZigButton/index.tsx#ZigButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/inputs/ZigInput/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,t:()=>ZigInputInteractiveAdornmentStyle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mui/material/TextField/TextField.js"),_mui_material__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@mui/material/InputAdornment/InputAdornment.js"),_ZigButton__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/inputs/ZigButton/index.tsx"),_theme_dark__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./src/theme/dark.ts"),_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@mui/icons-material/VisibilityOff.js"),_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@mui/icons-material/Visibility.js"),_display_ZigAlertMessage__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/components/display/ZigAlertMessage/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigInput=(0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.ZP)(react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({error,wide,sensitive,labelAction,helperText,...props},ref)=>{const[isShown,setIsShown]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),EyeIcon=isShown?_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_3__.Z:_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_4__.Z;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_5__.Z,{inputRef:ref,...props,inputProps:{...props.inputProps||{}},label:props.label?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[props.label,labelAction&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ZigButton__WEBPACK_IMPORTED_MODULE_6__.Z,{variant:"text",tabIndex:labelAction.tabIndex,onClick:labelAction.onClick,href:labelAction.href,id:labelAction.id,children:labelAction.text})]}):null,variant:"standard",error:!!error,helperText:"string"==typeof error&&""!==error?error&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_display_ZigAlertMessage__WEBPACK_IMPORTED_MODULE_7__.B,{text:error}):helperText,type:sensitive?isShown?"text":"password":props.type,InputProps:{disableUnderline:!0,...props.InputProps||{},...sensitive?{endAdornment:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Z,{position:"end",children:!!sensitive&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(EyeIcon,{onClick:()=>setIsShown((v=>!v)),width:40,height:40,sx:ZigInputInteractiveAdornmentStyle})},props.id+"sensivive"),...(v=props?.InputProps?.endAdornment,(Array.isArray(v)?v:[v]).filter(Boolean))]}:{}},InputLabelProps:{shrink:!0,...props.InputLabelProps||{}}});var v})))`
  ${props=>props.wide&&"display: block"};

  .MuiInputLabel-root {
    display: flex;
    position: static;
    flex-direction: row;
    justify-content: space-between;
    font-size: 15px !important;
    line-height: 24px;
    letter-spacing: 0.55px;
    color: ${({theme})=>theme.palette.neutral200} !important;
    transition: color 0.2s;
    &.Mui-focused {
      color: ${({theme})=>theme.palette.neutral000};
    }
    transform: none !important;
    width: 100%;

    button {
      float: right;
    }
  }

  .MuiInput-root {
    border: 1px solid ${({theme})=>theme.palette.neutral600};
    padding: 12px 24px;
    margin-top: ${props=>props.label?"4px":0};
    min-height: 60px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background: rgba(16, 18, 37);
    background: linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%);
    transition: border-color 0.2s;

    &.Mui-disabled {
      cursor: not-allowed;
      border-color: ${({theme})=>theme.palette.neutral700};
    }

    &.Mui-focused,
    &:hover {
      border-color: ${({theme})=>theme.palette.neutral400};
    }

    &.Mui-error,
    &.Mui-error:hover,
    &.Mui-error.Mui-focused {
      border-color: ${({theme})=>theme.palette.redGraphOrError};

      .MuiInputLabel-root {
        color: ${({theme})=>theme.palette.neutral200};
      }
    }
  }

  .MuiInput-input {
    background: transparent;
    border: none;
    color: ${({theme})=>theme.palette.neutral100} !important;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.55px;
    width: 100%;
    font-family: "Avenir Next", sans-serif;
    box-shadow: none !important;
    resize: none;
    background: linear-gradient(90deg, rgb(16 18 37) 0%, rgb(16 18 37) 35%, rgb(16 18 37) 100%);

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px white inset;
      -webkit-background-clip: text;
    }

    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 50px white inset;
      -webkit-text-fill-color: #333;
    }

    -webkit-text-fill-color: #838b95 !important;

    &::placeholder {
      -webkit-text-fill-color: ${({theme})=>theme.palette.neutral400} !important;
    }

    &.Mui-disabled {
      cursor: not-allowed;
      opacity: 0.67;
      color: ${({theme})=>theme.palette.neutral100} !important;
    }
  }
`,ZigInputInteractiveAdornmentStyle={cursor:"pointer",color:_theme_dark__WEBPACK_IMPORTED_MODULE_9__.Z.neutral300,transition:"all .3s","&:hover":{color:_theme_dark__WEBPACK_IMPORTED_MODULE_9__.Z.neutral200}},__WEBPACK_DEFAULT_EXPORT__=ZigInput;try{ZigInput.displayName="ZigInput",ZigInput.__docgenInfo={description:"",displayName:"ZigInput",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined"}},margin:{defaultValue:{value:"'none'"},description:"If `dense` or `normal`, will adjust vertical spacing of this and contained components.",name:"margin",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"none"'},{value:'"normal"'},{value:'"dense"'}]}},focused:{defaultValue:null,description:"If `true`, the component is displayed in focused state.",name:"focused",required:!1,type:{name:"boolean | undefined"}},hiddenLabel:{defaultValue:{value:"false"},description:"If `true`, the label is hidden.\nThis is used to increase density for a `FilledInput`.\nBe sure to add `aria-label` to the `input` element.",name:"hiddenLabel",required:!1,type:{name:"boolean | undefined"}},labelAction:{defaultValue:null,description:"",name:"labelAction",required:!1,type:{name:"LabelActionProps | undefined"}},wide:{defaultValue:null,description:"",name:"wide",required:!1,type:{name:"boolean | undefined"}},sensitive:{defaultValue:null,description:"",name:"sensitive",required:!1,type:{name:"boolean | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigInput/index.tsx#ZigInput"]={docgenInfo:ZigInput.__docgenInfo,name:"ZigInput",path:"src/components/inputs/ZigInput/index.tsx#ZigInput"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/inputs/ZigInput/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Error:()=>Error,LabelAction:()=>LabelAction,LabelActionLink:()=>LabelActionLink,Sensitive:()=>Sensitive,TextInputer:()=>TextInputer,TextareaInputer:()=>TextareaInputer,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _index__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/inputs/ZigInput/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/ZigInput",component:_index__WEBPACK_IMPORTED_MODULE_2__.Z,argTypes:{label:{type:"string"},placeholder:{type:"string"},wide:{type:"boolean",defaultValue:!1},disabled:{type:"boolean",defaultValue:!1},defaultValue:{type:"string"},error:{type:"string",defaultValue:""}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{...args});Template.displayName="Template";const TextInputer=Template.bind({});TextInputer.args={label:"Amount to Withdraw",placeholder:"Amount to Withdraw"};const Sensitive=Template.bind({});Sensitive.args={label:"Amount to Withdraw",sensitive:!0,placeholder:"Amount to Withdraw"};const TextareaInputer=Template.bind({});TextareaInputer.args={value:"https://zignaly.com/api/signals.php?key=YOURSECRETKEY&type=entry&exchange=zignaly&pair=ethusdt&orderType=limit&positionSize=10&signalId=123&limitPrice=3420&takeProfitPercentage1=20&takeProfitAmountPercentage1=100&stopLossPercentage=-5",multiline:!0,wide:!0,label:"Label"};const Error=Template.bind({});Error.args={value:"https://zignaly com/api/",wide:!0,error:"Invalid URL",label:"Label"};const LabelActionLink=Template.bind({});LabelActionLink.args={value:"",wide:!0,labelAction:{text:"Link to somewhere",href:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"},label:"Label"};const LabelAction=Template.bind({});LabelAction.args={value:"",wide:!0,labelAction:{text:"Alert",onClick:()=>alert(),tabIndex:-1},label:"Label"}},"./src/assets/icons/error-alert-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>SvgErrorAlertIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgErrorAlertIcon=function SvgErrorAlertIcon(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 3C7.02979 3 3 7.03124 3 12C3 16.9717 7.02979 21 12 21C16.9702 21 21 16.9717 21 12C21 7.03124 16.9702 3 12 3ZM12 19.2581C7.98876 19.2581 4.74194 16.0126 4.74194 12C4.74194 7.9901 7.9889 4.74194 12 4.74194C16.0098 4.74194 19.2581 7.98887 19.2581 12C19.2581 16.0112 16.0126 19.2581 12 19.2581ZM13.5242 15.4839C13.5242 16.3243 12.8404 17.0081 12 17.0081C11.1596 17.0081 10.4758 16.3243 10.4758 15.4839C10.4758 14.6434 11.1596 13.9597 12 13.9597C12.8404 13.9597 13.5242 14.6434 13.5242 15.4839ZM10.5712 7.81206L10.818 12.7475C10.8296 12.9793 11.0209 13.1613 11.253 13.1613H12.747C12.9791 13.1613 13.1704 12.9793 13.182 12.7475L13.4287 7.81206C13.4412 7.56333 13.2429 7.35484 12.9938 7.35484H11.0062C10.7571 7.35484 10.5588 7.56333 10.5712 7.81206Z",fill:props.color}))}}}]);
//# sourceMappingURL=components-inputs-ZigInput-stories.de8887b1.iframe.bundle.js.map