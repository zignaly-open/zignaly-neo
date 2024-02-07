"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[1835],{"./src/components/display/ZScoreBar/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Balance:()=>Balance,Profits:()=>Profits,Risk:()=>Risk,Service:()=>Service,default:()=>stories});__webpack_require__("../../node_modules/react/index.js");var Box=__webpack_require__("../../node_modules/@mui/material/Box/Box.js"),LinearProgress=__webpack_require__("../../node_modules/@mui/material/LinearProgress/LinearProgress.js"),emotion_react_browser_esm=__webpack_require__("../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),styled=__webpack_require__("../../node_modules/@mui/system/esm/styled.js");const opacityAnimation=emotion_react_browser_esm.F4`
  to {
    opacity: 1;
  }
`,StyledLinearProgress=(0,styled.Z)(LinearProgress.Z)`
  background: ${({theme,category})=>theme.palette.zscore.bar[category]};
  animation: ${opacityAnimation} 1s ease-out forwards;
  opacity: 0.5;
  border-radius: 1.5px;
  height: 3px;
  > span {
    background-color: #242842;
    animation: ${({value})=>{return position=value,emotion_react_browser_esm.F4`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(${position}%);
  }
`;var position}} 1s ease-out forwards;
  }
  /* revert MuiLinearProgress styleOverrides */
  &::before {
    content: none;
  }
  .MuiLinearProgress-bar {
    width: auto;
    background-image: none;
    inset: 0px;
  }
`,BarThumb=(0,styled.Z)("span")`
  width: 6px;
  height: 6px;
  border: solid 0.6px #242842;
  background-color: #fefbf8;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  animation: ${({value})=>{return position=value,emotion_react_browser_esm.F4`
  from {
    left: 0;
  }
  to {
    left: ${position}%;
  }
`;var position}} 1s ease-out forwards,
    ${opacityAnimation} 1s ease-out forwards;
  opacity: 0;
`;var ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),round=__webpack_require__("../../node_modules/lodash-es/round.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZScoreBar=({value,max=100,id,...props})=>{const pct=Math.min(value/max*100,100);return(0,jsx_runtime.jsxs)(Box.Z,{sx:{display:"flex",alignItems:"center"},id,children:[(0,jsx_runtime.jsxs)(Box.Z,{sx:{flex:1,mr:"13px",position:"relative"},children:[(0,jsx_runtime.jsx)(BarThumb,{value:pct}),(0,jsx_runtime.jsx)(StyledLinearProgress,{variant:"determinate",value:pct,...props})]}),(0,jsx_runtime.jsxs)(Box.Z,{sx:{minWidth:53},display:"flex",justifyContent:"flex-start",children:[(0,jsx_runtime.jsx)(ZigTypography.Z,{variant:"body2",color:"neutral000",fontSize:15,fontWeight:600,children:`${(0,round.Z)(value,1)}`}),(0,jsx_runtime.jsx)(ZigTypography.Z,{color:"paleBlue",fontSize:11,fontWeight:500,children:`/${Math.round(max)}`})]})]})};ZScoreBar.displayName="ZScoreBar";const display_ZScoreBar=ZScoreBar;try{ZScoreBar.displayName="ZScoreBar",ZScoreBar.__docgenInfo={description:"",displayName:"ZScoreBar",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"number"}},max:{defaultValue:{value:"100"},description:"",name:"max",required:!1,type:{name:"number"}},category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"profits"'},{value:'"risk"'},{value:'"service"'},{value:'"balanced"'}]}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<{}> | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZScoreBar/index.tsx#ZScoreBar"]={docgenInfo:ZScoreBar.__docgenInfo,name:"ZScoreBar",path:"src/components/display/ZScoreBar/index.tsx#ZScoreBar"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Display/ZScoreBar",component:display_ZScoreBar},Profits={args:{value:10,max:20,category:"profits"}},Risk={args:{value:12,max:20,category:"risk"}},Service={args:{value:3,max:20,category:"service"}},Balance={args:{value:20,max:20,category:"balanced"}}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z}}]);
//# sourceMappingURL=components-display-ZScoreBar-stories.26c93f66.iframe.bundle.js.map