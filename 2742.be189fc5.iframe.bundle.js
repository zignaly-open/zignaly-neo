"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[2742],{"../../node_modules/@mui/system/esm/styled.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>esm_styled});var esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),styled_engine=__webpack_require__("../../node_modules/@mui/styled-engine/index.js"),createTheme=__webpack_require__("../../node_modules/@mui/system/esm/createTheme/createTheme.js"),capitalize=__webpack_require__("../../node_modules/@mui/utils/esm/capitalize.js");const _excluded=["variant"];function isEmpty(string){return 0===string.length}function propsToClassKey(props){const{variant}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded);let classKey=variant||"";return Object.keys(other).sort().forEach((key=>{classKey+="color"===key?isEmpty(classKey)?props[key]:(0,capitalize.Z)(props[key]):`${isEmpty(classKey)?key:(0,capitalize.Z)(key)}${(0,capitalize.Z)(props[key].toString())}`})),classKey}var styleFunctionSx_styleFunctionSx=__webpack_require__("../../node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js");const createStyled_excluded=["name","slot","skipVariantsResolver","skipSx","overridesResolver"],_excluded2=["theme"],_excluded3=["theme"];function createStyled_isEmpty(obj){return 0===Object.keys(obj).length}function shouldForwardProp(prop){return"ownerState"!==prop&&"theme"!==prop&&"sx"!==prop&&"as"!==prop}const systemDefaultTheme=(0,createTheme.Z)();const esm_styled=function createStyled(input={}){const{defaultTheme=systemDefaultTheme,rootShouldForwardProp=shouldForwardProp,slotShouldForwardProp=shouldForwardProp,styleFunctionSx=styleFunctionSx_styleFunctionSx.Z}=input;return(tag,inputOptions={})=>{const{name:componentName,slot:componentSlot,skipVariantsResolver:inputSkipVariantsResolver,skipSx:inputSkipSx,overridesResolver}=inputOptions,options=(0,objectWithoutPropertiesLoose.Z)(inputOptions,createStyled_excluded),skipVariantsResolver=void 0!==inputSkipVariantsResolver?inputSkipVariantsResolver:componentSlot&&"Root"!==componentSlot||!1,skipSx=inputSkipSx||!1;let shouldForwardPropOption=shouldForwardProp;"Root"===componentSlot?shouldForwardPropOption=rootShouldForwardProp:componentSlot&&(shouldForwardPropOption=slotShouldForwardProp);const defaultStyledResolver=(0,styled_engine.ZP)(tag,(0,esm_extends.Z)({shouldForwardProp:shouldForwardPropOption,label:undefined},options)),muiStyledResolver=(styleArg,...expressions)=>{const expressionsWithDefaultTheme=expressions?expressions.map((stylesArg=>"function"==typeof stylesArg&&stylesArg.__emotion_real!==stylesArg?_ref=>{let{theme:themeInput}=_ref,other=(0,objectWithoutPropertiesLoose.Z)(_ref,_excluded2);return stylesArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))}:stylesArg)):[];let transformedStyleArg=styleArg;componentName&&overridesResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme,styleOverrides=((name,theme)=>theme.components&&theme.components[name]&&theme.components[name].styleOverrides?theme.components[name].styleOverrides:null)(componentName,theme);if(styleOverrides){const resolvedStyleOverrides={};return Object.entries(styleOverrides).forEach((([slotKey,slotStyle])=>{resolvedStyleOverrides[slotKey]="function"==typeof slotStyle?slotStyle((0,esm_extends.Z)({},props,{theme})):slotStyle})),overridesResolver(props,resolvedStyleOverrides)}return null})),componentName&&!skipVariantsResolver&&expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return((props,styles,theme,name)=>{var _theme$components,_theme$components$nam;const{ownerState={}}=props,variantsStyles=[],themeVariants=null==theme||null==(_theme$components=theme.components)||null==(_theme$components$nam=_theme$components[name])?void 0:_theme$components$nam.variants;return themeVariants&&themeVariants.forEach((themeVariant=>{let isMatch=!0;Object.keys(themeVariant.props).forEach((key=>{ownerState[key]!==themeVariant.props[key]&&props[key]!==themeVariant.props[key]&&(isMatch=!1)})),isMatch&&variantsStyles.push(styles[propsToClassKey(themeVariant.props)])})),variantsStyles})(props,((name,theme)=>{let variants=[];theme&&theme.components&&theme.components[name]&&theme.components[name].variants&&(variants=theme.components[name].variants);const variantsStyles={};return variants.forEach((definition=>{const key=propsToClassKey(definition.props);variantsStyles[key]=definition.style})),variantsStyles})(componentName,theme),theme,componentName)})),skipSx||expressionsWithDefaultTheme.push((props=>{const theme=createStyled_isEmpty(props.theme)?defaultTheme:props.theme;return styleFunctionSx((0,esm_extends.Z)({},props,{theme}))}));const numOfCustomFnsApplied=expressionsWithDefaultTheme.length-expressions.length;if(Array.isArray(styleArg)&&numOfCustomFnsApplied>0){const placeholders=new Array(numOfCustomFnsApplied).fill("");transformedStyleArg=[...styleArg,...placeholders],transformedStyleArg.raw=[...styleArg.raw,...placeholders]}else"function"==typeof styleArg&&styleArg.__emotion_real!==styleArg&&(transformedStyleArg=_ref2=>{let{theme:themeInput}=_ref2,other=(0,objectWithoutPropertiesLoose.Z)(_ref2,_excluded3);return styleArg((0,esm_extends.Z)({theme:createStyled_isEmpty(themeInput)?defaultTheme:themeInput},other))});return defaultStyledResolver(transformedStyleArg,...expressionsWithDefaultTheme)};return defaultStyledResolver.withConfig&&(muiStyledResolver.withConfig=defaultStyledResolver.withConfig),muiStyledResolver}}()},"../../node_modules/react-number-format/dist/react-number-format.es.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{OV:()=>format,h3:()=>NumericFormat});var SourceType,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js");function __rest(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t}function noop(){}function charIsNumber(char){return!!(char||"").match(/\d/)}function isNil(val){return null==val}function isNanValue(val){return"number"==typeof val&&isNaN(val)}function escapeRegExp(str){return str.replace(/[-[\]/{}()*+?.\\^$|]/g,"\\$&")}function splitDecimal(numStr,allowNegative){void 0===allowNegative&&(allowNegative=!0);var hasNegation="-"===numStr[0],addNegation=hasNegation&&allowNegative,parts=(numStr=numStr.replace("-","")).split(".");return{beforeDecimal:parts[0],afterDecimal:parts[1]||"",hasNegation,addNegation}}function limitToScale(numStr,scale,fixedDecimalScale){for(var str="",filler=fixedDecimalScale?"0":"",i=0;i<=scale-1;i++)str+=numStr[i]||filler;return str}function repeat(str,count){return Array(count+1).join(str)}function toNumericString(num){var _num=num+"",sign="-"===_num[0]?"-":"";sign&&(_num=_num.substring(1));var ref=_num.split(/[eE]/g),coefficient=ref[0],exponent=ref[1];if(!(exponent=Number(exponent)))return sign+coefficient;var decimalIndex=1+exponent,coffiecientLn=(coefficient=coefficient.replace(".","")).length;return decimalIndex<0?coefficient="0."+repeat("0",Math.abs(decimalIndex))+coefficient:decimalIndex>=coffiecientLn?coefficient+=repeat("0",decimalIndex-coffiecientLn):coefficient=(coefficient.substring(0,decimalIndex)||"0")+"."+coefficient.substring(decimalIndex),sign+coefficient}function roundToPrecision(numStr,scale,fixedDecimalScale){if(-1!==["","-"].indexOf(numStr))return numStr;var shouldHaveDecimalSeparator=(-1!==numStr.indexOf(".")||fixedDecimalScale)&&scale,ref=splitDecimal(numStr),beforeDecimal=ref.beforeDecimal,afterDecimal=ref.afterDecimal,hasNegation=ref.hasNegation,floatValue=parseFloat("0."+(afterDecimal||"0")),roundedDecimalParts=(afterDecimal.length<=scale?"0."+afterDecimal:floatValue.toFixed(scale)).split(".");return""+(hasNegation?"-":"")+beforeDecimal.split("").reverse().reduce((function(roundedStr,current,idx){return roundedStr.length>idx?(Number(roundedStr[0])+Number(current)).toString()+roundedStr.substring(1,roundedStr.length):current+roundedStr}),roundedDecimalParts[0])+(shouldHaveDecimalSeparator?".":"")+limitToScale(roundedDecimalParts[1]||"",scale,fixedDecimalScale)}function setCaretPosition(el,caretPos){if(el.value=el.value,null!==el){if(el.createTextRange){var range=el.createTextRange();return range.move("character",caretPos),range.select(),!0}return el.selectionStart||0===el.selectionStart?(el.focus(),el.setSelectionRange(caretPos,caretPos),!0):(el.focus(),!1)}}function geInputCaretPosition(el){return Math.max(el.selectionStart,el.selectionEnd)}function getDefaultChangeMeta(value){return{from:{start:0,end:0},to:{start:0,end:value.length},lastValue:""}}function getCaretPosInBoundary(value,caretPos,boundary,direction){var valLn=value.length;if(caretPos=function clamp(num,min,max){return Math.min(Math.max(num,min),max)}(caretPos,0,valLn),"left"===direction){for(;caretPos>=0&&!boundary[caretPos];)caretPos--;-1===caretPos&&(caretPos=boundary.indexOf(!0))}else{for(;caretPos<=valLn&&!boundary[caretPos];)caretPos++;caretPos>valLn&&(caretPos=boundary.lastIndexOf(!0))}return-1===caretPos&&(caretPos=valLn),caretPos}function caretUnknownFormatBoundary(formattedValue){for(var boundaryAry=Array.from({length:formattedValue.length+1}).map((function(){return!0})),i=0,ln=boundaryAry.length;i<ln;i++)boundaryAry[i]=Boolean(charIsNumber(formattedValue[i])||charIsNumber(formattedValue[i-1]));return boundaryAry}function useInternalValues(value,defaultValue,valueIsNumericString,format,removeFormatting,onValueChange){void 0===onValueChange&&(onValueChange=noop);var propValues=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),getValues=function usePersistentCallback(cb){var callbackRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(cb);callbackRef.current=cb;var persistentCbRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((function(){for(var args=[],len=arguments.length;len--;)args[len]=arguments[len];return callbackRef.current.apply(callbackRef,args)}));return persistentCbRef.current}((function(value){var formattedValue,numAsString;return isNil(value)||isNanValue(value)?(numAsString="",formattedValue=""):"number"==typeof value||valueIsNumericString?(numAsString="number"==typeof value?toNumericString(value):value,formattedValue=format(numAsString)):(numAsString=removeFormatting(value,void 0),formattedValue=value),{formattedValue,numAsString}})),ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((function(){return getValues(defaultValue)})),values=ref[0],setValues=ref[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((function(){isNil(value)?propValues.current=void 0:(propValues.current=getValues(value),setValues(propValues.current))}),[value,getValues]),[values,function(values,sourceInfo){setValues({formattedValue:values.formattedValue,numAsString:values.value}),onValueChange(values,sourceInfo)}]}function defaultRemoveFormatting(value){return value.replace(/[^0-9]/g,"")}function defaultFormat(value){return value}function NumberFormatBase(props){var type=props.type;void 0===type&&(type="text");var displayType=props.displayType;void 0===displayType&&(displayType="input");var customInput=props.customInput,renderText=props.renderText,getInputRef=props.getInputRef,format=props.format;void 0===format&&(format=defaultFormat);var removeFormatting=props.removeFormatting;void 0===removeFormatting&&(removeFormatting=defaultRemoveFormatting);var defaultValue=props.defaultValue,valueIsNumericString=props.valueIsNumericString,onValueChange=props.onValueChange,isAllowed=props.isAllowed,onChange=props.onChange;void 0===onChange&&(onChange=noop);var onKeyDown=props.onKeyDown;void 0===onKeyDown&&(onKeyDown=noop);var onMouseUp=props.onMouseUp;void 0===onMouseUp&&(onMouseUp=noop);var onFocus=props.onFocus;void 0===onFocus&&(onFocus=noop);var onBlur=props.onBlur;void 0===onBlur&&(onBlur=noop);var propValue=props.value,getCaretBoundary=props.getCaretBoundary;void 0===getCaretBoundary&&(getCaretBoundary=caretUnknownFormatBoundary);var isValidInputCharacter=props.isValidInputCharacter;void 0===isValidInputCharacter&&(isValidInputCharacter=charIsNumber);var otherProps=__rest(props,["type","displayType","customInput","renderText","getInputRef","format","removeFormatting","defaultValue","valueIsNumericString","onValueChange","isAllowed","onChange","onKeyDown","onMouseUp","onFocus","onBlur","value","getCaretBoundary","isValidInputCharacter"]),ref=useInternalValues(propValue,defaultValue,Boolean(valueIsNumericString),format,removeFormatting,onValueChange),ref_0=ref[0],formattedValue=ref_0.formattedValue,numAsString=ref_0.numAsString,onFormattedValueChange=ref[1],lastUpdatedValue=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){var newFormattedValue=format(numAsString);if(void 0===lastUpdatedValue.current||newFormattedValue!==lastUpdatedValue.current){var input=focusedElm.current;updateValue({formattedValue:newFormattedValue,numAsString,input,setCaretPosition:!0,source:SourceType.props,event:void 0})}}));var ref$1=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),mounted=ref$1[0],setMounted=ref$1[1],focusedElm=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),timeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({setCaretTimeout:null,focusTimeout:null});(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return setMounted(!0),function(){clearTimeout(timeout.current.setCaretTimeout),clearTimeout(timeout.current.focusTimeout)}}),[]);var _format=format,getValueObject=function(formattedValue,numAsString){var floatValue=parseFloat(numAsString);return{formattedValue,value:numAsString,floatValue:isNaN(floatValue)?void 0:floatValue}},setPatchedCaretPosition=function(el,caretPos,currentValue){setCaretPosition(el,caretPos),timeout.current.setCaretTimeout=setTimeout((function(){el.value===currentValue&&setCaretPosition(el,caretPos)}),0)},correctCaretPosition=function(value,caretPos,direction){return getCaretPosInBoundary(value,caretPos,getCaretBoundary(value),direction)},getNewCaretPosition=function(inputValue,newFormattedValue,caretPos){var caretBoundary=getCaretBoundary(newFormattedValue),updatedCaretPos=function getCaretPosition(newFormattedValue,lastFormattedValue,curValue,curCaretPos,boundary,isValidInputCharacter){var firstAllowedPosition=boundary.findIndex((function(b){return b})),prefixFormat=newFormattedValue.slice(0,firstAllowedPosition);lastFormattedValue||curValue.startsWith(prefixFormat)||(curValue=prefixFormat+curValue,curCaretPos+=prefixFormat.length);for(var curValLn=curValue.length,formattedValueLn=newFormattedValue.length,addedIndexMap={},indexMap=new Array(curValLn),i=0;i<curValLn;i++){indexMap[i]=-1;for(var j=0,jLn=formattedValueLn;j<jLn;j++)if(curValue[i]===newFormattedValue[j]&&!0!==addedIndexMap[j]){indexMap[i]=j,addedIndexMap[j]=!0;break}}for(var pos=curCaretPos;pos<curValLn&&(-1===indexMap[pos]||!isValidInputCharacter(curValue[pos]));)pos++;var endIndex=pos===curValLn||-1===indexMap[pos]?formattedValueLn:indexMap[pos];for(pos=curCaretPos-1;pos>0&&-1===indexMap[pos];)pos--;var startIndex=-1===pos||-1===indexMap[pos]?0:indexMap[pos]+1;return startIndex>endIndex?endIndex:curCaretPos-startIndex<endIndex-curCaretPos?startIndex:endIndex}(newFormattedValue,formattedValue,inputValue,caretPos,caretBoundary,isValidInputCharacter);return updatedCaretPos=getCaretPosInBoundary(newFormattedValue,updatedCaretPos,caretBoundary)},updateValue=function(params){var newFormattedValue=params.formattedValue;void 0===newFormattedValue&&(newFormattedValue="");var input=params.input,setCaretPosition=params.setCaretPosition;void 0===setCaretPosition&&(setCaretPosition=!0);var source=params.source,event=params.event,numAsString=params.numAsString,caretPos=params.caretPos;if(input){if(void 0===caretPos&&setCaretPosition){var inputValue=params.inputValue||input.value,currentCaretPosition=geInputCaretPosition(input);input.value=newFormattedValue,caretPos=getNewCaretPosition(inputValue,newFormattedValue,currentCaretPosition)}input.value=newFormattedValue,setCaretPosition&&void 0!==caretPos&&setPatchedCaretPosition(input,caretPos,newFormattedValue)}newFormattedValue!==formattedValue&&function(values,source){lastUpdatedValue.current=values.formattedValue,onFormattedValueChange(values,source)}(getValueObject(newFormattedValue,numAsString),{event,source})},inputMode=mounted&&function addInputMode(){return"undefined"!=typeof navigator&&!(navigator.platform&&/iPhone|iPod/.test(navigator.platform))}()?"numeric":void 0,inputProps=Object.assign({inputMode},otherProps,{type,value:formattedValue,onChange:function(e){var changed=function(inputValue,event,source){var changeRange=function findChangeRange(prevValue,newValue){for(var i=0,j=0,prevLength=prevValue.length,newLength=newValue.length;prevValue[i]===newValue[i]&&i<prevLength;)i++;for(;prevValue[prevLength-1-j]===newValue[newLength-1-j]&&newLength-j>i&&prevLength-j>i;)j++;return{from:{start:i,end:prevLength-j},to:{start:i,end:newLength-j}}}(formattedValue,inputValue),changeMeta=Object.assign(Object.assign({},changeRange),{lastValue:formattedValue}),_numAsString=removeFormatting(inputValue,changeMeta),_formattedValue=_format(_numAsString);if(isAllowed&&!isAllowed(getValueObject(_formattedValue,_numAsString))){var input=event.target,currentCaretPosition=geInputCaretPosition(input),caretPos=getNewCaretPosition(inputValue,formattedValue,currentCaretPosition);return setPatchedCaretPosition(input,caretPos,formattedValue),!1}return updateValue({formattedValue:_formattedValue,numAsString:_numAsString,inputValue,event,source,setCaretPosition:!0,input:event.target}),!0}(e.target.value,e,SourceType.event);changed&&onChange(e)},onKeyDown:function(e){var expectedCaretPosition,el=e.target,key=e.key,selectionStart=el.selectionStart,selectionEnd=el.selectionEnd,value=el.value;if(void 0===value&&(value=""),"ArrowLeft"===key||"Backspace"===key?expectedCaretPosition=Math.max(selectionStart-1,0):"ArrowRight"===key?expectedCaretPosition=Math.min(selectionStart+1,value.length):"Delete"===key&&(expectedCaretPosition=selectionStart),void 0!==expectedCaretPosition&&selectionStart===selectionEnd){var newCaretPosition=expectedCaretPosition;if("ArrowLeft"===key||"ArrowRight"===key)newCaretPosition=correctCaretPosition(value,expectedCaretPosition,"ArrowLeft"===key?"left":"right");else"Delete"!==key||isValidInputCharacter(value[expectedCaretPosition])?"Backspace"!==key||isValidInputCharacter(value[expectedCaretPosition])||(newCaretPosition=correctCaretPosition(value,expectedCaretPosition,"left")):newCaretPosition=correctCaretPosition(value,expectedCaretPosition,"right");newCaretPosition!==expectedCaretPosition&&setPatchedCaretPosition(el,newCaretPosition,value),e.isUnitTestRun&&setPatchedCaretPosition(el,newCaretPosition,value),onKeyDown(e)}else onKeyDown(e)},onMouseUp:function(e){var el=e.target,selectionStart=el.selectionStart,selectionEnd=el.selectionEnd,value=el.value;if(void 0===value&&(value=""),selectionStart===selectionEnd){var caretPosition=correctCaretPosition(value,selectionStart);caretPosition!==selectionStart&&setPatchedCaretPosition(el,caretPosition,value)}onMouseUp(e)},onFocus:function(e){e.persist&&e.persist();var el=e.target;focusedElm.current=el,timeout.current.focusTimeout=setTimeout((function(){var selectionStart=el.selectionStart,selectionEnd=el.selectionEnd,value=el.value;void 0===value&&(value="");var caretPosition=correctCaretPosition(value,selectionStart);caretPosition===selectionStart||0===selectionStart&&selectionEnd===value.length||setPatchedCaretPosition(el,caretPosition,value),onFocus(e)}),0)},onBlur:function(e){focusedElm.current=null,clearTimeout(timeout.current.focusTimeout),clearTimeout(timeout.current.setCaretTimeout),onBlur(e)}});if("text"===displayType)return renderText?react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,renderText(formattedValue,otherProps)||null):react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",Object.assign({},otherProps,{ref:getInputRef}),formattedValue);if(customInput){var CustomInput=customInput;return react__WEBPACK_IMPORTED_MODULE_0__.createElement(CustomInput,Object.assign({},inputProps,{ref:getInputRef}))}return react__WEBPACK_IMPORTED_MODULE_0__.createElement("input",Object.assign({},inputProps,{ref:getInputRef}))}function format(numStr,props){var decimalScale=props.decimalScale,fixedDecimalScale=props.fixedDecimalScale,prefix=props.prefix;void 0===prefix&&(prefix="");var suffix=props.suffix;void 0===suffix&&(suffix="");var allowNegative=props.allowNegative;void 0===allowNegative&&(allowNegative=!0);var thousandsGroupStyle=props.thousandsGroupStyle;if(void 0===thousandsGroupStyle&&(thousandsGroupStyle="thousand"),""===numStr||"-"===numStr)return numStr;var ref=getSeparators(props),thousandSeparator=ref.thousandSeparator,decimalSeparator=ref.decimalSeparator,hasDecimalSeparator=0!==decimalScale&&-1!==numStr.indexOf(".")||decimalScale&&fixedDecimalScale,ref$1=splitDecimal(numStr,allowNegative),beforeDecimal=ref$1.beforeDecimal,afterDecimal=ref$1.afterDecimal,addNegation=ref$1.addNegation;return void 0!==decimalScale&&(afterDecimal=limitToScale(afterDecimal,decimalScale,!!fixedDecimalScale)),thousandSeparator&&(beforeDecimal=function applyThousandSeparator(str,thousandSeparator,thousandsGroupStyle){var thousandsGroupRegex=function getThousandsGroupRegex(thousandsGroupStyle){switch(thousandsGroupStyle){case"lakh":return/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;case"wan":return/(\d)(?=(\d{4})+(?!\d))/g;default:return/(\d)(?=(\d{3})+(?!\d))/g}}(thousandsGroupStyle),index=str.search(/[1-9]/);return index=-1===index?str.length:index,str.substring(0,index)+str.substring(index,str.length).replace(thousandsGroupRegex,"$1"+thousandSeparator)}(beforeDecimal,thousandSeparator,thousandsGroupStyle)),prefix&&(beforeDecimal=prefix+beforeDecimal),suffix&&(afterDecimal+=suffix),addNegation&&(beforeDecimal="-"+beforeDecimal),numStr=beforeDecimal+(hasDecimalSeparator&&decimalSeparator||"")+afterDecimal}function getSeparators(props){var decimalSeparator=props.decimalSeparator;void 0===decimalSeparator&&(decimalSeparator=".");var thousandSeparator=props.thousandSeparator,allowedDecimalSeparators=props.allowedDecimalSeparators;return!0===thousandSeparator&&(thousandSeparator=","),allowedDecimalSeparators||(allowedDecimalSeparators=[decimalSeparator,"."]),{decimalSeparator,thousandSeparator,allowedDecimalSeparators}}function removeFormatting(value,changeMeta,props){void 0===changeMeta&&(changeMeta=getDefaultChangeMeta(value));var allowNegative=props.allowNegative;void 0===allowNegative&&(allowNegative=!0);var prefix=props.prefix;void 0===prefix&&(prefix="");var suffix=props.suffix;void 0===suffix&&(suffix="");var decimalScale=props.decimalScale,from=changeMeta.from,to=changeMeta.to,start=to.start,end=to.end,ref=getSeparators(props),allowedDecimalSeparators=ref.allowedDecimalSeparators,decimalSeparator=ref.decimalSeparator,isBeforeDecimalSeparator=value[end]===decimalSeparator;if(end-start==1&&-1!==allowedDecimalSeparators.indexOf(value[start])){var separator=0===decimalScale?"":decimalSeparator;value=value.substring(0,start)+separator+value.substring(start+1,value.length)}var hasNegation=!1;prefix.startsWith("-")?hasNegation=value.startsWith("--"):suffix.startsWith("-")&&value.length===suffix.length?hasNegation=!1:"-"===value[0]&&(hasNegation=!0),hasNegation&&(value=value.substring(1),start-=1,end-=1);var startIndex=0;value.startsWith(prefix)?startIndex+=prefix.length:start<prefix.length&&(startIndex=start),end-=startIndex;var endIndex=(value=value.substring(startIndex)).length,suffixStartIndex=value.length-suffix.length;value.endsWith(suffix)?endIndex=suffixStartIndex:end>value.length-suffix.length&&(endIndex=end),value=value.substring(0,endIndex),value=function handleNegation(value,allowNegative){void 0===value&&(value="");var negationRegex=new RegExp("(-)"),doubleNegationRegex=new RegExp("(-)(.)*(-)"),hasNegation=negationRegex.test(value),removeNegation=doubleNegationRegex.test(value);return value=value.replace(/-/g,""),hasNegation&&!removeNegation&&allowNegative&&(value="-"+value),value}(hasNegation?"-"+value:value,allowNegative),value=(value.match(function getNumberRegex(decimalSeparator,global){return new RegExp("(^-)|[0-9]|"+escapeRegExp(decimalSeparator),global?"g":void 0)}(decimalSeparator,!0))||[]).join("");var firstIndex=value.indexOf(decimalSeparator),ref$1=splitDecimal(value=value.replace(new RegExp(escapeRegExp(decimalSeparator),"g"),(function(match,index){return index===firstIndex?".":""})),allowNegative),beforeDecimal=ref$1.beforeDecimal,afterDecimal=ref$1.afterDecimal,addNegation=ref$1.addNegation;return to.end-to.start<from.end-from.start&&""===beforeDecimal&&isBeforeDecimalSeparator&&!parseFloat(afterDecimal)&&(value=addNegation?"-":""),value}function useNumericFormat(props){var decimalSeparator=props.decimalSeparator;void 0===decimalSeparator&&(decimalSeparator=".");props.allowedDecimalSeparators,props.thousandsGroupStyle,props.suffix,props.allowNegative;var allowLeadingZeros=props.allowLeadingZeros,onKeyDown=props.onKeyDown;void 0===onKeyDown&&(onKeyDown=noop);var onBlur=props.onBlur;void 0===onBlur&&(onBlur=noop);var thousandSeparator=props.thousandSeparator,decimalScale=props.decimalScale,fixedDecimalScale=props.fixedDecimalScale,prefix=props.prefix;void 0===prefix&&(prefix="");var defaultValue=props.defaultValue,value=props.value,valueIsNumericString=props.valueIsNumericString,onValueChange=props.onValueChange,restProps=__rest(props,["decimalSeparator","allowedDecimalSeparators","thousandsGroupStyle","suffix","allowNegative","allowLeadingZeros","onKeyDown","onBlur","thousandSeparator","decimalScale","fixedDecimalScale","prefix","defaultValue","value","valueIsNumericString","onValueChange"]);!function validateProps(props){var ref=getSeparators(props),thousandSeparator=ref.thousandSeparator,decimalSeparator=ref.decimalSeparator;if(thousandSeparator===decimalSeparator)throw new Error("\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: "+thousandSeparator+' (thousandSeparator = {true} is same as thousandSeparator = ",")\n        decimalSeparator: '+decimalSeparator+" (default value for decimalSeparator is .)\n     ")}(props);var _format=function(numStr){return format(numStr,props)},_removeFormatting=function(inputValue,changeMeta){return removeFormatting(inputValue,changeMeta,props)},_valueIsNumericString=valueIsNumericString;isNil(value)?isNil(defaultValue)||(_valueIsNumericString=null!=valueIsNumericString?valueIsNumericString:"number"==typeof defaultValue):_valueIsNumericString=null!=valueIsNumericString?valueIsNumericString:"number"==typeof value;var roundIncomingValueToPrecision=function(value){return isNil(value)||isNanValue(value)?value:("number"==typeof value&&(value=toNumericString(value)),_valueIsNumericString&&"number"==typeof decimalScale?roundToPrecision(value,decimalScale,Boolean(fixedDecimalScale)):value)},ref=useInternalValues(roundIncomingValueToPrecision(value),roundIncomingValueToPrecision(defaultValue),Boolean(_valueIsNumericString),_format,_removeFormatting,onValueChange),ref_0=ref[0],numAsString=ref_0.numAsString,formattedValue=ref_0.formattedValue,_onValueChange=ref[1];return Object.assign(Object.assign({},restProps),{value:formattedValue,valueIsNumericString:!1,isValidInputCharacter:function(inputChar){return inputChar===decimalSeparator||charIsNumber(inputChar)},onValueChange:_onValueChange,format:_format,removeFormatting:_removeFormatting,getCaretBoundary:function(formattedValue){return function getCaretBoundary(formattedValue,props){var prefix=props.prefix;void 0===prefix&&(prefix="");var suffix=props.suffix;void 0===suffix&&(suffix="");var boundaryAry=Array.from({length:formattedValue.length+1}).map((function(){return!0})),hasNegation="-"===formattedValue[0];boundaryAry.fill(!1,0,prefix.length+(hasNegation?1:0));var valLn=formattedValue.length;return boundaryAry.fill(!1,valLn-suffix.length+1,valLn+1),boundaryAry}(formattedValue,props)},onKeyDown:function(e){var el=e.target,key=e.key,selectionStart=el.selectionStart,selectionEnd=el.selectionEnd,value=el.value;if(void 0===value&&(value=""),selectionStart===selectionEnd){"Backspace"===key&&"-"===value[0]&&selectionStart===prefix.length+1&&setCaretPosition(el,1);var decimalSeparator=getSeparators(props).decimalSeparator;"Backspace"===key&&value[selectionStart-1]===decimalSeparator&&decimalScale&&fixedDecimalScale&&(setCaretPosition(el,selectionStart-1),e.preventDefault());var _thousandSeparator=!0===thousandSeparator?",":thousandSeparator;"Backspace"===key&&value[selectionStart-1]===_thousandSeparator&&setCaretPosition(el,selectionStart-1),"Delete"===key&&value[selectionStart]===_thousandSeparator&&setCaretPosition(el,selectionStart+1),onKeyDown(e)}else onKeyDown(e)},onBlur:function(e){var _value=numAsString;if(_value.match(/\d/g)||(_value=""),allowLeadingZeros||(_value=function fixLeadingZero(numStr){if(!numStr)return numStr;var isNegative="-"===numStr[0];isNegative&&(numStr=numStr.substring(1,numStr.length));var parts=numStr.split("."),beforeDecimal=parts[0].replace(/^0+/,"")||"0",afterDecimal=parts[1]||"";return(isNegative?"-":"")+beforeDecimal+(afterDecimal?"."+afterDecimal:"")}(_value)),fixedDecimalScale&&decimalScale&&(_value=roundToPrecision(_value,decimalScale,fixedDecimalScale)),_value!==numAsString){var formattedValue=format(_value,props);_onValueChange({formattedValue,value:_value,floatValue:parseFloat(_value)},{event:e,source:SourceType.event})}onBlur(e)}})}function NumericFormat(props){var numericFormatProps=useNumericFormat(props);return react__WEBPACK_IMPORTED_MODULE_0__.createElement(NumberFormatBase,Object.assign({},numericFormatProps))}!function(SourceType){SourceType.event="event",SourceType.props="prop"}(SourceType||(SourceType={}))}}]);