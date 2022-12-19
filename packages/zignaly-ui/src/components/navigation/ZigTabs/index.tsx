import React, { useMemo } from "react";
import { Box, TabsProps } from "@mui/material";
import * as styled from "./styles";

const ZigTabs = (props: TabsProps) => {
  const { children, ...restProps } = props;

  // Find a tab asideComponent matching current selected tab
  const asideComponent = useMemo(() => {
    const arr = Array.isArray(children) ? children : [children];
    const el = arr.find((c, i) => i === props.value && c.props.asideComponent);
    return el?.props.asideComponent;
  }, [props.value, children]);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <styled.ZigTabs {...restProps}>{children}</styled.ZigTabs>
      {asideComponent}
    </Box>
  );
};
export default ZigTabs;

export { default as ZigTab } from "./components/Tab";
export { default as ZigTabPanel } from "./components/TabPanel";
