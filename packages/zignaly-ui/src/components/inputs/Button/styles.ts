// Dependencies
import styled from "styled-components";
import { styledIf } from "../../../utils/styled";
import { ButtonSizes, ButtonVariants } from "./index";

const isPrimaryButton = (variant: ButtonVariants) => variant === ButtonVariants.PRIMARY;

const isSecondaryButton = (variant: ButtonVariants) => variant === ButtonVariants.SECONDARY;

// const isGhostButton = (variant: ButtonVariants) => variant ===ButtonVariants.GHOST;

const isSmallButton = (size: ButtonSizes) => size === ButtonSizes.SMALL;

const isMediumButton = (size: ButtonSizes) => size === ButtonSizes.NORMAL;

const isLargeButton = (size: ButtonSizes) => size === ButtonSizes.LARGE;

const isXLargeButton = (size: ButtonSizes) => size === ButtonSizes.XLARGE;

export const Caption = styled.div`
  z-index: 2;
  position: relative;
  transition: color 0.2s linear;
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

export const LeftElement = styled.div`
  z-index: 3;
  position: relative;
  padding-right: 10px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RightElement = styled(LeftElement)`
  padding-right: 0;
  padding-left: 10px;
`;

/**
 * Icons
 */
interface IconProps {
  src: any;
  alt: any;
}

export const Icon = styled.img<IconProps>``;

export const CenterIcon = styled.img<IconProps>`
  position: relative;
  top: 1px;
`;

/**
 * Layout
 */
interface LayoutProps {
  size: ButtonSizes;
  variant: ButtonVariants;
  withElements: Boolean;
  onlyIcon: Boolean;
}

export const Layout = styled.button<LayoutProps>`
  border-radius: 4px;
  border: none;
  cursor: pointer;
  padding: 2px;
  outline: none;

  position: relative;
  user-select: none;
  background: transparent;

  transition: all 0.2s linear;

  &[disabled] {
    cursor: default;
  }

  ${({ size, variant, withElements, onlyIcon }) => `
  
     ${styledIf(
       onlyIcon,
       `
        ${Container} {
          min-width: auto !important; 
          height: auto !important;
        }
    `,
     )}
      
    ${styledIf(
      isSmallButton(size),
      `
      ${Container} {
        padding: 9px 18px;
        min-width: 88px;      
      }
            
      ${styledIf(
        withElements,
        `
        ${Container} {
          padding: 9px 18px;
          border-radius: 5px; 
        }
      `,
      )}
      
      ${Caption} {
        font-size: 11px;
        font-style: normal;
        font-weight: 500;
        line-height: 12px;
        letter-spacing: 0px;
        text-align: center;
      }
      
      ${LeftElement} {
        img {
          width: 10px;
        }
      }
      
      ${styledIf(
        onlyIcon,
        `
        ${Container} {
          padding: 10px 12px;
        }
        ${CenterIcon} {
          width: 10px;
        }
    `,
      )}
    `,
    )}
    
  ${styledIf(
    isMediumButton(size),
    `     
      ${Container} {
        padding: 11px 18px;
        min-width: 88px;
        height: 40px; 
        border-radius: 5px; 
      }
      
      ${Caption} {
        font-size: 11px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: 0px;
        text-align: center;
      }
      
      ${LeftElement} {
        img {
          width: 10px;
        }
      }
      
      ${styledIf(
        onlyIcon,
        `
        ${Container} {
          padding: 13px 16px
        }
        ${CenterIcon} {
          width: 10px;
        }
    `,
      )}
  `,
  )}
    
  ${styledIf(
    isLargeButton(size),
    `     
      ${Container} {
        padding: 15px 31px;
        height: 48px;
      }
            
      ${Caption} {
        font-weight: 600;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: 1.1px;
      }
      
      ${LeftElement} {
        img {
          width: 23px;
        }
      }
      
      ${styledIf(
        onlyIcon,
        `
        ${Container} {
          padding: 18px 20px;
        }
        
        ${CenterIcon} {
          width: 23px;
          height: 23px;
        }
      `,
      )}
    `,
  )}

  ${styledIf(
    isXLargeButton(size),
    `     
      ${Container} {
        padding: 20px 36px;       
        height: 60px;  
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
        img {
          width: 26px;
          height: 26px;
        }
      }
      
      ${styledIf(
        onlyIcon,
        `
        ${Container} {
          padding: 20px 36px
        }
        ${CenterIcon} {
          width: 26px;
          height: 26px
        }
    `,
      )}
  `,
  )}
  
  ${styledIf(
    isPrimaryButton(variant),
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
       
        ${styledIf(
          isSmallButton(size),
          `
          ${Caption} {
            top: 0px;
            
            ${styledIf(
              withElements,
              `
              left: -1px;
            `,
            )}
          }
          
          ${LeftElement} {
            left: -1px;
            padding-right: 10px;
          }
          
          ${RightElement} {
            left: 1px;
            padding-right: 0;
            padding-left: 8px;
          }
          
          ${styledIf(
            onlyIcon,
            `            
            ${CenterIcon} {
              top: 0px;
              left: -1px;
            }
          `,
          )}
        `,
        )}
        
        ${styledIf(
          isMediumButton(size),
          `
          ${Caption} {
            top: 0px;
            left: -1px;
            
            ${styledIf(
              withElements,
              `
              left: -1px;
            `,
            )}
          }
          
          ${LeftElement} {
            left: -1px;
            padding-right: 10px;
          }
          
          ${RightElement} {
            left: 1px;
            padding-right: 0;
            padding-left: 8px;
          }
          
          ${styledIf(
            onlyIcon,
            `            
            ${CenterIcon} {
              top: 0px;
              left: 0px;
            }
          `,
          )}
        `,
        )}
        
        ${styledIf(
          isLargeButton(size),
          `
          ${Caption} {
            top: 0px;
            left: -1px;
            
            ${styledIf(
              withElements,
              `
              left: -1px;
            `,
            )}
          }
          
          ${LeftElement} {
            left: -1px;
            padding-right: 10px;
          }
          
          ${RightElement} {
            left: 1px;
            padding-right: 0;
            padding-left: 8px;
          }
          
          ${styledIf(
            onlyIcon,
            `            
            ${CenterIcon} {
              top: 0px;
              left: 0px;
            }
          `,
          )}
        `,
        )}

        ${styledIf(
          isXLargeButton(size),
          `
          ${Caption} {
            top: 0px;
            left: -1px;
            
            ${styledIf(
              withElements,
              `
              left: -1px;
            `,
            )}
          }
          
          ${LeftElement} {
            left: -1px;
            padding-right: 10px;
          }
          
          ${RightElement} {
            left: 1px;
            padding-right: 0;
            padding-left: 8px;
          }
          
          ${styledIf(
            onlyIcon,
            `            
            ${CenterIcon} {
              top: 0px;
              left: 0px;
            }
          `,
          )}
        `,
        )}
      }
            
      &[disabled] {
        opacity: 0.33;
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
            top: 0; left: 0;
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
            
      ${Caption} {
        color: #F3F4F6;
      }
    `,
  )}
    
  ${styledIf(
    isSecondaryButton(variant),
    `
      ${Container} {
        transition: all 0.2s linear;
        border: 1px solid #4A4958;
        background: rgba(12, 13, 33, 0.8);
             
        &:enabled:hover {
          border: 1px dashed #4A4958;
          background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
        
          ${Caption} {
            color: #fff;
            text-shadow: 0px 12px 16px rgba(25, 25, 39, 0.36);
          }
        }
      }

      
      &:enabled:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
      }
     
      
      &:enabled:focus:focus-visible {
        background: linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%);

      
        ${Container} {
          border: 1px solid white;
          background: #040618;
                  
          &:before {
            background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.16) 0%, rgba(69, 64, 193, 0.16) 100%);
            opacity: 1;
          }
        }
        
        ${Caption} {
          color: #fff;
        }
      }
            
      &[disabled] {
        opacity: 0.33;
      } 

      &:enabled {
        ${Container} {
          &:before {
            border-radius: inherit;
            background: linear-gradient(289.8deg, rgba(20, 156, 173, 0.48) 0%, rgba(69, 64, 193, 0.48) 100%);
            content: '';    
            display: block;
            height: 100%;
            position: absolute;
            top: 0; left: 0;
            opacity: 0;
            width: 100%;
            z-index: 1;
            transition: all 50ms linear; 
          }
        }
      }
      
      &:enabled:active {
        padding: 2px;
        background: linear-gradient(289.8deg, #149CAD 0%, #4540C1 100%);
        
        ${Container} {
          border: none;
          background: #040618;
          
          &:before {
            opacity: 1;
          }
        }
        
        ${Caption} {
          top: 0px;
          left: 1px;
        }
        
        ${LeftElement} {
          top: 0px;
          left: 1px;
        }
      }
            
      ${Caption} {
        color: #9CA3AF;
        letter-spacing: 2px;
      }
    `,
  )}
  `}
`;
