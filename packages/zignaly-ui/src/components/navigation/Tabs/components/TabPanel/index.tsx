// Dependencies
import React from "react";

// Styles
import * as styled from "./styles";

export interface Props {
  value: any;
  index: any;
  children: React.ReactNode;
}

const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <styled.Content>{children}</styled.Content>}
    </div>
  );
};

export default TabPanel;
