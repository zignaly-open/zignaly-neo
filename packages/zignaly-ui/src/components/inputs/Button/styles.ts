// Dependencies
import Loader from "components/display/Loader";
import styled from "styled-components";
import { styledIf } from "utils/styled";
import { buttonVariants, buttonSizes, buttonColors } from "./types";

const isPrimaryButton = (variant: keyof typeof buttonVariants) => variant === "primary";

const isSecondaryButton = (variant: keyof typeof buttonVariants) => variant === "secondary";

const isSmallButton = (size: keyof typeof buttonSizes) => size === "small";

const isMediumButton = (size: keyof typeof buttonSizes) => size === "medium";

const isLargeButton = (size: keyof typeof buttonSizes) => size === "large";

const isXLargeButton = (size: keyof typeof buttonSizes) => size === "xlarge";

const isGreenColor = (color: keyof typeof buttonColors) => color === "green";

export const Caption = styled.div`
  z-index: 2;
  position: relative;
  transition: color 0.2s linear;
`;

export const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  position: relative;
  border-radius: 5px;
  transition: all 0.2s linear;
  outline: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LeftElement = styled.div`
  z-index: 3;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RightElement = styled(LeftElement)``;

/**
 * Icons
 */

export const CenterIcon = styled.div`
  position: relative;
  top: 1px;
`;

export const ButtonLoader = styled(Loader)`
  justify-content: center;
  align-items: center;
`;
/**
 * Layout
 */
interface LayoutProps {
  variant: keyof typeof buttonVariants;
  size: keyof typeof buttonSizes;
  color: keyof typeof buttonColors;
  withLeftElement: boolean;
  withRightElement: boolean;
  withElements: boolean;
  isLoading?: boolean;
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const Layout = styled.button<LayoutProps>`
  border-radius: 5px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  svg {
    width: 100%;
    height: 100%;
  }
  position: relative;
  user-select: none;
  background: transparent;

  transition: all 0.2s linear;

  &[disabled] {
    cursor: default;
  }

  ${(props) => `

  ${styledIf(
    props.isLoading,
    `
    ${ElementsContainer}{
      opacity: 0;

    }
    `,
  )}
      
    ${styledIf(
      isSmallButton(props.size),
      `
      ${Caption}{
        &.buttonsm{

        }
      }
      ${Container} {
        height: 30px;
        min-width: 76px;
      }

      ${styledIf(
        props.withLeftElement,
        `
        ${Container} {
          padding: 5px 18px 5px 12px;
        }
        `,
      )}

      ${styledIf(
        props.withRightElement,
        `
        ${Container} {
          padding: 5px 12px 5px 18px;
        }
        `,
      )}

      ${styledIf(
        props.withElements,
        `
        ${Container} {
          padding: 5px 12px;        
        }
        `,
      )}

      ${ButtonLoader} {
        height: 15px;
        width: 15px;
      }

      ${Caption} {
        font-size: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: 12px;
        letter-spacing: 1.1px;
        text-align: center;
      }
      
      ${LeftElement} {
          width: 20px;
          height: 20px;
          margin-right: 4px;
      }

      ${RightElement} {
          width: 20px;
          height: 20px;
          margin-left: 4px;

      }
    `,
    )}
    
  ${styledIf(
    isMediumButton(props.size),
    `    
     
      ${Container} {
        min-width: 76px;
        height: 36px; 
      }

      ${styledIf(
        props.withLeftElement,
        `
        ${Container} {
          padding: 8px 16px 8px 12px;
        }
        `,
      )}

      ${styledIf(
        props.withRightElement,
        `
        ${Container} {
          padding: 8px 12px 8px 16px;
        }
        `,
      )}

      ${styledIf(
        props.withElements,
        `
        ${Container} {
          padding: 8px 12px;
        }
        `,
      )}

      ${ButtonLoader} {
        height: 20px;
        width: 20px;
      }
      
      ${Caption} {
        font-size: 11px;
        font-style: normal;
        font-weight: 600;
        line-height: 14px;
        letter-spacing: 1.1px;
        text-align: center;
      }
      
      ${LeftElement} {
          height: 20px;
          width: 20px;
          margin-right: 4px;  
      }

      ${RightElement} {
          height: 20px;
          width: 20px;
          margin-left: 4px;
          margin-right: 0;
      }
  `,
  )}
    
  ${styledIf(
    isLargeButton(props.size),
    `     
      ${Container} {
        height: 48px;
        min-width: 110px;
      }

      ${styledIf(
        props.withLeftElement,
        `
        ${Container} {
          padding: 14px 32px 14px 24px;
        }
        `,
      )}

      ${styledIf(
        props.withRightElement,
        `
        ${Container} {
          padding: 14px 24px 14px 32px;
        }
        `,
      )}

      ${styledIf(
        props.withElements,
        `
        ${Container} {
          padding: 14px 24px;
        }
        `,
      )}

      ${ButtonLoader} {
        height: 25px;
        width: 25px;
      }
            
      ${Caption} {
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: 1.1px;
      }
      
      ${LeftElement} {
          width: 23px;
          height: 23px;
          margin-right: 14px;
      }

      ${RightElement} {
          width: 23px;
          margin-left: 14px;
          margin-right: 0;
      }
    `,
  )}

  ${styledIf(
    isXLargeButton(props.size),
    `     
      ${Container} {
        height: 60px;  
        min-width: 127px;
      }

      ${styledIf(
        props.withLeftElement,
        `
        ${Container} {
          padding: 18px 36px 18px 28px;
        }
        `,
      )}

      ${styledIf(
        props.withRightElement,
        `
        ${Container} {
          padding: 18px 28px 18px 36px;
        }
        `,
      )}

      ${styledIf(
        props.withElements,
        `
        ${Container} {
          padding: 18px 28px;
        }
        `,
      )}

      ${ButtonLoader} {
        height: 30px;
        width: 30px;
      }
      
      ${Caption} {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: 1.1px;
        text-align: center;
      }
      
      ${LeftElement} {
          width: 26px;
          height: 26px;
          margin-right: 18px;
      }

      ${RightElement} {
          width: 26px;
          height: 26px;
          margin-left: 18px;
          margin-right: 0;
      }
  `,
  )}
  
  ${styledIf(
    isPrimaryButton(props.variant),
    `
      ${Caption} {
        color: ${props.theme.neutral000}
      }
      ${Container} {
        background: linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%);
        transition: all 0.2s linear;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 5px;
          padding: 2px;
          background: none;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }

        ${styledIf(
          props.disabled,
          `
          background: linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%);
          opacity: 0.33;
          &:before {
            background: none;
          }`,
        )}

        ${styledIf(
          !props.disabled,
          `
          &:hover {
            background: linear-gradient(rgba(20, 156, 173, 0.64),rgba(69, 64, 193, 0.64));
            box-shadow: 0px 12px 16px -8px rgba(25, 25, 39, 0.36);
            &:before {
              background: none;
            }
          }
          `,
        )}
        
      }
      
      &:enabled:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
      }
      
      &:enabled:focus:focus-visible {      
        ${Container} {
          background: linear-gradient(rgba(20, 156, 173, 1), rgba(69, 64, 193, 1));
          box-shadow: inset 0px 0px 0px 2px #FFFFFF;
          border-radius: 5px;
          &:before {
            padding: 1px;
            background: linear-gradient(rgba(166, 0, 251, 1), rgba(111, 6, 252, 1), rgba(73, 89, 245, 1), rgba(46, 141, 223, 1), rgba(18, 193, 201, 1))
          }
        } 
      }
            
      &[disabled] {
        ${Container}{
          opacity: 0.33;
        }
      }  
      
      &:enabled:active {
        ${Container} {
          background: linear-gradient(rgba(134, 113, 247, 1), rgba(126, 201, 249, 1));
          -webkit-transition:none;
          -moz-transition:none;
          -o-transition:none;
          transition:none;
          box-shadow: inset 0px 0px 0px 2px #FFFFFF;
          border-radius: 5px;
          &:before {
            background: linear-gradient(rgba(20, 156, 173, 1), rgba(69, 64, 193, 1));
          }
        }
      }
    `,
  )}
    
  ${styledIf(
    isSecondaryButton(props.variant),
    `
      ${Caption} {
        color: ${props.theme.neutral000}
      }
      ${Container} {
        background: rgba(16, 18, 37, 0.3);
        transition: all 0.2s linear;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 5px;
          padding: 1px;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }
        ${styledIf(
          props.disabled,
          `
          opacity: 0.33;
          &:before {
            background: ${props.theme.neutral600};
          }
          ${Caption} {
            color: ${props.theme.neutral300};
          }
          `,
        )}

        ${styledIf(
          !props.disabled,
          `
          &:before {
            background: ${props.theme.neutral600};
          }
          &:hover {
            background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
            &:before {
              background: ${props.theme.neutral500};
            }
            ${Caption} {
              color: ${props.theme.neutral000};
            }
          }
          ${Caption} {
              color: ${props.theme.neutral300};
            }
          `,
        )}
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
            &:before {
              background: linear-gradient(rgba(20, 156, 173, 1), rgba(69, 64, 193, 1));
            }
          }
          ${Caption} {
            color: ${props.theme.neutral000};
          }
        }

      ${styledIf(
        isGreenColor(props.color),
        `            
        ${Caption} {
          color: #26c4c1;
        }
      `,
      )}
      }
      
      &:enabled:active {
        ${Container} {
          background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
          -webkit-transition:none;
          -moz-transition:none;
          -o-transition:none;
          transition:none;
          &:before {
            padding: 1px;
            background: linear-gradient(rgba(134, 113, 247, 1),rgba(126, 201, 249, 1));
          }
          ${Caption} {
            color: ${props.theme.neutral000};
          }
      }

      ${styledIf(
        isGreenColor(props.color),
        `            
        ${Caption} {
          color: #26c4c1;
        }
      `,
      )}

    `,
  )}
  ${styledIf(
    props.minWidth,
    `            
    ${Container} {
      min-width: ${props.minWidth}px;
    }
  `,
  )}

  ${styledIf(
    props.maxWidth,
    `            
    ${Container} {
      max-width: ${props.maxWidth}px;
    }
  `,
  )}
  ${styledIf(
    props.maxHeight,
    `            
    ${Container} {
      max-height: ${props.maxHeight}px;
    }
  `,
  )}
  `}
`;
