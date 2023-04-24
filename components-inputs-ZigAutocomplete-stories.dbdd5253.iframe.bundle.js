"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[1244],{"./src/components/display/ErrorMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _ZigAlertMessage__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/ZigAlertMessage/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ErrorMessage({text}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ZigAlertMessage__WEBPACK_IMPORTED_MODULE_2__.Z,{text,error:!0})}ErrorMessage.displayName="ErrorMessage";const __WEBPACK_DEFAULT_EXPORT__=ErrorMessage;try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ErrorMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/display/ErrorMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/Loader/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _types__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/Loader/types.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Loader({type=_types__WEBPACK_IMPORTED_MODULE_2__.k.TAILSPIN,width,height,color,secondaryColor,ariaLabel,strokeWidth,className}){const ComponentByType=_types__WEBPACK_IMPORTED_MODULE_2__.$[type];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ComponentByType,{width,height,color,ariaLabel,secondaryColor,strokeWidth,wrapperClass:className})}Loader.displayName="Loader";const __WEBPACK_DEFAULT_EXPORT__=Loader;try{Loader.displayName="Loader",Loader.__docgenInfo={description:"",displayName:"Loader",props:{type:{defaultValue:{value:"LoaderTypes.TAILSPIN"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"audio"'},{value:'"bars"'},{value:'"circles"'},{value:'"falling_lines"'},{value:'"grid"'},{value:'"oval"'},{value:'"tail-spin"'},{value:'"three-dots"'}]}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string | undefined"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string | undefined"}},color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"string"}},secondaryColor:{defaultValue:null,description:"",name:"secondaryColor",required:!1,type:{name:"string | undefined"}},ariaLabel:{defaultValue:null,description:"",name:"ariaLabel",required:!0,type:{name:"string"}},strokeWidth:{defaultValue:null,description:"",name:"strokeWidth",required:!1,type:{name:"string | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Loader/index.tsx#Loader"]={docgenInfo:Loader.__docgenInfo,name:"Loader",path:"src/components/display/Loader/index.tsx#Loader"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/Loader/types.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>componentsByType,k:()=>LoaderTypes});var react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react-loader-spinner/dist/react-loader-spinner.esm.js");let LoaderTypes;!function(LoaderTypes){LoaderTypes.AUDIO="audio",LoaderTypes.BARS="bars",LoaderTypes.CIRCLES="circles",LoaderTypes.FALLING_LINES="falling_lines",LoaderTypes.GRID="grid",LoaderTypes.OVAL="oval",LoaderTypes.TAILSPIN="tail-spin",LoaderTypes.THREE_DOTS="three-dots"}(LoaderTypes||(LoaderTypes={}));const componentsByType={[LoaderTypes.AUDIO]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.Bb,[LoaderTypes.BARS]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.Ll,[LoaderTypes.CIRCLES]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.p2,[LoaderTypes.FALLING_LINES]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.Rf,[LoaderTypes.GRID]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.rj,[LoaderTypes.OVAL]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.iT,[LoaderTypes.TAILSPIN]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.gy,[LoaderTypes.THREE_DOTS]:react_loader_spinner__WEBPACK_IMPORTED_MODULE_0__.g4}},"./src/components/display/ZigAlertMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>display_ZigAlertMessage});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const Layout=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`,Icon=styled_components_browser_esm.ZP.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;var error_alert_icon=__webpack_require__("./src/assets/icons/error-alert-icon.svg"),dark=__webpack_require__("./src/theme/dark.ts"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigAlertMessage({text,error,warning}){return(0,jsx_runtime.jsxs)(Layout,{children:[(0,jsx_runtime.jsx)(Icon,{children:(0,jsx_runtime.jsx)(error_alert_icon.r,{height:"24px",width:"24px",color:error?dark.Z.redGraphOrError:warning?dark.Z.yellow:dark.Z.neutral400})}),(0,jsx_runtime.jsx)(ZigTypography.Z,{variant:"body2",sx:{color:error?dark.Z.redGraphOrError:warning?dark.Z.yellow:dark.Z.neutral400},children:text})]})}ZigAlertMessage.displayName="ZigAlertMessage";const display_ZigAlertMessage=ZigAlertMessage;try{ZigAlertMessage.displayName="ZigAlertMessage",ZigAlertMessage.__docgenInfo={description:"",displayName:"ZigAlertMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},warning:{defaultValue:null,description:"",name:"warning",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"]={docgenInfo:ZigAlertMessage.__docgenInfo,name:"ZigAlertMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/inputs/TextButton/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>inputs_TextButton});var types=__webpack_require__("./src/components/display/Loader/types.ts"),styled_components_browser_esm=(__webpack_require__("../../node_modules/react/index.js"),__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js")),styled=__webpack_require__("./src/utils/styled.ts"),Loader=__webpack_require__("./src/components/display/Loader/index.tsx");const Container=styled_components_browser_esm.ZP.div`
  position: relative;
  transition: all 0.2s linear;
  outline: none;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`,LeftElement=styled_components_browser_esm.ZP.div`
  z-index: 3;
  position: relative;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`,ButtonLoader=(0,styled_components_browser_esm.ZP)(Loader.Z)`
  justify-content: center;
  align-items: center;
  svg {
    height: 20px;
    width: 20px;
  }
`,ElementsContainer=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`,RightElement=(0,styled_components_browser_esm.ZP)(LeftElement)`
  padding-right: 0;
  padding-left: 10px;
`,LoaderContainer=(styled_components_browser_esm.ZP.div`
  position: relative;
  top: 1px;
`,styled_components_browser_esm.ZP.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`),Layout=styled_components_browser_esm.ZP.button`
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  user-select: none;
  background: transparent;
  text-decoration-line: none;

  ${props=>`\n      ${(0,styled.W)(props.isLoading,`\n        ${ElementsContainer}{\n          opacity: 0;\n        }\n        `)}\n      \n  `}
  ${props=>`\n      ${(0,styled.W)(props.disabled,"\n        cursor: not-allowed;\n        ")}\n      \n  `}
`;var ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function TextButton({caption="Button",leftElement,rightElement,underline,onClick=()=>{},href,allowClickOnDisabled=!1,disabled=!1,loading=!1,rel,as,id,target,className,tabIndex,color="links",type="button",variant="h4"}){return(0,jsx_runtime.jsxs)(Layout,{className,color,id,type,isLoading:loading,withElements:!!leftElement||!!rightElement,onClick:(allowClickOnDisabled||!disabled)&&onClick,disabled:disabled||loading,tabIndex,as,...href&&{href,as:"a",rel:rel??"noopener noreferrer",target:target??"_blank"},children:[(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsxs)(ElementsContainer,{children:[leftElement&&(0,jsx_runtime.jsx)(LeftElement,{children:leftElement}),(0,jsx_runtime.jsx)(ZigTypography.Z,{color:disabled?"neutral300":color,variant,underline,children:caption}),rightElement&&(0,jsx_runtime.jsx)(RightElement,{children:rightElement})]})}),loading&&(0,jsx_runtime.jsx)(LoaderContainer,{children:(0,jsx_runtime.jsx)(ButtonLoader,{type:types.k.TAILSPIN,color:"#9CA3AF",ariaLabel:"Loader"})})]})}TextButton.displayName="TextButton";const inputs_TextButton=TextButton;try{TextButton.displayName="TextButton",TextButton.__docgenInfo={description:"",displayName:"TextButton",props:{caption:{defaultValue:{value:"Button"},description:"",name:"caption",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>> | undefined"}},leftElement:{defaultValue:null,description:"",name:"leftElement",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined"}},rightElement:{defaultValue:null,description:"",name:"rightElement",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined"}},underline:{defaultValue:null,description:"",name:"underline",required:!1,type:{name:"boolean | undefined"}},onClick:{defaultValue:{value:"() => {}"},description:"",name:"onClick",required:!1,type:{name:"MouseEventHandler<HTMLButtonElement> | undefined"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"string | undefined"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},rel:{defaultValue:null,description:"",name:"rel",required:!1,type:{name:"string | undefined"}},type:{defaultValue:{value:"button"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"button"'},{value:'"submit"'}]}},target:{defaultValue:null,description:"",name:"target",required:!1,type:{name:"string | undefined"}},allowClickOnDisabled:{defaultValue:{value:"false"},description:"",name:"allowClickOnDisabled",required:!1,type:{name:"boolean | undefined"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean | undefined"}},tabIndex:{defaultValue:null,description:"",name:"tabIndex",required:!1,type:{name:"number | undefined"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},color:{defaultValue:{value:"links"},description:"",name:"color",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"red"'},{value:'"yellow"'},{value:'"neutral800"'},{value:'"neutral750"'},{value:'"neutral700"'},{value:'"neutral600"'},{value:'"neutral500"'},{value:'"neutral400"'},{value:'"neutral200"'},{value:'"neutral300"'},{value:'"neutral175"'},{value:'"neutral150"'},{value:'"neutral100"'},{value:'"neutral000"'},{value:'"highlighted"'},{value:'"redGraphOrError"'},{value:'"greenGraph"'},{value:'"links"'},{value:'"almostWhite"'}]}},variant:{defaultValue:{value:"h4"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"bigNumber"'},{value:'"body1"'},{value:'"body2"'},{value:'"buttonxl"'},{value:'"buttonl"'},{value:'"buttonm"'},{value:'"buttonsm"'},{value:'"inputl"'},{value:'"inputm"'},{value:'"labelm"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/TextButton/index.tsx#TextButton"]={docgenInfo:TextButton.__docgenInfo,name:"TextButton",path:"src/components/inputs/TextButton/index.tsx#TextButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/inputs/ZigAutocomplete/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BasicAutocomplete:()=>BasicAutocomplete,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),Autocomplete=__webpack_require__("../../node_modules/@mui/material/Autocomplete/Autocomplete.js"),ZigInput=__webpack_require__("./src/components/inputs/ZigInput/index.tsx"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigAutocomplete({label,disablePortal,error,wide,labelAction,options,blurOnSelect=!0,selectOnFocus=!0,openOnFocus=!0,...props}){return(0,jsx_runtime.jsx)(Autocomplete.Z,{disablePortal,id:"combo-box-demo",options,blurOnSelect,openOnFocus,selectOnFocus,...props,renderInput:params=>(0,jsx_runtime.jsx)(ZigInput.Z,{...params,wide,labelAction,label,error})})}ZigAutocomplete.displayName="ZigAutocomplete";const inputs_ZigAutocomplete=ZigAutocomplete;try{ZigAutocomplete.displayName="ZigAutocomplete",ZigAutocomplete.__docgenInfo={description:"",displayName:"ZigAutocomplete",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"Ref<unknown> | undefined"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | Element | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | boolean | undefined"}},wide:{defaultValue:null,description:"",name:"wide",required:!1,type:{name:"boolean | undefined"}},labelAction:{defaultValue:null,description:"",name:"labelAction",required:!1,type:{name:"LabelActionProps | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigAutocomplete/index.tsx#ZigAutocomplete"]={docgenInfo:ZigAutocomplete.__docgenInfo,name:"ZigAutocomplete",path:"src/components/inputs/ZigAutocomplete/index.tsx#ZigAutocomplete"})}catch(__react_docgen_typescript_loader_error){}var Box=__webpack_require__("../../node_modules/@mui/material/Box/Box.js");const stories={title:"Inputs/ZigAutocomplete",component:inputs_ZigAutocomplete,argTypes:{label:{type:"string"},placeholder:{type:"string"},wide:{type:"boolean",defaultValue:!1},disabled:{type:"boolean",defaultValue:!1},defaultValue:{type:"string"},error:{type:"string",defaultValue:""}}},options=[{label:"Regular cat",value:1},{label:"Regular dog",value:-1},{image:"https://cdna.artstation.com/p/assets/images/images/014/532/698/20181209121125/smaller_square/catgirl-enthusiast-girl-4.jpg?1544379086",label:"Catgirl",value:2}],BasicAutocomplete=(args=>{const[value,setValue]=(0,react.useState)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:["Value: ",JSON.stringify(value?.value),2===value?.value?" Meow":"",(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(inputs_ZigAutocomplete,{renderOption:(props,entry)=>(0,jsx_runtime.jsxs)(Box.Z,{component:"li",...props,children:[entry.image&&(0,jsx_runtime.jsx)("img",{src:entry.image,height:24,width:24}),entry.label]}),placeholder:args.placeholder,error:args.error,label:args.label,onChange:(event,v)=>setValue(v),options})]})}).bind({});BasicAutocomplete.args={label:"Choose pet",placeholder:"Choose pet"}},"./src/components/inputs/ZigInput/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),components_display_ErrorMessage__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/components/display/ErrorMessage/index.tsx"),_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@mui/material/TextField/TextField.js"),_TextButton__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/components/inputs/TextButton/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigInput=(0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.ZP)(react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((({error,wide,labelAction,helperText,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Z,{inputRef:ref,...props,inputProps:{...props.inputProps||{}},label:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment,{children:[props.label,labelAction&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_TextButton__WEBPACK_IMPORTED_MODULE_4__.Z,{tabIndex:labelAction.tabIndex,onClick:labelAction.onClick,href:labelAction.href,caption:labelAction.text,id:labelAction.id})]}),variant:"standard",error:!!error,helperText:"string"==typeof error&&""!==error?error&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(components_display_ErrorMessage__WEBPACK_IMPORTED_MODULE_5__.Z,{text:error}):helperText,InputProps:{disableUnderline:!0,...props.InputProps||{}},InputLabelProps:{shrink:!0,...props.InputLabelProps||{}}}))))`
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
    margin-top: 4px;
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
`,__WEBPACK_DEFAULT_EXPORT__=ZigInput;try{ZigInput.displayName="ZigInput",ZigInput.__docgenInfo={description:"",displayName:"ZigInput",props:{ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined"}},margin:{defaultValue:{value:"'none'"},description:"If `dense` or `normal`, will adjust vertical spacing of this and contained components.",name:"margin",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"none"'},{value:'"dense"'},{value:'"normal"'}]}},focused:{defaultValue:null,description:"If `true`, the component is displayed in focused state.",name:"focused",required:!1,type:{name:"boolean | undefined"}},hiddenLabel:{defaultValue:{value:"false"},description:"If `true`, the label is hidden.\nThis is used to increase density for a `FilledInput`.\nBe sure to add `aria-label` to the `input` element.",name:"hiddenLabel",required:!1,type:{name:"boolean | undefined"}},labelAction:{defaultValue:null,description:"",name:"labelAction",required:!1,type:{name:"LabelActionProps | undefined"}},wide:{defaultValue:null,description:"",name:"wide",required:!1,type:{name:"boolean | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigInput/index.tsx#ZigInput"]={docgenInfo:ZigInput.__docgenInfo,name:"ZigInput",path:"src/components/inputs/ZigInput/index.tsx#ZigInput"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>styledIf});const styledIf=(cond,primaryQuery,secondaryQuery)=>secondaryQuery?cond?primaryQuery:secondaryQuery:cond?primaryQuery:""},"./src/assets/icons/error-alert-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>SvgErrorAlertIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgErrorAlertIcon=function SvgErrorAlertIcon(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 3C7.02979 3 3 7.03124 3 12C3 16.9717 7.02979 21 12 21C16.9702 21 21 16.9717 21 12C21 7.03124 16.9702 3 12 3ZM12 19.2581C7.98876 19.2581 4.74194 16.0126 4.74194 12C4.74194 7.9901 7.9889 4.74194 12 4.74194C16.0098 4.74194 19.2581 7.98887 19.2581 12C19.2581 16.0112 16.0126 19.2581 12 19.2581ZM13.5242 15.4839C13.5242 16.3243 12.8404 17.0081 12 17.0081C11.1596 17.0081 10.4758 16.3243 10.4758 15.4839C10.4758 14.6434 11.1596 13.9597 12 13.9597C12.8404 13.9597 13.5242 14.6434 13.5242 15.4839ZM10.5712 7.81206L10.818 12.7475C10.8296 12.9793 11.0209 13.1613 11.253 13.1613H12.747C12.9791 13.1613 13.1704 12.9793 13.182 12.7475L13.4287 7.81206C13.4412 7.56333 13.2429 7.35484 12.9938 7.35484H11.0062C10.7571 7.35484 10.5588 7.56333 10.5712 7.81206Z",fill:props.color}))}}}]);
//# sourceMappingURL=components-inputs-ZigAutocomplete-stories.dbdd5253.iframe.bundle.js.map