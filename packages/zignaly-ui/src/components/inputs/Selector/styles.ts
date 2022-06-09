// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";
import { SelectSizes } from "./types";
import Typography from "../../display/Typography";

const isSmallSelect = (size: SelectSizes) => size === SelectSizes.SMALL;

const isNormalSelect = (size: SelectSizes) => size === SelectSizes.NORMAL;

const isLargeSelect = (size: SelectSizes) => size === SelectSizes.LARGE;

export const Label = styled.label`
  color: #a9a9ba;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

export const Container = styled.div`
  width: 100%;
  background: #101225;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.1s linear;
  overflow: hidden;
`;

export const Value = styled(Typography)`
  font-style: normal;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => `
     color: ${theme["neutral200"]};
  `}
`;

export const Placeholder = styled(Value)`
  ${({ theme }) => `
     color: ${theme["neutral400"]};
  `}
`;

export const Arrow = styled.img`
  margin-left: 8px;
  margin-right: 5px;
`;

export const ArrowContainer = styled.div``;

export const Menu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-radius: 0 0 4px 4px;
  overflow: auto;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transition: opacity 0.1s linear;
  visibility: hidden;
  opacity: 0;
  border-top: none;
  z-index: 10;

  max-height: 250px;
  overflow-x: hidden;

  ${({ theme }) => `
    background: ${theme["neutral750"]};
  `}

  /* width */

  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

type ItemProps = {
  empty?: boolean;
};

export const Item = styled.li<ItemProps>`
  display: flex;
  margin: 0;
  align-items: center;
  cursor: pointer;
  ${({ empty, theme }: any) => `
    ${styledIf(
      empty,
      `
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme["neutral500"]};
    `,
      `
      color: ${theme["neutral200"]};
      
      &:hover {
        background: #15162d;
      }
    `,
    )}  
  `}
`;

export const LeftElement = styled.div``;

export const ItemCaption = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LeftElementIcon = styled.img`
  width: 24px;
  margin-right: 16px;
`;

type LayoutProps = {
  size?: SelectSizes;
  disabled?: boolean;
  isActiveMenu: boolean;
  collapsed: boolean;
  fullWidth?: boolean;
  name?: string;
  maxHeight?: number;
  transparent?: boolean;
};

export const Layout = styled.div<LayoutProps>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  &[disabled] {
    ${Container} {
      opacity: 0.5;
      cursor: default;
    }
  }
  ${(props: any) => `
    ${styledIf(
      props.isActiveMenu,
      `
      ${Menu} {
        border-radius: 0 0 4px 4px;
        border: 1px solid ${props.theme["highlighted"]};;
        border-top: none;        
        visibility: visible;
        opacity: 1;
      }
      
      ${Container} {
        border-radius: 4px 4px 0 0;
        border: 1px solid ${props.theme["highlighted"]};
        border-bottom: none;
      }
    `,
      `
      ${Container} {
        border: 1px solid transparent;
        box-shadow: 0 0 0 1px ${props.theme["neutral600"]};;
      }
    `,
    )}
  
    ${styledIf(
      isSmallSelect(props.size),
      `
      ${Arrow} {
        width: 10px;
        height: 5.84px;
      }
      
      ${LeftElementIcon} {
        width: 20px;
        height: 20px;
      }
      
      ${Value}, ${ItemCaption} {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.5px;
      }      
    
      ${Container}, ${Item} {
        padding: 7.67px 12.88px;
      }
    `,
    )}
    
    ${styledIf(
      isNormalSelect(props.size),
      `
      ${Arrow} {
        width: 12px;
        height: 7px;
      }
      
      ${LeftElementIcon} {
        width: 24px;
        height: 24px;
      }
      
      ${Value}, ${ItemCaption} {
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.5px;
      }
    
      ${Container}, ${Item} {
        padding: 10px 13.86px;
      }
      
    ${styledIf(
      props.collapsed,
      `
      ${Container} {
        min-width: 0;
        padding: 2px 9px;
      }
      ${Arrow}{
        margin: 0;
        }
      `,
    )}
    `,
    )}
    
    ${styledIf(
      isLargeSelect(props.size),
      `
      ${Arrow} {
        width: 20px;
        height: 12px;
      }
      
      ${LeftElementIcon} {
        width: 36px;
        height: 36px;
      }
      
      ${Value}, ${ItemCaption} {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 2px;
      }
      
      ${Container}, ${Item} {
        padding: 19.33px 33.77px;
      }
    `,
    )}
    
    ${styledIf(
      props.fullWidth,
      `
      width: 100%;
      ${Container} {
        width: 100%;
      }
      `,
    )}
    ${styledIf(
      props.maxHeight,
      `
      ${Container} {
        max-height: ${props.maxHeight}px;
      }`,
    )}
    ${styledIf(
      props.transparent,
      `
      ${Container} {
        background: transparent;
      }`,
    )}
  `}
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  width: 100%;
`;
