import React from "react";
import { Tab as TabMui, TabProps } from "@mui/material";

const Tab = (
  props: TabProps & {
    asideComponent?: React.ReactNode;
  },
) => {
  return <TabMui {...props} data-text={props.label} />;
};
export default Tab;
