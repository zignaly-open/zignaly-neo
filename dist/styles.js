var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { createGlobalStyle } from 'styled-components';
import { NiceScrollbar } from '@zignaly-open/ui';
import { isWebpSupported } from 'react-image-webp/dist/utils';
var GlobalStyle = createGlobalStyle(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  body {\n    padding: 0;\n    margin: 0;\n    background-color: #070819;\n    background-image: url(\"/background-dark.", "\");\n    background-repeat: no-repeat;\n    background-size: cover;\n    font-family: 'Avenir Next', sans-serif;\n    font-size: 100%;\n    color: #fff;\n    overflow: overlay;\n  }\n\n  /* Use default scrollbar on Safari because it doesn't support overflow: overlay */\n  ", "\n\n  a {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  ul, li, ol {\n    padding: 0;\n    margin: 0;\n    list-style-type: none;\n  }\n\n  /** Fonts **/\n  @font-face {\n    font-family: \"Avenir Next\", sans-serif;\n    src: url(\"/fonts/AvenirNext/AvenirNextLTPro-Regular.otf\");\n    font-weight: 400;\n    font-style: normal;\n    font-display: swap;\n  }\n\n  @font-face {\n    font-family: \"Avenir Next\", sans-serif;\n    src: url(\"/fonts/AvenirNext/AvenirNextLTPro-Bold.otf\");\n    font-weight: 700;\n    font-style: normal;\n    font-display: swap;\n  }\n\n  :root {\n    --toastify-color-light: #fff;\n    --toastify-color-dark: #121212;\n    --toastify-color-info: #3498db;\n    --toastify-color-warning: #f1c40f;\n    --toastify-color-transparent: rgba(255, 255, 255, 0.7);\n    --toastify-icon-color-info: var(--toastify-color-info);\n    --toastify-icon-color-success: var(--toastify-color-success);\n    --toastify-icon-color-warning: var(--toastify-color-warning);\n    --toastify-icon-color-error: var(--toastify-color-error);\n    --toastify-toast-width: 320px;\n    --toastify-toast-background: #fff;\n    --toastify-toast-min-height: 64px;\n    --toastify-toast-max-height: 800px;\n    --toastify-font-family: \"Avenir Next\", sans-serif;\n    --toastify-z-index: 9999;\n    --toastify-text-color-light: #757575;\n    --toastify-text-color-dark: #fff;\n    --toastify-text-color-info: #fff;\n    --toastify-text-color-success: #fff;\n    --toastify-text-color-warning: #fff;\n    --toastify-text-color-error: #fff;\n    --toastify-spinner-color: #616161;\n    --toastify-spinner-color-empty-area: #e0e0e0;\n    --toastify-color-progress-light: linear-gradient(to right,\n    #4cd964,\n    #5ac8fa,\n    #007aff,\n    #34aadc,\n    #5856d6,\n    #ff2d55);\n    --toastify-color-progress-dark: #bb86fc;\n    --toastify-color-progress-info: var(--toastify-color-info);\n    --toastify-color-progress-success: var(--toastify-color-success);\n    --toastify-color-progress-warning: var(--toastify-color-warning);\n    --toastify-color-progress-error: var(--toastify-color-error);\n  }\n\n  .Toastify {\n    position: relative;\n    z-index: 100000;\n  }\n\n  .Toastify__toast-container {\n    z-index: var(--toastify-z-index);\n    -webkit-transform: translate3d(0, 0, var(--toastify-z-index) px);\n    position: fixed;\n    box-sizing: border-box;\n  }\n\n  .Toastify__toast-container--top-left {\n    top: 1em;\n    left: 1em;\n  }\n\n  .Toastify__toast-container--top-center {\n    top: 1em;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n  .Toastify__toast-container--top-right {\n    top: 4.5em;\n    right: 1em;\n  }\n\n  .Toastify__toast-container--bottom-left {\n    bottom: 1em;\n    left: 1em;\n  }\n\n  .Toastify__toast-container--bottom-center {\n    bottom: 1em;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n  .Toastify__toast-container--bottom-right {\n    bottom: 1em;\n    right: 1em;\n  }\n\n  @media only screen and (max-width: 480px) {\n    .Toastify__toast-container {\n      width: 100vw;\n      padding: 0;\n      left: 0;\n      margin: 0;\n    }\n\n    .Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right {\n      top: 0;\n      transform: translateX(0);\n    }\n\n    .Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right {\n      bottom: 0;\n      transform: translateX(0);\n    }\n\n    .Toastify__toast-container--rtl {\n      right: 0;\n      left: initial;\n    }\n  }\n\n  .Toastify__toast {\n    position: relative;\n    box-sizing: border-box;\n    margin-bottom: 1rem;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.25);\n    border-radius: 5px;\n    overflow: hidden;\n    cursor: pointer;\n    direction: ltr;\n  }\n\n  .Toastify__toast--rtl {\n    direction: rtl;\n  }\n\n  .Toastify__toast-body {\n    margin: auto 0;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .Toastify__toast-body > div:last-child {\n    -ms-flex: 1;\n    flex: 1;\n  }\n\n  .Toastify__toast-body > div:last-child > div {\n    position: relative;\n  }\n\n  .Toastify__toast-icon {\n    -webkit-margin-end: 10px;\n    margin-inline-end: 10px;\n    width: 20px;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  .Toastify--animate {\n    animation-fill-mode: both;\n    animation-duration: 0.7s;\n  }\n\n  .Toastify--animate-icon {\n    animation-fill-mode: both;\n    animation-duration: 0.3s;\n  }\n\n  @media only screen and (max-width: 480px) {\n    .Toastify__toast {\n      margin-bottom: 0;\n      border-radius: 0;\n    }\n  }\n\n  .f {\n    --y: calc(var(--len) - var(--nth));\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    transform: translate3d(0, calc(var(--y) * -40%), 0) scale(calc(1 - 0.05 * var(--y)));\n    transition: all 0.3s;\n    //min-height: 80px;\n  }\n\n  .Toastify__toast-theme--light {\n    background: var(--toastify-color-light);\n    color: var(--toastify-text-color-light);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--default {\n    background: var(--toastify-color-light);\n    color: var(--toastify-text-color-light);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--info {\n    color: var(--toastify-text-color-info);\n    background: var(--toastify-color-info);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--success {\n    color: var(--toastify-text-color-success);\n    background: var(--toastify-color-success);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--warning {\n    color: var(--toastify-text-color-warning);\n    background: var(--toastify-color-warning);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--error {\n    color: var(--toastify-text-color-error);\n    background: var(--toastify-color-error);\n  }\n\n  .Toastify__progress-bar-theme--light {\n    background: var(--toastify-color-progress-light);\n  }\n\n  .Toastify__progress-bar-theme--dark {\n    background: var(--toastify-color-progress-dark);\n  }\n\n  .Toastify__progress-bar--info {\n    background: var(--toastify-color-progress-info);\n  }\n\n  .Toastify__progress-bar--success {\n    background: var(--toastify-color-progress-success);\n  }\n\n  .Toastify__progress-bar--warning {\n    background: var(--toastify-color-progress-warning);\n  }\n\n  .Toastify__progress-bar--error {\n    background: var(--toastify-color-progress-error);\n  }\n\n  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--info, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {\n    background: var(--toastify-color-transparent);\n  }\n\n  .Toastify__close-button {\n    color: #fff;\n    background: transparent;\n    outline: none;\n    border: none;\n    padding: 0;\n    cursor: pointer;\n    opacity: 0.7;\n    transition: 0.3s ease;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n  }\n\n  .Toastify__close-button--light {\n    color: #000;\n    opacity: 0.3;\n  }\n\n  .Toastify__close-button > svg {\n    fill: currentColor;\n    height: 16px;\n    width: 14px;\n  }\n\n  .Toastify__close-button:hover, .Toastify__close-button:focus {\n    opacity: 1;\n  }\n\n  @keyframes Toastify__trackProgress {\n    0% {\n      transform: scaleX(1);\n    }\n    100% {\n      transform: scaleX(0);\n    }\n  }\n\n  .Toastify__progress-bar {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 5px;\n    z-index: var(--toastify-z-index);\n    opacity: 0.7;\n    transform-origin: left;\n  }\n\n  .Toastify__progress-bar--animated {\n    animation: Toastify__trackProgress linear 1 forwards;\n  }\n\n  .Toastify__progress-bar--controlled {\n    transition: transform 0.2s;\n  }\n\n  .Toastify__progress-bar--rtl {\n    right: 0;\n    left: initial;\n    transform-origin: right;\n  }\n\n  .Toastify__spinner {\n    width: 20px;\n    height: 20px;\n    box-sizing: border-box;\n    border: 2px solid;\n    border-radius: 100%;\n    border-color: var(--toastify-spinner-color-empty-area);\n    border-right-color: var(--toastify-spinner-color);\n    animation: Toastify__spin 0.65s linear infinite;\n  }\n\n  @keyframes Toastify__bounceInRight {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    from {\n      opacity: 0;\n      transform: translate3d(3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(-25px, 0, 0);\n    }\n    75% {\n      transform: translate3d(10px, 0, 0);\n    }\n    90% {\n      transform: translate3d(-5px, 0, 0);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  @keyframes Toastify__bounceOutRight {\n    20% {\n      opacity: 1;\n      transform: translate3d(-20px, 0, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(2000px, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceInLeft {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      transform: translate3d(-3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(25px, 0, 0);\n    }\n    75% {\n      transform: translate3d(-10px, 0, 0);\n    }\n    90% {\n      transform: translate3d(5px, 0, 0);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  @keyframes Toastify__bounceOutLeft {\n    20% {\n      opacity: 1;\n      transform: translate3d(20px, 0, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(-2000px, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceInUp {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    from {\n      opacity: 0;\n      transform: translate3d(0, 3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(0, -20px, 0);\n    }\n    75% {\n      transform: translate3d(0, 10px, 0);\n    }\n    90% {\n      transform: translate3d(0, -5px, 0);\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceOutUp {\n    20% {\n      transform: translate3d(0, -10px, 0);\n    }\n    40%, 45% {\n      opacity: 1;\n      transform: translate3d(0, 20px, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(0, -2000px, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceInDown {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      transform: translate3d(0, -3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(0, 25px, 0);\n    }\n    75% {\n      transform: translate3d(0, -10px, 0);\n    }\n    90% {\n      transform: translate3d(0, 5px, 0);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  @keyframes Toastify__bounceOutDown {\n    20% {\n      transform: translate3d(0, 10px, 0);\n    }\n    40%, 45% {\n      opacity: 1;\n      transform: translate3d(0, -20px, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(0, 2000px, 0);\n    }\n  }\n\n  .Toastify__bounce-enter--top-left, .Toastify__bounce-enter--bottom-left {\n    animation-name: Toastify__bounceInLeft;\n  }\n\n  .Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right {\n    animation-name: Toastify__bounceInRight;\n  }\n\n  .Toastify__bounce-enter--top-center {\n    animation-name: Toastify__bounceInDown;\n  }\n\n  .Toastify__bounce-enter--bottom-center {\n    animation-name: Toastify__bounceInUp;\n  }\n\n  .Toastify__bounce-exit--top-left, .Toastify__bounce-exit--bottom-left {\n    animation-name: Toastify__bounceOutLeft;\n  }\n\n  .Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right {\n    animation-name: Toastify__bounceOutRight;\n  }\n\n  .Toastify__bounce-exit--top-center {\n    animation-name: Toastify__bounceOutUp;\n  }\n\n  .Toastify__bounce-exit--bottom-center {\n    animation-name: Toastify__bounceOutDown;\n  }\n\n  @keyframes Toastify__zoomIn {\n    from {\n      opacity: 0;\n      transform: scale3d(0.3, 0.3, 0.3);\n    }\n    50% {\n      opacity: 1;\n    }\n  }\n\n  @keyframes Toastify__zoomOut {\n    from {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0;\n      transform: scale3d(0.3, 0.3, 0.3);\n    }\n    to {\n      opacity: 0;\n    }\n  }\n\n  .Toastify__zoom-enter {\n    animation-name: Toastify__zoomIn;\n  }\n\n  .Toastify__zoom-exit {\n    animation-name: Toastify__zoomOut;\n  }\n\n  @keyframes Toastify__flipIn {\n    from {\n      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n      animation-timing-function: ease-in;\n      opacity: 0;\n    }\n    40% {\n      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n      animation-timing-function: ease-in;\n    }\n    60% {\n      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n      opacity: 1;\n    }\n    80% {\n      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    }\n    to {\n      transform: perspective(400px);\n    }\n  }\n\n  @keyframes Toastify__flipOut {\n    from {\n      transform: perspective(400px);\n    }\n    30% {\n      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n      opacity: 1;\n    }\n    to {\n      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n      opacity: 0;\n    }\n  }\n\n  .Toastify__flip-enter {\n    animation-name: Toastify__flipIn;\n  }\n\n  .Toastify__flip-exit {\n    animation-name: Toastify__flipOut;\n  }\n\n  @keyframes Toastify__slideInRight {\n    from {\n      transform: translate3d(110%, 0, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideInLeft {\n    from {\n      transform: translate3d(-110%, 0, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideInUp {\n    from {\n      transform: translate3d(0, 110%, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideInDown {\n    from {\n      transform: translate3d(0, -110%, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutRight {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(110%, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutLeft {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(-110%, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutDown {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(0, 500px, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutUp {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(0, -500px, 0);\n    }\n  }\n\n  .Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left {\n    animation-name: Toastify__slideInLeft;\n  }\n\n  .Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right {\n    animation-name: Toastify__slideInRight;\n  }\n\n  .Toastify__slide-enter--top-center {\n    animation-name: Toastify__slideInDown;\n  }\n\n  .Toastify__slide-enter--bottom-center {\n    animation-name: Toastify__slideInUp;\n  }\n\n  .Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left {\n    animation-name: Toastify__slideOutLeft;\n  }\n\n  .Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right {\n    animation-name: Toastify__slideOutRight;\n  }\n\n  .Toastify__slide-exit--top-center {\n    animation-name: Toastify__slideOutUp;\n  }\n\n  .Toastify__slide-exit--bottom-center {\n    animation-name: Toastify__slideOutDown;\n  }\n\n  @keyframes Toastify__spin {\n    from {\n      transform: rotate(0deg);\n    }\n    to {\n      transform: rotate(360deg);\n    }\n  }\n"], ["\n  body {\n    padding: 0;\n    margin: 0;\n    background-color: #070819;\n    background-image: url(\"/background-dark.", "\");\n    background-repeat: no-repeat;\n    background-size: cover;\n    font-family: 'Avenir Next', sans-serif;\n    font-size: 100%;\n    color: #fff;\n    overflow: overlay;\n  }\n\n  /* Use default scrollbar on Safari because it doesn't support overflow: overlay */\n  ", "\n\n  a {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  ul, li, ol {\n    padding: 0;\n    margin: 0;\n    list-style-type: none;\n  }\n\n  /** Fonts **/\n  @font-face {\n    font-family: \"Avenir Next\", sans-serif;\n    src: url(\"/fonts/AvenirNext/AvenirNextLTPro-Regular.otf\");\n    font-weight: 400;\n    font-style: normal;\n    font-display: swap;\n  }\n\n  @font-face {\n    font-family: \"Avenir Next\", sans-serif;\n    src: url(\"/fonts/AvenirNext/AvenirNextLTPro-Bold.otf\");\n    font-weight: 700;\n    font-style: normal;\n    font-display: swap;\n  }\n\n  :root {\n    --toastify-color-light: #fff;\n    --toastify-color-dark: #121212;\n    --toastify-color-info: #3498db;\n    --toastify-color-warning: #f1c40f;\n    --toastify-color-transparent: rgba(255, 255, 255, 0.7);\n    --toastify-icon-color-info: var(--toastify-color-info);\n    --toastify-icon-color-success: var(--toastify-color-success);\n    --toastify-icon-color-warning: var(--toastify-color-warning);\n    --toastify-icon-color-error: var(--toastify-color-error);\n    --toastify-toast-width: 320px;\n    --toastify-toast-background: #fff;\n    --toastify-toast-min-height: 64px;\n    --toastify-toast-max-height: 800px;\n    --toastify-font-family: \"Avenir Next\", sans-serif;\n    --toastify-z-index: 9999;\n    --toastify-text-color-light: #757575;\n    --toastify-text-color-dark: #fff;\n    --toastify-text-color-info: #fff;\n    --toastify-text-color-success: #fff;\n    --toastify-text-color-warning: #fff;\n    --toastify-text-color-error: #fff;\n    --toastify-spinner-color: #616161;\n    --toastify-spinner-color-empty-area: #e0e0e0;\n    --toastify-color-progress-light: linear-gradient(to right,\n    #4cd964,\n    #5ac8fa,\n    #007aff,\n    #34aadc,\n    #5856d6,\n    #ff2d55);\n    --toastify-color-progress-dark: #bb86fc;\n    --toastify-color-progress-info: var(--toastify-color-info);\n    --toastify-color-progress-success: var(--toastify-color-success);\n    --toastify-color-progress-warning: var(--toastify-color-warning);\n    --toastify-color-progress-error: var(--toastify-color-error);\n  }\n\n  .Toastify {\n    position: relative;\n    z-index: 100000;\n  }\n\n  .Toastify__toast-container {\n    z-index: var(--toastify-z-index);\n    -webkit-transform: translate3d(0, 0, var(--toastify-z-index) px);\n    position: fixed;\n    box-sizing: border-box;\n  }\n\n  .Toastify__toast-container--top-left {\n    top: 1em;\n    left: 1em;\n  }\n\n  .Toastify__toast-container--top-center {\n    top: 1em;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n  .Toastify__toast-container--top-right {\n    top: 4.5em;\n    right: 1em;\n  }\n\n  .Toastify__toast-container--bottom-left {\n    bottom: 1em;\n    left: 1em;\n  }\n\n  .Toastify__toast-container--bottom-center {\n    bottom: 1em;\n    left: 50%;\n    transform: translateX(-50%);\n  }\n\n  .Toastify__toast-container--bottom-right {\n    bottom: 1em;\n    right: 1em;\n  }\n\n  @media only screen and (max-width: 480px) {\n    .Toastify__toast-container {\n      width: 100vw;\n      padding: 0;\n      left: 0;\n      margin: 0;\n    }\n\n    .Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right {\n      top: 0;\n      transform: translateX(0);\n    }\n\n    .Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right {\n      bottom: 0;\n      transform: translateX(0);\n    }\n\n    .Toastify__toast-container--rtl {\n      right: 0;\n      left: initial;\n    }\n  }\n\n  .Toastify__toast {\n    position: relative;\n    box-sizing: border-box;\n    margin-bottom: 1rem;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.25);\n    border-radius: 5px;\n    overflow: hidden;\n    cursor: pointer;\n    direction: ltr;\n  }\n\n  .Toastify__toast--rtl {\n    direction: rtl;\n  }\n\n  .Toastify__toast-body {\n    margin: auto 0;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n\n  .Toastify__toast-body > div:last-child {\n    -ms-flex: 1;\n    flex: 1;\n  }\n\n  .Toastify__toast-body > div:last-child > div {\n    position: relative;\n  }\n\n  .Toastify__toast-icon {\n    -webkit-margin-end: 10px;\n    margin-inline-end: 10px;\n    width: 20px;\n    -ms-flex-negative: 0;\n    flex-shrink: 0;\n    display: -ms-flexbox;\n    display: flex;\n  }\n\n  .Toastify--animate {\n    animation-fill-mode: both;\n    animation-duration: 0.7s;\n  }\n\n  .Toastify--animate-icon {\n    animation-fill-mode: both;\n    animation-duration: 0.3s;\n  }\n\n  @media only screen and (max-width: 480px) {\n    .Toastify__toast {\n      margin-bottom: 0;\n      border-radius: 0;\n    }\n  }\n\n  .f {\n    --y: calc(var(--len) - var(--nth));\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    transform: translate3d(0, calc(var(--y) * -40%), 0) scale(calc(1 - 0.05 * var(--y)));\n    transition: all 0.3s;\n    //min-height: 80px;\n  }\n\n  .Toastify__toast-theme--light {\n    background: var(--toastify-color-light);\n    color: var(--toastify-text-color-light);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--default {\n    background: var(--toastify-color-light);\n    color: var(--toastify-text-color-light);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--info {\n    color: var(--toastify-text-color-info);\n    background: var(--toastify-color-info);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--success {\n    color: var(--toastify-text-color-success);\n    background: var(--toastify-color-success);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--warning {\n    color: var(--toastify-text-color-warning);\n    background: var(--toastify-color-warning);\n  }\n\n  .Toastify__toast-theme--colored.Toastify__toast--error {\n    color: var(--toastify-text-color-error);\n    background: var(--toastify-color-error);\n  }\n\n  .Toastify__progress-bar-theme--light {\n    background: var(--toastify-color-progress-light);\n  }\n\n  .Toastify__progress-bar-theme--dark {\n    background: var(--toastify-color-progress-dark);\n  }\n\n  .Toastify__progress-bar--info {\n    background: var(--toastify-color-progress-info);\n  }\n\n  .Toastify__progress-bar--success {\n    background: var(--toastify-color-progress-success);\n  }\n\n  .Toastify__progress-bar--warning {\n    background: var(--toastify-color-progress-warning);\n  }\n\n  .Toastify__progress-bar--error {\n    background: var(--toastify-color-progress-error);\n  }\n\n  .Toastify__progress-bar-theme--colored.Toastify__progress-bar--info, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {\n    background: var(--toastify-color-transparent);\n  }\n\n  .Toastify__close-button {\n    color: #fff;\n    background: transparent;\n    outline: none;\n    border: none;\n    padding: 0;\n    cursor: pointer;\n    opacity: 0.7;\n    transition: 0.3s ease;\n    -ms-flex-item-align: start;\n    align-self: flex-start;\n  }\n\n  .Toastify__close-button--light {\n    color: #000;\n    opacity: 0.3;\n  }\n\n  .Toastify__close-button > svg {\n    fill: currentColor;\n    height: 16px;\n    width: 14px;\n  }\n\n  .Toastify__close-button:hover, .Toastify__close-button:focus {\n    opacity: 1;\n  }\n\n  @keyframes Toastify__trackProgress {\n    0% {\n      transform: scaleX(1);\n    }\n    100% {\n      transform: scaleX(0);\n    }\n  }\n\n  .Toastify__progress-bar {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 5px;\n    z-index: var(--toastify-z-index);\n    opacity: 0.7;\n    transform-origin: left;\n  }\n\n  .Toastify__progress-bar--animated {\n    animation: Toastify__trackProgress linear 1 forwards;\n  }\n\n  .Toastify__progress-bar--controlled {\n    transition: transform 0.2s;\n  }\n\n  .Toastify__progress-bar--rtl {\n    right: 0;\n    left: initial;\n    transform-origin: right;\n  }\n\n  .Toastify__spinner {\n    width: 20px;\n    height: 20px;\n    box-sizing: border-box;\n    border: 2px solid;\n    border-radius: 100%;\n    border-color: var(--toastify-spinner-color-empty-area);\n    border-right-color: var(--toastify-spinner-color);\n    animation: Toastify__spin 0.65s linear infinite;\n  }\n\n  @keyframes Toastify__bounceInRight {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    from {\n      opacity: 0;\n      transform: translate3d(3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(-25px, 0, 0);\n    }\n    75% {\n      transform: translate3d(10px, 0, 0);\n    }\n    90% {\n      transform: translate3d(-5px, 0, 0);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  @keyframes Toastify__bounceOutRight {\n    20% {\n      opacity: 1;\n      transform: translate3d(-20px, 0, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(2000px, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceInLeft {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      transform: translate3d(-3000px, 0, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(25px, 0, 0);\n    }\n    75% {\n      transform: translate3d(-10px, 0, 0);\n    }\n    90% {\n      transform: translate3d(5px, 0, 0);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  @keyframes Toastify__bounceOutLeft {\n    20% {\n      opacity: 1;\n      transform: translate3d(20px, 0, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(-2000px, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceInUp {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    from {\n      opacity: 0;\n      transform: translate3d(0, 3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(0, -20px, 0);\n    }\n    75% {\n      transform: translate3d(0, 10px, 0);\n    }\n    90% {\n      transform: translate3d(0, -5px, 0);\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceOutUp {\n    20% {\n      transform: translate3d(0, -10px, 0);\n    }\n    40%, 45% {\n      opacity: 1;\n      transform: translate3d(0, 20px, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(0, -2000px, 0);\n    }\n  }\n\n  @keyframes Toastify__bounceInDown {\n    from, 60%, 75%, 90%, to {\n      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    }\n    0% {\n      opacity: 0;\n      transform: translate3d(0, -3000px, 0);\n    }\n    60% {\n      opacity: 1;\n      transform: translate3d(0, 25px, 0);\n    }\n    75% {\n      transform: translate3d(0, -10px, 0);\n    }\n    90% {\n      transform: translate3d(0, 5px, 0);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  @keyframes Toastify__bounceOutDown {\n    20% {\n      transform: translate3d(0, 10px, 0);\n    }\n    40%, 45% {\n      opacity: 1;\n      transform: translate3d(0, -20px, 0);\n    }\n    to {\n      opacity: 0;\n      transform: translate3d(0, 2000px, 0);\n    }\n  }\n\n  .Toastify__bounce-enter--top-left, .Toastify__bounce-enter--bottom-left {\n    animation-name: Toastify__bounceInLeft;\n  }\n\n  .Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right {\n    animation-name: Toastify__bounceInRight;\n  }\n\n  .Toastify__bounce-enter--top-center {\n    animation-name: Toastify__bounceInDown;\n  }\n\n  .Toastify__bounce-enter--bottom-center {\n    animation-name: Toastify__bounceInUp;\n  }\n\n  .Toastify__bounce-exit--top-left, .Toastify__bounce-exit--bottom-left {\n    animation-name: Toastify__bounceOutLeft;\n  }\n\n  .Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right {\n    animation-name: Toastify__bounceOutRight;\n  }\n\n  .Toastify__bounce-exit--top-center {\n    animation-name: Toastify__bounceOutUp;\n  }\n\n  .Toastify__bounce-exit--bottom-center {\n    animation-name: Toastify__bounceOutDown;\n  }\n\n  @keyframes Toastify__zoomIn {\n    from {\n      opacity: 0;\n      transform: scale3d(0.3, 0.3, 0.3);\n    }\n    50% {\n      opacity: 1;\n    }\n  }\n\n  @keyframes Toastify__zoomOut {\n    from {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0;\n      transform: scale3d(0.3, 0.3, 0.3);\n    }\n    to {\n      opacity: 0;\n    }\n  }\n\n  .Toastify__zoom-enter {\n    animation-name: Toastify__zoomIn;\n  }\n\n  .Toastify__zoom-exit {\n    animation-name: Toastify__zoomOut;\n  }\n\n  @keyframes Toastify__flipIn {\n    from {\n      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n      animation-timing-function: ease-in;\n      opacity: 0;\n    }\n    40% {\n      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n      animation-timing-function: ease-in;\n    }\n    60% {\n      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n      opacity: 1;\n    }\n    80% {\n      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    }\n    to {\n      transform: perspective(400px);\n    }\n  }\n\n  @keyframes Toastify__flipOut {\n    from {\n      transform: perspective(400px);\n    }\n    30% {\n      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n      opacity: 1;\n    }\n    to {\n      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n      opacity: 0;\n    }\n  }\n\n  .Toastify__flip-enter {\n    animation-name: Toastify__flipIn;\n  }\n\n  .Toastify__flip-exit {\n    animation-name: Toastify__flipOut;\n  }\n\n  @keyframes Toastify__slideInRight {\n    from {\n      transform: translate3d(110%, 0, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideInLeft {\n    from {\n      transform: translate3d(-110%, 0, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideInUp {\n    from {\n      transform: translate3d(0, 110%, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideInDown {\n    from {\n      transform: translate3d(0, -110%, 0);\n      visibility: visible;\n    }\n    to {\n      transform: translate3d(0, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutRight {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(110%, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutLeft {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(-110%, 0, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutDown {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(0, 500px, 0);\n    }\n  }\n\n  @keyframes Toastify__slideOutUp {\n    from {\n      transform: translate3d(0, 0, 0);\n    }\n    to {\n      visibility: hidden;\n      transform: translate3d(0, -500px, 0);\n    }\n  }\n\n  .Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left {\n    animation-name: Toastify__slideInLeft;\n  }\n\n  .Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right {\n    animation-name: Toastify__slideInRight;\n  }\n\n  .Toastify__slide-enter--top-center {\n    animation-name: Toastify__slideInDown;\n  }\n\n  .Toastify__slide-enter--bottom-center {\n    animation-name: Toastify__slideInUp;\n  }\n\n  .Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left {\n    animation-name: Toastify__slideOutLeft;\n  }\n\n  .Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right {\n    animation-name: Toastify__slideOutRight;\n  }\n\n  .Toastify__slide-exit--top-center {\n    animation-name: Toastify__slideOutUp;\n  }\n\n  .Toastify__slide-exit--bottom-center {\n    animation-name: Toastify__slideOutDown;\n  }\n\n  @keyframes Toastify__spin {\n    from {\n      transform: rotate(0deg);\n    }\n    to {\n      transform: rotate(360deg);\n    }\n  }\n"])), isWebpSupported() ? 'webp' : 'png', !window.safari && NiceScrollbar);
export default GlobalStyle;
var templateObject_1;
//# sourceMappingURL=styles.js.map