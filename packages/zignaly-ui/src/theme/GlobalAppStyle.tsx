import React from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import { NiceScrollbar, ToasterStyle } from "../utils/css";
import { Theme } from "@mui/system";
import { createGlobalStyle } from "styled-components";

const NiceScrollGlobalStyle = createGlobalStyle`${NiceScrollbar}`;
const ToasterGlobalStyle = createGlobalStyle`${ToasterStyle}`;

export const GlobalAppStyle: React.FC = () => {
  return (
    <>
      {
        // @ts-ignore
        window.isSafari && <NiceScrollGlobalStyle />
      }
      <ToasterGlobalStyle />
      <GlobalStyles
        styles={{
          body: `
          padding: 0;
          margin: 0;
          background: ${({ theme }: { theme: Theme }) => theme.palette.backgrounds.body};
          background-repeat: no-repeat;
          background-size: cover;
          font-size: 100%;
          color: #fff;
          overflow: overlay;
          color-scheme: dark;
        `,
          a: `
          color: inherit;
          text-decoration: none;
        `,
          "*": `
          box-sizing: border-box;
        `,
          "ul, li, ol": `
         padding: 0;
          margin: 0;
          list-style-type: none;
        `,
        }}
      />
    </>
  );
};
