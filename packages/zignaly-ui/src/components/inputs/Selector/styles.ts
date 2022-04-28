// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";
import { SelectSizes } from "./types";

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
  min-width: 404px;
  background: #0c0d21;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.1s linear;
`;

export const Value = styled.div`
  font-style: normal;
  color: #ffffff;
  width: 100%;
`;

export const Placeholder = styled(Value)`
  color: #919191;
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
  background: #0c0d21;
  border-radius: 0 0 4px 4px;
  overflow: auto;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transition: opacity 0.1s linear;
  visibility: hidden;
  opacity: 0;
  border: 2px solid #5a51f5;
  border-top: none;
`;

type ItemProps = {
  empty?: boolean;
};

export const Item = styled.li<ItemProps>`
  display: flex;
  margin: 0;
  align-items: center;
  cursor: pointer;

  ${({ empty }: any) => `
    ${styledIf(
      empty,
      `
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    `,
      `
      color: #fff;
      
      &:hover {
        background: #15162d;
      }
    `,
    )}  
  `}
`;

export const LeftElement = styled.div``;

export const ItemCaption = styled.div``;

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
};

export const Layout = styled.div<LayoutProps>`
  display: inline-flex;
  flex-direction: column;
  position: relative;

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
        border: 2px solid #5A51F5;
        border-top: none;        
        visibility: visible;
        opacity: 1;
      }
      
      ${Container} {
        border-radius: 4px 4px 0 0;
        border: 2px solid #5A51F5;
        border-bottom: none;
      }
    `,
      `
      ${Container} {
        border: 2px solid transparent;
        box-shadow: 0 0 0 1px #413BA0;
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
        width: 40px;
        height: 40px;
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
  `}
`;
