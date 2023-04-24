"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[96],{"./src/components/display/ProgressSlider/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ProgressSliderBar:()=>ProgressSliderBar,default:()=>stories});__webpack_require__("../../node_modules/react/index.js");var chroma=__webpack_require__("../../node_modules/chroma-js/chroma.js"),chroma_default=__webpack_require__.n(chroma),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),Typography=__webpack_require__("./src/components/display/Typography/index.tsx");const Layout=styled_components_browser_esm.ZP.div`
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
`,Label=(0,styled_components_browser_esm.ZP)(Typography.Z)`
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
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ProgressSlider({className,value,max=100}){const normalizedValue=100*Math.min(value,max)/max;return(0,jsx_runtime.jsxs)(Layout,{className,children:[(0,jsx_runtime.jsx)(Label,{children:"0%"}),(0,jsx_runtime.jsx)(Bar,{children:(0,jsx_runtime.jsxs)(DotContainer,{value:normalizedValue,children:[(0,jsx_runtime.jsx)(Dot,{}),(0,jsx_runtime.jsxs)(LabelTooltip,{value:normalizedValue,children:[value,(0,jsx_runtime.jsx)("small",{children:"%"})]})]})}),(0,jsx_runtime.jsxs)(Label,{children:[max,"%"]})]})}ProgressSlider.displayName="ProgressSlider";const display_ProgressSlider=ProgressSlider;try{ProgressSlider.displayName="ProgressSlider",ProgressSlider.__docgenInfo={description:"",displayName:"ProgressSlider",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},max:{defaultValue:{value:"100"},description:"",name:"max",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ProgressSlider/index.tsx#ProgressSlider"]={docgenInfo:ProgressSlider.__docgenInfo,name:"ProgressSlider",path:"src/components/display/ProgressSlider/index.tsx#ProgressSlider"})}catch(__react_docgen_typescript_loader_error){}const Container=styled_components_browser_esm.ZP.div`
  width: 300px;
`,stories={title:"Display/ProgressSlider",component:display_ProgressSlider},Template=args=>(0,jsx_runtime.jsx)(Container,{children:(0,jsx_runtime.jsx)(display_ProgressSlider,{...args})});Template.displayName="Template";const ProgressSliderBar=Template.bind({});ProgressSliderBar.args={value:25,max:50}},"./src/components/display/Typography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>display_Typography});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),styled=__webpack_require__("./src/utils/styled.ts");const Layout=styled_components_browser_esm.ZP.h1`
  font-family: "Avenir next", "Red Hat Text", sans-serif;
  margin: 0;
  padding: 0;
  font-weight: 500;

  &.h1 {
    font-size: 22px;
    line-height: 36px;
    letter-spacing: 0.55px;
  }

  &.h2 {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.55px;
  }

  &.h3 {
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.55px;
  }

  &.h4 {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0.55px;
  }

  &.h5 {
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.55px;
  }

  &.bigNumber {
    font-size: 26px;
    line-height: 40px;
    letter-spacing: 0.55px;
  }

  &.body1 {
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.55px;
  }

  &.body2 {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0.55px;
  }

  &.buttonxl {
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1.1px;
    font-weight: 600;
  }

  &.buttonl {
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 1.1px;
    font-weight: 600;
  }

  &.buttonm {
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 1.1px;
    font-weight: 600;
  }

  &.buttonsm {
    font-size: 11px;
    line-height: 12px;
    font-weight: 600;
    letter-spacing: 1.1px;
  }

  &.inputl {
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 0.55px;
  }

  &.inputm {
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    letter-spacing: 0.55px;
  }

  &.labelm {
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.55px;
  }

  ${props=>{return`\n    color: inherit;\n\n    ${(0,styled.W)(props.color,`\n      color: ${props.theme[props.color]};    \n    `)}\n    ${(0,styled.W)(props.underline,`\n      text-decoration-color: ${props.theme[props.color]};\n      text-decoration-line: underline;\n    `)}\n    ${(0,styled.W)(props.weight,`\n      font-weight: ${weight=props.weight,"demibold"===weight?600:"medium"===weight?500:400};\n    `)}\n  `;var weight}}
`,componentByVariants={h1:"span",h2:"span",h3:"span",h4:"span",h5:"span",bigNumber:"span",body1:"span",body2:"span",buttonxl:"span",buttonl:"span",buttonm:"span",buttonsm:"span",inputl:"span",inputm:"span",labelm:"span"};var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Typography({children,variant="body1",weight,color,underline,component,className}){return(0,jsx_runtime.jsx)(Layout,{color,underline,weight,className:[variant,className],as:component??componentByVariants[variant],children})}Typography.displayName="Typography";const display_Typography=Typography;try{Typography.displayName="Typography",Typography.__docgenInfo={description:"",displayName:"Typography",props:{variant:{defaultValue:{value:"body1"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"bigNumber"'},{value:'"body1"'},{value:'"body2"'},{value:'"buttonxl"'},{value:'"buttonl"'},{value:'"buttonm"'},{value:'"buttonsm"'},{value:'"inputl"'},{value:'"inputm"'},{value:'"labelm"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"medium"'},{value:'"demibold"'},{value:'"regular"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"any"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"red"'},{value:'"yellow"'},{value:'"neutral800"'},{value:'"neutral750"'},{value:'"neutral700"'},{value:'"neutral600"'},{value:'"neutral500"'},{value:'"neutral400"'},{value:'"neutral200"'},{value:'"neutral300"'},{value:'"neutral175"'},{value:'"neutral150"'},{value:'"neutral100"'},{value:'"neutral000"'},{value:'"highlighted"'},{value:'"redGraphOrError"'},{value:'"greenGraph"'},{value:'"links"'},{value:'"almostWhite"'}]}},underline:{defaultValue:null,description:"",name:"underline",required:!1,type:{name:"boolean | undefined"}},marginRight:{defaultValue:null,description:"",name:"marginRight",required:!1,type:{name:"number | undefined"}},marginLeft:{defaultValue:null,description:"",name:"marginLeft",required:!1,type:{name:"number | undefined"}},marginTop:{defaultValue:null,description:"",name:"marginTop",required:!1,type:{name:"number | undefined"}},marginBottom:{defaultValue:null,description:"",name:"marginBottom",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Typography/index.tsx#Typography"]={docgenInfo:Typography.__docgenInfo,name:"Typography",path:"src/components/display/Typography/index.tsx#Typography"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>styledIf});const styledIf=(cond,primaryQuery,secondaryQuery)=>secondaryQuery?cond?primaryQuery:secondaryQuery:cond?primaryQuery:""}}]);
//# sourceMappingURL=components-display-ProgressSlider-stories.2be5ba06.iframe.bundle.js.map