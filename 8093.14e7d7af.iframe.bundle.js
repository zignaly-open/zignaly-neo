"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[8093],{"../../node_modules/@mui/material/Typography/Typography.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Typography_Typography});var objectWithoutPropertiesLoose=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),esm_extends=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),react=__webpack_require__("../../node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/clsx/dist/clsx.m.js"),extendSxProp=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"),composeClasses=__webpack_require__("../../node_modules/@mui/utils/esm/composeClasses/composeClasses.js"),styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),useThemeProps=__webpack_require__("../../node_modules/@mui/material/styles/useThemeProps.js"),capitalize=__webpack_require__("../../node_modules/@mui/material/utils/capitalize.js"),generateUtilityClass=__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js");function getTypographyUtilityClass(slot){return(0,generateUtilityClass.Z)("MuiTypography",slot)}(0,__webpack_require__("../../node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js").Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const _excluded=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],TypographyRoot=(0,styled.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(props,styles)=>{const{ownerState}=props;return[styles.root,ownerState.variant&&styles[ownerState.variant],"inherit"!==ownerState.align&&styles[`align${(0,capitalize.Z)(ownerState.align)}`],ownerState.noWrap&&styles.noWrap,ownerState.gutterBottom&&styles.gutterBottom,ownerState.paragraph&&styles.paragraph]}})((({theme,ownerState})=>(0,esm_extends.Z)({margin:0},ownerState.variant&&theme.typography[ownerState.variant],"inherit"!==ownerState.align&&{textAlign:ownerState.align},ownerState.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},ownerState.gutterBottom&&{marginBottom:"0.35em"},ownerState.paragraph&&{marginBottom:16}))),defaultVariantMapping={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},colorTransformations={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},Typography_Typography=react.forwardRef((function Typography(inProps,ref){const themeProps=(0,useThemeProps.Z)({props:inProps,name:"MuiTypography"}),color=(color=>colorTransformations[color]||color)(themeProps.color),props=(0,extendSxProp.Z)((0,esm_extends.Z)({},themeProps,{color})),{align="inherit",className,component,gutterBottom=!1,noWrap=!1,paragraph=!1,variant="body1",variantMapping=defaultVariantMapping}=props,other=(0,objectWithoutPropertiesLoose.Z)(props,_excluded),ownerState=(0,esm_extends.Z)({},props,{align,color,className,component,gutterBottom,noWrap,paragraph,variant,variantMapping}),Component=component||(paragraph?"p":variantMapping[variant]||defaultVariantMapping[variant])||"span",classes=(ownerState=>{const{align,gutterBottom,noWrap,paragraph,variant,classes}=ownerState,slots={root:["root",variant,"inherit"!==ownerState.align&&`align${(0,capitalize.Z)(align)}`,gutterBottom&&"gutterBottom",noWrap&&"noWrap",paragraph&&"paragraph"]};return(0,composeClasses.Z)(slots,getTypographyUtilityClass,classes)})(ownerState);return(0,jsx_runtime.jsx)(TypographyRoot,(0,esm_extends.Z)({as:Component,ref,ownerState,className:(0,clsx_m.Z)(classes.root,className)},other))}))},"../../node_modules/@mui/material/node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>extendSxProp});var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/extends.js"),_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"),_mui_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/@mui/utils/esm/deepmerge.js"),_getThemeValue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/material/node_modules/@mui/system/esm/getThemeValue.js");const _excluded=["sx"],splitProps=props=>{const result={systemProps:{},otherProps:{}};return Object.keys(props).forEach((prop=>{_getThemeValue__WEBPACK_IMPORTED_MODULE_0__.Gc[prop]?result.systemProps[prop]=props[prop]:result.otherProps[prop]=props[prop]})),result};function extendSxProp(props){const{sx:inSx}=props,other=(0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__.Z)(props,_excluded),{systemProps,otherProps}=splitProps(other);let finalSx;return finalSx=Array.isArray(inSx)?[systemProps,...inSx]:"function"==typeof inSx?(...args)=>{const result=inSx(...args);return(0,_mui_utils__WEBPACK_IMPORTED_MODULE_2__.P)(result)?(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,result):systemProps}:(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},systemProps,inSx),(0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__.Z)({},otherProps,{sx:finalSx})}},"./node_modules/date-fns/esm/format/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function requiredArgs(required,args){if(args.length<required)throw new TypeError(required+" argument"+(required>1?"s":"")+" required, but only "+args.length+" present")}function toDate(argument){requiredArgs(1,arguments);var argStr=Object.prototype.toString.call(argument);return argument instanceof Date||"object"==typeof argument&&"[object Date]"===argStr?new Date(argument.getTime()):"number"==typeof argument||"[object Number]"===argStr?new Date(argument):("string"!=typeof argument&&"[object String]"!==argStr||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function isValid(dirtyDate){if(requiredArgs(1,arguments),!function isDate(value){return requiredArgs(1,arguments),value instanceof Date||"object"==typeof value&&"[object Date]"===Object.prototype.toString.call(value)}(dirtyDate)&&"number"!=typeof dirtyDate)return!1;var date=toDate(dirtyDate);return!isNaN(Number(date))}__webpack_require__.d(__webpack_exports__,{Z:()=>format});var formatDistanceLocale={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};const _lib_formatDistance=function(token,count,options){var result,tokenValue=formatDistanceLocale[token];return result="string"==typeof tokenValue?tokenValue:1===count?tokenValue.one:tokenValue.other.replace("{{count}}",count.toString()),null!=options&&options.addSuffix?options.comparison&&options.comparison>0?"in "+result:result+" ago":result};function buildFormatLongFn(args){return function(){var options=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},width=options.width?String(options.width):args.defaultWidth;return args.formats[width]||args.formats[args.defaultWidth]}}var formatLong={date:buildFormatLongFn({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:buildFormatLongFn({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:buildFormatLongFn({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})};var formatRelativeLocale={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function buildLocalizeFn(args){return function(dirtyIndex,dirtyOptions){var valuesArray,options=dirtyOptions||{};if("formatting"===(options.context?String(options.context):"standalone")&&args.formattingValues){var defaultWidth=args.defaultFormattingWidth||args.defaultWidth,width=options.width?String(options.width):defaultWidth;valuesArray=args.formattingValues[width]||args.formattingValues[defaultWidth]}else{var _defaultWidth=args.defaultWidth,_width=options.width?String(options.width):args.defaultWidth;valuesArray=args.values[_width]||args.values[_defaultWidth]}return valuesArray[args.argumentCallback?args.argumentCallback(dirtyIndex):dirtyIndex]}}function buildMatchFn(args){return function(string){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},width=options.width,matchPattern=width&&args.matchPatterns[width]||args.matchPatterns[args.defaultMatchWidth],matchResult=string.match(matchPattern);if(!matchResult)return null;var value,matchedString=matchResult[0],parsePatterns=width&&args.parsePatterns[width]||args.parsePatterns[args.defaultParseWidth],key=Array.isArray(parsePatterns)?function findIndex(array,predicate){for(var key=0;key<array.length;key++)if(predicate(array[key]))return key;return}(parsePatterns,(function(pattern){return pattern.test(matchedString)})):function findKey(object,predicate){for(var key in object)if(object.hasOwnProperty(key)&&predicate(object[key]))return key;return}(parsePatterns,(function(pattern){return pattern.test(matchedString)}));return value=args.valueCallback?args.valueCallback(key):key,{value:value=options.valueCallback?options.valueCallback(value):value,rest:string.slice(matchedString.length)}}}const en_US={code:"en-US",formatDistance:_lib_formatDistance,formatLong,formatRelative:function(token,_date,_baseDate,_options){return formatRelativeLocale[token]},localize:{ordinalNumber:function(dirtyNumber,_options){var number=Number(dirtyNumber),rem100=number%100;if(rem100>20||rem100<10)switch(rem100%10){case 1:return number+"st";case 2:return number+"nd";case 3:return number+"rd"}return number+"th"},era:buildLocalizeFn({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:buildLocalizeFn({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(quarter){return quarter-1}}),month:buildLocalizeFn({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:buildLocalizeFn({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:buildLocalizeFn({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:function buildMatchPatternFn(args){return function(string){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},matchResult=string.match(args.matchPattern);if(!matchResult)return null;var matchedString=matchResult[0],parseResult=string.match(args.parsePattern);if(!parseResult)return null;var value=args.valueCallback?args.valueCallback(parseResult[0]):parseResult[0];return{value:value=options.valueCallback?options.valueCallback(value):value,rest:string.slice(matchedString.length)}}}({matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(value){return parseInt(value,10)}}),era:buildMatchFn({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:buildMatchFn({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(index){return index+1}}),month:buildMatchFn({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:buildMatchFn({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:buildMatchFn({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function toInteger(dirtyNumber){if(null===dirtyNumber||!0===dirtyNumber||!1===dirtyNumber)return NaN;var number=Number(dirtyNumber);return isNaN(number)?number:number<0?Math.ceil(number):Math.floor(number)}function subMilliseconds(dirtyDate,dirtyAmount){return requiredArgs(2,arguments),function addMilliseconds(dirtyDate,dirtyAmount){requiredArgs(2,arguments);var timestamp=toDate(dirtyDate).getTime(),amount=toInteger(dirtyAmount);return new Date(timestamp+amount)}(dirtyDate,-toInteger(dirtyAmount))}function startOfUTCISOWeek(dirtyDate){requiredArgs(1,arguments);var date=toDate(dirtyDate),day=date.getUTCDay(),diff=(day<1?7:0)+day-1;return date.setUTCDate(date.getUTCDate()-diff),date.setUTCHours(0,0,0,0),date}function getUTCISOWeekYear(dirtyDate){requiredArgs(1,arguments);var date=toDate(dirtyDate),year=date.getUTCFullYear(),fourthOfJanuaryOfNextYear=new Date(0);fourthOfJanuaryOfNextYear.setUTCFullYear(year+1,0,4),fourthOfJanuaryOfNextYear.setUTCHours(0,0,0,0);var startOfNextYear=startOfUTCISOWeek(fourthOfJanuaryOfNextYear),fourthOfJanuaryOfThisYear=new Date(0);fourthOfJanuaryOfThisYear.setUTCFullYear(year,0,4),fourthOfJanuaryOfThisYear.setUTCHours(0,0,0,0);var startOfThisYear=startOfUTCISOWeek(fourthOfJanuaryOfThisYear);return date.getTime()>=startOfNextYear.getTime()?year+1:date.getTime()>=startOfThisYear.getTime()?year:year-1}function getUTCISOWeek(dirtyDate){requiredArgs(1,arguments);var date=toDate(dirtyDate),diff=startOfUTCISOWeek(date).getTime()-function startOfUTCISOWeekYear(dirtyDate){requiredArgs(1,arguments);var year=getUTCISOWeekYear(dirtyDate),fourthOfJanuary=new Date(0);return fourthOfJanuary.setUTCFullYear(year,0,4),fourthOfJanuary.setUTCHours(0,0,0,0),startOfUTCISOWeek(fourthOfJanuary)}(date).getTime();return Math.round(diff/6048e5)+1}function startOfUTCWeek(dirtyDate,dirtyOptions){requiredArgs(1,arguments);var options=dirtyOptions||{},locale=options.locale,localeWeekStartsOn=locale&&locale.options&&locale.options.weekStartsOn,defaultWeekStartsOn=null==localeWeekStartsOn?0:toInteger(localeWeekStartsOn),weekStartsOn=null==options.weekStartsOn?defaultWeekStartsOn:toInteger(options.weekStartsOn);if(!(weekStartsOn>=0&&weekStartsOn<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var date=toDate(dirtyDate),day=date.getUTCDay(),diff=(day<weekStartsOn?7:0)+day-weekStartsOn;return date.setUTCDate(date.getUTCDate()-diff),date.setUTCHours(0,0,0,0),date}function getUTCWeekYear(dirtyDate,dirtyOptions){requiredArgs(1,arguments);var date=toDate(dirtyDate),year=date.getUTCFullYear(),options=dirtyOptions||{},locale=options.locale,localeFirstWeekContainsDate=locale&&locale.options&&locale.options.firstWeekContainsDate,defaultFirstWeekContainsDate=null==localeFirstWeekContainsDate?1:toInteger(localeFirstWeekContainsDate),firstWeekContainsDate=null==options.firstWeekContainsDate?defaultFirstWeekContainsDate:toInteger(options.firstWeekContainsDate);if(!(firstWeekContainsDate>=1&&firstWeekContainsDate<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var firstWeekOfNextYear=new Date(0);firstWeekOfNextYear.setUTCFullYear(year+1,0,firstWeekContainsDate),firstWeekOfNextYear.setUTCHours(0,0,0,0);var startOfNextYear=startOfUTCWeek(firstWeekOfNextYear,dirtyOptions),firstWeekOfThisYear=new Date(0);firstWeekOfThisYear.setUTCFullYear(year,0,firstWeekContainsDate),firstWeekOfThisYear.setUTCHours(0,0,0,0);var startOfThisYear=startOfUTCWeek(firstWeekOfThisYear,dirtyOptions);return date.getTime()>=startOfNextYear.getTime()?year+1:date.getTime()>=startOfThisYear.getTime()?year:year-1}function getUTCWeek(dirtyDate,options){requiredArgs(1,arguments);var date=toDate(dirtyDate),diff=startOfUTCWeek(date,options).getTime()-function startOfUTCWeekYear(dirtyDate,dirtyOptions){requiredArgs(1,arguments);var options=dirtyOptions||{},locale=options.locale,localeFirstWeekContainsDate=locale&&locale.options&&locale.options.firstWeekContainsDate,defaultFirstWeekContainsDate=null==localeFirstWeekContainsDate?1:toInteger(localeFirstWeekContainsDate),firstWeekContainsDate=null==options.firstWeekContainsDate?defaultFirstWeekContainsDate:toInteger(options.firstWeekContainsDate),year=getUTCWeekYear(dirtyDate,dirtyOptions),firstWeek=new Date(0);return firstWeek.setUTCFullYear(year,0,firstWeekContainsDate),firstWeek.setUTCHours(0,0,0,0),startOfUTCWeek(firstWeek,dirtyOptions)}(date,options).getTime();return Math.round(diff/6048e5)+1}function addLeadingZeros(number,targetLength){for(var sign=number<0?"-":"",output=Math.abs(number).toString();output.length<targetLength;)output="0"+output;return sign+output}const lightFormatters={y:function(date,token){var signedYear=date.getUTCFullYear(),year=signedYear>0?signedYear:1-signedYear;return addLeadingZeros("yy"===token?year%100:year,token.length)},M:function(date,token){var month=date.getUTCMonth();return"M"===token?String(month+1):addLeadingZeros(month+1,2)},d:function(date,token){return addLeadingZeros(date.getUTCDate(),token.length)},a:function(date,token){var dayPeriodEnumValue=date.getUTCHours()/12>=1?"pm":"am";switch(token){case"a":case"aa":return dayPeriodEnumValue.toUpperCase();case"aaa":return dayPeriodEnumValue;case"aaaaa":return dayPeriodEnumValue[0];default:return"am"===dayPeriodEnumValue?"a.m.":"p.m."}},h:function(date,token){return addLeadingZeros(date.getUTCHours()%12||12,token.length)},H:function(date,token){return addLeadingZeros(date.getUTCHours(),token.length)},m:function(date,token){return addLeadingZeros(date.getUTCMinutes(),token.length)},s:function(date,token){return addLeadingZeros(date.getUTCSeconds(),token.length)},S:function(date,token){var numberOfDigits=token.length,milliseconds=date.getUTCMilliseconds();return addLeadingZeros(Math.floor(milliseconds*Math.pow(10,numberOfDigits-3)),token.length)}};var dayPeriodEnum_midnight="midnight",dayPeriodEnum_noon="noon",dayPeriodEnum_morning="morning",dayPeriodEnum_afternoon="afternoon",dayPeriodEnum_evening="evening",dayPeriodEnum_night="night",formatters_formatters={G:function(date,token,localize){var era=date.getUTCFullYear()>0?1:0;switch(token){case"G":case"GG":case"GGG":return localize.era(era,{width:"abbreviated"});case"GGGGG":return localize.era(era,{width:"narrow"});default:return localize.era(era,{width:"wide"})}},y:function(date,token,localize){if("yo"===token){var signedYear=date.getUTCFullYear(),year=signedYear>0?signedYear:1-signedYear;return localize.ordinalNumber(year,{unit:"year"})}return lightFormatters.y(date,token)},Y:function(date,token,localize,options){var signedWeekYear=getUTCWeekYear(date,options),weekYear=signedWeekYear>0?signedWeekYear:1-signedWeekYear;return"YY"===token?addLeadingZeros(weekYear%100,2):"Yo"===token?localize.ordinalNumber(weekYear,{unit:"year"}):addLeadingZeros(weekYear,token.length)},R:function(date,token){return addLeadingZeros(getUTCISOWeekYear(date),token.length)},u:function(date,token){return addLeadingZeros(date.getUTCFullYear(),token.length)},Q:function(date,token,localize){var quarter=Math.ceil((date.getUTCMonth()+1)/3);switch(token){case"Q":return String(quarter);case"QQ":return addLeadingZeros(quarter,2);case"Qo":return localize.ordinalNumber(quarter,{unit:"quarter"});case"QQQ":return localize.quarter(quarter,{width:"abbreviated",context:"formatting"});case"QQQQQ":return localize.quarter(quarter,{width:"narrow",context:"formatting"});default:return localize.quarter(quarter,{width:"wide",context:"formatting"})}},q:function(date,token,localize){var quarter=Math.ceil((date.getUTCMonth()+1)/3);switch(token){case"q":return String(quarter);case"qq":return addLeadingZeros(quarter,2);case"qo":return localize.ordinalNumber(quarter,{unit:"quarter"});case"qqq":return localize.quarter(quarter,{width:"abbreviated",context:"standalone"});case"qqqqq":return localize.quarter(quarter,{width:"narrow",context:"standalone"});default:return localize.quarter(quarter,{width:"wide",context:"standalone"})}},M:function(date,token,localize){var month=date.getUTCMonth();switch(token){case"M":case"MM":return lightFormatters.M(date,token);case"Mo":return localize.ordinalNumber(month+1,{unit:"month"});case"MMM":return localize.month(month,{width:"abbreviated",context:"formatting"});case"MMMMM":return localize.month(month,{width:"narrow",context:"formatting"});default:return localize.month(month,{width:"wide",context:"formatting"})}},L:function(date,token,localize){var month=date.getUTCMonth();switch(token){case"L":return String(month+1);case"LL":return addLeadingZeros(month+1,2);case"Lo":return localize.ordinalNumber(month+1,{unit:"month"});case"LLL":return localize.month(month,{width:"abbreviated",context:"standalone"});case"LLLLL":return localize.month(month,{width:"narrow",context:"standalone"});default:return localize.month(month,{width:"wide",context:"standalone"})}},w:function(date,token,localize,options){var week=getUTCWeek(date,options);return"wo"===token?localize.ordinalNumber(week,{unit:"week"}):addLeadingZeros(week,token.length)},I:function(date,token,localize){var isoWeek=getUTCISOWeek(date);return"Io"===token?localize.ordinalNumber(isoWeek,{unit:"week"}):addLeadingZeros(isoWeek,token.length)},d:function(date,token,localize){return"do"===token?localize.ordinalNumber(date.getUTCDate(),{unit:"date"}):lightFormatters.d(date,token)},D:function(date,token,localize){var dayOfYear=function getUTCDayOfYear(dirtyDate){requiredArgs(1,arguments);var date=toDate(dirtyDate),timestamp=date.getTime();date.setUTCMonth(0,1),date.setUTCHours(0,0,0,0);var difference=timestamp-date.getTime();return Math.floor(difference/864e5)+1}(date);return"Do"===token?localize.ordinalNumber(dayOfYear,{unit:"dayOfYear"}):addLeadingZeros(dayOfYear,token.length)},E:function(date,token,localize){var dayOfWeek=date.getUTCDay();switch(token){case"E":case"EE":case"EEE":return localize.day(dayOfWeek,{width:"abbreviated",context:"formatting"});case"EEEEE":return localize.day(dayOfWeek,{width:"narrow",context:"formatting"});case"EEEEEE":return localize.day(dayOfWeek,{width:"short",context:"formatting"});default:return localize.day(dayOfWeek,{width:"wide",context:"formatting"})}},e:function(date,token,localize,options){var dayOfWeek=date.getUTCDay(),localDayOfWeek=(dayOfWeek-options.weekStartsOn+8)%7||7;switch(token){case"e":return String(localDayOfWeek);case"ee":return addLeadingZeros(localDayOfWeek,2);case"eo":return localize.ordinalNumber(localDayOfWeek,{unit:"day"});case"eee":return localize.day(dayOfWeek,{width:"abbreviated",context:"formatting"});case"eeeee":return localize.day(dayOfWeek,{width:"narrow",context:"formatting"});case"eeeeee":return localize.day(dayOfWeek,{width:"short",context:"formatting"});default:return localize.day(dayOfWeek,{width:"wide",context:"formatting"})}},c:function(date,token,localize,options){var dayOfWeek=date.getUTCDay(),localDayOfWeek=(dayOfWeek-options.weekStartsOn+8)%7||7;switch(token){case"c":return String(localDayOfWeek);case"cc":return addLeadingZeros(localDayOfWeek,token.length);case"co":return localize.ordinalNumber(localDayOfWeek,{unit:"day"});case"ccc":return localize.day(dayOfWeek,{width:"abbreviated",context:"standalone"});case"ccccc":return localize.day(dayOfWeek,{width:"narrow",context:"standalone"});case"cccccc":return localize.day(dayOfWeek,{width:"short",context:"standalone"});default:return localize.day(dayOfWeek,{width:"wide",context:"standalone"})}},i:function(date,token,localize){var dayOfWeek=date.getUTCDay(),isoDayOfWeek=0===dayOfWeek?7:dayOfWeek;switch(token){case"i":return String(isoDayOfWeek);case"ii":return addLeadingZeros(isoDayOfWeek,token.length);case"io":return localize.ordinalNumber(isoDayOfWeek,{unit:"day"});case"iii":return localize.day(dayOfWeek,{width:"abbreviated",context:"formatting"});case"iiiii":return localize.day(dayOfWeek,{width:"narrow",context:"formatting"});case"iiiiii":return localize.day(dayOfWeek,{width:"short",context:"formatting"});default:return localize.day(dayOfWeek,{width:"wide",context:"formatting"})}},a:function(date,token,localize){var dayPeriodEnumValue=date.getUTCHours()/12>=1?"pm":"am";switch(token){case"a":case"aa":return localize.dayPeriod(dayPeriodEnumValue,{width:"abbreviated",context:"formatting"});case"aaa":return localize.dayPeriod(dayPeriodEnumValue,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return localize.dayPeriod(dayPeriodEnumValue,{width:"narrow",context:"formatting"});default:return localize.dayPeriod(dayPeriodEnumValue,{width:"wide",context:"formatting"})}},b:function(date,token,localize){var dayPeriodEnumValue,hours=date.getUTCHours();switch(dayPeriodEnumValue=12===hours?dayPeriodEnum_noon:0===hours?dayPeriodEnum_midnight:hours/12>=1?"pm":"am",token){case"b":case"bb":return localize.dayPeriod(dayPeriodEnumValue,{width:"abbreviated",context:"formatting"});case"bbb":return localize.dayPeriod(dayPeriodEnumValue,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return localize.dayPeriod(dayPeriodEnumValue,{width:"narrow",context:"formatting"});default:return localize.dayPeriod(dayPeriodEnumValue,{width:"wide",context:"formatting"})}},B:function(date,token,localize){var dayPeriodEnumValue,hours=date.getUTCHours();switch(dayPeriodEnumValue=hours>=17?dayPeriodEnum_evening:hours>=12?dayPeriodEnum_afternoon:hours>=4?dayPeriodEnum_morning:dayPeriodEnum_night,token){case"B":case"BB":case"BBB":return localize.dayPeriod(dayPeriodEnumValue,{width:"abbreviated",context:"formatting"});case"BBBBB":return localize.dayPeriod(dayPeriodEnumValue,{width:"narrow",context:"formatting"});default:return localize.dayPeriod(dayPeriodEnumValue,{width:"wide",context:"formatting"})}},h:function(date,token,localize){if("ho"===token){var hours=date.getUTCHours()%12;return 0===hours&&(hours=12),localize.ordinalNumber(hours,{unit:"hour"})}return lightFormatters.h(date,token)},H:function(date,token,localize){return"Ho"===token?localize.ordinalNumber(date.getUTCHours(),{unit:"hour"}):lightFormatters.H(date,token)},K:function(date,token,localize){var hours=date.getUTCHours()%12;return"Ko"===token?localize.ordinalNumber(hours,{unit:"hour"}):addLeadingZeros(hours,token.length)},k:function(date,token,localize){var hours=date.getUTCHours();return 0===hours&&(hours=24),"ko"===token?localize.ordinalNumber(hours,{unit:"hour"}):addLeadingZeros(hours,token.length)},m:function(date,token,localize){return"mo"===token?localize.ordinalNumber(date.getUTCMinutes(),{unit:"minute"}):lightFormatters.m(date,token)},s:function(date,token,localize){return"so"===token?localize.ordinalNumber(date.getUTCSeconds(),{unit:"second"}):lightFormatters.s(date,token)},S:function(date,token){return lightFormatters.S(date,token)},X:function(date,token,_localize,options){var timezoneOffset=(options._originalDate||date).getTimezoneOffset();if(0===timezoneOffset)return"Z";switch(token){case"X":return formatTimezoneWithOptionalMinutes(timezoneOffset);case"XXXX":case"XX":return formatTimezone(timezoneOffset);default:return formatTimezone(timezoneOffset,":")}},x:function(date,token,_localize,options){var timezoneOffset=(options._originalDate||date).getTimezoneOffset();switch(token){case"x":return formatTimezoneWithOptionalMinutes(timezoneOffset);case"xxxx":case"xx":return formatTimezone(timezoneOffset);default:return formatTimezone(timezoneOffset,":")}},O:function(date,token,_localize,options){var timezoneOffset=(options._originalDate||date).getTimezoneOffset();switch(token){case"O":case"OO":case"OOO":return"GMT"+formatTimezoneShort(timezoneOffset,":");default:return"GMT"+formatTimezone(timezoneOffset,":")}},z:function(date,token,_localize,options){var timezoneOffset=(options._originalDate||date).getTimezoneOffset();switch(token){case"z":case"zz":case"zzz":return"GMT"+formatTimezoneShort(timezoneOffset,":");default:return"GMT"+formatTimezone(timezoneOffset,":")}},t:function(date,token,_localize,options){var originalDate=options._originalDate||date;return addLeadingZeros(Math.floor(originalDate.getTime()/1e3),token.length)},T:function(date,token,_localize,options){return addLeadingZeros((options._originalDate||date).getTime(),token.length)}};function formatTimezoneShort(offset,dirtyDelimiter){var sign=offset>0?"-":"+",absOffset=Math.abs(offset),hours=Math.floor(absOffset/60),minutes=absOffset%60;if(0===minutes)return sign+String(hours);var delimiter=dirtyDelimiter||"";return sign+String(hours)+delimiter+addLeadingZeros(minutes,2)}function formatTimezoneWithOptionalMinutes(offset,dirtyDelimiter){return offset%60==0?(offset>0?"-":"+")+addLeadingZeros(Math.abs(offset)/60,2):formatTimezone(offset,dirtyDelimiter)}function formatTimezone(offset,dirtyDelimiter){var delimiter=dirtyDelimiter||"",sign=offset>0?"-":"+",absOffset=Math.abs(offset);return sign+addLeadingZeros(Math.floor(absOffset/60),2)+delimiter+addLeadingZeros(absOffset%60,2)}const format_formatters=formatters_formatters;function dateLongFormatter(pattern,formatLong){switch(pattern){case"P":return formatLong.date({width:"short"});case"PP":return formatLong.date({width:"medium"});case"PPP":return formatLong.date({width:"long"});default:return formatLong.date({width:"full"})}}function timeLongFormatter(pattern,formatLong){switch(pattern){case"p":return formatLong.time({width:"short"});case"pp":return formatLong.time({width:"medium"});case"ppp":return formatLong.time({width:"long"});default:return formatLong.time({width:"full"})}}var longFormatters={p:timeLongFormatter,P:function dateTimeLongFormatter(pattern,formatLong){var dateTimeFormat,matchResult=pattern.match(/(P+)(p+)?/)||[],datePattern=matchResult[1],timePattern=matchResult[2];if(!timePattern)return dateLongFormatter(pattern,formatLong);switch(datePattern){case"P":dateTimeFormat=formatLong.dateTime({width:"short"});break;case"PP":dateTimeFormat=formatLong.dateTime({width:"medium"});break;case"PPP":dateTimeFormat=formatLong.dateTime({width:"long"});break;default:dateTimeFormat=formatLong.dateTime({width:"full"})}return dateTimeFormat.replace("{{date}}",dateLongFormatter(datePattern,formatLong)).replace("{{time}}",timeLongFormatter(timePattern,formatLong))}};const format_longFormatters=longFormatters;var protectedDayOfYearTokens=["D","DD"],protectedWeekYearTokens=["YY","YYYY"];function throwProtectedError(token,format,input){if("YYYY"===token)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format,"`) for formatting years to the input `").concat(input,"`; see: https://git.io/fxCyr"));if("YY"===token)throw new RangeError("Use `yy` instead of `YY` (in `".concat(format,"`) for formatting years to the input `").concat(input,"`; see: https://git.io/fxCyr"));if("D"===token)throw new RangeError("Use `d` instead of `D` (in `".concat(format,"`) for formatting days of the month to the input `").concat(input,"`; see: https://git.io/fxCyr"));if("DD"===token)throw new RangeError("Use `dd` instead of `DD` (in `".concat(format,"`) for formatting days of the month to the input `").concat(input,"`; see: https://git.io/fxCyr"))}var formattingTokensRegExp=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,longFormattingTokensRegExp=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,escapedStringRegExp=/^'([^]*?)'?$/,doubleQuoteRegExp=/''/g,unescapedLatinCharacterRegExp=/[a-zA-Z]/;function format(dirtyDate,dirtyFormatStr,dirtyOptions){requiredArgs(2,arguments);var formatStr=String(dirtyFormatStr),options=dirtyOptions||{},locale=options.locale||en_US,localeFirstWeekContainsDate=locale.options&&locale.options.firstWeekContainsDate,defaultFirstWeekContainsDate=null==localeFirstWeekContainsDate?1:toInteger(localeFirstWeekContainsDate),firstWeekContainsDate=null==options.firstWeekContainsDate?defaultFirstWeekContainsDate:toInteger(options.firstWeekContainsDate);if(!(firstWeekContainsDate>=1&&firstWeekContainsDate<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var localeWeekStartsOn=locale.options&&locale.options.weekStartsOn,defaultWeekStartsOn=null==localeWeekStartsOn?0:toInteger(localeWeekStartsOn),weekStartsOn=null==options.weekStartsOn?defaultWeekStartsOn:toInteger(options.weekStartsOn);if(!(weekStartsOn>=0&&weekStartsOn<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!locale.localize)throw new RangeError("locale must contain localize property");if(!locale.formatLong)throw new RangeError("locale must contain formatLong property");var originalDate=toDate(dirtyDate);if(!isValid(originalDate))throw new RangeError("Invalid time value");var timezoneOffset=function getTimezoneOffsetInMilliseconds(date){var utcDate=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds(),date.getMilliseconds()));return utcDate.setUTCFullYear(date.getFullYear()),date.getTime()-utcDate.getTime()}(originalDate),utcDate=subMilliseconds(originalDate,timezoneOffset),formatterOptions={firstWeekContainsDate,weekStartsOn,locale,_originalDate:originalDate};return formatStr.match(longFormattingTokensRegExp).map((function(substring){var firstCharacter=substring[0];return"p"===firstCharacter||"P"===firstCharacter?(0,format_longFormatters[firstCharacter])(substring,locale.formatLong,formatterOptions):substring})).join("").match(formattingTokensRegExp).map((function(substring){if("''"===substring)return"'";var firstCharacter=substring[0];if("'"===firstCharacter)return function cleanEscapedString(input){return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp,"'")}(substring);var formatter=format_formatters[firstCharacter];if(formatter)return!options.useAdditionalWeekYearTokens&&function isProtectedWeekYearToken(token){return-1!==protectedWeekYearTokens.indexOf(token)}(substring)&&throwProtectedError(substring,dirtyFormatStr,dirtyDate),!options.useAdditionalDayOfYearTokens&&function isProtectedDayOfYearToken(token){return-1!==protectedDayOfYearTokens.indexOf(token)}(substring)&&throwProtectedError(substring,dirtyFormatStr,dirtyDate),formatter(utcDate,substring,locale.localize,formatterOptions);if(firstCharacter.match(unescapedLatinCharacterRegExp))throw new RangeError("Format string contains an unescaped latin alphabet character `"+firstCharacter+"`");return substring})).join("")}}}]);