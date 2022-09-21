import React from "react";
import styled from "styled-components";
import { styledIf } from "utils/styled";
import { buttonSizes, buttonVariants } from "./types";
import Loader from "components/display/Loader";
import Theme from "../../../theme/theme";

// TODO: an icon button component should not take 500 LOC
// TODO: Simplify this

const isPrimaryButton = (variant: keyof typeof buttonVariants) =>
  variant === buttonVariants.primary;

const isSecondaryButton = (variant: keyof typeof buttonVariants) =>
  variant === buttonVariants.secondary;

const isFlatButton = (variant: keyof typeof buttonVariants) => variant === buttonVariants.flat;

const isSmallButton = (size: keyof typeof buttonSizes) => size === buttonSizes.small;

const isMediumButton = (size: keyof typeof buttonSizes) => size === buttonSizes.medium;

const isLargeButton = (size: keyof typeof buttonSizes) => size === buttonSizes.large;

const isXLargeButton = (size: keyof typeof buttonSizes) => size === buttonSizes.xlarge;

export const Icon = styled.div`
  z-index: 2;
  position: relative;
  transition: color 0.2s linear;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonLoader = styled(Loader)`
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: relative;
  border-radius: 4px;
  transition: all 0.2s linear;
  outline: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface LayoutProps {
  size: keyof typeof buttonSizes;
  variant: keyof typeof buttonVariants;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  colors: {
    normal: string;
    active: string;
  };
  isFocused: boolean;
  disabled: boolean;
  shrinkWrap?: boolean;
  theme: Theme;
}

export const Layout = styled.div`
  position: relative;
  display: inline-flex;
`;

export const IconContainer = styled.div``;

const renderSizeProps = (props: { size: keyof typeof buttonSizes }) => `
  ${styledIf(
    isSmallButton(props.size),
    `  
       ${Icon} {
          svg {
            width: 14px;
          }
        }
  
        ${ButtonLoader}{
          height: 15px;
          width: 15px;
        }
  
        ${Container} {
          width: 34px;
          height: 30px;
        }
     `,
  )}
     
  ${styledIf(
    isMediumButton(props.size),
    `
      ${Icon} {
        svg {
          width: 18px;
        }
      }

      ${ButtonLoader}{
        height: 20px;
        width: 20px;
      }

      ${Container} {
        width: 42px;
        height: 36px;
      }
    `,
  )}

  ${styledIf(
    isLargeButton(props.size),
    `
      ${Icon} {
        svg {
          width: 18px;
        }
      }

      ${ButtonLoader}{
        height: 25px;
        width: 25px;
      }

      ${Container} {
        width: 56px;
        height: 48px;
      }
    `,
  )}

  ${styledIf(
    isXLargeButton(props.size),
    `
      ${Icon} {
        svg {
          width: 24px;
        }
      }

      ${ButtonLoader}{
        height: 30px;
        width: 30px;
      }

      ${Container} {
        width: 68px;
        height: 60px;
      }
    `,
  )}
`;

const renderPrimaryProps = (props: LayoutProps) => `
  ${styledIf(
    isPrimaryButton(props.variant),
    `
      ${Container} {
        background: linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%);
      }

      &:enabled:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
      }

      &:enabled:focus:focus-visible {
        background: linear-gradient(121.21deg, #A600FB 10.7%, #6F06FC 31.3%, #4959F5 60.13%, #2E8DDF 76.19%, #12C1C9 89.78%);

        ${Container} {
          border: 1px solid white;
          background: linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%);
        }
      }

      &[disabled] {
        ${IconContainer}{
          opacity: 0.33;
        }
      }

      &:enabled {
        ${Container} {
          &:before {
            border-radius: inherit;
            background: linear-gradient(312.12deg, #8671F7 14.16%, #7EC9F9 83.59%);
            content: '';
            display: block;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            width: 100%;
            z-index: 1;
            transition: all 100ms linear;
          }
        }
      }

      &:enabled:active {
        ${Container} {
          &:before {
            opacity: 1;
          }
        }
      }
    `,
  )}
`;

const renderSecondaryProps = (props: LayoutProps) => `
  ${styledIf(
    isSecondaryButton(props.variant),
    `
      ${Container} {
        background: rgba(16, 18, 37, 0.3);
        transition: all 0.2s linear;
        border: 1px ${props.theme.neutral600} solid;

      ${styledIf(
        props.disabled,
        `
          opacity: 0.33;
        `,
        `
          &:hover {
            background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
            border-color: ${props.theme.neutral500};
          }
        `,
      )}

      ${Icon} {
        color: ${props.theme.neutral200};
      }

      &:enabled:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
      }

      &:enabled:focus:focus-visible {
          ${Container} {
            background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
            -webkit-transition:none;
            -moz-transition:none;
            -o-transition:none;
            transition:none;
            box-shadow: inset 0px 0px 0px 2px #FFFFFF;
            border-radius: 5px;
            border-color: ${props.theme.highlighted};
          }
        }
      }

      &:enabled:active {
        ${Container} {
          background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
          -webkit-transition:none;
          -moz-transition:none;
          -o-transition:none;
          transition:none;
          border-color: ${props.theme.highlighted};
      }
    `,
  )}
`;

const renderFlatProps = (props: LayoutProps) => `
  ${styledIf(
    isFlatButton(props.variant),
    `
      ${styledIf(
        props.shrinkWrap,
        `
          padding: 0;
          ${Container}{
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
          }
          ${IconContainer} {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
          }
        `,
      )}
      
      ${Container} {
        transition: all 0.2s linear;
        border: none;
        background: transparent;
      }

      &:enabled:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
      }

      &:enabled:focus:focus-visible {
        ${Container} {
          border: 1px solid ${props.theme.neutral000};
          background: #040618;

          &:before {
            background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
            opacity: 1;
          }
        }

        ${Icon} {
          color: ${props.theme.neutral000};
        }
      }

      &[disabled] {
        ${IconContainer}{
          opacity: 0.33;
        }
      }

      &:enabled {
        ${Container} {
          background: none;
        }
      }
    `,
  )}
`;

const renderFocusedProps = (props: LayoutProps) => `
    ${styledIf(
      props.isFocused,
      ` 
      background: ${props.theme.dropDownBackground};      
      padding: 2px;
      border-radius: 4px 4px 0 0;
             
      &:enabled:active {
        padding: 2px;
        background: #12152c;
      }
             
      ${Container} {
        background: ${props.theme.dropDownBackground};
        border: 1px solid ${props.theme.dropDownBackground} !important;
              
        &:before {
          opacity: 0 !important;
        }
      }
    `,
    )}
`;

export const ViewPort = styled.button<LayoutProps>`
  border-radius: 4px;
  border: none;
  cursor: pointer;
  padding: 2px;
  outline: none;

  position: relative;
  user-select: none;
  background: transparent;

  transition: all 0.1s linear;

  &[disabled] {
    cursor: default;
  }

  ${renderSizeProps}
  ${renderPrimaryProps}
  ${renderSecondaryProps}
  ${renderFlatProps}
  ${renderFocusedProps}
`;
