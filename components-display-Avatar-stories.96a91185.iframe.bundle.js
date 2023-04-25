"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[6572],{"./src/components/display/Avatar/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Image:()=>stories_Image,Metamask:()=>Metamask,Sizes:()=>Sizes,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),jazzicon=__webpack_require__("../../node_modules/@metamask/jazzicon/index.js"),jazzicon_default=__webpack_require__.n(jazzicon),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");let AvatarSizes;!function(AvatarSizes){AvatarSizes.SMALL="small",AvatarSizes.MEDIUM="medium",AvatarSizes.LARGE="large",AvatarSizes.XLARGE="x-large",AvatarSizes.XXLARGE="xx-large"}(AvatarSizes||(AvatarSizes={}));const sizes={[AvatarSizes.SMALL]:20,[AvatarSizes.MEDIUM]:26,[AvatarSizes.LARGE]:36,[AvatarSizes.XLARGE]:55,[AvatarSizes.XXLARGE]:80},Layout=styled_components_browser_esm.ZP.div`
  overflow: hidden;

  &.${AvatarSizes.SMALL} {
    width: ${sizes[AvatarSizes.SMALL]}px;
    height: ${sizes[AvatarSizes.SMALL]}px;
    border-radius: ${sizes[AvatarSizes.SMALL]}px;
  }

  &.${AvatarSizes.MEDIUM} {
    width: ${sizes[AvatarSizes.MEDIUM]}px;
    height: ${sizes[AvatarSizes.MEDIUM]}px;
    border-radius: ${sizes[AvatarSizes.MEDIUM]}px;
  }

  &.${AvatarSizes.LARGE} {
    width: ${sizes[AvatarSizes.LARGE]}px;
    height: ${sizes[AvatarSizes.LARGE]}px;
    border-radius: ${sizes[AvatarSizes.LARGE]}px;
  }

  &.${AvatarSizes.XLARGE} {
    width: ${sizes[AvatarSizes.XLARGE]}px;
    height: ${sizes[AvatarSizes.XLARGE]}px;
    border-radius: ${sizes[AvatarSizes.XLARGE]}px;
  }

  &.${AvatarSizes.XXLARGE} {
    width: ${sizes[AvatarSizes.XXLARGE]}px;
    height: ${sizes[AvatarSizes.XXLARGE]}px;
    border-radius: ${sizes[AvatarSizes.XXLARGE]}px;
  }
`,Image=styled_components_browser_esm.ZP.img`
  width: 100%;
  height: 100%;
`,JazzIcon=styled_components_browser_esm.ZP.div``;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const Avatar=({size=AvatarSizes.MEDIUM,hash,image,alt,id})=>{const jazzIconRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{!image&&jazzIconRef.current&&hash&&(jazzIconRef.current.innerHTML="",jazzIconRef.current.appendChild(jazzicon_default()(sizes[size],parseInt(hash.slice(2,10),16))))}),[image,hash,size]),(0,jsx_runtime.jsx)(Layout,{className:size,"data-testid":"avatar-view",id,children:image?(0,jsx_runtime.jsx)(Image,{src:image,alt}):(0,jsx_runtime.jsx)(JazzIcon,{"data-testid":"icon-input",ref:jazzIconRef})})};Avatar.displayName="Avatar";const display_Avatar=Avatar;try{Avatar.displayName="Avatar",Avatar.__docgenInfo={description:"",displayName:"Avatar",props:{size:{defaultValue:{value:"AvatarSizes.MEDIUM"},description:"",name:"size",required:!1,type:{name:"string | number | (() => string) | (() => string) | (() => IterableIterator<string>) | ((...strings: string[]) => string) | ((start?: number | undefined, end?: number | undefined) => string) | ... 44 more ... | undefined"}},alt:{defaultValue:null,description:"",name:"alt",required:!1,type:{name:"string | undefined"}},hash:{defaultValue:null,description:"",name:"hash",required:!1,type:{name:"any"}},image:{defaultValue:null,description:"",name:"image",required:!1,type:{name:"any"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/Avatar/index.tsx#Avatar"]={docgenInfo:Avatar.__docgenInfo,name:"Avatar",path:"src/components/display/Avatar/index.tsx#Avatar"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Display/Avatar",component:display_Avatar,argTypes:{size:{control:"select",default:AvatarSizes.SMALL,options:[AvatarSizes.SMALL,AvatarSizes.MEDIUM,AvatarSizes.LARGE,AvatarSizes.XLARGE,AvatarSizes.XXLARGE]},hash:{control:"text"},image:{control:"text"}},parameters:{jest:["avatar"]}},Template=args=>(0,jsx_runtime.jsx)(display_Avatar,{...args});Template.displayName="Template";const stories_Image=Template.bind({});stories_Image.args={hash:"",size:AvatarSizes.MEDIUM,image:"https://64.media.tumblr.com/ef4e0c2294d9e304e339f19307953e7f/6c205b8b5946f8a9-7c/s250x400/9d66b8e486071ecabe8db5afdfb879a038cc79d5.png"},stories_Image.parameters={jest:["avatar"]};const Sizes=(args=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(display_Avatar,{size:"small",...args}),(0,jsx_runtime.jsx)(display_Avatar,{size:"medium",...args}),(0,jsx_runtime.jsx)(display_Avatar,{size:"large",...args}),(0,jsx_runtime.jsx)(display_Avatar,{size:"x-large",...args}),(0,jsx_runtime.jsx)(display_Avatar,{size:"xx-large",...args})]})).bind({});Sizes.args={hash:"",image:"https://64.media.tumblr.com/ef4e0c2294d9e304e339f19307953e7f/6c205b8b5946f8a9-7c/s250x400/9d66b8e486071ecabe8db5afdfb879a038cc79d5.png"};const Metamask=Template.bind({});Metamask.args={hash:"0xc3B2CFa1684dd33e8Ea8F657122f42b288d32852",size:AvatarSizes.MEDIUM,image:""},Metamask.parameters={jest:["avatar"]}}}]);
//# sourceMappingURL=components-display-Avatar-stories.96a91185.iframe.bundle.js.map