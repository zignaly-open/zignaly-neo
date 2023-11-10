/*! For license information please see 3048.8b9920c5.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[3048],{"../../node_modules/@mui/material/Box/Box.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Box_Box});var esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),styled_engine=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),styleFunctionSx_styleFunctionSx=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"),extendSxProp=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),useTheme=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/useTheme.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["className","component"];var ClassNameGenerator=__webpack_require__("../../node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js");const Box=function createBox(options={}){const{defaultTheme,defaultClassName="MuiBox-root",generateClassName,styleFunctionSx=styleFunctionSx_styleFunctionSx.Z}=options,BoxRoot=(0,styled_engine.ZP)("div")(styleFunctionSx);return react.forwardRef((function Box(inProps,ref){const theme=(0,useTheme.Z)(defaultTheme),_extendSxProp=(0,extendSxProp.Z)(inProps),{className,component="div"}=_extendSxProp,other=(0,objectWithoutPropertiesLoose.Z)(_extendSxProp,_excluded);return(0,jsx_runtime.jsx)(BoxRoot,(0,esm_extends.Z)({as:component,ref,className:(0,clsx_m.Z)(className,generateClassName?generateClassName(defaultClassName):defaultClassName),theme},other))}))}({defaultTheme:(0,__webpack_require__("../../node_modules/@mui/material/styles/createTheme.js").Z)(),defaultClassName:"MuiBox-root",generateClassName:ClassNameGenerator.Z.generate}),Box_Box=Box},"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),extendSxProp=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx_m.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_getThemeValue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/getThemeValue.js");const _excluded=["sx"],splitProps=props=>{const result={systemProps:{},otherProps:{}};return Object.keys(props).forEach((prop=>{_getThemeValue__WEBPACK_IMPORTED_MODULE_0__.Gc[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"../../node_modules/@mui/system/esm/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>esm_styled});var esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),styled_engine=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),createTheme=__webpack_require__("../../node_modules/@mui/system/esm/createTheme/createTheme.js"),capitalize=__webpack_require__("../../node_modules/@mui/utils/esm/capitalize.js");const _excluded=["variant"];function isEmpty(string){return 0===string.length}function propsToClassKey(props){const{variant}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded);let classKey=variant||"";return Object.keys(other).sort().forEach((key=>{classKey+="color"===key?isEmpty(classKey)?props[key]:(0,capitalize.Z)(props[key]):`${isEmpty(classKey)?key:(0,capitalize.Z)(key)}${(0,capitalize.Z)(props[key].toString())}`})),classKey}var styleFunctionSx_styleFunctionSx=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");const createStyled_excluded=["name","slot","skipVariantsResolver","skipSx","overridesResolver"],_excluded2=["theme"],_excluded3=["theme"];function createStyled_isEmpty(obj){return 0===Object.keys(obj).length}function shouldForwardProp(prop){return"ownerState"!==prop&&"theme"!==prop&&"sx"!==prop&&"as"!==prop}const systemDefaultTheme=(0,createTheme.Z)();const esm_styled=function createStyled(input={}){const{defaultTheme=systemDefaultTheme,rootShouldForwardProp=shouldForwardProp,slotShouldForwardProp=shouldForwardProp,styleFunctionSx=styleFunctionSx_styleFunctionSx.Z}=input;return(tag,inputOptions={})=>{const{name:componentName,slot:componentSlot,skipVariantsResolver:inputSkipVariantsResolver,skipSx:inputSkipSx,overridesResolver}=inputOptions,options=(0,objectWithoutPropertiesLoose.Z)(inputOptions,createStyled_excluded),skipVariantsResolver=void 0!==inputSkipVariantsResolver?inputSkipVariantsResolver:componentSlot&&"Root"!==componentSlot||!1,skipSx=inputSkipSx||!1;let shouldForwardPropOption=shouldForwardProp;"Root"===componentSlot?shouldForwardPropOption=rootShouldForwardProp:componentSlot&&(shouldForwardPropOption=slotShouldForwardProp);const defaultStyledResolver=(0,styled_engine.ZP)(tag,(0,esm_extends.Z)({shouldForwardProp:shouldForwardPropOption,label:undefined},options)),muiStyledResolver=(styleArg,...expressions)=>{const expressionsWithDefaultTheme=expressions?expressions.map((stylesArg=>"function"==typeof stylesArg&&stylesArg.__emotion_real!==stylesArg?_ref=>{let{theme:themeInput}=_ref,other=(0,objectWithoutPropertiesLoose.Z)(_ref,_excluded2);return stylesArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))}:stylesArg)):[];let transformedStyleArg=styleArg;componentName&&overridesResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme,styleOverrides=((name,theme)=>theme.components&&theme.components[name]&&theme.components[name].styleOverrides?theme.components[name].styleOverrides:null)(componentName,theme);if(styleOverrides){const resolvedStyleOverrides={};return Object.entries(styleOverrides).forEach((([slotKey,slotStyle])=>{resolvedStyleOverrides[slotKey]="function"==typeof slotStyle?slotStyle((0,esm_extends.Z)({},props,{theme})):slotStyle})),overridesResolver(props,resolvedStyleOverrides)}return null})),componentName&&!skipVariantsResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return((props,styles,theme,name)=>{var _theme$components,_theme$components$nam;const{ownerState={}}=props,variantsStyles=[],themeVariants=null==theme||null==(_theme$components=theme.components)||null==(_theme$components$nam=_theme$components[name])?void 0:_theme$components$nam.variants;return themeVariants&&themeVariants.forEach((themeVariant=>{let isMatch=!0;Object.keys(themeVariant.props).forEach((key=>{ownerState[key]!==themeVariant.props[key]&&props[key]!==themeVariant.props[key]&&(isMatch=!1)})),isMatch&&variantsStyles.push(styles[propsToClassKey(themeVariant.props)])})),variantsStyles})(props,((name,theme)=>{let variants=[];theme&&theme.components&&theme.components[name]&&theme.components[name].variants&&(variants=theme.components[name].variants);const variantsStyles={};return variants.forEach((definition=>{const key=propsToClassKey(definition.props);variantsStyles[key]=definition.style})),variantsStyles})(componentName,theme),theme,componentName)})),skipSx||expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return styleFunctionSx((0,esm_extends.Z)({},props,{theme}))}));const numOfCustomFnsApplied=expressionsWithDefaultTheme.length-expressions.length;if(Array.isArray(styleArg)&&numOfCustomFnsApplied>0){const placeholders=new Array(numOfCustomFnsApplied).fill("");transformedStyleArg=[...styleArg,...placeholders],transformedStyleArg.raw=[...styleArg.raw,...placeholders]}else"function"==typeof styleArg&&styleArg.__emotion_real!==styleArg&&(transformedStyleArg=_ref2=>{let{theme:themeInput}=_ref2,other=(0,objectWithoutPropertiesLoose.Z)(_ref2,_excluded3);return styleArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))});return defaultStyledResolver(transformedStyleArg,...expressionsWithDefaultTheme)};return defaultStyledResolver.withConfig&&(muiStyledResolver.withConfig=defaultStyledResolver.withConfig),muiStyledResolver}}()},"./node_modules/qrcode.react/lib/esm/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{tv:()=>QRCodeSVG});var qrcodegen,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),__defProp=Object.defineProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value}):obj[key]=value,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__objRest=(source,exclude)=>{var target={};for(var prop in source)__hasOwnProp.call(source,prop)&&exclude.indexOf(prop)<0&&(target[prop]=source[prop]);if(null!=source&&__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(source))exclude.indexOf(prop)<0&&__propIsEnum.call(source,prop)&&(target[prop]=source[prop]);return target};(qrcodegen2=>{const _QrCode=class{constructor(version,errorCorrectionLevel,dataCodewords,msk){if(this.version=version,this.errorCorrectionLevel=errorCorrectionLevel,this.modules=[],this.isFunction=[],version<_QrCode.MIN_VERSION||version>_QrCode.MAX_VERSION)throw new RangeError("Version value out of range");if(msk<-1||msk>7)throw new RangeError("Mask value out of range");this.size=4*version+17;let row=[];for(let i=0;i<this.size;i++)row.push(!1);for(let i=0;i<this.size;i++)this.modules.push(row.slice()),this.isFunction.push(row.slice());this.drawFunctionPatterns();const allCodewords=this.addEccAndInterleave(dataCodewords);if(this.drawCodewords(allCodewords),-1==msk){let minPenalty=1e9;for(let i=0;i<8;i++){this.applyMask(i),this.drawFormatBits(i);const penalty=this.getPenaltyScore();penalty<minPenalty&&(msk=i,minPenalty=penalty),this.applyMask(i)}}assert(0<=msk&&msk<=7),this.mask=msk,this.applyMask(msk),this.drawFormatBits(msk),this.isFunction=[]}static encodeText(text,ecl){const segs=qrcodegen2.QrSegment.makeSegments(text);return _QrCode.encodeSegments(segs,ecl)}static encodeBinary(data,ecl){const seg=qrcodegen2.QrSegment.makeBytes(data);return _QrCode.encodeSegments([seg],ecl)}static encodeSegments(segs,ecl,minVersion=1,maxVersion=40,mask=-1,boostEcl=!0){if(!(_QrCode.MIN_VERSION<=minVersion&&minVersion<=maxVersion&&maxVersion<=_QrCode.MAX_VERSION)||mask<-1||mask>7)throw new RangeError("Invalid value");let version,dataUsedBits;for(version=minVersion;;version++){const dataCapacityBits2=8*_QrCode.getNumDataCodewords(version,ecl),usedBits=QrSegment.getTotalBits(segs,version);if(usedBits<=dataCapacityBits2){dataUsedBits=usedBits;break}if(version>=maxVersion)throw new RangeError("Data too long")}for(const newEcl of[_QrCode.Ecc.MEDIUM,_QrCode.Ecc.QUARTILE,_QrCode.Ecc.HIGH])boostEcl&&dataUsedBits<=8*_QrCode.getNumDataCodewords(version,newEcl)&&(ecl=newEcl);let bb=[];for(const seg of segs){appendBits(seg.mode.modeBits,4,bb),appendBits(seg.numChars,seg.mode.numCharCountBits(version),bb);for(const b of seg.getData())bb.push(b)}assert(bb.length==dataUsedBits);const dataCapacityBits=8*_QrCode.getNumDataCodewords(version,ecl);assert(bb.length<=dataCapacityBits),appendBits(0,Math.min(4,dataCapacityBits-bb.length),bb),appendBits(0,(8-bb.length%8)%8,bb),assert(bb.length%8==0);for(let padByte=236;bb.length<dataCapacityBits;padByte^=253)appendBits(padByte,8,bb);let dataCodewords=[];for(;8*dataCodewords.length<bb.length;)dataCodewords.push(0);return bb.forEach(((b,i)=>dataCodewords[i>>>3]|=b<<7-(7&i))),new _QrCode(version,ecl,dataCodewords,mask)}getModule(x,y){return 0<=x&&x<this.size&&0<=y&&y<this.size&&this.modules[y][x]}getModules(){return this.modules}drawFunctionPatterns(){for(let i=0;i<this.size;i++)this.setFunctionModule(6,i,i%2==0),this.setFunctionModule(i,6,i%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const alignPatPos=this.getAlignmentPatternPositions(),numAlign=alignPatPos.length;for(let i=0;i<numAlign;i++)for(let j=0;j<numAlign;j++)0==i&&0==j||0==i&&j==numAlign-1||i==numAlign-1&&0==j||this.drawAlignmentPattern(alignPatPos[i],alignPatPos[j]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(mask){const data=this.errorCorrectionLevel.formatBits<<3|mask;let rem=data;for(let i=0;i<10;i++)rem=rem<<1^1335*(rem>>>9);const bits=21522^(data<<10|rem);assert(bits>>>15==0);for(let i=0;i<=5;i++)this.setFunctionModule(8,i,getBit(bits,i));this.setFunctionModule(8,7,getBit(bits,6)),this.setFunctionModule(8,8,getBit(bits,7)),this.setFunctionModule(7,8,getBit(bits,8));for(let i=9;i<15;i++)this.setFunctionModule(14-i,8,getBit(bits,i));for(let i=0;i<8;i++)this.setFunctionModule(this.size-1-i,8,getBit(bits,i));for(let i=8;i<15;i++)this.setFunctionModule(8,this.size-15+i,getBit(bits,i));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let rem=this.version;for(let i=0;i<12;i++)rem=rem<<1^7973*(rem>>>11);const bits=this.version<<12|rem;assert(bits>>>18==0);for(let i=0;i<18;i++){const color=getBit(bits,i),a=this.size-11+i%3,b=Math.floor(i/3);this.setFunctionModule(a,b,color),this.setFunctionModule(b,a,color)}}drawFinderPattern(x,y){for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const dist=Math.max(Math.abs(dx),Math.abs(dy)),xx=x+dx,yy=y+dy;0<=xx&&xx<this.size&&0<=yy&&yy<this.size&&this.setFunctionModule(xx,yy,2!=dist&&4!=dist)}}drawAlignmentPattern(x,y){for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)this.setFunctionModule(x+dx,y+dy,1!=Math.max(Math.abs(dx),Math.abs(dy)))}setFunctionModule(x,y,isDark){this.modules[y][x]=isDark,this.isFunction[y][x]=!0}addEccAndInterleave(data){const ver=this.version,ecl=this.errorCorrectionLevel;if(data.length!=_QrCode.getNumDataCodewords(ver,ecl))throw new RangeError("Invalid argument");const numBlocks=_QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver],blockEccLen=_QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver],rawCodewords=Math.floor(_QrCode.getNumRawDataModules(ver)/8),numShortBlocks=numBlocks-rawCodewords%numBlocks,shortBlockLen=Math.floor(rawCodewords/numBlocks);let blocks=[];const rsDiv=_QrCode.reedSolomonComputeDivisor(blockEccLen);for(let i=0,k=0;i<numBlocks;i++){let dat=data.slice(k,k+shortBlockLen-blockEccLen+(i<numShortBlocks?0:1));k+=dat.length;const ecc=_QrCode.reedSolomonComputeRemainder(dat,rsDiv);i<numShortBlocks&&dat.push(0),blocks.push(dat.concat(ecc))}let result=[];for(let i=0;i<blocks[0].length;i++)blocks.forEach(((block,j)=>{(i!=shortBlockLen-blockEccLen||j>=numShortBlocks)&&result.push(block[i])}));return assert(result.length==rawCodewords),result}drawCodewords(data){if(data.length!=Math.floor(_QrCode.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let i=0;for(let right=this.size-1;right>=1;right-=2){6==right&&(right=5);for(let vert=0;vert<this.size;vert++)for(let j=0;j<2;j++){const x=right-j,y=0==(right+1&2)?this.size-1-vert:vert;!this.isFunction[y][x]&&i<8*data.length&&(this.modules[y][x]=getBit(data[i>>>3],7-(7&i)),i++)}}assert(i==8*data.length)}applyMask(mask){if(mask<0||mask>7)throw new RangeError("Mask value out of range");for(let y=0;y<this.size;y++)for(let x=0;x<this.size;x++){let invert;switch(mask){case 0:invert=(x+y)%2==0;break;case 1:invert=y%2==0;break;case 2:invert=x%3==0;break;case 3:invert=(x+y)%3==0;break;case 4:invert=(Math.floor(x/3)+Math.floor(y/2))%2==0;break;case 5:invert=x*y%2+x*y%3==0;break;case 6:invert=(x*y%2+x*y%3)%2==0;break;case 7:invert=((x+y)%2+x*y%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[y][x]&&invert&&(this.modules[y][x]=!this.modules[y][x])}}getPenaltyScore(){let result=0;for(let y=0;y<this.size;y++){let runColor=!1,runX=0,runHistory=[0,0,0,0,0,0,0];for(let x=0;x<this.size;x++)this.modules[y][x]==runColor?(runX++,5==runX?result+=_QrCode.PENALTY_N1:runX>5&&result++):(this.finderPenaltyAddHistory(runX,runHistory),runColor||(result+=this.finderPenaltyCountPatterns(runHistory)*_QrCode.PENALTY_N3),runColor=this.modules[y][x],runX=1);result+=this.finderPenaltyTerminateAndCount(runColor,runX,runHistory)*_QrCode.PENALTY_N3}for(let x=0;x<this.size;x++){let runColor=!1,runY=0,runHistory=[0,0,0,0,0,0,0];for(let y=0;y<this.size;y++)this.modules[y][x]==runColor?(runY++,5==runY?result+=_QrCode.PENALTY_N1:runY>5&&result++):(this.finderPenaltyAddHistory(runY,runHistory),runColor||(result+=this.finderPenaltyCountPatterns(runHistory)*_QrCode.PENALTY_N3),runColor=this.modules[y][x],runY=1);result+=this.finderPenaltyTerminateAndCount(runColor,runY,runHistory)*_QrCode.PENALTY_N3}for(let y=0;y<this.size-1;y++)for(let x=0;x<this.size-1;x++){const color=this.modules[y][x];color==this.modules[y][x+1]&&color==this.modules[y+1][x]&&color==this.modules[y+1][x+1]&&(result+=_QrCode.PENALTY_N2)}let dark=0;for(const row of this.modules)dark=row.reduce(((sum,color)=>sum+(color?1:0)),dark);const total=this.size*this.size,k=Math.ceil(Math.abs(20*dark-10*total)/total)-1;return assert(0<=k&&k<=9),result+=k*_QrCode.PENALTY_N4,assert(0<=result&&result<=2568888),result}getAlignmentPatternPositions(){if(1==this.version)return[];{const numAlign=Math.floor(this.version/7)+2,step=32==this.version?26:2*Math.ceil((4*this.version+4)/(2*numAlign-2));let result=[6];for(let pos=this.size-7;result.length<numAlign;pos-=step)result.splice(1,0,pos);return result}}static getNumRawDataModules(ver){if(ver<_QrCode.MIN_VERSION||ver>_QrCode.MAX_VERSION)throw new RangeError("Version number out of range");let result=(16*ver+128)*ver+64;if(ver>=2){const numAlign=Math.floor(ver/7)+2;result-=(25*numAlign-10)*numAlign-55,ver>=7&&(result-=36)}return assert(208<=result&&result<=29648),result}static getNumDataCodewords(ver,ecl){return Math.floor(_QrCode.getNumRawDataModules(ver)/8)-_QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver]*_QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver]}static reedSolomonComputeDivisor(degree){if(degree<1||degree>255)throw new RangeError("Degree out of range");let result=[];for(let i=0;i<degree-1;i++)result.push(0);result.push(1);let root=1;for(let i=0;i<degree;i++){for(let j=0;j<result.length;j++)result[j]=_QrCode.reedSolomonMultiply(result[j],root),j+1<result.length&&(result[j]^=result[j+1]);root=_QrCode.reedSolomonMultiply(root,2)}return result}static reedSolomonComputeRemainder(data,divisor){let result=divisor.map((_=>0));for(const b of data){const factor=b^result.shift();result.push(0),divisor.forEach(((coef,i)=>result[i]^=_QrCode.reedSolomonMultiply(coef,factor)))}return result}static reedSolomonMultiply(x,y){if(x>>>8!=0||y>>>8!=0)throw new RangeError("Byte out of range");let z=0;for(let i=7;i>=0;i--)z=z<<1^285*(z>>>7),z^=(y>>>i&1)*x;return assert(z>>>8==0),z}finderPenaltyCountPatterns(runHistory){const n=runHistory[1];assert(n<=3*this.size);const core=n>0&&runHistory[2]==n&&runHistory[3]==3*n&&runHistory[4]==n&&runHistory[5]==n;return(core&&runHistory[0]>=4*n&&runHistory[6]>=n?1:0)+(core&&runHistory[6]>=4*n&&runHistory[0]>=n?1:0)}finderPenaltyTerminateAndCount(currentRunColor,currentRunLength,runHistory){return currentRunColor&&(this.finderPenaltyAddHistory(currentRunLength,runHistory),currentRunLength=0),currentRunLength+=this.size,this.finderPenaltyAddHistory(currentRunLength,runHistory),this.finderPenaltyCountPatterns(runHistory)}finderPenaltyAddHistory(currentRunLength,runHistory){0==runHistory[0]&&(currentRunLength+=this.size),runHistory.pop(),runHistory.unshift(currentRunLength)}};let QrCode=_QrCode;function appendBits(val,len,bb){if(len<0||len>31||val>>>len!=0)throw new RangeError("Value out of range");for(let i=len-1;i>=0;i--)bb.push(val>>>i&1)}function getBit(x,i){return 0!=(x>>>i&1)}function assert(cond){if(!cond)throw new Error("Assertion error")}QrCode.MIN_VERSION=1,QrCode.MAX_VERSION=40,QrCode.PENALTY_N1=3,QrCode.PENALTY_N2=3,QrCode.PENALTY_N3=40,QrCode.PENALTY_N4=10,QrCode.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],QrCode.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],qrcodegen2.QrCode=QrCode;const _QrSegment=class{constructor(mode,numChars,bitData){if(this.mode=mode,this.numChars=numChars,this.bitData=bitData,numChars<0)throw new RangeError("Invalid argument");this.bitData=bitData.slice()}static makeBytes(data){let bb=[];for(const b of data)appendBits(b,8,bb);return new _QrSegment(_QrSegment.Mode.BYTE,data.length,bb)}static makeNumeric(digits){if(!_QrSegment.isNumeric(digits))throw new RangeError("String contains non-numeric characters");let bb=[];for(let i=0;i<digits.length;){const n=Math.min(digits.length-i,3);appendBits(parseInt(digits.substr(i,n),10),3*n+1,bb),i+=n}return new _QrSegment(_QrSegment.Mode.NUMERIC,digits.length,bb)}static makeAlphanumeric(text){if(!_QrSegment.isAlphanumeric(text))throw new RangeError("String contains unencodable characters in alphanumeric mode");let i,bb=[];for(i=0;i+2<=text.length;i+=2){let temp=45*_QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i));temp+=_QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i+1)),appendBits(temp,11,bb)}return i<text.length&&appendBits(_QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)),6,bb),new _QrSegment(_QrSegment.Mode.ALPHANUMERIC,text.length,bb)}static makeSegments(text){return""==text?[]:_QrSegment.isNumeric(text)?[_QrSegment.makeNumeric(text)]:_QrSegment.isAlphanumeric(text)?[_QrSegment.makeAlphanumeric(text)]:[_QrSegment.makeBytes(_QrSegment.toUtf8ByteArray(text))]}static makeEci(assignVal){let bb=[];if(assignVal<0)throw new RangeError("ECI assignment value out of range");if(assignVal<128)appendBits(assignVal,8,bb);else if(assignVal<16384)appendBits(2,2,bb),appendBits(assignVal,14,bb);else{if(!(assignVal<1e6))throw new RangeError("ECI assignment value out of range");appendBits(6,3,bb),appendBits(assignVal,21,bb)}return new _QrSegment(_QrSegment.Mode.ECI,0,bb)}static isNumeric(text){return _QrSegment.NUMERIC_REGEX.test(text)}static isAlphanumeric(text){return _QrSegment.ALPHANUMERIC_REGEX.test(text)}getData(){return this.bitData.slice()}static getTotalBits(segs,version){let result=0;for(const seg of segs){const ccbits=seg.mode.numCharCountBits(version);if(seg.numChars>=1<<ccbits)return 1/0;result+=4+ccbits+seg.bitData.length}return result}static toUtf8ByteArray(str){str=encodeURI(str);let result=[];for(let i=0;i<str.length;i++)"%"!=str.charAt(i)?result.push(str.charCodeAt(i)):(result.push(parseInt(str.substr(i+1,2),16)),i+=2);return result}};let QrSegment=_QrSegment;QrSegment.NUMERIC_REGEX=/^[0-9]*$/,QrSegment.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,QrSegment.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",qrcodegen2.QrSegment=QrSegment})(qrcodegen||(qrcodegen={})),(qrcodegen2=>{let QrCode;(QrCode2=>{const _Ecc=class{constructor(ordinal,formatBits){this.ordinal=ordinal,this.formatBits=formatBits}};let Ecc=_Ecc;Ecc.LOW=new _Ecc(0,1),Ecc.MEDIUM=new _Ecc(1,0),Ecc.QUARTILE=new _Ecc(2,3),Ecc.HIGH=new _Ecc(3,2),QrCode2.Ecc=Ecc})(QrCode=qrcodegen2.QrCode||(qrcodegen2.QrCode={}))})(qrcodegen||(qrcodegen={})),(qrcodegen2=>{let QrSegment;(QrSegment2=>{const _Mode=class{constructor(modeBits,numBitsCharCount){this.modeBits=modeBits,this.numBitsCharCount=numBitsCharCount}numCharCountBits(ver){return this.numBitsCharCount[Math.floor((ver+7)/17)]}};let Mode=_Mode;Mode.NUMERIC=new _Mode(1,[10,12,14]),Mode.ALPHANUMERIC=new _Mode(2,[9,11,13]),Mode.BYTE=new _Mode(4,[8,16,16]),Mode.KANJI=new _Mode(8,[8,10,12]),Mode.ECI=new _Mode(7,[0,0,0]),QrSegment2.Mode=Mode})(QrSegment=qrcodegen2.QrSegment||(qrcodegen2.QrSegment={}))})(qrcodegen||(qrcodegen={}));var qrcodegen_default=qrcodegen,ERROR_LEVEL_MAP={L:qrcodegen_default.QrCode.Ecc.LOW,M:qrcodegen_default.QrCode.Ecc.MEDIUM,Q:qrcodegen_default.QrCode.Ecc.QUARTILE,H:qrcodegen_default.QrCode.Ecc.HIGH},DEFAULT_PROPS={size:128,level:"L",bgColor:"#FFFFFF",fgColor:"#000000",includeMargin:!1},MARGIN_SIZE=4,DEFAULT_IMG_SCALE=.1;function generatePath(modules,margin=0){const ops=[];return modules.forEach((function(row,y){let start=null;row.forEach((function(cell,x){if(!cell&&null!==start)return ops.push(`M${start+margin} ${y+margin}h${x-start}v1H${start+margin}z`),void(start=null);if(x!==row.length-1)cell&&null===start&&(start=x);else{if(!cell)return;null===start?ops.push(`M${x+margin},${y+margin} h1v1H${x+margin}z`):ops.push(`M${start+margin},${y+margin} h${x+1-start}v1H${start+margin}z`)}}))})),ops.join("")}function excavateModules(modules,excavation){return modules.slice().map(((row,y)=>y<excavation.y||y>=excavation.y+excavation.h?row:row.map(((cell,x)=>(x<excavation.x||x>=excavation.x+excavation.w)&&cell))))}function getImageSettings(props,cells){const{imageSettings,size,includeMargin}=props;if(null==imageSettings)return null;const margin=includeMargin?MARGIN_SIZE:0,numCells=cells.length+2*margin,defaultSize=Math.floor(size*DEFAULT_IMG_SCALE),scale=numCells/size,w=(imageSettings.width||defaultSize)*scale,h=(imageSettings.height||defaultSize)*scale,x=null==imageSettings.x?cells.length/2-w/2:imageSettings.x*scale,y=null==imageSettings.y?cells.length/2-h/2:imageSettings.y*scale;let excavation=null;if(imageSettings.excavate){let floorX=Math.floor(x),floorY=Math.floor(y);excavation={x:floorX,y:floorY,w:Math.ceil(w+x-floorX),h:Math.ceil(h+y-floorY)}}return{x,y,h,w,excavation}}var SUPPORTS_PATH2D=function(){try{(new Path2D).addPath(new Path2D)}catch(e){return!1}return!0}();function QRCodeCanvas(props){const _canvas=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),_image=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);function update(){const{value:value2,size:size2,level:level2,bgColor:bgColor2,fgColor:fgColor2,includeMargin:includeMargin2}=props;if(null!=_canvas.current){const canvas=_canvas.current,ctx=canvas.getContext("2d");if(!ctx)return;let cells=qrcodegen_default.QrCode.encodeText(value2,ERROR_LEVEL_MAP[level2]).getModules();const margin=includeMargin2?MARGIN_SIZE:0,numCells=cells.length+2*margin,calculatedImageSettings=getImageSettings(props,cells),image=_image.current,haveImageToRender=null!=calculatedImageSettings&&null!==image&&image.complete&&0!==image.naturalHeight&&0!==image.naturalWidth;haveImageToRender&&null!=calculatedImageSettings.excavation&&(cells=excavateModules(cells,calculatedImageSettings.excavation));const pixelRatio=window.devicePixelRatio||1;canvas.height=canvas.width=size2*pixelRatio;const scale=size2/numCells*pixelRatio;ctx.scale(scale,scale),ctx.fillStyle=bgColor2,ctx.fillRect(0,0,numCells,numCells),ctx.fillStyle=fgColor2,SUPPORTS_PATH2D?ctx.fill(new Path2D(generatePath(cells,margin))):cells.forEach((function(row,rdx){row.forEach((function(cell,cdx){cell&&ctx.fillRect(cdx+margin,rdx+margin,1,1)}))})),haveImageToRender&&ctx.drawImage(image,calculatedImageSettings.x+margin,calculatedImageSettings.y+margin,calculatedImageSettings.w,calculatedImageSettings.h)}}(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{update()}));const _a=props,{value,size,level,bgColor,fgColor,style,includeMargin,imageSettings}=_a,otherProps=__objRest(_a,["value","size","level","bgColor","fgColor","style","includeMargin","imageSettings"]),canvasStyle=__spreadValues({height:size,width:size},style);let img=null,imgSrc=null==imageSettings?void 0:imageSettings.src;return null!=imgSrc&&(img=react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{src:imgSrc,key:imgSrc,style:{display:"none"},onLoad:()=>{update()},ref:_image})),react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0__.createElement("canvas",__spreadValues({style:canvasStyle,height:size,width:size,ref:_canvas},otherProps)),img)}function QRCodeSVG(props){const _a=props,{value,size,level,bgColor,fgColor,includeMargin,imageSettings}=_a,otherProps=__objRest(_a,["value","size","level","bgColor","fgColor","includeMargin","imageSettings"]);let cells=qrcodegen_default.QrCode.encodeText(value,ERROR_LEVEL_MAP[level]).getModules();const margin=includeMargin?MARGIN_SIZE:0,numCells=cells.length+2*margin,calculatedImageSettings=getImageSettings(props,cells);let image=null;null!=imageSettings&&null!=calculatedImageSettings&&(null!=calculatedImageSettings.excavation&&(cells=excavateModules(cells,calculatedImageSettings.excavation)),image=react__WEBPACK_IMPORTED_MODULE_0__.createElement("image",{xlinkHref:imageSettings.src,height:calculatedImageSettings.h,width:calculatedImageSettings.w,x:calculatedImageSettings.x+margin,y:calculatedImageSettings.y+margin,preserveAspectRatio:"none"}));const fgPath=generatePath(cells,margin);return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",__spreadValues({shapeRendering:"crispEdges",height:size,width:size,viewBox:`0 0 ${numCells} ${numCells}`},otherProps),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:bgColor,d:`M0,0 h${numCells}v${numCells}H0z`}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{fill:fgColor,d:fgPath}),image)}QRCodeCanvas.defaultProps=DEFAULT_PROPS,QRCodeSVG.defaultProps=DEFAULT_PROPS;__spreadValues({renderAs:"canvas"},DEFAULT_PROPS)}}]);