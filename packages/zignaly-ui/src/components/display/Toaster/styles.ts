import styled, { css } from "styled-components";

export const Caption = styled.div`
  margin: 0 8px;
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

  ${(props) =>
    props.size === "large" &&
    css`
      ${IconContainer} {
        width: 26px;
        height: 26px;
      }

      padding: 11px 24px;
      height: 48px;
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      ${IconContainer} {
        width: 24px;
        height: 24px;
      }

      padding: 4px 18px;
      height: 32px;
    `}

  ${(props) =>
    props.variant === "success" &&
    css`
      ${Caption} {
        color: ${props.theme.greenGraph};
      }

      border: 1px solid ${props.theme.successToasterBg};
      background: ${props.theme.successToasterBg};
    `}


  ${(props) =>
    props.variant === "info" &&
    css`
      ${Caption} {
        color: ${props.theme.neutral200};
      }

      border: 1px solid ${props.theme.neutral600};
      background: ${props.theme.neutral600};
    `}

  ${(props) =>
    props.variant === "error" &&
    css`
      ${Caption} {
        color: ${props.theme.redGraphOrError};
      }

      border: 1px solid ${props.theme.errorToasterBg};
      background: ${props.theme.errorToasterBg};
    `}
`;
