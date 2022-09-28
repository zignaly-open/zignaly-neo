import styled from "styled-components";
import { styledIf } from "../../../utils/styled";

export const Layout = styled.div<{ error?: string }>`
  .input-box {
    background: #0f1124;

    input {
      background: #0f1124;
      background: linear-gradient(90deg, #0f1124 0%, #0f1124 35%, #0f1124 100%);
      border-color: #35334a !important;
      color: ${(props) => `${props.theme.neutral100}`};
      font-family: "Avenir Next", "Red Hat Text", sans-serif;
    }
  }

  ${(props) => `
    ${styledIf(
      props.error,
      `
       .input-box {
          margin-bottom: 10px;
          input {
            border-color: ${props.theme.redGraphOrError} !important;
          }
       }
    `,
    )}
  `}
`;
