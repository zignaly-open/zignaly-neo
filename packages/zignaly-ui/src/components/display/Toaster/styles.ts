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
  box-shadow: 4px 6px 4px ${(props) => props.theme.neutral900}44;
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

  ${({ variant, theme: { palette, backgrounds } }) =>
    variant === "success" &&
    css`
      ${Caption} {
        color: ${palette.greenGraph};
      }

      border: 1px solid ${backgrounds.toastSuccess};
      background: ${backgrounds.toastSuccess};
    `}


  ${({ variant, theme: { palette } }) =>
    variant === "info" &&
    css`
      ${Caption} {
        color: ${palette.neutral200};
      }

      border: 1px solid ${palette.neutral600};
      background: ${palette.neutral600};
    `}

  ${({ variant, theme: { palette, backgrounds } }) =>
    variant === "error" &&
    css`
      ${Caption} {
        color: ${palette.redGraphOrError};
      }

      border: 1px solid ${backgrounds.toastError};
      background: ${backgrounds.toastError};
    `}
`;
