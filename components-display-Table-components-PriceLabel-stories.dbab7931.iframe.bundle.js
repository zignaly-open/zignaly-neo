"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[1317],{"./src/components/display/Table/components/PriceLabel/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>UsdPriceLabel,Z:()=>components_PriceLabel});__webpack_require__("../../node_modules/react/index.js");var react_number_format_es=__webpack_require__("../../node_modules/react-number-format/dist/react-number-format.es.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),Typography=__webpack_require__("./src/components/display/Typography/index.tsx");const Layout=styled_components_browser_esm.ZP.div`
  text-align: center;
`,Value=styled_components_browser_esm.ZP.span`
  display: flex;
  align-items: center;
  justify-content: center;
`,Coin=(0,styled_components_browser_esm.ZP)(Typography.Z)`
  margin: 0 4px;
  text-transform: uppercase;
  width: 45px;
  text-align: left;
`,BottomElementWrap=styled_components_browser_esm.ZP.div``;var util=__webpack_require__("./src/components/display/ZigPriceLabel/util.ts"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const PriceLabel=({value=0,coin="USDT",bottomElement=null,suffixElement=null,hideCoinName=!1,green,style,precision,valuePrefix,red,className})=>{const theme=(0,styled_components_browser_esm.Fg)();return(0,jsx_runtime.jsxs)(Layout,{className,children:[(0,jsx_runtime.jsxs)(Value,{children:[(0,jsx_runtime.jsx)(react_number_format_es.h3,{prefix:valuePrefix||"",value,style:{fontWeight:"500",fontSize:"15px",lineHeight:"24px",color:green?theme.greenGraph:red?theme.redGraphOrError:theme.neutral300,...style},displayType:"text",thousandSeparator:!0,decimalScale:precision||(0,util.y)(coin,value)}),!hideCoinName&&(0,jsx_runtime.jsx)(Coin,{weight:"medium",variant:"body2",color:"neutral400",children:coin}),suffixElement]}),bottomElement&&(0,jsx_runtime.jsx)(BottomElementWrap,{children:(0,jsx_runtime.jsx)(Typography.Z,{variant:"body1",children:bottomElement})})]})};PriceLabel.displayName="PriceLabel";const components_PriceLabel=PriceLabel,UsdPriceLabel=({style,value,green,red})=>(0,jsx_runtime.jsx)(PriceLabel,{value,green,red,precision:2,valuePrefix:"$",hideCoinName:!0,style,coin:""});UsdPriceLabel.displayName="UsdPriceLabel";try{PriceLabel.displayName="PriceLabel",PriceLabel.__docgenInfo={description:"",displayName:"PriceLabel",props:{value:{defaultValue:{value:"0"},description:"",name:"value",required:!1,type:{name:"string | number"}},coin:{defaultValue:{value:"USDT"},description:"",name:"coin",required:!1,type:{name:"string"}},precision:{defaultValue:null,description:"",name:"precision",required:!1,type:{name:"number | undefined"}},valuePrefix:{defaultValue:null,description:"",name:"valuePrefix",required:!1,type:{name:"string | undefined"}},hideCoinName:{defaultValue:{value:"false"},description:"",name:"hideCoinName",required:!1,type:{name:"boolean | undefined"}},green:{defaultValue:null,description:"",name:"green",required:!1,type:{name:"boolean | undefined"}},red:{defaultValue:null,description:"",name:"red",required:!1,type:{name:"boolean | undefined"}},textColor:{defaultValue:null,description:"",name:"textColor",required:!1,type:{name:"boolean | undefined"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties | undefined"}},bottomElement:{defaultValue:{value:"null"},description:"",name:"bottomElement",required:!1,type:{name:"ReactNode"}},suffixElement:{defaultValue:{value:"null"},description:"",name:"suffixElement",required:!1,type:{name:"ReactNode"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Table/components/PriceLabel/index.tsx#PriceLabel"]={docgenInfo:PriceLabel.__docgenInfo,name:"PriceLabel",path:"src/components/display/Table/components/PriceLabel/index.tsx#PriceLabel"})}catch(__react_docgen_typescript_loader_error){}try{UsdPriceLabel.displayName="UsdPriceLabel",UsdPriceLabel.__docgenInfo={description:"",displayName:"UsdPriceLabel",props:{style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties | undefined"}},textColor:{defaultValue:null,description:"",name:"textColor",required:!1,type:{name:"boolean | undefined"}},value:{defaultValue:{value:"0"},description:"",name:"value",required:!1,type:{name:"string | number"}},green:{defaultValue:null,description:"",name:"green",required:!1,type:{name:"boolean | undefined"}},red:{defaultValue:null,description:"",name:"red",required:!1,type:{name:"boolean | undefined"}},precision:{defaultValue:null,description:"",name:"precision",required:!1,type:{name:"number | undefined"}},valuePrefix:{defaultValue:null,description:"",name:"valuePrefix",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Table/components/PriceLabel/index.tsx#UsdPriceLabel"]={docgenInfo:UsdPriceLabel.__docgenInfo,name:"UsdPriceLabel",path:"src/components/display/Table/components/PriceLabel/index.tsx#UsdPriceLabel"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/Table/components/PriceLabel/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BNB:()=>BNB,BTC:()=>BTC,ETH:()=>ETH,EUR:()=>EUR,USD:()=>USD,USDT:()=>USDT,ZIG:()=>ZIG,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _index__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/Table/components/PriceLabel/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Display/___FIXME____Table/Components/PriceLabel",component:_index__WEBPACK_IMPORTED_MODULE_2__.Z,argTypes:{value:{control:"number",default:50},coin:{control:"text",default:"USDT"},fiat:{control:"boolean",default:!1},symbol:{control:"text",default:"$"}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{...args});Template.displayName="Template";const USDT=Template.bind({});USDT.args={value:50,coin:"USDT"};const BTC=Template.bind({});BTC.args={value:50,coin:"BTC"};const ETH=Template.bind({});ETH.args={value:50,coin:"ETH"};const ZIG=Template.bind({});ZIG.args={value:50,coin:"ZIG"};const BNB=Template.bind({});BNB.args={value:50,coin:"BNB"};const USD=Template.bind({});USD.args={value:50,coin:"USD"};const EUR=Template.bind({});EUR.args={value:50,coin:"EUR"}},"./src/components/display/Typography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>display_Typography});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),styled=__webpack_require__("./src/utils/styled.ts");const Layout=styled_components_browser_esm.ZP.h1`
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
`,componentByVariants={h1:"span",h2:"span",h3:"span",h4:"span",h5:"span",bigNumber:"span",body1:"span",body2:"span",buttonxl:"span",buttonl:"span",buttonm:"span",buttonsm:"span",inputl:"span",inputm:"span",labelm:"span"};var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Typography({children,variant="body1",weight,color,underline,component,className}){return(0,jsx_runtime.jsx)(Layout,{color,underline,weight,className:[variant,className],as:component??componentByVariants[variant],children})}Typography.displayName="Typography";const display_Typography=Typography;try{Typography.displayName="Typography",Typography.__docgenInfo={description:"",displayName:"Typography",props:{variant:{defaultValue:{value:"body1"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"bigNumber"'},{value:'"body1"'},{value:'"body2"'},{value:'"buttonxl"'},{value:'"buttonl"'},{value:'"buttonm"'},{value:'"buttonsm"'},{value:'"inputl"'},{value:'"inputm"'},{value:'"labelm"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"medium"'},{value:'"demibold"'},{value:'"regular"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"any"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"red"'},{value:'"yellow"'},{value:'"neutral800"'},{value:'"neutral750"'},{value:'"neutral700"'},{value:'"neutral600"'},{value:'"neutral500"'},{value:'"neutral400"'},{value:'"neutral200"'},{value:'"neutral300"'},{value:'"neutral175"'},{value:'"neutral150"'},{value:'"neutral100"'},{value:'"neutral000"'},{value:'"highlighted"'},{value:'"redGraphOrError"'},{value:'"greenGraph"'},{value:'"links"'},{value:'"almostWhite"'}]}},underline:{defaultValue:null,description:"",name:"underline",required:!1,type:{name:"boolean | undefined"}},marginRight:{defaultValue:null,description:"",name:"marginRight",required:!1,type:{name:"number | undefined"}},marginLeft:{defaultValue:null,description:"",name:"marginLeft",required:!1,type:{name:"number | undefined"}},marginTop:{defaultValue:null,description:"",name:"marginTop",required:!1,type:{name:"number | undefined"}},marginBottom:{defaultValue:null,description:"",name:"marginBottom",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Typography/index.tsx#Typography"]={docgenInfo:Typography.__docgenInfo,name:"Typography",path:"src/components/display/Typography/index.tsx#Typography"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigPriceLabel/util.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>getPrecisionForCoin,z:()=>shortenNumber});const coinPrecisions={USDT:2,USDC:2,BUSD:2,BTC:8};function getPrecisionForCoin(coin,value){if(0==+value)return 2;return coinPrecisions[coin]||8}function shortenNumber(value){const log=Math.log10(Math.abs(value));return log>=9?{value:value/Math.pow(10,9),suffix:"G",precision:log>=10?1:2}:log>=6?{value:value/Math.pow(10,6),suffix:"M",precision:log>=7?1:2}:log>=3?{value:value/Math.pow(10,3),suffix:"K",precision:log>=4?1:2}:log>-16&&log<-5?{value:value*Math.pow(10,6),suffix:"μ",precision:2}:{value,suffix:"",precision:log<-2?3:2}}},"./src/utils/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>styledIf});const styledIf=(cond,primaryQuery,secondaryQuery)=>secondaryQuery?cond?primaryQuery:secondaryQuery:cond?primaryQuery:""}}]);
//# sourceMappingURL=components-display-Table-components-PriceLabel-stories.dbab7931.iframe.bundle.js.map