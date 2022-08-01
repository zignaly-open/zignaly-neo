import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Caption = styled.div`
  margin: 0px 8px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const ToastContainer = styled.div<{ variant: string; size: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  position: absolute;

  ${(props) => `
    ${styledIf(
      props.size === "large",
      `
      ${IconContainer}{
        width: 26px;
        height: 26px;
      }
      padding: 11px 24px;
      height: 48px;
        `,
    )}

    ${styledIf(
      props.size === "small",
      `
        ${IconContainer}{
        width: 24px;
        height: 24px;
        }
        padding: 4px 18px;
        height: 32px;
          `,
    )}
    
    ${styledIf(
      props.variant === "success",
      `
        ${Caption} {
            color:${props.theme.greenGraph};
        }
        border: 1px solid ${props.theme.successToasterBg};
        background: ${props.theme.successToasterBg};
        `,
    )}

    ${styledIf(
      props.variant === "error",
      `
      ${Caption} {
        color:${props.theme.redGraphOrError};
    }
        border: 1px solid ${props.theme.errorToasterBg};
        background: ${props.theme.errorToasterBg};
        `,
    )}
  `}
`;
