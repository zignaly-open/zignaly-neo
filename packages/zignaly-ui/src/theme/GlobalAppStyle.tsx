import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { NiceScrollbar, ToasterStyle } from "../utils/css";
import { createGlobalStyle } from "styled-components";
import { useTheme } from "@mui/material";

const NiceScrollGlobalStyle = createGlobalStyle`${NiceScrollbar}`;
const ToasterGlobalStyle = createGlobalStyle`${ToasterStyle}`;
const Reset = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-size: 100%;
    overflow: overlay;
    color-scheme: dark;
  }
  
   a {
     color: inherit;
     text-decoration: none;
   }
  
  * {
    box-sizing: border-box;
  }
  
  ul, li, ol {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
`;

export const GlobalAppStyle: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Reset />
      <ToasterGlobalStyle />

      {
        // @ts-ignore
        !!window.isSafari && <NiceScrollGlobalStyle />
      }

      <GlobalStyles
        styles={{
          body: {
            fontFamily: theme.typography.fontFamily,
            background: theme.palette.backgrounds.body,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: theme.palette.neutral000,
            backgroundPositionX: "center",
            backgroundPositionY: "top",
          },
        }}
      />
    </>
  );
};
