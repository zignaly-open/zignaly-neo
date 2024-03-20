"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[7477],{"./src/components/display/ZigAlertMessage/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{B:()=>ErrorMessage,Z:()=>display_ZigAlertMessage});__webpack_require__("../../node_modules/react/index.js");var styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const Layout=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`,Icon=styled_components_browser_esm.ZP.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;var error_alert_icon=__webpack_require__("./src/assets/icons/error-alert-icon.svg"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),useTheme=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");function ZigAlertMessage({text,error,warning,id,variant="body2"}){const{palette}=(0,useTheme.Z)();return(0,jsx_runtime.jsxs)(Layout,{id,children:[(0,jsx_runtime.jsx)(Icon,{children:(0,jsx_runtime.jsx)(error_alert_icon.r,{height:"24px",width:"24px",color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400})}),(0,jsx_runtime.jsx)(ZigTypography.Z,{variant,sx:{color:error?palette.redGraphOrError:warning?palette.yellow:palette.neutral400},children:text})]})}ZigAlertMessage.displayName="ZigAlertMessage";const display_ZigAlertMessage=ZigAlertMessage,ErrorMessage=({text,id,variant="body2"})=>(0,jsx_runtime.jsx)(ZigAlertMessage,{text,error:!0,id,variant});ErrorMessage.displayName="ErrorMessage";try{ZigAlertMessage.displayName="ZigAlertMessage",ZigAlertMessage.__docgenInfo={description:"",displayName:"ZigAlertMessage",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"boolean | undefined"}},warning:{defaultValue:null,description:"",name:"warning",required:!1,type:{name:"boolean | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},variant:{defaultValue:{value:"body2"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"button"'},{value:'"caption"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"subtitle1"'},{value:'"subtitle2"'},{value:'"body1"'},{value:'"body2"'},{value:'"overline"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"]={docgenInfo:ZigAlertMessage.__docgenInfo,name:"ZigAlertMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ZigAlertMessage"})}catch(__react_docgen_typescript_loader_error){}try{ErrorMessage.displayName="ErrorMessage",ErrorMessage.__docgenInfo={description:"",displayName:"ErrorMessage",props:{variant:{defaultValue:{value:"body2"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"button"'},{value:'"caption"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"subtitle1"'},{value:'"subtitle2"'},{value:'"body1"'},{value:'"body2"'},{value:'"overline"'}]}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"]={docgenInfo:ErrorMessage.__docgenInfo,name:"ErrorMessage",path:"src/components/display/ZigAlertMessage/index.tsx#ErrorMessage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/display/ZigTypography/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__("../../node_modules/@mui/material/Typography/Typography.js").Z},"./src/components/inputs/ZigSelect/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>inputs_ZigSelect});var react=__webpack_require__("../../node_modules/react/index.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),Box=__webpack_require__("../../node_modules/@mui/material/Box/Box.js"),GlobalStyles=__webpack_require__("../../node_modules/@mui/material/GlobalStyles/GlobalStyles.js"),styled_components_browser_esm=__webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");const NiceScrollbar=styled_components_browser_esm.iv`
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;styled_components_browser_esm.iv`
  :root {
    --toastify-color-light: #fff;
    --toastify-color-dark: #121212;
    --toastify-color-info: #3498db;
    --toastify-color-warning: #f1c40f;
    --toastify-color-transparent: rgba(255, 255, 255, 0.7);
    --toastify-icon-color-info: var(--toastify-color-info);
    --toastify-icon-color-success: var(--toastify-color-success);
    --toastify-icon-color-warning: var(--toastify-color-warning);
    --toastify-icon-color-error: var(--toastify-color-error);
    --toastify-toast-width: 320px;
    --toastify-toast-background: #fff;
    --toastify-toast-min-height: 64px;
    --toastify-toast-max-height: 800px;
    --toastify-font-family: "Avenir Next", sans-serif;
    --toastify-z-index: 9999;
    --toastify-text-color-light: #757575;
    --toastify-text-color-dark: #fff;
    --toastify-text-color-info: #fff;
    --toastify-text-color-success: #fff;
    --toastify-text-color-warning: #fff;
    --toastify-text-color-error: #fff;
    --toastify-spinner-color: #616161;
    --toastify-spinner-color-empty-area: #e0e0e0;
    --toastify-color-progress-light: linear-gradient(
      to right,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    );
    --toastify-color-progress-dark: #bb86fc;
    --toastify-color-progress-info: var(--toastify-color-info);
    --toastify-color-progress-success: var(--toastify-color-success);
    --toastify-color-progress-warning: var(--toastify-color-warning);
    --toastify-color-progress-error: var(--toastify-color-error);
  }

  .Toastify {
    position: relative;
    z-index: 100000;
  }

  .Toastify__toast-container {
    z-index: var(--toastify-z-index);
    -webkit-transform: translate3d(0, 0, var(--toastify-z-index) px);
    position: fixed;
    box-sizing: border-box;
  }

  .Toastify__toast-container--top-left {
    top: 1em;
    left: 1em;
  }

  .Toastify__toast-container--top-center {
    top: 1em;
    left: 50%;
    transform: translateX(-50%);
  }

  .Toastify__toast-container--top-right {
    top: 4.5em;
    right: 1em;
  }

  .Toastify__toast-container--bottom-left {
    bottom: 1em;
    left: 1em;
  }

  .Toastify__toast-container--bottom-center {
    bottom: 1em;
    left: 50%;
    transform: translateX(-50%);
  }

  .Toastify__toast-container--bottom-right {
    bottom: 1em;
    right: 1em;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0;
    }

    .Toastify__toast-container--top-left,
    .Toastify__toast-container--top-center,
    .Toastify__toast-container--top-right {
      top: 0;
      transform: translateX(0);
    }

    .Toastify__toast-container--bottom-left,
    .Toastify__toast-container--bottom-center,
    .Toastify__toast-container--bottom-right {
      bottom: 0;
      transform: translateX(0);
    }

    .Toastify__toast-container--rtl {
      right: 0;
      left: initial;
    }
  }

  .Toastify__toast {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 1rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    direction: ltr;
  }

  .Toastify__toast--rtl {
    direction: rtl;
  }

  .Toastify__toast-body {
    margin: auto 0;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
  }

  .Toastify__toast-body > div:last-child {
    -ms-flex: 1;
    flex: 1;
  }

  .Toastify__toast-body > div:last-child > div {
    position: relative;
  }

  .Toastify__toast-icon {
    -webkit-margin-end: 10px;
    margin-inline-end: 10px;
    width: 20px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    display: -ms-flexbox;
    display: flex;
  }

  .Toastify--animate {
    animation-fill-mode: both;
    animation-duration: 0.7s;
  }

  .Toastify--animate-icon {
    animation-fill-mode: both;
    animation-duration: 0.3s;
  }

  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0;
      border-radius: 0;
    }
  }

  .f {
    --y: calc(var(--len) - var(--nth));
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    transform: translate3d(0, calc(var(--y) * -40%), 0) scale(calc(1 - 0.05 * var(--y)));
    transition: all 0.3s;
    //min-height: 80px;
  }

  .Toastify__toast-theme--light {
    background: var(--toastify-color-light);
    color: var(--toastify-text-color-light);
  }

  .Toastify__toast-theme--colored.Toastify__toast--default {
    background: var(--toastify-color-light);
    color: var(--toastify-text-color-light);
  }

  .Toastify__toast-theme--colored.Toastify__toast--info {
    color: var(--toastify-text-color-info);
    background: var(--toastify-color-info);
  }

  .Toastify__toast-theme--colored.Toastify__toast--success {
    color: var(--toastify-text-color-success);
    background: var(--toastify-color-success);
  }

  .Toastify__toast-theme--colored.Toastify__toast--warning {
    color: var(--toastify-text-color-warning);
    background: var(--toastify-color-warning);
  }

  .Toastify__toast-theme--colored.Toastify__toast--error {
    color: var(--toastify-text-color-error);
    background: var(--toastify-color-error);
  }

  .Toastify__progress-bar-theme--light {
    background: var(--toastify-color-progress-light);
  }

  .Toastify__progress-bar-theme--dark {
    background: var(--toastify-color-progress-dark);
  }

  .Toastify__progress-bar--info {
    background: var(--toastify-color-progress-info);
  }

  .Toastify__progress-bar--success {
    background: var(--toastify-color-progress-success);
  }

  .Toastify__progress-bar--warning {
    background: var(--toastify-color-progress-warning);
  }

  .Toastify__progress-bar--error {
    background: var(--toastify-color-progress-error);
  }

  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
    background: var(--toastify-color-transparent);
  }

  .Toastify__close-button {
    color: #fff;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease;
    -ms-flex-item-align: start;
    align-self: flex-start;
  }

  .Toastify__close-button--light {
    color: #000;
    opacity: 0.3;
  }

  .Toastify__close-button > svg {
    fill: currentColor;
    height: 16px;
    width: 14px;
  }

  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    opacity: 1;
  }

  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }

  .Toastify__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: var(--toastify-z-index);
    opacity: 0.7;
    transform-origin: left;
  }

  .Toastify__progress-bar--animated {
    animation: Toastify__trackProgress linear 1 forwards;
  }

  .Toastify__progress-bar--controlled {
    transition: transform 0.2s;
  }

  .Toastify__progress-bar--rtl {
    right: 0;
    left: initial;
    transform-origin: right;
  }

  .Toastify__spinner {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 2px solid;
    border-radius: 100%;
    border-color: var(--toastify-spinner-color-empty-area);
    border-right-color: var(--toastify-spinner-color);
    animation: Toastify__spin 0.65s linear infinite;
  }

  @keyframes Toastify__bounceInRight {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    to {
      transform: none;
    }
  }

  @keyframes Toastify__bounceOutRight {
    20% {
      opacity: 1;
      transform: translate3d(-20px, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(2000px, 0, 0);
    }
  }

  @keyframes Toastify__bounceInLeft {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }
    75% {
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      transform: translate3d(5px, 0, 0);
    }
    to {
      transform: none;
    }
  }

  @keyframes Toastify__bounceOutLeft {
    20% {
      opacity: 1;
      transform: translate3d(20px, 0, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }
  }

  @keyframes Toastify__bounceInUp {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }
    75% {
      transform: translate3d(0, 10px, 0);
    }
    90% {
      transform: translate3d(0, -5px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes Toastify__bounceOutUp {
    20% {
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, -2000px, 0);
    }
  }

  @keyframes Toastify__bounceInDown {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(0, 25px, 0);
    }
    75% {
      transform: translate3d(0, -10px, 0);
    }
    90% {
      transform: translate3d(0, 5px, 0);
    }
    to {
      transform: none;
    }
  }

  @keyframes Toastify__bounceOutDown {
    20% {
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      transform: translate3d(0, 2000px, 0);
    }
  }

  .Toastify__bounce-enter--top-left,
  .Toastify__bounce-enter--bottom-left {
    animation-name: Toastify__bounceInLeft;
  }

  .Toastify__bounce-enter--top-right,
  .Toastify__bounce-enter--bottom-right {
    animation-name: Toastify__bounceInRight;
  }

  .Toastify__bounce-enter--top-center {
    animation-name: Toastify__bounceInDown;
  }

  .Toastify__bounce-enter--bottom-center {
    animation-name: Toastify__bounceInUp;
  }

  .Toastify__bounce-exit--top-left,
  .Toastify__bounce-exit--bottom-left {
    animation-name: Toastify__bounceOutLeft;
  }

  .Toastify__bounce-exit--top-right,
  .Toastify__bounce-exit--bottom-right {
    animation-name: Toastify__bounceOutRight;
  }

  .Toastify__bounce-exit--top-center {
    animation-name: Toastify__bounceOutUp;
  }

  .Toastify__bounce-exit--bottom-center {
    animation-name: Toastify__bounceOutDown;
  }

  @keyframes Toastify__zoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes Toastify__zoomOut {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    to {
      opacity: 0;
    }
  }

  .Toastify__zoom-enter {
    animation-name: Toastify__zoomIn;
  }

  .Toastify__zoom-exit {
    animation-name: Toastify__zoomOut;
  }

  @keyframes Toastify__flipIn {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in;
    }
    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }
    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }
    to {
      transform: perspective(400px);
    }
  }

  @keyframes Toastify__flipOut {
    from {
      transform: perspective(400px);
    }
    30% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1;
    }
    to {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0;
    }
  }

  .Toastify__flip-enter {
    animation-name: Toastify__flipIn;
  }

  .Toastify__flip-exit {
    animation-name: Toastify__flipOut;
  }

  @keyframes Toastify__slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes Toastify__slideInLeft {
    from {
      transform: translate3d(-110%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes Toastify__slideInUp {
    from {
      transform: translate3d(0, 110%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes Toastify__slideInDown {
    from {
      transform: translate3d(0, -110%, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes Toastify__slideOutRight {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(110%, 0, 0);
    }
  }

  @keyframes Toastify__slideOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(-110%, 0, 0);
    }
  }

  @keyframes Toastify__slideOutDown {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(0, 500px, 0);
    }
  }

  @keyframes Toastify__slideOutUp {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      visibility: hidden;
      transform: translate3d(0, -500px, 0);
    }
  }

  .Toastify__slide-enter--top-left,
  .Toastify__slide-enter--bottom-left {
    animation-name: Toastify__slideInLeft;
  }

  .Toastify__slide-enter--top-right,
  .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight;
  }

  .Toastify__slide-enter--top-center {
    animation-name: Toastify__slideInDown;
  }

  .Toastify__slide-enter--bottom-center {
    animation-name: Toastify__slideInUp;
  }

  .Toastify__slide-exit--top-left,
  .Toastify__slide-exit--bottom-left {
    animation-name: Toastify__slideOutLeft;
  }

  .Toastify__slide-exit--top-right,
  .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight;
  }

  .Toastify__slide-exit--top-center {
    animation-name: Toastify__slideOutUp;
  }

  .Toastify__slide-exit--bottom-center {
    animation-name: Toastify__slideOutDown;
  }

  @keyframes Toastify__spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var emotion_react_browser_esm=__webpack_require__("../../node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const StyledSelectWrapper=(0,styled.ZP)(Box.Z,{shouldForwardProp:p=>!["error","small","medium","outlined","showBorder","hoverBackground","width"].includes(p)})`
  gap: ${({medium})=>medium?"5px":"10px"};
  display: flex;
  flex-direction: column;

  .zig-react-select {
    &__control {
      border: 1px solid
        ${({theme,error})=>error?theme.palette.redGraphOrError:theme.palette.neutral600};
      ${({showBorder})=>!showBorder&&"border: none;"};
      padding: ${({small,medium})=>small?"3px 16px 3px 9px":medium?"5px 16px 4px 9px":"11px 24px 11px 16px"};
      min-height: ${({small,medium})=>small||medium?"0":"60px"};
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-wrap: nowrap;
      ${({outlined,theme})=>emotion_react_browser_esm.iv`
          background: ${outlined?"transparent":theme.palette.backgrounds.selectInputFill};
        `}
      transition: border-color 0.2s;

      ${({width})=>width&&`width: ${width}${width?.toString().includes("%")?"":"px"}`};

      padding-right: 0;

      &:hover {
        border-color: ${({theme,error})=>error?theme.palette?.redGraphOrError:theme.palette.neutral400};
        ${({outlined,hoverBackground})=>outlined&&hoverBackground&&emotion_react_browser_esm.iv`
            background-color: rgba(118, 130, 247, 0.08);
          `}
        ${({outlined,theme})=>outlined&&emotion_react_browser_esm.iv`
            .zig-react-select__single-value {
              color: ${theme.palette.neutral000} !important;
            }
          `}
      }

      &--is-focused {
        border: 1px solid
          ${({theme,error})=>error?theme.palette.redGraphOrError:theme.palette.neutral400};
        box-shadow: none !important;
        ${({showBorder})=>!showBorder&&"border: none;"};
      }
    }

    &__placeholder,
    &__single-value {
      padding: 0;
      margin-left: 0;
    }

    &__value-container {
      ${({small,medium})=>small||medium&&emotion_react_browser_esm.iv`
            padding: 0 5px;
          `}
    }

    &__placeholder,
    &__single-value,
    &__input-container,
    &__input {
      font-size: ${({small,medium})=>small?"13px":medium?"11px":"16px"};
      line-height: ${({small,medium})=>small?"15px":medium?"18px":"20px"};
      ${({small,medium})=>small||medium?emotion_react_browser_esm.iv`
              padding-bottom: 1px;
            `:""};
    }

    &__placeholder {
      white-space: nowrap;
    }

    &__single-value,
    &__input {
      ${({small})=>small?emotion_react_browser_esm.iv`
              height: 13px;
            `:""};
      color: ${({theme})=>theme.palette.neutral100} !important;
    }

    .zig-react-select__menu {
      border: 1px solid ${({theme})=>theme.palette.neutral600} !important;
      color: ${({theme})=>theme.palette.neutral200} !important;
      background: ${({theme})=>theme.palette.neutral800} !important;
    }

    &__placeholder {
      color: ${({theme})=>theme.palette.neutral400} !important;
      opacity: 0.5;
    }

    &__input-container {
      margin-left: 0;
    }

    &__indicator {
      color: ${({theme})=>theme.palette.neutral400};
      padding-top: 6px;
      ${({width})=>width&&width<=100&&emotion_react_browser_esm.iv`
          padding: 0 2px;
        `};
      ${({small,medium})=>(small||medium)&&emotion_react_browser_esm.iv`
          padding: 0 4px;
          width: 22px;
          height: 22px;
        `};
    }
  }
`,ZigSelectGlobalStyle=(0,jsx_runtime.jsx)(GlobalStyles.Z,{styles:emotion_react_browser_esm.iv`
      .zig-react-select {
        &__menu {
          &-list {
            ${NiceScrollbar.toString()};
          }
        }
      }
    `});try{StyledSelectWrapper.displayName="StyledSelectWrapper",StyledSelectWrapper.__docgenInfo={description:"",displayName:"StyledSelectWrapper",props:{error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | boolean | undefined"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"number | undefined"}},small:{defaultValue:null,description:"",name:"small",required:!1,type:{name:"boolean | undefined"}},medium:{defaultValue:null,description:"",name:"medium",required:!1,type:{name:"boolean | undefined"}},outlined:{defaultValue:null,description:"",name:"outlined",required:!1,type:{name:"boolean | undefined"}},showBorder:{defaultValue:null,description:"",name:"showBorder",required:!1,type:{name:"boolean | undefined"}},hoverBackground:{defaultValue:null,description:"",name:"hoverBackground",required:!1,type:{name:"boolean | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigSelect/styles.tsx#StyledSelectWrapper"]={docgenInfo:StyledSelectWrapper.__docgenInfo,name:"StyledSelectWrapper",path:"src/components/inputs/ZigSelect/styles.tsx#StyledSelectWrapper"})}catch(__react_docgen_typescript_loader_error){}var react_select_esm=__webpack_require__("../../node_modules/react-select/dist/react-select.esm.js"),ZigTypography=__webpack_require__("./src/components/display/ZigTypography/index.tsx"),ZigAlertMessage=__webpack_require__("./src/components/display/ZigAlertMessage/index.tsx");function ZigSelect({onChange,value,label,error,width,placeholder,options,small=!1,disabled,outlined,id,showBorder=!0,hoverBackground=!0,sx,medium=!1,styles:userStyles={},...props}){const theme=(0,styled_components_browser_esm.Fg)(),styles=(0,react.useMemo)((()=>((small,medium,theme,userStyles)=>({...userStyles,menuPortal:base=>({...base,zIndex:"1500 !important"}),menu:base=>({...base,background:`${theme.palette.neutral800} !important`,border:`1px solid ${theme.palette.neutral600} !important`,color:`${theme.palette.neutral200} !important`}),option:(base,state)=>({...base,...small?{fontSize:"13px",lineHeight:"20px"}:{},...state.isFocused?{cursor:"pointer",background:"rgba(255, 255, 255, 0.1) !important"}:{},...state.isSelected?{color:theme.palette.neutral000,background:theme.palette.contrasting+"33 !important"}:{},...userStyles.option?.(base,state)}),singleValue:(base,state)=>({...base,display:state.selectProps.menuIsOpen?"none":"block",...userStyles.singleValue?.(base,state)})}))(small,0,theme,userStyles)),[small,theme,userStyles]);return(0,jsx_runtime.jsxs)(StyledSelectWrapper,{error,width,small,medium,outlined,showBorder,hoverBackground,children:[label&&(0,jsx_runtime.jsx)(ZigTypography.Z,{sx:medium?{fontSize:"13px",lineHeight:"20px"}:{},color:"neutral200",id:id&&`${id}-label`,children:label}),(0,jsx_runtime.jsxs)(Box.Z,{sx,children:[ZigSelectGlobalStyle,(0,jsx_runtime.jsx)(react_select_esm.ZP,{id,styles,components:{IndicatorSeparator:()=>null},isOptionDisabled:option=>!!option.disabled,options,isDisabled:disabled,onChange:v=>{onChange?.(v?.value,v||null)},menuPortalTarget:document.body,placeholder:placeholder||label,value:options?.find?.((x=>x.value===value||x===value))||null,classNamePrefix:"zig-react-select",instanceId:id,...props}),!!error&&"string"==typeof error&&(0,jsx_runtime.jsx)(Box.Z,{mt:"3px",children:(0,jsx_runtime.jsx)(ZigAlertMessage.B,{text:error,id:id&&`${id}-error-text`})})]})]})}ZigSelect.displayName="ZigSelect";const inputs_ZigSelect=ZigSelect;try{ZigSelect.displayName="ZigSelect",ZigSelect.__docgenInfo={description:"",displayName:"ZigSelect",props:{showBorder:{defaultValue:{value:"true"},description:"",name:"showBorder",required:!1,type:{name:"boolean | undefined"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string | Element | undefined"}},small:{defaultValue:{value:"false"},description:"",name:"small",required:!1,type:{name:"boolean | undefined"}},medium:{defaultValue:{value:"false"},description:"",name:"medium",required:!1,type:{name:"boolean | undefined"}},outlined:{defaultValue:null,description:"",name:"outlined",required:!1,type:{name:"boolean | undefined"}},options:{defaultValue:null,description:"",name:"options",required:!1,type:{name:"ZigSelectOption<T>[] | undefined"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((value: T, option: ZigSelectOption<T> | null) => void) | undefined"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"number | undefined"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"string | boolean | undefined"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean | undefined"}},hoverBackground:{defaultValue:{value:"true"},description:"",name:"hoverBackground",required:!1,type:{name:"boolean | undefined"}},sx:{defaultValue:null,description:"",name:"sx",required:!1,type:{name:"SxProps<{}> | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/inputs/ZigSelect/index.tsx#ZigSelect"]={docgenInfo:ZigSelect.__docgenInfo,name:"ZigSelect",path:"src/components/inputs/ZigSelect/index.tsx#ZigSelect"})}catch(__react_docgen_typescript_loader_error){}},"./src/assets/icons/error-alert-icon.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>SvgErrorAlertIcon});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}var SvgErrorAlertIcon=function SvgErrorAlertIcon(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"zig-icon"},props),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M12 3C7.02979 3 3 7.03124 3 12C3 16.9717 7.02979 21 12 21C16.9702 21 21 16.9717 21 12C21 7.03124 16.9702 3 12 3ZM12 19.2581C7.98876 19.2581 4.74194 16.0126 4.74194 12C4.74194 7.9901 7.9889 4.74194 12 4.74194C16.0098 4.74194 19.2581 7.98887 19.2581 12C19.2581 16.0112 16.0126 19.2581 12 19.2581ZM13.5242 15.4839C13.5242 16.3243 12.8404 17.0081 12 17.0081C11.1596 17.0081 10.4758 16.3243 10.4758 15.4839C10.4758 14.6434 11.1596 13.9597 12 13.9597C12.8404 13.9597 13.5242 14.6434 13.5242 15.4839ZM10.5712 7.81206L10.818 12.7475C10.8296 12.9793 11.0209 13.1613 11.253 13.1613H12.747C12.9791 13.1613 13.1704 12.9793 13.182 12.7475L13.4287 7.81206C13.4412 7.56333 13.2429 7.35484 12.9938 7.35484H11.0062C10.7571 7.35484 10.5588 7.56333 10.5712 7.81206Z",fill:props.color}))}}}]);
//# sourceMappingURL=7477.578ab436.iframe.bundle.js.map