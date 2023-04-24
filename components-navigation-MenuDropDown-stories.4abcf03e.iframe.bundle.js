"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[5453],{"./src/components/display/Typography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>display_Typography});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),styled=__webpack_require__("./src/utils/styled.ts");const Layout=styled_components_browser_esm.ZP.h1`
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
`,componentByVariants={h1:"span",h2:"span",h3:"span",h4:"span",h5:"span",bigNumber:"span",body1:"span",body2:"span",buttonxl:"span",buttonl:"span",buttonm:"span",buttonsm:"span",inputl:"span",inputm:"span",labelm:"span"};var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function Typography({children,variant="body1",weight,color,underline,component,className}){return(0,jsx_runtime.jsx)(Layout,{color,underline,weight,className:[variant,className],as:component??componentByVariants[variant],children})}Typography.displayName="Typography";const display_Typography=Typography;try{Typography.displayName="Typography",Typography.__docgenInfo={description:"",displayName:"Typography",props:{variant:{defaultValue:{value:"body1"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"bigNumber"'},{value:'"body1"'},{value:'"body2"'},{value:'"buttonxl"'},{value:'"buttonl"'},{value:'"buttonm"'},{value:'"buttonsm"'},{value:'"inputl"'},{value:'"inputm"'},{value:'"labelm"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"medium"'},{value:'"demibold"'},{value:'"regular"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}},component:{defaultValue:null,description:"",name:"component",required:!1,type:{name:"any"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"red"'},{value:'"yellow"'},{value:'"neutral800"'},{value:'"neutral750"'},{value:'"neutral700"'},{value:'"neutral600"'},{value:'"neutral500"'},{value:'"neutral400"'},{value:'"neutral200"'},{value:'"neutral300"'},{value:'"neutral175"'},{value:'"neutral150"'},{value:'"neutral100"'},{value:'"neutral000"'},{value:'"highlighted"'},{value:'"redGraphOrError"'},{value:'"greenGraph"'},{value:'"links"'},{value:'"almostWhite"'}]}},underline:{defaultValue:null,description:"",name:"underline",required:!1,type:{name:"boolean | undefined"}},marginRight:{defaultValue:null,description:"",name:"marginRight",required:!1,type:{name:"number | undefined"}},marginLeft:{defaultValue:null,description:"",name:"marginLeft",required:!1,type:{name:"number | undefined"}},marginTop:{defaultValue:null,description:"",name:"marginTop",required:!1,type:{name:"number | undefined"}},marginBottom:{defaultValue:null,description:"",name:"marginBottom",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Typography/index.tsx#Typography"]={docgenInfo:Typography.__docgenInfo,name:"Typography",path:"src/components/display/Typography/index.tsx#Typography"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/navigation/MenuDropDown/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),useClickAway=__webpack_require__("../../node_modules/react-use/esm/useClickAway.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js"),styled=__webpack_require__("./src/utils/styled.ts");const Layout=styled_components_browser_esm.ZP.div`
  position: relative;
`,Field=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  span {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    display: block;
  }
`,ArrowIcon=styled_components_browser_esm.ZP.div`
  transition: all 0.15s linear;
  transform-origin: center;
  width: 28px;
  height: 28px;

  svg {
    ${props=>`\n      fill: ${props.theme.neutral300};\n    `}
    width: 100%;
    height: 100%;
  }
`,Button=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  padding: 14px 28px;
  justify-content: space-between;
  user-select: none;
  height: 56px;
  cursor: pointer;

  ${({center,theme,isActiveDropDown,focused})=>`\n    background: #12152C;\n    border: 1px solid #222249;\n    \n    ${(0,styled.W)(focused,`\n      border-bottom: 1px solid ${theme.secondary};\n      \n      span {\n        color: ${theme.secondary};\n      }\n    `,`\n      span {\n        color: ${theme.neutral300};\n      }\n    `)}\n    \n    ${(0,styled.W)(isActiveDropDown,`\n      ${ArrowIcon} {\n        transform: rotate(-180deg);\n      }\n    `)}\n    \n    ${(0,styled.W)(center,`\n      ${Field} {\n        text-align: center;\n      }\n    `)}\n  `}
`,DropDown=styled_components_browser_esm.ZP.div`
  top: 100%;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  overflow: auto;

  ${props=>`\n    background: #12152C;\n    max-height: ${props.maxHeight??"200px"};\n  `}

  box-shadow: 0px 5px 11px rgba(11, 13, 26, 0.25);
  border-radius: 0 0 5px 5px;
`;var arrow_bottom_icon=__webpack_require__("./src/assets/icons/arrow-bottom-icon.svg"),Typography=__webpack_require__("./src/components/display/Typography/index.tsx");const defaultDropDownOptions={maxHeight:"120px"};var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const MenuDropDown=({title,focused=!1,secondaryTitle=null,children,dropDownOptions,id},innerRef)=>{const options={...defaultDropDownOptions,...dropDownOptions},menuRef=(0,react.useRef)(null),[isActiveDropDown,setActiveDropDown]=(0,react.useState)(!1),handleActiveDropDown=(0,react.useCallback)((()=>{setActiveDropDown((active=>!active))}),[]);return(0,useClickAway.Z)(menuRef,(()=>{setActiveDropDown(!1)})),(0,react.useImperativeHandle)(innerRef,(()=>({setIsDropDownActive:isActive=>{setActiveDropDown(isActive)}}))),(0,jsx_runtime.jsxs)(Layout,{ref:menuRef,id,children:[(0,jsx_runtime.jsxs)(Button,{focused,center:!secondaryTitle,isActiveDropDown,onClick:handleActiveDropDown,children:[(0,jsx_runtime.jsxs)(Field,{children:[secondaryTitle&&(0,jsx_runtime.jsx)(Typography.Z,{variant:"h5",children:secondaryTitle}),(0,jsx_runtime.jsx)(Typography.Z,{variant:"h3",children:title})]}),(0,jsx_runtime.jsx)(ArrowIcon,{children:(0,jsx_runtime.jsx)(arrow_bottom_icon.r,{})})]}),isActiveDropDown&&(0,jsx_runtime.jsx)(DropDown,{maxHeight:options.maxHeight,children})]})};MenuDropDown.displayName="MenuDropDown";const navigation_MenuDropDown=react.forwardRef(MenuDropDown),stories={title:"Navigation/___FIXME____MenuDropDown",component:navigation_MenuDropDown,argTypes:{title:{control:"text",defaultValue:"Title"},secondaryTitle:{control:"text",defaultValue:null},focused:{control:"boolean",defaultValue:!1}}},Template=args=>(0,jsx_runtime.jsx)(navigation_MenuDropDown,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={title:"Barry Scalping Orange Long Orange Orange",secondaryTitle:"Manage Service"}},"./src/utils/styled.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>styledIf});const styledIf=(cond,primaryQuery,secondaryQuery)=>secondaryQuery?cond?primaryQuery:secondaryQuery:cond?primaryQuery:""},"./src/assets/icons/arrow-bottom-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>SvgArrowBottomIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgArrowBottomIcon=function SvgArrowBottomIcon(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M16.293 9.29302L12 13.586L7.70701 9.29302C7.51841 9.11086 7.26581 9.01007 7.00361 9.01235C6.74141 9.01462 6.4906 9.11979 6.30519 9.3052C6.11978 9.49061 6.01461 9.74142 6.01234 10.0036C6.01006 10.2658 6.11085 10.5184 6.29301 10.707L11.293 15.707C11.4805 15.8945 11.7348 15.9998 12 15.9998C12.2652 15.9998 12.5195 15.8945 12.707 15.707L17.707 10.707C17.8025 10.6148 17.8787 10.5044 17.9311 10.3824C17.9835 10.2604 18.0111 10.1292 18.0123 9.99642C18.0134 9.86364 17.9881 9.73196 17.9378 9.60907C17.8876 9.48617 17.8133 9.37452 17.7194 9.28063C17.6255 9.18673 17.5139 9.11248 17.391 9.0622C17.2681 9.01192 17.1364 8.98662 17.0036 8.98777C16.8708 8.98892 16.7396 9.01651 16.6176 9.06892C16.4956 9.12133 16.3853 9.19751 16.293 9.29302Z",fill:props.color}))}},"../../node_modules/react-use/esm/useClickAway.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>esm_useClickAway});var react=__webpack_require__("../../node_modules/react/index.js");function on(obj){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];obj&&obj.addEventListener&&obj.addEventListener.apply(obj,args)}function off(obj){for(var args=[],_i=1;_i<arguments.length;_i++)args[_i-1]=arguments[_i];obj&&obj.removeEventListener&&obj.removeEventListener.apply(obj,args)}var defaultEvents=["mousedown","touchstart"];const esm_useClickAway=function(ref,onClickAway,events){void 0===events&&(events=defaultEvents);var savedCallback=(0,react.useRef)(onClickAway);(0,react.useEffect)((function(){savedCallback.current=onClickAway}),[onClickAway]),(0,react.useEffect)((function(){for(var handler=function(event){var el=ref.current;el&&!el.contains(event.target)&&savedCallback.current(event)},_i=0,events_1=events;_i<events_1.length;_i++){var eventName=events_1[_i];on(document,eventName,handler)}return function(){for(var _i=0,events_2=events;_i<events_2.length;_i++){var eventName=events_2[_i];off(document,eventName,handler)}}}),[events,ref])}}}]);
//# sourceMappingURL=components-navigation-MenuDropDown-stories.4abcf03e.iframe.bundle.js.map