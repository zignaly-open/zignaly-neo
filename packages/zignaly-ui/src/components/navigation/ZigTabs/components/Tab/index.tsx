import React from "react";
import { TabProps } from "@mui/material";
import * as styled from "./styles";

const Tab = (
  props: TabProps & {
    asideComponent?: React.ReactNode;
  },
) => {
  return <styled.Tab {...props} data-text={props.label} />;
};
export default Tab;
