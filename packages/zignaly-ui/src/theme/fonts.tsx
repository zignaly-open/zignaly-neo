import AvenirNext from "../assets/fonts/AvenirNext/AvenirNextLTPro-Regular.otf";
import AvenirNextBold from "../assets/fonts/AvenirNext/AvenirNextLTPro-Bold.otf";
import { createGlobalStyle } from "styled-components";

export const avenirNext = createGlobalStyle`
  @font-face {
    font-family: "Avenir Next", sans-serif;
    src: url(${AvenirNext});
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Avenir Next", sans-serif;
    src: url(${AvenirNextBold});
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;
