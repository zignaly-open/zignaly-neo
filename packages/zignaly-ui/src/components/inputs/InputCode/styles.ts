import styled from "styled-components";
import { styledIf } from "../../../utils/styled";

export const Layout = styled.div<{ error?: string; loading?: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  .input-box {
    background: #0f1124;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content !important;
    position: relative;

    ${(props) => `
    ${styledIf(
      props.loading,
      `
        div:last-of-type {
          height: 64px;
          border-radius: 8px;
        }
    `,
    )}
  `}
    div:first-child {
      display: flex;
      gap: 8px;
    }

    input {
      background: #0f1124;
      background: linear-gradient(90deg, #0f1124 0%, #0f1124 35%, #0f1124 100%);
      border-radius: 8px;
      border: solid 1px rgba(53, 51, 74, 0.4) !important;
      color: ${(props) => `${props.theme.neutral100}`};
      font-family: "Avenir Next", "Red Hat Text", sans-serif;
      width: 64px !important;
      height: 64px !important;
      font-size: 26px;
    }

    input:not(:placeholder-shown):valid {
      border-width: 1px;
      border-image-source: linear-gradient(101deg, #3f3bb1 7%, #138ea0 94%);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #101225, #101225),
        linear-gradient(101deg, rgba(63, 59, 177, 0.7) 7%, rgba(19, 142, 160, 0.7) 94%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      border: none !important;
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
