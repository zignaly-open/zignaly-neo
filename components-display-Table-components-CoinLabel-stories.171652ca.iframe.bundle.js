"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[2049],{"./src/components/display/CoinIcon/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>display_CoinIcon});var react=__webpack_require__("../../node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const CoinSizes_Medium="medium",sizes={["small"]:32,[CoinSizes_Medium]:36,["large"]:40},Layout=styled_components_browser_esm.ZP.div`
  overflow: hidden;
  border-radius: 50%;

  ${({size})=>`\n    width: ${sizes[size]}px;\n    height: ${sizes[size]}px;\n  `}
`,Image=styled_components_browser_esm.ZP.img`
  width: 100%;
  height: 100%;
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const CoinIcon=({size=CoinSizes_Medium,name,coin,className=""})=>{const[src,setSrc]=(0,react.useState)(""),srcFallBack=`https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${sizes[size]},h_${sizes[size]},r_max/coins-binance/BTC`,onError=(0,react.useCallback)((()=>setSrc(srcFallBack)),[]);return(0,react.useEffect)((()=>{setSrc(`https://res.cloudinary.com/zignaly/image/upload/c_scale,w_${sizes[size]},h_${sizes[size]},r_max/coins-binance/${coin}`)}),[coin]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(Layout,{size,className,"data-testid":"coin-icon-view",children:(0,jsx_runtime.jsx)(Image,{src,alt:name,onError})})})},display_CoinIcon=CoinIcon;try{CoinIcon.displayName="CoinIcon",CoinIcon.__docgenInfo={description:"",displayName:"CoinIcon",props:{size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"any"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},coin:{defaultValue:null,description:"",name:"coin",required:!0,type:{name:"string"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/CoinIcon/index.tsx#CoinIcon"]={docgenInfo:CoinIcon.__docgenInfo,name:"CoinIcon",path:"src/components/display/CoinIcon/index.tsx#CoinIcon"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/Table/components/CoinLabel/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>components_CoinLabel});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),Typography=__webpack_require__("./src/components/display/Typography/index.tsx"),CoinIcon=__webpack_require__("./src/components/display/CoinIcon/index.tsx");const Layout=styled_components_browser_esm.ZP.div`
  flex-direction: row;
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`,WrapCoin=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`,Icon=(0,styled_components_browser_esm.ZP)(CoinIcon.Z)`
  display: flex;
  margin-right: 12px;
`,Name=(0,styled_components_browser_esm.ZP)(Typography.Z)`
  display: flex;
`,Coin=styled_components_browser_esm.ZP.span`
  display: flex;
  text-transform: uppercase;
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const CoinLabel=({name="TEATHER",coin="USDT"})=>(0,jsx_runtime.jsxs)(Layout,{children:[(0,jsx_runtime.jsx)(Icon,{coin,name}),(0,jsx_runtime.jsxs)(WrapCoin,{children:[(0,jsx_runtime.jsx)(Coin,{children:coin}),(0,jsx_runtime.jsx)(Name,{variant:"body2",weight:"regular",color:"neutral300",children:name})]})]});CoinLabel.displayName="CoinLabel";const components_CoinLabel=CoinLabel;try{CoinLabel.displayName="CoinLabel",CoinLabel.__docgenInfo={description:"",displayName:"CoinLabel",props:{name:{defaultValue:{value:"TEATHER"},description:"",name:"name",required:!1,type:{name:"string"}},coin:{defaultValue:{value:"USDT"},description:"",name:"coin",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Table/components/CoinLabel/index.tsx#CoinLabel"]={docgenInfo:CoinLabel.__docgenInfo,name:"CoinLabel",path:"src/components/display/Table/components/CoinLabel/index.tsx#CoinLabel"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/Table/components/CoinLabel/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BNB:()=>BNB,BTC:()=>BTC,ETH:()=>ETH,USDT:()=>USDT,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/react/index.js");var _index__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/Table/components/CoinLabel/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Display/___FIXME____Table/Components/CoinLabel",component:_index__WEBPACK_IMPORTED_MODULE_2__.Z,argTypes:{name:{control:"text",default:"Teather"},coin:{control:"text",default:"USDT"}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_index__WEBPACK_IMPORTED_MODULE_2__.Z,{...args});Template.displayName="Template";const USDT=Template.bind({});USDT.args={name:"Teather",coin:"USDT"};const BTC=Template.bind({});BTC.args={name:"Bitcoin",coin:"BTC"};const ETH=Template.bind({});ETH.args={name:"Ethereum",coin:"ETH"};const BNB=Template.bind({});BNB.args={name:"Binance Coin",coin:"BNB"}},"./src/components/display/Typography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>display_Typography});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),styled=__webpack_require__("./src/utils/styled.ts");const Layout=styled_components_browser_esm.ZP.h1`
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
//# sourceMappingURL=components-display-Table-components-CoinLabel-stories.171652ca.iframe.bundle.js.map