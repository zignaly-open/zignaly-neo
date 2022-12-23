import styled from "@emotion/styled";
import { Tabs } from "@mui/material";

export const ZigTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background: linear-gradient(289.8deg, #149cad 0%, #4540c1 100%);
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
    color: #f3f4f6;
    font-weight: 600;
  }
`;
