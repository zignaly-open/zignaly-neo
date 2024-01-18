(()=>{"use strict";var deferred,leafPrototypes,getProto,inProgress,__webpack_modules__={},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={id:moduleId,loaded:!1,exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}__webpack_require__.m=__webpack_modules__,__webpack_require__.amdO={},deferred=[],__webpack_require__.O=(result,chunkIds,fn,priority)=>{if(!chunkIds){var notFulfilled=1/0;for(i=0;i<deferred.length;i++){for(var[chunkIds,fn,priority]=deferred[i],fulfilled=!0,j=0;j<chunkIds.length;j++)(!1&priority||notFulfilled>=priority)&&Object.keys(__webpack_require__.O).every((key=>__webpack_require__.O[key](chunkIds[j])))?chunkIds.splice(j--,1):(fulfilled=!1,priority<notFulfilled&&(notFulfilled=priority));if(fulfilled){deferred.splice(i--,1);var r=fn();void 0!==r&&(result=r)}}return result}priority=priority||0;for(var i=deferred.length;i>0&&deferred[i-1][2]>priority;i--)deferred[i]=deferred[i-1];deferred[i]=[chunkIds,fn,priority]},__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},getProto=Object.getPrototypeOf?obj=>Object.getPrototypeOf(obj):obj=>obj.__proto__,__webpack_require__.t=function(value,mode){if(1&mode&&(value=this(value)),8&mode)return value;if("object"==typeof value&&value){if(4&mode&&value.__esModule)return value;if(16&mode&&"function"==typeof value.then)return value}var ns=Object.create(null);__webpack_require__.r(ns);var def={};leafPrototypes=leafPrototypes||[null,getProto({}),getProto([]),getProto(getProto)];for(var current=2&mode&&value;"object"==typeof current&&!~leafPrototypes.indexOf(current);current=getProto(current))Object.getOwnPropertyNames(current).forEach((key=>def[key]=()=>value[key]));return def.default=()=>value,__webpack_require__.d(ns,def),ns},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.f={},__webpack_require__.e=chunkId=>Promise.all(Object.keys(__webpack_require__.f).reduce(((promises,key)=>(__webpack_require__.f[key](chunkId,promises),promises)),[])),__webpack_require__.u=chunkId=>(({536:"components-display-ZigTable-stories",1244:"components-inputs-ZigAutocomplete-stories",1634:"components-inputs-ZigButtonGroupInput-stories",1715:"docs-Introduction-mdx",1790:"components-display-ZScoreRing-stories",1835:"components-display-ZScoreBar-stories",1940:"components-navigation-ZigTabs-stories",2222:"components-display-ZigTable-components-CoinLabel-stories",2605:"components-display-ZigCoinIcon-stories",2664:"components-display-ZigTypography-stories",2910:"components-inputs-InputCode-stories",3026:"components-display-ZScore-stories",3229:"components-display-ZigChart-ZigChart-stories",3329:"components-display-ZigTable-components-DateLabel-stories",3523:"components-display-ZigCopyText-stories",3564:"components-display-Toaster-stories",3630:"components-display-ZigTable-components-ChangeIndicator-stories",3882:"components-display-ZigRisk-stories",3950:"components-display-ZigProgressBar-stories",4499:"components-inputs-ZigButton-stories",4630:"components-inputs-ZigSwitch-stories",5453:"components-navigation-MenuDropDown-stories",6090:"components-navigation-Header-components-BrandImage-stories",6141:"components-display-ZigAlertMessage-stories",6572:"components-display-Avatar-stories",6618:"components-display-ZigChart-ZigChartMini-stories",6859:"components-filters-ZigFilters-stories",6877:"components-inputs-ZigLink-stories",6947:"components-inputs-ZigInput-stories",7068:"components-inputs-ZigCheckBox-stories",7113:"components-display-ZigPriceLabel-stories",7554:"components-inputs-ZigInputAmount-stories",8369:"components-inputs-ZigSliderInput-stories",8402:"components-navigation-Header-stories",8405:"components-display-ZigDropdown-stories",8426:"components-display-Loader-stories",8598:"components-display-ZigQrCode-stories",8691:"components-inputs-InputAmountAdvanced-stories",9379:"components-inputs-ZigSelect-stories",9454:"docs-Palette-mdx",9818:"components-inputs-ZigSlider-stories",9951:"components-filters-ZigSearch-stories"}[chunkId]||chunkId)+"."+{41:"059fb021",379:"2a7d1931",536:"23058f6f",925:"b0cf8a71",1010:"53c70fb7",1040:"7d587a56",1244:"8f61c2f0",1526:"42c06b4b",1634:"8a7d860f",1715:"4b7912e8",1790:"0a486496",1835:"a408aa2e",1940:"8b26af6a",2222:"46296f50",2422:"03cdbf3e",2605:"5e3308a8",2664:"a7fa98ac",2910:"a3439181",3026:"595953f3",3229:"7f486360",3294:"fa7e4f65",3329:"8c77c438",3523:"e423eb43",3564:"130812f5",3630:"da4ece0b",3748:"c3032d3a",3771:"a6481006",3882:"755fcf1d",3950:"6625f332",4085:"6e88ffa7",4186:"a36b7d53",4499:"d3c7a3d4",4630:"cb3fc4a9",4708:"81d7a0cd",4769:"4b77c2f0",4976:"6ba1c8ca",5453:"83ae7bed",5991:"49286ba9",6090:"aa24b5db",6141:"9f3df53f",6145:"7d906756",6462:"eb72c7ac",6517:"d5edd907",6538:"628145b6",6572:"d7ddb2ce",6609:"ae1f73e7",6618:"e059a4d2",6859:"22af187e",6877:"c2fddc35",6947:"276d7b65",7021:"5887c36d",7068:"bbbe18a4",7113:"eb3b82f8",7286:"b4f00178",7479:"4c928024",7554:"60bb837f",7717:"bf40ab1e",7788:"f74ccaf5",8001:"7bb1e2b1",8020:"633fe740",8093:"795fa96b",8369:"704f0be3",8402:"4d1e48e7",8405:"93225c59",8426:"876a2996",8598:"f32ac14a",8691:"e876411f",8773:"1a2f09a6",8821:"7b9b500f",9100:"2c364690",9192:"f2be91c8",9379:"0b8b102a",9454:"cc61ceae",9462:"eab598c5",9666:"51516ce4",9818:"7b048061",9951:"63835614"}[chunkId]+".iframe.bundle.js"),__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.hmd=module=>((module=Object.create(module)).children||(module.children=[]),Object.defineProperty(module,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+module.id)}}),module),__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),inProgress={},__webpack_require__.l=(url,done,key,chunkId)=>{if(inProgress[url])inProgress[url].push(done);else{var script,needAttach;if(void 0!==key)for(var scripts=document.getElementsByTagName("script"),i=0;i<scripts.length;i++){var s=scripts[i];if(s.getAttribute("src")==url||s.getAttribute("data-webpack")=="@zignaly-open/ui:"+key){script=s;break}}script||(needAttach=!0,(script=document.createElement("script")).charset="utf-8",script.timeout=120,__webpack_require__.nc&&script.setAttribute("nonce",__webpack_require__.nc),script.setAttribute("data-webpack","@zignaly-open/ui:"+key),script.src=url),inProgress[url]=[done];var onScriptComplete=(prev,event)=>{script.onerror=script.onload=null,clearTimeout(timeout);var doneFns=inProgress[url];if(delete inProgress[url],script.parentNode&&script.parentNode.removeChild(script),doneFns&&doneFns.forEach((fn=>fn(event))),prev)return prev(event)},timeout=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:script}),12e4);script.onerror=onScriptComplete.bind(null,script.onerror),script.onload=onScriptComplete.bind(null,script.onload),needAttach&&document.head.appendChild(script)}},__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})},__webpack_require__.nmd=module=>(module.paths=[],module.children||(module.children=[]),module),__webpack_require__.p="",(()=>{var installedChunks={1303:0};__webpack_require__.f.j=(chunkId,promises)=>{var installedChunkData=__webpack_require__.o(installedChunks,chunkId)?installedChunks[chunkId]:void 0;if(0!==installedChunkData)if(installedChunkData)promises.push(installedChunkData[2]);else if(1303!=chunkId){var promise=new Promise(((resolve,reject)=>installedChunkData=installedChunks[chunkId]=[resolve,reject]));promises.push(installedChunkData[2]=promise);var url=__webpack_require__.p+__webpack_require__.u(chunkId),error=new Error;__webpack_require__.l(url,(event=>{if(__webpack_require__.o(installedChunks,chunkId)&&(0!==(installedChunkData=installedChunks[chunkId])&&(installedChunks[chunkId]=void 0),installedChunkData)){var errorType=event&&("load"===event.type?"missing":event.type),realSrc=event&&event.target&&event.target.src;error.message="Loading chunk "+chunkId+" failed.\n("+errorType+": "+realSrc+")",error.name="ChunkLoadError",error.type=errorType,error.request=realSrc,installedChunkData[1](error)}}),"chunk-"+chunkId,chunkId)}else installedChunks[chunkId]=0},__webpack_require__.O.j=chunkId=>0===installedChunks[chunkId];var webpackJsonpCallback=(parentChunkLoadingFunction,data)=>{var moduleId,chunkId,[chunkIds,moreModules,runtime]=data,i=0;if(chunkIds.some((id=>0!==installedChunks[id]))){for(moduleId in moreModules)__webpack_require__.o(moreModules,moduleId)&&(__webpack_require__.m[moduleId]=moreModules[moduleId]);if(runtime)var result=runtime(__webpack_require__)}for(parentChunkLoadingFunction&&parentChunkLoadingFunction(data);i<chunkIds.length;i++)chunkId=chunkIds[i],__webpack_require__.o(installedChunks,chunkId)&&installedChunks[chunkId]&&installedChunks[chunkId][0](),installedChunks[chunkId]=0;return __webpack_require__.O(result)},chunkLoadingGlobal=self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[];chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null,0)),chunkLoadingGlobal.push=webpackJsonpCallback.bind(null,chunkLoadingGlobal.push.bind(chunkLoadingGlobal))})(),__webpack_require__.nc=void 0})();