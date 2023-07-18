import { styledIf } from "../../../utils/styled";
import { styled } from "@mui/system";

export const Layout = styled("div")<{ error?: string; loading?: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  .input-box {
    background: ${(props) => props.theme.palette.backgrounds.input2fa};
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
          background: unset;
        }
    `,
    )}
  `}
    div:first-child {
      display: flex;
      gap: 8px;
    }

    input {
      background: ${(props) => props.theme.palette.backgrounds.input2fa};
      background: linear-gradient(
        90deg,
        ${(props) => props.theme.palette.backgrounds.input2fa} 0%,
        ${(props) => props.theme.palette.backgrounds.input2fa} 100%
      );
      border-radius: 8px;
      border: 1px solid ${(props) => props.theme.palette.neutral600} !important;
      color: ${(props) => `${props.theme.palette.neutral100}`};
      width: 64px !important;
      font-family: ${
        // @ts-ignore
        (props) => props.theme.typography.fontFamily
      };
      height: 64px !important;
      font-size: 26px;
    }

    input:not(:placeholder-shown):valid {
      border-width: 1px;
      border-image-source: ${(props) => props.theme.palette.input2faGradientBorder};
      border-image-slice: 1;
      background-image: linear-gradient(
          to bottom,
          ${(props) => props.theme.palette.backgrounds.modal},
          ${(props) => props.theme.palette.backgrounds.modal}
        ),
        ${(props) => props.theme.palette.backgrounds.input2faGradient};
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
            border-color: ${props.theme.palette.redGraphOrError} !important;
          }
       }
    `,
    )}
  `}
`;
