import React from "react";
import { ThemeProvider as _ThemeProvider } from "styled-components";

const ThemeProvider = ({ theme, children }: { theme: any; children: any }) => {
  return <_ThemeProvider theme={theme}>{children}</_ThemeProvider>;
};

export default ThemeProvider;
