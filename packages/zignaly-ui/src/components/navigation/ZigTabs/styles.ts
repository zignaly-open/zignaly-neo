import styled from "@emotion/styled";
import { Tabs } from "@mui/material";
import { dark } from "../../../theme";

export const ZigTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background: ${dark.backgrounds.buttonPrimary};
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
    color: ${dark.palette.contrasting};
    font-weight: 600;
  }
`;
