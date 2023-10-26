"use strict";(self.webpackChunk_zignaly_open_ui=self.webpackChunk_zignaly_open_ui||[]).push([[1940],{"./src/components/navigation/ZigTabs/stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{TabsExample:()=>TabsExample,default:()=>stories});var react=__webpack_require__("../../node_modules/react/index.js"),Box=__webpack_require__("../../node_modules/@mui/material/Box/Box.js"),emotion_styled_browser_esm=__webpack_require__("../../node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js"),Tabs=__webpack_require__("../../node_modules/@mui/material/Tabs/Tabs.js");const ZigTabs=(0,emotion_styled_browser_esm.Z)(Tabs.Z)`
  .MuiTabs-indicator {
    background: ${({theme})=>theme.palette.backgrounds.buttonPrimary};
    border-radius: 6px;
  }

  .MuiTabs-flexContainer {
    gap: 16px;
  }

  .MuiTab-root {
    text-transform: initial;
    color: #9ca3af;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    padding-left: 0;
    padding-right: 0;
    position: relative;

    &:before {
      /* Hack to avoid the button from changing size when bold */
      content: attr(data-text);
      font-weight: bold;
      visibility: hidden;
      height: 0;
    }
  }

  .Mui-selected {
    color: ${({theme})=>theme.palette.contrasting};
    font-weight: 600;
  }
`;var jsx_runtime=__webpack_require__("../../node_modules/react/jsx-runtime.js");const ZigTabs_ZigTabs=props=>{const{children,...restProps}=props,asideComponent=(0,react.useMemo)((()=>{const el=(Array.isArray(children)?children:[children]).find((c=>c.props.value===props.value&&c.props.asideComponent));return el?.props.asideComponent}),[props.value,children]);return(0,jsx_runtime.jsxs)(Box.Z,{display:"flex",justifyContent:"space-between",flexWrap:"wrap",flex:1,sx:{flexDirection:{xs:"column",sm:"row"},rowGap:2,alignItems:{xs:"flex-start",sm:"center"}},children:[(0,jsx_runtime.jsx)(ZigTabs,{...restProps,children}),asideComponent]})};ZigTabs_ZigTabs.displayName="ZigTabs";const navigation_ZigTabs=ZigTabs_ZigTabs;try{ZigTabs_ZigTabs.displayName="ZigTabs",ZigTabs_ZigTabs.__docgenInfo={description:"",displayName:"ZigTabs",props:{action:{defaultValue:null,description:"Callback fired when the component mounts.\nThis is useful when you want to trigger an action programmatically.\nIt supports two actions: `updateIndicator()` and `updateScrollButtons()`\n@param actions This object contains all possible actions\nthat can be triggered programmatically.",name:"action",required:!1,type:{name:"Ref<TabsActions> | undefined"}},allowScrollButtonsMobile:{defaultValue:{value:"false"},description:"If `true`, the scroll buttons aren't forced hidden on mobile.\nBy default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.",name:"allowScrollButtonsMobile",required:!1,type:{name:"boolean | undefined"}},"aria-label":{defaultValue:null,description:"The label for the Tabs as a string.",name:"aria-label",required:!1,type:{name:"string | undefined"}},"aria-labelledby":{defaultValue:null,description:"An id or list of ids separated by a space that label the Tabs.",name:"aria-labelledby",required:!1,type:{name:"string | undefined"}},centered:{defaultValue:{value:"false"},description:"If `true`, the tabs are centered.\nThis prop is intended for large views.",name:"centered",required:!1,type:{name:"boolean | undefined"}},children:{defaultValue:null,description:"The content of the component.",name:"children",required:!1,type:{name:"ReactNode"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<TabsClasses> & Partial<ClassNameMap<never>>) | undefined"}},indicatorColor:{defaultValue:{value:"'primary'"},description:"Determines the color of the indicator.",name:"indicatorColor",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"primary"'}]}},onChange:{defaultValue:null,description:"Callback fired when the value changes.\n@param event The event source of the callback. **Warning**: This is a generic event not a change event.\n@param value We default to the index of the child (number)",name:"onChange",required:!1,type:{name:"((event: SyntheticEvent<Element, Event>, value: any) => void) | undefined"}},orientation:{defaultValue:{value:"'horizontal'"},description:"The component orientation (layout flow direction).",name:"orientation",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"vertical"'},{value:'"horizontal"'}]}},ScrollButtonComponent:{defaultValue:{value:"TabScrollButton"},description:"The component used to render the scroll buttons.",name:"ScrollButtonComponent",required:!1,type:{name:"ElementType<any> | undefined"}},scrollButtons:{defaultValue:{value:"'auto'"},description:"Determine behavior of scroll buttons when tabs are set to scroll:\n\n- `auto` will only present them when not all the items are visible.\n- `true` will always present them.\n- `false` will never present them.\n\nBy default the scroll buttons are hidden on mobile.\nThis behavior can be disabled with `allowScrollButtonsMobile`.",name:"scrollButtons",required:!1,type:{name:'boolean | "auto" | undefined'}},selectionFollowsFocus:{defaultValue:null,description:"If `true` the selected tab changes on focus. Otherwise it only\nchanges on activation.",name:"selectionFollowsFocus",required:!1,type:{name:"boolean | undefined"}},TabIndicatorProps:{defaultValue:{value:"{}"},description:"Props applied to the tab indicator element.",name:"TabIndicatorProps",required:!1,type:{name:"(HTMLAttributes<HTMLDivElement> & { sx?: SxProps<Theme> | undefined; }) | undefined"}},TabScrollButtonProps:{defaultValue:{value:"{}"},description:"Props applied to the [`TabScrollButton`](/material-ui/api/tab-scroll-button/) element.",name:"TabScrollButtonProps",required:!1,type:{name:"Partial<TabScrollButtonProps> | undefined"}},textColor:{defaultValue:{value:"'primary'"},description:"Determines the color of the `Tab`.",name:"textColor",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"secondary"'},{value:'"primary"'},{value:'"inherit"'}]}},value:{defaultValue:null,description:"The value of the currently selected `Tab`.\nIf you don't want any selected `Tab`, you can set this prop to `false`.",name:"value",required:!1,type:{name:"any"}},variant:{defaultValue:{value:"'standard'"},description:"Determines additional display behavior of the tabs:\n\n- `scrollable` will invoke scrolling properties and allow for horizontally\nscrolling (or swiping) of the tab bar.\n-`fullWidth` will make the tabs grow to use all the available space,\nwhich should be used for small views, like on mobile.\n- `standard` will render the default state.",name:"variant",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"standard"'},{value:'"scrollable"'},{value:'"fullWidth"'}]}},visibleScrollbar:{defaultValue:{value:"false"},description:"If `true`, the scrollbar is visible. It can be useful when displaying\na long vertical list of tabs.",name:"visibleScrollbar",required:!1,type:{name:"boolean | undefined"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme> | undefined"}},tabIndex:{defaultValue:{value:"0"},description:"",name:"tabIndex",required:!1,type:{name:"number | undefined"}},centerRipple:{defaultValue:{value:"false"},description:"If `true`, the ripples are centered.\nThey won't start at the cursor interaction position.",name:"centerRipple",required:!1,type:{name:"boolean | undefined"}},disabled:{defaultValue:{value:"false"},description:"If `true`, the component is disabled.",name:"disabled",required:!1,type:{name:"boolean | undefined"}},disableRipple:{defaultValue:{value:"false"},description:"If `true`, the ripple effect is disabled.\n\n⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure\nto highlight the element by applying separate styles with the `.Mui-focusVisible` class.",name:"disableRipple",required:!1,type:{name:"boolean | undefined"}},disableTouchRipple:{defaultValue:{value:"false"},description:"If `true`, the touch ripple effect is disabled.",name:"disableTouchRipple",required:!1,type:{name:"boolean | undefined"}},focusRipple:{defaultValue:{value:"false"},description:"If `true`, the base button will have a keyboard focus ripple.",name:"focusRipple",required:!1,type:{name:"boolean | undefined"}},focusVisibleClassName:{defaultValue:null,description:"This prop can help identify which element has keyboard focus.\nThe class name will be applied when the element gains the focus through keyboard interaction.\nIt's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).\nThe rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).\nA [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components\nif needed.",name:"focusVisibleClassName",required:!1,type:{name:"string | undefined"}},LinkComponent:{defaultValue:{value:"'a'"},description:"The component used to render a link when the `href` prop is provided.",name:"LinkComponent",required:!1,type:{name:"ElementType<any> | undefined"}},onFocusVisible:{defaultValue:null,description:"Callback fired when the component is focused with a keyboard.\nWe trigger a `onFocus` callback too.",name:"onFocusVisible",required:!1,type:{name:"FocusEventHandler<any> | undefined"}},TouchRippleProps:{defaultValue:null,description:"Props applied to the `TouchRipple` element.",name:"TouchRippleProps",required:!1,type:{name:"Partial<TouchRippleProps> | undefined"}},touchRippleRef:{defaultValue:null,description:"A ref that points to the `TouchRipple` element.",name:"touchRippleRef",required:!1,type:{name:"Ref<TouchRippleActions> | undefined"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null | undefined"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/navigation/ZigTabs/index.tsx#ZigTabs"]={docgenInfo:ZigTabs_ZigTabs.__docgenInfo,name:"ZigTabs",path:"src/components/navigation/ZigTabs/index.tsx#ZigTabs"})}catch(__react_docgen_typescript_loader_error){}try{Tab.displayName="Tab",Tab.__docgenInfo={description:"",displayName:"Tab",props:{children:{defaultValue:null,description:"This prop isn't supported.\nUse the `component` prop if you need to change the children structure.\nThe content of the component.",name:"children",required:!1,type:{name:"null | undefined"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<TabClasses> & Partial<ClassNameMap<never>>) | undefined"}},disabled:{defaultValue:{value:"false\nfalse"},description:"If `true`, the component is disabled.",name:"disabled",required:!1,type:{name:"boolean | undefined"}},disableFocusRipple:{defaultValue:{value:"false"},description:"If `true`, the  keyboard focus ripple is disabled.",name:"disableFocusRipple",required:!1,type:{name:"boolean | undefined"}},icon:{defaultValue:null,description:"The icon to display.",name:"icon",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>> | undefined"}},iconPosition:{defaultValue:{value:"'top'"},description:"The position of the icon relative to the label.",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"bottom"'},{value:'"top"'},{value:'"end"'},{value:'"start"'}]}},label:{defaultValue:null,description:"The label element.",name:"label",required:!1,type:{name:"ReactNode"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme> | undefined"}},value:{defaultValue:null,description:"You can provide your own value. Otherwise, we fallback to the child position index.",name:"value",required:!1,type:{name:"any"}},wrapped:{defaultValue:{value:"false"},description:"Tab labels appear in a single row.\nThey can use a second line if needed.",name:"wrapped",required:!1,type:{name:"boolean | undefined"}},action:{defaultValue:null,description:"A ref for imperative actions.\nIt currently only supports `focusVisible()` action.",name:"action",required:!1,type:{name:"Ref<ButtonBaseActions> | undefined"}},tabIndex:{defaultValue:{value:"0"},description:"",name:"tabIndex",required:!1,type:{name:"number | undefined"}},centerRipple:{defaultValue:{value:"false"},description:"If `true`, the ripples are centered.\nThey won't start at the cursor interaction position.",name:"centerRipple",required:!1,type:{name:"boolean | undefined"}},disableRipple:{defaultValue:{value:"false"},description:"If `true`, the ripple effect is disabled.\n\n⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure\nto highlight the element by applying separate styles with the `.Mui-focusVisible` class.",name:"disableRipple",required:!1,type:{name:"boolean | undefined"}},disableTouchRipple:{defaultValue:{value:"false"},description:"If `true`, the touch ripple effect is disabled.",name:"disableTouchRipple",required:!1,type:{name:"boolean | undefined"}},focusRipple:{defaultValue:{value:"false"},description:"If `true`, the base button will have a keyboard focus ripple.",name:"focusRipple",required:!1,type:{name:"boolean | undefined"}},focusVisibleClassName:{defaultValue:null,description:"This prop can help identify which element has keyboard focus.\nThe class name will be applied when the element gains the focus through keyboard interaction.\nIt's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).\nThe rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).\nA [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components\nif needed.",name:"focusVisibleClassName",required:!1,type:{name:"string | undefined"}},LinkComponent:{defaultValue:{value:"'a'"},description:"The component used to render a link when the `href` prop is provided.",name:"LinkComponent",required:!1,type:{name:"ElementType<any> | undefined"}},onFocusVisible:{defaultValue:null,description:"Callback fired when the component is focused with a keyboard.\nWe trigger a `onFocus` callback too.",name:"onFocusVisible",required:!1,type:{name:"FocusEventHandler<any> | undefined"}},TouchRippleProps:{defaultValue:null,description:"Props applied to the `TouchRipple` element.",name:"TouchRippleProps",required:!1,type:{name:"Partial<TouchRippleProps> | undefined"}},touchRippleRef:{defaultValue:null,description:"A ref that points to the `TouchRipple` element.",name:"touchRippleRef",required:!1,type:{name:"Ref<TouchRippleActions> | undefined"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined"}},asideComponent:{defaultValue:null,description:"",name:"asideComponent",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/navigation/ZigTabs/index.tsx#Tab"]={docgenInfo:Tab.__docgenInfo,name:"Tab",path:"src/components/navigation/ZigTabs/index.tsx#Tab"})}catch(__react_docgen_typescript_loader_error){}try{TabPanel.displayName="TabPanel",TabPanel.__docgenInfo={description:"",displayName:"TabPanel",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/navigation/ZigTabs/index.tsx#TabPanel"]={docgenInfo:TabPanel.__docgenInfo,name:"TabPanel",path:"src/components/navigation/ZigTabs/index.tsx#TabPanel"})}catch(__react_docgen_typescript_loader_error){}var styled=__webpack_require__("../../node_modules/@mui/material/styles/styled.js"),Tab_Tab=__webpack_require__("../../node_modules/@mui/material/Tab/Tab.js");const styles_Tab=(0,styled.ZP)(Tab_Tab.Z,{shouldForwardProp:prop=>"asideComponent"!==prop})``,components_Tab_Tab=props=>(0,jsx_runtime.jsx)(styles_Tab,{...props,"data-text":props.label});components_Tab_Tab.displayName="Tab";const components_Tab=components_Tab_Tab;try{components_Tab_Tab.displayName="Tab",components_Tab_Tab.__docgenInfo={description:"",displayName:"Tab",props:{children:{defaultValue:null,description:"This prop isn't supported.\nUse the `component` prop if you need to change the children structure.\nThe content of the component.",name:"children",required:!1,type:{name:"null | undefined"}},classes:{defaultValue:null,description:"Override or extend the styles applied to the component.",name:"classes",required:!1,type:{name:"(Partial<TabClasses> & Partial<ClassNameMap<never>>) | undefined"}},disabled:{defaultValue:{value:"false\nfalse"},description:"If `true`, the component is disabled.",name:"disabled",required:!1,type:{name:"boolean | undefined"}},disableFocusRipple:{defaultValue:{value:"false"},description:"If `true`, the  keyboard focus ripple is disabled.",name:"disableFocusRipple",required:!1,type:{name:"boolean | undefined"}},icon:{defaultValue:null,description:"The icon to display.",name:"icon",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>> | undefined"}},iconPosition:{defaultValue:{value:"'top'"},description:"The position of the icon relative to the label.",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"bottom"'},{value:'"top"'},{value:'"end"'},{value:'"start"'}]}},label:{defaultValue:null,description:"The label element.",name:"label",required:!1,type:{name:"ReactNode"}},sx:{defaultValue:null,description:"The system prop that allows defining system overrides as well as additional CSS styles.",name:"sx",required:!1,type:{name:"SxProps<Theme> | undefined"}},value:{defaultValue:null,description:"You can provide your own value. Otherwise, we fallback to the child position index.",name:"value",required:!1,type:{name:"any"}},wrapped:{defaultValue:{value:"false"},description:"Tab labels appear in a single row.\nThey can use a second line if needed.",name:"wrapped",required:!1,type:{name:"boolean | undefined"}},action:{defaultValue:null,description:"A ref for imperative actions.\nIt currently only supports `focusVisible()` action.",name:"action",required:!1,type:{name:"Ref<ButtonBaseActions> | undefined"}},tabIndex:{defaultValue:{value:"0"},description:"",name:"tabIndex",required:!1,type:{name:"number | undefined"}},centerRipple:{defaultValue:{value:"false"},description:"If `true`, the ripples are centered.\nThey won't start at the cursor interaction position.",name:"centerRipple",required:!1,type:{name:"boolean | undefined"}},disableRipple:{defaultValue:{value:"false"},description:"If `true`, the ripple effect is disabled.\n\n⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure\nto highlight the element by applying separate styles with the `.Mui-focusVisible` class.",name:"disableRipple",required:!1,type:{name:"boolean | undefined"}},disableTouchRipple:{defaultValue:{value:"false"},description:"If `true`, the touch ripple effect is disabled.",name:"disableTouchRipple",required:!1,type:{name:"boolean | undefined"}},focusRipple:{defaultValue:{value:"false"},description:"If `true`, the base button will have a keyboard focus ripple.",name:"focusRipple",required:!1,type:{name:"boolean | undefined"}},focusVisibleClassName:{defaultValue:null,description:"This prop can help identify which element has keyboard focus.\nThe class name will be applied when the element gains the focus through keyboard interaction.\nIt's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).\nThe rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).\nA [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components\nif needed.",name:"focusVisibleClassName",required:!1,type:{name:"string | undefined"}},LinkComponent:{defaultValue:{value:"'a'"},description:"The component used to render a link when the `href` prop is provided.",name:"LinkComponent",required:!1,type:{name:"ElementType<any> | undefined"}},onFocusVisible:{defaultValue:null,description:"Callback fired when the component is focused with a keyboard.\nWe trigger a `onFocus` callback too.",name:"onFocusVisible",required:!1,type:{name:"FocusEventHandler<any> | undefined"}},TouchRippleProps:{defaultValue:null,description:"Props applied to the `TouchRipple` element.",name:"TouchRippleProps",required:!1,type:{name:"Partial<TouchRippleProps> | undefined"}},touchRippleRef:{defaultValue:null,description:"A ref that points to the `TouchRipple` element.",name:"touchRippleRef",required:!1,type:{name:"Ref<TouchRippleActions> | undefined"}},ref:{defaultValue:null,description:"",name:"ref",required:!1,type:{name:"((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined"}},asideComponent:{defaultValue:null,description:"",name:"asideComponent",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/navigation/ZigTabs/components/Tab/index.tsx#Tab"]={docgenInfo:components_Tab_Tab.__docgenInfo,name:"Tab",path:"src/components/navigation/ZigTabs/components/Tab/index.tsx#Tab"})}catch(__react_docgen_typescript_loader_error){}const TabPanel_TabPanel=props=>{const{children,value,index,...other}=props;return(0,jsx_runtime.jsx)("div",{role:"tabpanel",hidden:value!==index,"aria-labelledby":`tab-${index}`,...other,children:value===index&&(0,jsx_runtime.jsx)(Box.Z,{mt:2,children})})};TabPanel_TabPanel.displayName="TabPanel";const components_TabPanel=TabPanel_TabPanel;try{TabPanel_TabPanel.displayName="TabPanel",TabPanel_TabPanel.__docgenInfo={description:"",displayName:"TabPanel",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/navigation/ZigTabs/components/TabPanel/index.tsx#TabPanel"]={docgenInfo:TabPanel_TabPanel.__docgenInfo,name:"TabPanel",path:"src/components/navigation/ZigTabs/components/TabPanel/index.tsx#TabPanel"})}catch(__react_docgen_typescript_loader_error){}const stories={title:"Navigation/ZigTabs",component:navigation_ZigTabs,argTypes:{tabs:{table:{disable:!0}},content:{table:{disable:!0}}}},TabsExample=(args=>{const[value,setValue]=(0,react.useState)(0);return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(navigation_ZigTabs,{...args,onChange:(_,newValue)=>{setValue(newValue)},value,children:args.tabs?.map((t=>(0,jsx_runtime.jsx)(components_Tab,{label:t},t)))}),args?.content?.map(((c,i)=>(0,jsx_runtime.jsx)(components_TabPanel,{value,index:i,children:args?.content?.[i]},c)))]})}).bind({});TabsExample.args={tabs:["Tab 1","Tab 2","Tab with long title 3","Another Tab 4"],content:["Content 1","Content 2","Content 3","Content 4"]}}}]);
//# sourceMappingURL=components-navigation-ZigTabs-stories.01bbd6a0.iframe.bundle.js.map