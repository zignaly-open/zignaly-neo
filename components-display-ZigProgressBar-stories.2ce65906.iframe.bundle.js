"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[3950],{"./src/components/display/ZigProgressBar/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ZigProgressBarBar:()=>ZigProgressBarBar,default:()=>stories});__webpack_require__("../../node_modules/react/index.js");var chroma=__webpack_require__("../../node_modules/chroma-js/chroma.js"),chroma_default=__webpack_require__.n(chroma),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),styled=__webpack_require__("../../node_modules/@mui/system/esm/styled.js"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx");const Layout=styled_components_browser_esm.ZP.div`
  position: relative;
  padding-top: 10px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  width: 100%;
`,Bar=styled_components_browser_esm.ZP.div`
  background: linear-gradient(90deg, #567734 0%, #948d23 34.43%, #8e3b24 68.81%, #8c1954 99.89%);
  box-shadow: inset 0px 1px 1px -1px rgba(73, 9, 123, 0.25);
  border-radius: 100px;
  height: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 7px;
`,DotContainer=styled_components_browser_esm.ZP.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${props=>props.value}%;
  top: -4px;
  transform: translate(-50%, 0%);
`,Dot=styled_components_browser_esm.ZP.div`
  background: rgba(255, 255, 255, 0.9);
  height: 7px;
  margin-top: 3px;
  width: 2px;
`,Label=(0,styled.Z)(ZigTypography.Z)`
  color: RGB(193, 193, 200);

  &.body1 {
    font-size: 13px;
  }
`,gradient=chroma_default().scale(["#567734","#948d23","#8e3b24","#8c1954"]),LabelTooltip=(0,styled_components_browser_esm.ZP)(Label)`
  border-radius: 3px;
  pointer-events: none;
  background: ${props=>gradient(props.value/100).brighten(1).toString()};

  top: -38px;
  line-height: 1 !important;
  padding: 5px 6px;
  position: relative;
  display: block;
  color: ${props=>gradient(props.value/100).darken(1.5).toString()};

  &:before {
    content: "";
    border: 4px solid transparent;
    border-top-color: ${props=>gradient(props.value/100).brighten(1).toString()};
    position: absolute;
    top: 100%;
    left: calc(50% - 4px);
  }

  small {
    font-size: 10px;
    bottom: 2px;
    position: relative;
  }
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigProgressBar({className,value,max=100}){const normalizedValue=100*Math.min(value,max)/max;return(0,jsx_runtime.jsxs)(Layout,{className,children:[(0,jsx_runtime.jsx)(Label,{children:"0%"}),(0,jsx_runtime.jsx)(Bar,{children:(0,jsx_runtime.jsxs)(DotContainer,{value:normalizedValue,children:[(0,jsx_runtime.jsx)(Dot,{}),(0,jsx_runtime.jsxs)(LabelTooltip,{value:normalizedValue,children:[value,(0,jsx_runtime.jsx)("small",{children:"%"})]})]})}),(0,jsx_runtime.jsxs)(Label,{children:[max,"%"]})]})}ZigProgressBar.displayName="ZigProgressBar";const display_ZigProgressBar=ZigProgressBar;try{ZigProgressBar.displayName="ZigProgressBar",ZigProgressBar.__docgenInfo={description:"",displayName:"ZigProgressBar",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},max:{defaultValue:{value:"100"},description:"",name:"max",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigProgressBar/index.tsx#ZigProgressBar"]={docgenInfo:ZigProgressBar.__docgenInfo,name:"ZigProgressBar",path:"src/components/display/ZigProgressBar/index.tsx#ZigProgressBar"})}catch(__react_docgen_typescript_loader_error){}const Container=styled_components_browser_esm.ZP.div`
  width: 300px;
`,stories={title:"Display/ZigProgressBar",component:display_ZigProgressBar},Template=args=>(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(display_ZigProgressBar,{...args})});Template.displayName="Template";const ZigProgressBarBar=Template.bind({});ZigProgressBarBar.args={value:25,max:50}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z}}]);
//# sourceMappingURL=components-display-ZigProgressBar-stories.2ce65906.iframe.bundle.js.map