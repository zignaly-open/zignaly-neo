"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[2234],{"./src/components/display/ZScoreRing/atoms.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{c:()=>GradientDefs});__webpack_require__("../../node_modules/react/index.js");var _mui_material__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const GradientDefs=({category,prefixId="zscore-ring"})=>{const{palette:{zscore}}=(0,_mui_material__WEBPACK_IMPORTED_MODULE_2__.Z)(),colors=zscore.ring[category];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("defs",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("linearGradient",{id:`${prefixId}-${category}-1`,gradientTransform:"rotate(180 0.5 0.5)",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("stop",{offset:"0.0",stopColor:colors.gradient[0]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("stop",{offset:"0.75",stopColor:colors.gradient[1]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("linearGradient",{id:`${prefixId}-${category}-2`,gradientTransform:"rotate(-36 0.5 0.5)",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("stop",{offset:"0",stopColor:colors.gradient[1]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("stop",{offset:"0.75",stopColor:colors.gradient[2]})]})]})};GradientDefs.displayName="GradientDefs";try{GradientDefs.displayName="GradientDefs",GradientDefs.__docgenInfo={description:"",displayName:"GradientDefs",props:{category:{defaultValue:null,description:"",name:"category",required:!0,type:{name:"enum",value:[{value:'"profits"'},{value:'"risk"'},{value:'"service"'},{value:'"balanced"'}]}},prefixId:{defaultValue:{value:"zscore-ring"},description:"",name:"prefixId",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZScoreRing/atoms.tsx#GradientDefs"]={docgenInfo:GradientDefs.__docgenInfo,name:"GradientDefs",path:"src/components/display/ZScoreRing/atoms.tsx#GradientDefs"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZScoreRing/styles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{VW:()=>AnimatedRingSvg,lE:()=>AnimatedRingCircle,sX:()=>AnimatedHandle});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),_mui_system__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/system/esm/styled.js");const handleAnimation=_mui_system__WEBPACK_IMPORTED_MODULE_0__.F4`
  from {
    stroke-dashoffset: 0;
  }
  to {
    opacity: 1;
  }
`,ringAnimation=_mui_system__WEBPACK_IMPORTED_MODULE_0__.F4`
  from {
      opacity: 0.5;
      stroke-dasharray: 0, 100;
  }
  to {
    opacity: 1;
  }
`,AnimatedRingSvg=(0,_mui_system__WEBPACK_IMPORTED_MODULE_1__.Z)("svg")`
  g {
    transform-origin: center;
  }

  circle {
    fill: none;
    stroke-linecap: round;
  }
`,AnimatedRingCircle=(0,_mui_system__WEBPACK_IMPORTED_MODULE_1__.Z)("circle",{shouldForwardProp:()=>!0})`
  opacity: 0.5;
  animation: ${ringAnimation} 1s ease-out forwards;
`,AnimatedHandle=(0,_mui_system__WEBPACK_IMPORTED_MODULE_1__.Z)("circle",{shouldForwardProp:()=>!0})`
  opacity: 0;
  animation: ${handleAnimation} 1s ease-out forwards;
  transform-origin: center;
`},"./src/components/display/ZScoreRings/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),Box=__webpack_require__("../../node_modules/@mui/material/Box/Box.js"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),styled=__webpack_require__("../../node_modules/@mui/system/esm/styled.js");const RingsConnectorLine=(0,styled.Z)("div")`
  width: 1.5px;
  height: 11px;
  background: #2d3d7a;
`,RingsConnectorCircle=(0,styled.Z)("div")`
  width: 7px;
  height: 7px;
  position: relative;
  border-radius: 50%;
  background: #0b0e25;
  margin-top: 2px;

  &::before {
    background-image: linear-gradient(to right, #3b3280 0%, #286281 100%);
    content: "";
    position: absolute;
    top: -2px;
    bottom: -2px;
    right: -2px;
    left: -2px;
    z-index: -1;
    border-radius: inherit;
  }
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const RingsConnector=()=>(0,jsx_runtime.jsxs)(Box.Z,{display:"flex",flexDirection:"column",alignItems:"center",mt:"-3px",mb:"-5px",zIndex:1,position:"relative",children:[(0,jsx_runtime.jsx)(RingsConnectorLine,{}),(0,jsx_runtime.jsx)(RingsConnectorCircle,{})]});RingsConnector.displayName="RingsConnector";const atoms_RingsConnector=RingsConnector;var styles=__webpack_require__("./src/components/display/ZScoreRing/styles.ts"),atoms=__webpack_require__("./src/components/display/ZScoreRing/atoms.tsx");const ZScoreRings=props=>{const{zScore,profits,risk,service,profitsMax,riskMax,serviceMax,...rest}=props;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsxs)(Box.Z,{width:"112px",height:"112px",position:"relative",...rest,children:[(0,jsx_runtime.jsx)(Box.Z,{position:"absolute",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",width:"100%",top:0,left:0,right:0,bottom:0,children:(0,jsx_runtime.jsxs)(Box.Z,{display:"flex",flexDirection:"column",children:[(0,jsx_runtime.jsx)(ZigTypography.Z,{component:"span",fontWeight:600,fontSize:19,color:"neutral000",lineHeight:"14px",id:"zscore-rings__zscore",children:Math.round(zScore)}),(0,jsx_runtime.jsx)(ZigTypography.Z,{component:"span",fontWeight:400,fontSize:9,lineHeight:"12px",children:"/100"})]})}),(0,jsx_runtime.jsx)(styles.VW,{viewBox:"0 0 37 37",children:["profits","risk","service"].map(((category,index)=>{const pct=Math.min(props[category]/props[`${category}Max`]*100,100);return(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)(atoms.c,{prefixId:"zscore-rings",category}),(0,jsx_runtime.jsxs)("g",{transform:`rotate(90) scale(${1-.25*index})`,children:[(0,jsx_runtime.jsx)("circle",{strokeWidth:3+index,r:"15.915",cx:"50%",cy:"50%",stroke:"#242842"}),pct>50&&(0,jsx_runtime.jsx)(styles.lE,{strokeWidth:3+index,r:"15.915",cx:"50%",cy:"50%",stroke:`url('#zscore-rings-${category}-2')`,strokeDasharray:`${pct} ${100-pct}`}),(0,jsx_runtime.jsx)(styles.lE,{strokeWidth:3+index,r:"15.915",cx:"50%",cy:"50%",stroke:`url('#zscore-rings-${category}-1')`,strokeDasharray:pct>50?"50 50":`${pct} ${100-pct}`})]},category)]},category)}))})]}),(0,jsx_runtime.jsx)(atoms_RingsConnector,{})]})};ZScoreRings.displayName="ZScoreRings";const display_ZScoreRings=ZScoreRings;try{ZScoreRings.displayName="ZScoreRings",ZScoreRings.__docgenInfo={description:"",displayName:"ZScoreRings",props:{zScore:{defaultValue:null,description:"",name:"zScore",required:!0,type:{name:"number"}},profits:{defaultValue:null,description:"",name:"profits",required:!0,type:{name:"number"}},risk:{defaultValue:null,description:"",name:"risk",required:!0,type:{name:"number"}},service:{defaultValue:null,description:"",name:"service",required:!0,type:{name:"number"}},profitsMax:{defaultValue:null,description:"",name:"profitsMax",required:!0,type:{name:"number"}},riskMax:{defaultValue:null,description:"",name:"riskMax",required:!0,type:{name:"number"}},serviceMax:{defaultValue:null,description:"",name:"serviceMax",required:!0,type:{name:"number"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<{}> | undefined"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZScoreRings/index.tsx#ZScoreRings"]={docgenInfo:ZScoreRings.__docgenInfo,name:"ZScoreRings",path:"src/components/display/ZScoreRings/index.tsx#ZScoreRings"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Display/ZScoreRings",component:display_ZScoreRings},Default={args:{zScore:86,profits:45,risk:24,service:17,profitsMax:45,riskMax:25,serviceMax:20}}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z}}]);
//# sourceMappingURL=components-display-ZScoreRings-stories.e4bb33f4.iframe.bundle.js.map