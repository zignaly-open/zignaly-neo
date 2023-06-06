(()=>{"use strict";var deferred,leafPrototypes,getProto,inProgress,__webpack_modules__={},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={id:moduleId,loaded:!1,exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdO={},deferred=[],__webpack_require__.O=(result,chunkIds,fn,priority)=>{if(!chunkIds){var notFulfilled=1/0;for(i=0;i<deferred.length;i++){for(var[chunkIds,fn,priority]=deferred[i],fulfilled=!0,j=0;j<chunkIds.length;j++)(!1&priority||notFulfilled>=priority)&&Object.keys(__webpack_require__.O).every((key=>__webpack_require__.O[key](chunkIds[j])))?chunkIds.splice(j--,1):(fulfilled=!1,priority<notFulfilled&&(notFulfilled=priority));if(fulfilled){deferred.splice(i--,1);var r=fn();void 0!==r&&(result=r)}}return result}priority=priority||0;for(var i=deferred.length;i>0&&deferred[i-1][2]>priority;i--)deferred[i]=deferred[i-1];deferred[i]=[chunkIds,fn,priority]},__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},getProto=Object.getPrototypeOf?obj=>Object.getPrototypeOf(obj):obj=>obj.__proto__,__webpack_require__.t=function(value,mode){if(1&mode&&(value=this(value)),8&mode)return value;if("object"==typeof value&&value){if(4&mode&&value.__esModule)return value;if(16&mode&&"function"==typeof value.then)return value}var ns=Object.create(null);__webpack_require__.r(ns);var def={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var current=2&mode&&value;"object"==typeof current&&!~leafPrototypes.indexOf(current);current=getProto(current))Object.getOwnPropertyNames(current).forEach((key=>def[key]=()=>value[key]));return def.default=()=>value,__webpack_require__.d(ns,def),ns},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.f={},__webpack_require__.e=chunkId=>Promise.all(Object.keys(__webpack_require__.f).reduce(((promises,key)=>(__webpack_require__.f[key](chunkId,promises),promises)),[])),__webpack_require__.u=chunkId=>(({536:"components-display-ZigTable-stories",1244:"components-inputs-ZigAutocomplete-stories",1634:"components-inputs-ZigButtonGroupInput-stories",1715:"docs-Introduction-mdx",1940:"components-navigation-ZigTabs-stories",2222:"components-display-ZigTable-components-CoinLabel-stories",2605:"components-display-ZigCoinIcon-stories",2664:"components-display-ZigTypography-stories",2910:"components-inputs-InputCode-stories",3229:"components-display-ZigChart-ZigChart-stories",3329:"components-display-ZigTable-components-DateLabel-stories",3523:"components-display-ZigCopyText-stories",3564:"components-display-Toaster-stories",3630:"components-display-ZigTable-components-ChangeIndicator-stories",3950:"components-display-ZigProgressBar-stories",4499:"components-inputs-ZigButton-stories",5453:"components-navigation-MenuDropDown-stories",6090:"components-navigation-Header-components-BrandImage-stories",6141:"components-display-ZigAlertMessage-stories",6572:"components-display-Avatar-stories",6618:"components-display-ZigChart-ZigChartMini-stories",6877:"components-inputs-ZigLink-stories",6947:"components-inputs-ZigInput-stories",7113:"components-display-ZigPriceLabel-stories",7554:"components-inputs-ZigInputAmount-stories",8369:"components-inputs-ZigSliderInput-stories",8402:"components-navigation-Header-stories",8405:"components-display-ZigDropdown-stories",8426:"components-display-Loader-stories",8598:"components-display-ZigQrCode-stories",8691:"components-inputs-InputAmountAdvanced-stories",9379:"components-inputs-ZigSelect-stories",9454:"docs-Palette-mdx",9818:"components-inputs-ZigSlider-stories"}[chunkId]||chunkId)+"."+{379:"b50e7583",532:"be99ebfb",536:"010ce2c9",925:"b0cf8a71",1040:"7d587a56",1244:"12f11d0c",1327:"a8819664",1498:"30d57e38",1526:"42c06b4b",1634:"2dd479d4",1715:"4b7912e8",1862:"9b036641",1940:"79d85b7b",2222:"d089a0db",2492:"862fc6b6",2605:"11560055",2664:"1a3822af",2692:"eff03eec",2709:"cebbad50",2910:"654f1aac",2999:"e689ea73",3229:"f2b56a6e",3329:"7ff15324",3332:"001b19fc",3523:"3c501ee8",3564:"46729205",3630:"2fc58105",3771:"a6481006",3950:"2ce65906",4186:"a36b7d53",4499:"cf42ed79",4874:"62ce0043",5453:"7ca12a80",5769:"54386bc1",5848:"f1b9b6aa",6090:"aa24b5db",6141:"ebb2ee37",6145:"7d906756",6395:"daf465de",6538:"628145b6",6572:"0adabf4c",6618:"e770f93b",6877:"4caad6e6",6947:"7cced62d",6969:"ac190f35",7090:"aea6778c",7109:"c47aeab2",7113:"758df1db",7330:"01710e49",7554:"bc11e5d6",7717:"bf40ab1e",7761:"27b6fb93",8001:"7bb1e2b1",8224:"14927bbf",8369:"59fbde23",8402:"8601a05c",8405:"1cdd5647",8426:"a1785680",8598:"868818b9",8691:"4394fbfa",8821:"7b9b500f",9379:"e8e8c67a",9454:"6eaf31ba",9818:"2edc7d0c"}[chunkId]+".iframe.bundle.js"),__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),inProgress={},__webpack_require__.l=(url,done,key,chunkId)=>{if(inProgress[url])inProgress[url].push(done);else{var script,needAttach;if(void 0!==key)for(var scripts=document.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i];if(s.getAttribute("src")==url||s.getAttribute("data-webpack")=="@zignaly-open/ui:"+key){script=s;break}}script||(needAttach=!0,(script=document.createElement("script")).charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.setAttribute("data-webpack","@zignaly-open/ui:"+key),script.src=url),inProgress[url]=[done];var onScriptComplete=(prev,event)=>{script.onerror=script.onload=null,clearTimeout(timeout);var doneFns=inProgress[url];if(delete inProgress[url],script.parentNode&&script.parentNode.removeChild(script),doneFns&&doneFns.forEach((fn=>fn(event))),prev)return prev(event)},timeout=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:script}),12e4);script.onerror=onScriptComplete.bind(null,script.onerror),script.onload=onScriptComplete.bind(null,script.onload),needAttach&&document.head.appendChild(script)}},__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.nmd=module=>(module.paths=[],module.children||(module.children=[]),module),__webpack_require__.p="",(()=>{var installedChunks={1303:0};__webpack_require__.f.j=(chunkId,promises)=>{var installedChunkData=__webpack_require__.o(installedChunks,chunkId)?installedChunks[chunkId]:void 0;if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else if(1303!=chunkId){var promise=new Promise(((resolve,reject)=>installedChunkData=installedChunks[chunkId]=[resolve,reject]));promises.push(installedChunkData[2]=promise);var url=__webpack_require__.p+__webpack_require__.u(chunkId),error=new Error;__webpack_require__.l(url,(event=>{if(__webpack_require__.o(installedChunks,chunkId)&&(0!==(installedChunkData=installedChunks[chunkId])&&(installedChunks[chunkId]=void 0),installedChunkData)){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")",error.name="ChunkLoadError",error.type=errorType,error.request=realSrc,installedChunkData[1](error)}}),"chunk-"+chunkId,chunkId)}else installedChunks[chunkId]=0},__webpack_require__.O.j=chunkId=>0===installedChunks[chunkId];var webpackJsonpCallback=(parentChunkLoadingFunction,data)=>{var moduleId,chunkId,[chunkIds,moreModules,runtime]=data,i=0;if(chunkIds.some((id=>0!==installedChunks[id]))){for(moduleId in moreModules)__webpack_require__.o(moreModules,moduleId)&&(__webpack_require__.m[moduleId]=moreModules[moduleId]);if(runtime)var result=runtime(__webpack_require__)}for(parentChunkLoadingFunction&&parentChunkLoadingFunction(data);i<chunkIds.length;i++)chunkId=chunkIds[i],__webpack_require__.o(installedChunks,chunkId)&&installedChunks[chunkId]&&installedChunks[chunkId][0](),installedChunks[chunkId]=0;return __webpack_require__.O(result)},chunkLoadingGlobal=self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[];chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null,0)),chunkLoadingGlobal.push=webpackJsonpCallback.bind(null,chunkLoadingGlobal.push.bind(chunkLoadingGlobal))})(),__webpack_require__.nc=void 0})();