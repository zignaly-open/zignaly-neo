import AvenirNextOtf from "../assets/fonts/AvenirNext/AvenirNextLTPro-Regular.otf";
import AvenirNextBoldOtf from "../assets/fonts/AvenirNext/AvenirNextLTPro-Bold.otf";
import { createGlobalStyle } from "styled-components";

export const AvenirNext = createGlobalStyle`
  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextOtf});
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextBoldOtf});
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;
