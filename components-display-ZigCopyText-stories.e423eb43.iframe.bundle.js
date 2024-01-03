(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[3523],{"../../node_modules/@mui/icons-material/ContentCopy.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";var _interopRequireDefault=__webpack_require__("../../node_modules/@mui/icons-material/node_modules/@babel/runtime/helpers/interopRequireDefault.js");exports.Z=void 0;var _createSvgIcon=_interopRequireDefault(__webpack_require__("../../node_modules/@mui/icons-material/utils/createSvgIcon.js")),_jsxRuntime=__webpack_require__("../../node_modules/react/jsx-runtime.js"),_default=(0,_createSvgIcon.default)((0,_jsxRuntime.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"}),"ContentCopy");exports.Z=_default},"./src/components/display/ZigAlertMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{B:()=>ErrorMessage,Z:()=>display_ZigAlertMessage});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const Layout=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`,Icon=styled_components_browser_esm.ZP.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;var error_alert_icon=__webpack_require__("./src/assets/icons/error-alert-icon.svg"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),useTheme=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigAlertMessage({text,error,warning,id}){const{palette}=(0,useTheme.Z)();return(0,jsx_runtime.jsxs)(Layout,{id,children:[(0,jsx_runtime.jsx)(Icon,{children:(0,jsx_runtime.jsx)(error_alert_icon.r,{height:"24px",width:"24px",color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400})}),(0,jsx_runtime.jsx)(ZigTypography.Z,{variant:"body2",sx:{color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400},children:text})]})}ZigAlertMessage.displayName="ZigAlertMessage";const display_ZigAlertMessage=ZigAlertMessage,ErrorMessage=({text,id})=>(0,jsx_runtime.jsx)(ZigAlertMessage,{text,error:!0,id});ErrorMessage.displayName="ErrorMessage";try{ZigAlertMessage.displayName="ZigAlertMessage",ZigAlertMessage.__docgenInfo={description:"",displayName:"ZigAlertMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},warning:{defaultValue:null,description:"",name:"warning",required:!1,type:{name:"boolean | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"]={docgenInfo:ZigAlertMessage.__docgenInfo,name:"ZigAlertMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"})}catch(__react_docgen_typescript_loader_error){}try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigCopyText/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CopySensitiveText:()=>CopySensitiveText,CopyText:()=>CopyText,default:()=>stories});__webpack_require__("../../node_modules/react/index.js");var styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),ZigInput=__webpack_require__("./src/components/inputs/ZigInput/index.tsx"),InputAdornment=__webpack_require__("../../node_modules/@mui/material/InputAdornment/InputAdornment.js"),ContentCopy=__webpack_require__("../../node_modules/@mui/icons-material/ContentCopy.js"),copy_to_clipboard=__webpack_require__("../../node_modules/copy-to-clipboard/index.js"),copy_to_clipboard_default=__webpack_require__.n(copy_to_clipboard),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigCopyText=(0,styled.ZP)((({onCopied,copyElementId,InputProps,...props})=>(0,jsx_runtime.jsx)(ZigInput.Z,{wide:!0,...props,InputProps:{...InputProps,endAdornment:(0,jsx_runtime.jsx)(InputAdornment.Z,{position:"end",children:(0,jsx_runtime.jsx)(ContentCopy.Z,{id:copyElementId,onClick:()=>{onCopied?.(),copy_to_clipboard_default()(props.value)},width:40,height:40,sx:ZigInput.t})})},readOnly:!0})))`
  .MuiInput-root {
    &,
    & .MuiInput-input {
      cursor: default;
    }

    &,
    &.Mui-focused,
    &:hover {
      border-color: ${({theme})=>theme.palette.neutral700} !important;
    }
  }
`,display_ZigCopyText=ZigCopyText;try{ZigCopyText.displayName="ZigCopyText",ZigCopyText.__docgenInfo={description:"",displayName:"ZigCopyText",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any> | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | boolean | undefined"}},labelInline:{defaultValue:null,description:"",name:"labelInline",required:!1,type:{name:"boolean | undefined"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean | undefined"}},wide:{defaultValue:null,description:"",name:"wide",required:!1,type:{name:"boolean | undefined"}},sensitive:{defaultValue:null,description:"",name:"sensitive",required:!1,type:{name:"boolean | undefined"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},copyElementId:{defaultValue:null,description:"",name:"copyElementId",required:!1,type:{name:"string | undefined"}},onCopied:{defaultValue:null,description:"",name:"onCopied",required:!1,type:{name:"(() => void) | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigCopyText/index.tsx#ZigCopyText"]={docgenInfo:ZigCopyText.__docgenInfo,name:"ZigCopyText",path:"src/components/display/ZigCopyText/index.tsx#ZigCopyText"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Display/ZigCopyText",component:display_ZigCopyText,argTypes:{label:{type:"string"},value:{type:"string"}}},Template=args=>(0,jsx_runtime.jsx)(display_ZigCopyText,{onCopied:()=>alert("Copied!"),...args});Template.displayName="Template";const CopyText=Template.bind({});CopyText.args={label:"Your deposit address",value:"0xjhkjfhvjkhdskjvhdfskjvhsdfkjhvjkh"};const CopySensitiveText=Template.bind({});CopySensitiveText.args={label:"Your deposit address",sensitive:!0,value:"0xjhkjfhvjkhdskjvhdfskjvhsdfkjhvjkh"}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/inputs/ZigButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,f:()=>ZigButtonGroup});__webpack_require__("../../node_modules/react/index.js");var _mui_lab__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/lab/LoadingButton/LoadingButton.js"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/material/Tooltip/Tooltip.js"),_mui_material__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mui/material/ButtonGroup/ButtonGroup.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigButton=({active,tooltip,ctaId,color,size,narrow,variant="contained",linkTarget,linkRel,...props})=>{const button=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_lab__WEBPACK_IMPORTED_MODULE_2__.Z,{"data-tack-cta":ctaId,size,variant,...props,...narrow?{sx:{...props.sx,minWidth:"0 !important",padding:"6px"}}:{},...props.href?{rel:linkRel??"noopener noreferrer",target:linkTarget??"_blank"}:{},"data-testid":props["data-testid"]||void 0,color:"outlined"!==variant||color?color:"secondary",className:active?`${props.className} MuiButton-active`:props.className});return tooltip?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,{title:tooltip,children:props.disabled?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span",{children:button}):button}):button},ZigButtonGroup=(0,_mui_material__WEBPACK_IMPORTED_MODULE_4__.ZP)(_mui_material__WEBPACK_IMPORTED_MODULE_5__.Z)`
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
`,__WEBPACK_DEFAULT_EXPORT__=ZigButton;try{ZigButtonGroup.displayName="ZigButtonGroup",ZigButtonGroup.__docgenInfo={description:"",displayName:"ZigButtonGroup",props:{component:{defaultValue:null,description:"The component used for the root node.\nEither a string to use a HTML element or a component.",name:"component",required:!0,type:{name:"ElementType<any>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigButton/index.tsx#ZigButtonGroup"]={docgenInfo:ZigButtonGroup.__docgenInfo,name:"ZigButtonGroup",path:"src/components/inputs/ZigButton/index.tsx#ZigButtonGroup"})}catch(__react_docgen_typescript_loader_error){}try{ZigButton.displayName="ZigButton",ZigButton.__docgenInfo={description:"",displayName:"ZigButton",props:{href:{defaultValue:null,description:"The URL to link to when the button is clicked.\nIf defined, an `a` element will be used as the root node.",name:"href",required:!1,type:{name:"string"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLAnchorElement | null) => void) | RefObject<HTMLAnchorElement> | null | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigButton/index.tsx#ZigButton"]={docgenInfo:ZigButton.__docgenInfo,name:"ZigButton",path:"src/components/inputs/ZigButton/index.tsx#ZigButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/inputs/ZigInput/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__,t:()=>ZigInputInteractiveAdornmentStyle});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("../../node_modules/@mui/material/TextField/TextField.js"),_mui_material__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("../../node_modules/@mui/material/InputAdornment/InputAdornment.js"),_ZigButton__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./src/components/inputs/ZigButton/index.tsx"),_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/icons-material/VisibilityOff.js"),_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/@mui/icons-material/Visibility.js"),_display_ZigAlertMessage__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/components/display/ZigAlertMessage/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigInput=(0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.ZP)(react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({error,wide,sensitive,labelAction,helperText,id,...props},ref)=>{const[isShown,setIsShown]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),EyeIcon=isShown?_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_4__.Z:_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_3__.Z;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_5__.Z,{id,inputRef:ref,...props,inputProps:{...props.inputProps||{},"data-testid":props?.inputProps?.["data-testid"]||void 0},label:props.label?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[props.label,labelAction&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ZigButton__WEBPACK_IMPORTED_MODULE_6__.Z,{variant:"text",sx:{fontSize:"13px",fontWeight:400},tabIndex:labelAction.tabIndex,onClick:labelAction.onClick,href:labelAction.href,id:labelAction.id,children:labelAction.text})]}):null,variant:"standard",error:!!error,helperText:"string"==typeof error&&""!==error?error&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_display_ZigAlertMessage__WEBPACK_IMPORTED_MODULE_7__.B,{text:error,id:id&&`${id}-error-message`}):helperText,type:sensitive?isShown?"text":"password":props.type,InputProps:{disableUnderline:!0,...props.InputProps||{},...sensitive?{endAdornment:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Z,{position:"end",children:!!sensitive&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(EyeIcon,{id:id&&`${id}-visibility-icon`,onClick:()=>setIsShown((v=>!v)),width:40,height:40,sx:ZigInputInteractiveAdornmentStyle})},id+"-sensivive"),...(v=props?.InputProps?.endAdornment,(Array.isArray(v)?v:[v]).filter(Boolean))]}:{}},InputLabelProps:{shrink:!0,...props.InputLabelProps||{}}});var v})))`
  // TODO: move to darkMui
  ${props=>props.wide&&"display: block;"}

  .MuiInputLabel-root {
    &.Mui-focused {
      color: ${({theme})=>theme.palette.neutral000};
    }
    transform: none !important;
    width: 100%;
    transition: color 0.2s;

    ${({theme,labelInline})=>labelInline?`\n    text-align: center;\n    z-index: 2;\n    font-size: 11px;\n    letter-spacing: 0.33px;\n    margin-top: 8px;\n    color: ${theme.palette.neutral300} !important;\n  `:`\n    font-size: 15px !important;\n    line-height: 24px;\n    letter-spacing: 0.55px;\n    color: ${theme.palette.neutral200} !important;\n    \n    display: flex;\n    position: static;\n    flex-direction: row;\n    justify-content: space-between;\n\n    button {\n      float: right;\n    }\n  `}
  }

  .MuiInput-root {
    padding: ${({labelInline})=>labelInline?"18px 24px 6px":"12px 24px"};
    margin-top: ${props=>props.label?"10px":0};
  }
`,ZigInputInteractiveAdornmentStyle={cursor:"pointer",color:"neutral300",transition:"all .3s","&:hover":{color:"neutral200"}},__WEBPACK_DEFAULT_EXPORT__=ZigInput;try{ZigInput.displayName="ZigInput",ZigInput.__docgenInfo={description:"",displayName:"ZigInput",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"ElementType<any> | undefined"}},labelAction:{defaultValue:null,description:"",name:"labelAction",required:!1,type:{name:"LabelActionProps | undefined"}},labelInline:{defaultValue:null,description:"",name:"labelInline",required:!1,type:{name:"boolean | undefined"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean | undefined"}},wide:{defaultValue:null,description:"",name:"wide",required:!1,type:{name:"boolean | undefined"}},sensitive:{defaultValue:null,description:"",name:"sensitive",required:!1,type:{name:"boolean | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigInput/index.tsx#ZigInput"]={docgenInfo:ZigInput.__docgenInfo,name:"ZigInput",path:"src/components/inputs/ZigInput/index.tsx#ZigInput"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/icons/error-alert-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{r:()=>SvgErrorAlertIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgErrorAlertIcon=function SvgErrorAlertIcon(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"zig-icon"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 3C7.02979 3 3 7.03124 3 12C3 16.9717 7.02979 21 12 21C16.9702 21 21 16.9717 21 12C21 7.03124 16.9702 3 12 3ZM12 19.2581C7.98876 19.2581 4.74194 16.0126 4.74194 12C4.74194 7.9901 7.9889 4.74194 12 4.74194C16.0098 4.74194 19.2581 7.98887 19.2581 12C19.2581 16.0112 16.0126 19.2581 12 19.2581ZM13.5242 15.4839C13.5242 16.3243 12.8404 17.0081 12 17.0081C11.1596 17.0081 10.4758 16.3243 10.4758 15.4839C10.4758 14.6434 11.1596 13.9597 12 13.9597C12.8404 13.9597 13.5242 14.6434 13.5242 15.4839ZM10.5712 7.81206L10.818 12.7475C10.8296 12.9793 11.0209 13.1613 11.253 13.1613H12.747C12.9791 13.1613 13.1704 12.9793 13.182 12.7475L13.4287 7.81206C13.4412 7.56333 13.2429 7.35484 12.9938 7.35484H11.0062C10.7571 7.35484 10.5588 7.56333 10.5712 7.81206Z",fill:props.color}))}},"../../node_modules/copy-to-clipboard/index.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";var deselectCurrent=__webpack_require__("../../node_modules/toggle-selection/index.js"),clipboardToIE11Formatting={"text/plain":"Text","text/html":"Url",default:"Text"};module.exports=function copy(text,options){var debug,message,reselectPrevious,range,selection,mark,success=!1;options||(options={}),debug=options.debug||!1;try{if(reselectPrevious=deselectCurrent(),range=document.createRange(),selection=document.getSelection(),(mark=document.createElement("span")).textContent=text,mark.ariaHidden="true",mark.style.all="unset",mark.style.position="fixed",mark.style.top=0,mark.style.clip="rect(0, 0, 0, 0)",mark.style.whiteSpace="pre",mark.style.webkitUserSelect="text",mark.style.MozUserSelect="text",mark.style.msUserSelect="text",mark.style.userSelect="text",mark.addEventListener("copy",(function(e){if(e.stopPropagation(),options.format)if(e.preventDefault(),void 0===e.clipboardData){debug&&console.warn("unable to use e.clipboardData"),debug&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var format=clipboardToIE11Formatting[options.format]||clipboardToIE11Formatting.default;window.clipboardData.setData(format,text)}else e.clipboardData.clearData(),e.clipboardData.setData(options.format,text);options.onCopy&&(e.preventDefault(),options.onCopy(e.clipboardData))})),document.body.appendChild(mark),range.selectNodeContents(mark),selection.addRange(range),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");success=!0}catch(err){debug&&console.error("unable to copy using execCommand: ",err),debug&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(options.format||"text",text),options.onCopy&&options.onCopy(window.clipboardData),success=!0}catch(err){debug&&console.error("unable to copy using clipboardData: ",err),debug&&console.error("falling back to prompt"),message=function format(message){var copyKey=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return message.replace(/#{\s*key\s*}/g,copyKey)}("message"in options?options.message:"Copy to clipboard: #{key}, Enter"),window.prompt(message,text)}}finally{selection&&("function"==typeof selection.removeRange?selection.removeRange(range):selection.removeAllRanges()),mark&&document.body.removeChild(mark),reselectPrevious()}return success}},"../../node_modules/toggle-selection/index.js":module=>{module.exports=function(){var selection=document.getSelection();if(!selection.rangeCount)return function(){};for(var active=document.activeElement,ranges=[],i=0;i<selection.rangeCount;i++)ranges.push(selection.getRangeAt(i));switch(active.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":active.blur();break;default:active=null}return selection.removeAllRanges(),function(){"Caret"===selection.type&&selection.removeAllRanges(),selection.rangeCount||ranges.forEach((function(range){selection.addRange(range)})),active&&active.focus()}}}}]);
//# sourceMappingURL=components-display-ZigCopyText-stories.e423eb43.iframe.bundle.js.map