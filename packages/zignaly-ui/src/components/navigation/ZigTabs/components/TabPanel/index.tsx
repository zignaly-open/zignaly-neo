import React from "react";
import { Box } from "@mui/material";

export interface Props {
  value: any;
  index: any;
  children: React.ReactNode;
}

const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box m={2}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
