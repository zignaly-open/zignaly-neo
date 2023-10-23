"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[3229],{"./src/components/display/ZigChart/ZigChart/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ExampleBarChart:()=>ExampleBarChart,ExampleBarChart2:()=>ExampleBarChart2,ExampleBarChartWithEvents:()=>ExampleBarChartWithEvents,ExampleChart:()=>ExampleChart,ExampleChart2:()=>ExampleChart2,ExampleChartFullyNegative:()=>ExampleChartFullyNegative,ExampleChartFullyNegative2:()=>ExampleChartFullyNegative2,ExampleChartSlightlyNegative:()=>ExampleChartSlightlyNegative,ExampleChartWithEvents:()=>ExampleChartWithEvents,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),victory_chart=__webpack_require__("../../node_modules/victory-chart/es/victory-chart.js"),victory_voronoi_container=__webpack_require__("../../node_modules/victory-voronoi-container/es/victory-voronoi-container.js"),victory_axis=__webpack_require__("../../node_modules/victory-axis/es/victory-axis.js"),victory_label=__webpack_require__("../../node_modules/victory-core/es/victory-label/victory-label.js"),victory_line=__webpack_require__("../../node_modules/victory-line/es/victory-line.js"),victory_bar=__webpack_require__("../../node_modules/victory-bar/es/victory-bar.js"),victory_area=__webpack_require__("../../node_modules/victory-area/es/victory-area.js"),styles=__webpack_require__("./src/components/display/ZigChart/styles.ts"),hooks=__webpack_require__("./src/components/display/ZigChart/hooks.ts"),linear=__webpack_require__("../../node_modules/d3-scale/src/linear.js"),useTheme=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js"),victory_tooltip=__webpack_require__("../../node_modules/victory-tooltip/es/victory-tooltip.js"),line_segment=__webpack_require__("../../node_modules/victory-core/es/victory-primitives/line-segment.js"),point=__webpack_require__("../../node_modules/victory-core/es/victory-primitives/point.js"),jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ChartTooltip=react.memo((({color,...props})=>{const theme=(0,useTheme.Z)();return props.text?(0,jsx_runtime.jsxs)("g",{children:[(0,jsx_runtime.jsx)(victory_tooltip.Z,{...props,orientation:"top",cornerRadius:8,flyoutStyle:{fill:theme.palette.neutral900,stroke:"none"},pointerOrientation:"bottom",flyoutPadding:8,labelComponent:(0,jsx_runtime.jsx)(victory_label.X,{lineHeight:1.5}),style:[{fill:theme.palette.neutral300,fontSize:"14px",fontFamily:theme.typography.fontFamily},{fill:theme.palette.neutral200,fontSize:"15px",fontWeight:500,fontFamily:theme.typography.fontFamily}]}),(0,jsx_runtime.jsx)(line_segment.c,{x1:props.x,y1:props.y,x2:props.x,y2:props.height?props.height-20:0,style:{stroke:"#3e495b"}}),(0,jsx_runtime.jsx)(point.E,{x:props.x,y:props.y,size:5,style:{stroke:color??"#4c535e",fill:"#353234"}})]}):null}),((prevProps,nextProps)=>prevProps.x===nextProps.x&&prevProps.y===nextProps.y));try{ChartTooltip.displayName="ChartTooltip",ChartTooltip.__docgenInfo={description:"",displayName:"ChartTooltip",props:{color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigChart/ZigChart/atoms.tsx#ChartTooltip"]={docgenInfo:ChartTooltip.__docgenInfo,name:"ChartTooltip",path:"src/components/display/ZigChart/ZigChart/atoms.tsx#ChartTooltip"})}catch(__react_docgen_typescript_loader_error){}var util=__webpack_require__("./src/components/display/ZigChart/ZigChart/util.ts");const ZigChart=({id,data,yAxisFormatter,tooltipFormatter,events,bars,tickCount=7,onlyIntegerTicks,chartProps={},precision=2})=>{const theme=(0,useTheme.Z)(),axisStyle=(0,styles.SZ)(),{data:processedData,color,gradient,yDomain}=(0,hooks.q)(data,"full",precision),wrapperRef=(0,react.useRef)(null),width=wrapperRef?.current?.getBoundingClientRect().width,pureChartWidth=width?width-70-2:0,chartColors=(0,util.w)(),barChartWidth=pureChartWidth/processedData.length,barChartWidthAdjustedForPadding=Math.min(25,pureChartWidth/(processedData.length+2)),[,forceUpdate]=(0,react.useReducer)((x=>x+1),0);(0,react.useLayoutEffect)((()=>{forceUpdate()}),[width]);const getChartLabel=(0,react.useCallback)((({datum=0})=>yAxisFormatter?yAxisFormatter(datum):datum.toString()),[yAxisFormatter]),getChartTooltip=(0,react.useCallback)((({datum})=>tooltipFormatter?tooltipFormatter(datum):`${datum.x}\n${datum.y}`),[tooltipFormatter]),ticks=linear.Z().domain(yDomain).ticks(tickCount).filter((v=>!onlyIntegerTicks||Number.isInteger(v)));return(0,jsx_runtime.jsx)(styles.o4,{ref:wrapperRef,id,children:width&&(0,jsx_runtime.jsxs)(victory_chart.k,{containerComponent:(0,jsx_runtime.jsx)(victory_voronoi_container.Z,{voronoiDimension:"x",labels:getChartTooltip,labelComponent:(0,jsx_runtime.jsx)(ChartTooltip,{color:bars?void 0:color}),voronoiBlacklist:["eventLine","scatterText"]}),domain:{y:yDomain},width:width||600,height:300,domainPadding:{x:bars?[barChartWidth/2,barChartWidth/2]:0,y:1},padding:{left:35,top:20,right:35,bottom:20},...chartProps,children:[(0,jsx_runtime.jsx)(victory_axis.E,{tickValues:ticks,tickLabelComponent:(0,jsx_runtime.jsx)(victory_label.X,{textAnchor:"start",text:getChartLabel}),dependentAxis:!0,orientation:"right",style:axisStyle}),(events||[]).map((({x,label})=>(0,jsx_runtime.jsx)(victory_line.j,{name:"eventLine",style:{data:{stroke:theme.palette.neutral500,strokeWidth:.5}},data:[{x,y:yDomain[1]},{x,y:yDomain[0]}],labels:[label],labelComponent:(0,jsx_runtime.jsx)(victory_label.X,{dy:17,labelPlacement:"vertical",style:[{fontSize:14,fill:theme.palette.neutral500}],angle:-90,textAnchor:"end"})},"event-line-"+x))),(0,jsx_runtime.jsx)(victory_axis.E,{tickFormat:()=>"",tickLabelComponent:(0,jsx_runtime.jsx)(victory_label.X,{}),style:axisStyle}),(0,jsx_runtime.jsx)(victory_axis.E,{offsetY:20,tickLabelComponent:(0,jsx_runtime.jsx)(victory_label.X,{backgroundPadding:{top:5}}),fixLabelOverlap:!0,style:bars?{...axisStyle,grid:{stroke:theme.palette.neutral700,strokeDasharray:"3 3"},ticks:{stroke:theme.palette.neutral700,size:5}}:axisStyle}),bars?(0,jsx_runtime.jsx)(victory_bar.Z,{barRatio:.9,animate:{duration:2e3,onLoad:{duration:1e3}},barWidth:barChartWidthAdjustedForPadding,style:{data:{fill:({datum})=>datum.y>0?chartColors.green:chartColors.red,maxWidth:20,strokeWidth:0}},data:processedData.map((v=>({...v,y0:0})))}):(0,jsx_runtime.jsx)(victory_area.b,{style:{data:{fill:`url(#${gradient})`,strokeWidth:2,stroke:color}},data:processedData,interpolation:"monotoneX"})]})})};ZigChart.displayName="ZigChart";const ZigChart_ZigChart=ZigChart;try{ZigChart.displayName="ZigChart",ZigChart.__docgenInfo={description:"",displayName:"ZigChart",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"AxisFormat[] | number[]"}},tickCount:{defaultValue:{value:"7"},description:"",name:"tickCount",required:!1,type:{name:"number | undefined"}},bars:{defaultValue:null,description:"",name:"bars",required:!1,type:{name:"boolean | undefined"}},events:{defaultValue:null,description:"",name:"events",required:!1,type:{name:"ChartEvent[] | undefined"}},onlyIntegerTicks:{defaultValue:null,description:"",name:"onlyIntegerTicks",required:!1,type:{name:"boolean | undefined"}},yAxisFormatter:{defaultValue:null,description:"",name:"yAxisFormatter",required:!1,type:{name:"((y: string | number) => string) | undefined"}},tooltipFormatter:{defaultValue:null,description:"",name:"tooltipFormatter",required:!1,type:{name:"((v: AxisFormat) => string) | undefined"}},chartProps:{defaultValue:{value:"{}"},description:"",name:"chartProps",required:!1,type:{name:"VictoryChartProps | undefined"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string | undefined"}},precision:{defaultValue:{value:"2"},description:"",name:"precision",required:!1,type:{name:"number | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/display/ZigChart/ZigChart/index.tsx#ZigChart"]={docgenInfo:ZigChart.__docgenInfo,name:"ZigChart",path:"src/components/display/ZigChart/ZigChart/index.tsx#ZigChart"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Display/Charts/ZigChart",component:ZigChart_ZigChart,argTypes:{midLine:{control:"radio",options:{on:!0,off:!1}},height:{control:"number"}}},Template=args=>(0,jsx_runtime.jsx)(ZigChart_ZigChart,{...args});Template.displayName="Template";const ExampleChart=Template.bind({});ExampleChart.args={data:(()=>{let value=100;return new Array(300).fill(0).map(((_,i)=>(value+=200*Math.random()-1,{x:"Jun "+i,y:value})))})()};const ExampleChartWithEvents=Template.bind({});ExampleChartWithEvents.args={events:[{x:25,label:"Raz raz raz"},{x:145,label:"Eto hardbass"}],data:(()=>{let value=10;return new Array(300).fill(0).map(((_,i)=>(value+=20*Math.random()-1,{x:"Jun "+i,y:value})))})()};const ExampleChart2=Template.bind({});ExampleChart2.args={data:[{x:"Jul 1",y:10},{x:"Jul 2",y:15},{x:"Jul 3",y:23},{x:"Jul 4",y:15},{x:"Jul 5",y:-17},{x:"Jul 6",y:20},{x:"Jul 7",y:-25}]};const ExampleChartSlightlyNegative=Template.bind({});ExampleChartSlightlyNegative.args={data:[{x:"Jul 1",y:10},{x:"Jul 2",y:15},{x:"Jul 3",y:23},{x:"Jul 4",y:15},{x:"Jul 5",y:-1},{x:"Jul 6",y:20},{x:"Jul 7",y:-1}]};const ExampleChartFullyNegative=Template.bind({});ExampleChartFullyNegative.args={data:[{x:"Jul 1",y:-100},{x:"Jul 2",y:-150},{x:"Jul 3",y:-230},{x:"Jul 4",y:-150},{x:"Jul 5",y:-80},{x:"Jul 6",y:-80},{x:"Jul 7",y:-70}]};const ExampleChartFullyNegative2=Template.bind({});ExampleChartFullyNegative2.args={data:[{x:"Jul 1",y:-1e-5},{x:"Jul 2",y:-1e-5},{x:"Jul 3",y:-3e-5},{x:"Jul 4",y:-9e-5},{x:"Jul 5",y:-3e-5},{x:"Jul 6",y:-4e-5},{x:"Jul 7",y:-9e-5}],precision:8};const ExampleBarChart=Template.bind({});ExampleBarChart.args={bars:!0,data:(()=>{let value=100;return new Array(90).fill(0).map(((_,i)=>(value+=200*Math.random()-1,{x:"Jun "+i,y:value})))})()};const ExampleBarChartWithEvents=Template.bind({});ExampleBarChartWithEvents.args={events:[{x:25,label:"Raz raz raz"},{x:145,label:"Eto hardbass"}],bars:!0,data:(()=>{let value=10;return new Array(300).fill(0).map(((_,i)=>(value+=20*(Math.random()-.5),{x:"Jun "+i,y:value})))})()};const ExampleBarChart2=Template.bind({});ExampleBarChart2.args={bars:!0,data:[{x:"Jul 1",y:10},{x:"Jul 2",y:15},{x:"Jul 3",y:23},{x:"Jul 4",y:15},{x:"Jul 5",y:-17},{x:"Jul 6",y:20},{x:"Jul 7",y:-25}]}},"./src/components/display/ZigChart/ZigChart/util.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{w:()=>useChartColor});var _mui_material__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js");function useChartColor(){const theme=(0,_mui_material__WEBPACK_IMPORTED_MODULE_0__.Z)();return{green:theme.palette.chart.green,red:theme.palette.chart.red}}},"./src/components/display/ZigChart/hooks.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>useChartData});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/react/index.js"),_types__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/display/ZigChart/types.ts"),_ZigChart_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/display/ZigChart/ZigChart/util.ts");const getGradient=(gradientVariant,isGreen)=>{switch(gradientVariant){case"mini":return isGreen?_types__WEBPACK_IMPORTED_MODULE_1__.x.GreenMini:_types__WEBPACK_IMPORTED_MODULE_1__.x.RedMini;case"card":return isGreen?_types__WEBPACK_IMPORTED_MODULE_1__.x.GreenCard:_types__WEBPACK_IMPORTED_MODULE_1__.x.RedCard;default:return isGreen?_types__WEBPACK_IMPORTED_MODULE_1__.x.GreenFull:_types__WEBPACK_IMPORTED_MODULE_1__.x.RedFull}},getYDomain=data=>{const values=data.map((s=>s.y)),ranges=[Math.min(0,...values),Math.max(...values)];return ranges[0]<0&&ranges[1]>0?ranges[0]=Math.min(ranges[0],-1*ranges[1]*.2/.8):ranges[1]<=0&&(ranges[1]=.01*Math.abs(ranges[1]-ranges[0])),ranges};function useChartData(data,gradientVariant="full",precision){const chartColors=(0,_ZigChart_util__WEBPACK_IMPORTED_MODULE_2__.w)(),[processedData,yDomain]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>{const chart=data.map(((value,index)=>{const{x,y,...rest}="object"==typeof value?value:{x:index,y:value};return{x,y:precision?+y.toFixed(precision):y,...rest}})),yDomain=getYDomain(chart);return[chart.map((c=>({...c,y0:yDomain[0]}))),yDomain]}),[data]),isGreen=processedData[0].y<=processedData[data.length-1].y;return{data:processedData,color:isGreen?chartColors.green:chartColors.red,gradient:getGradient(gradientVariant,isGreen),yDomain}}},"./src/components/display/ZigChart/styles.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{SZ:()=>useAxisStyle,gR:()=>ChartLayoutMini,o4:()=>ChartLayoutLarge});var _mui_system__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/@mui/system/esm/styled.js"),_mui_material__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/@mui/material/styles/useTheme.js");const ChartLayoutLarge=(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)("div")`
  width: 100%;
  z-index: 3;

  svg {
    overflow: visible;
  }
`,ChartLayoutMini=(0,_mui_system__WEBPACK_IMPORTED_MODULE_0__.Z)("div")`
  height: ${props=>props.height||100}px;
  width: 100%;
  display: block;
  margin-bottom: 10px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 5;
  }
`,useAxisStyle=()=>{const theme=(0,_mui_material__WEBPACK_IMPORTED_MODULE_1__.Z)();return{axisLabel:{fontSize:20,padding:30,fill:theme.palette.neutral200,fontFamily:theme.typography.fontFamily,letterSpacing:.55,lineHeight:16},tickLabels:{fontSize:11,padding:7,fill:theme.palette.neutral200,fontFamily:theme.typography.fontFamily,letterSpacing:.55,lineHeight:16}}}}}]);
//# sourceMappingURL=components-display-ZigChart-ZigChart-stories.7f486360.iframe.bundle.js.map