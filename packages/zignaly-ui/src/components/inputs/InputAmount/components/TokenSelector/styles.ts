// Dependencies
import styled from "styled-components";
import { styledIf } from "utils/styled";

export const Container = styled.div`
  background: #0c0d21;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all 0.1s linear;
  border: 1px solid transparent;
  border-bottom: none;
  padding: 8px 10px;
  position: relative;
  border-radius: 4px 4px 0 0;

  &:after {
    position: absolute;
    left: 0;
    right: 0;
    background: #0c0d21;
    z-index: 40;
    content: "";
    top: 100%;
    height: 1px;
  }
`;

export const Value = styled.div`
  font-style: normal;
  color: #ffffff;
  padding: 0 12px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 1px;
`;

export const Placeholder = styled(Value)`
  color: #919191;
`;

export const Arrow = styled.img`
  width: 20px;
  height: 10px;
`;

export const ValueContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const ArrowContainer = styled.div`
  flex: 0;
`;

export const Menu = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background: #0c0d21;
  border-radius: 4px 0 4px 4px;
  overflow: auto;
  position: absolute;
  top: 100%;
  right: 0;
  transition: opacity 0.1s linear;
  visibility: hidden;
  opacity: 0;

  width: 190px;
  border: 1px solid #413ba0;
`;

type ItemProps = {
  empty?: boolean;
};

export const Item = styled.li<ItemProps>`
  display: flex;
  margin: 0;
  align-items: center;
  cursor: pointer;
  color: #fff;
  padding: 14px;

  &:hover {
    background: #15162d;
  }
`;

type LayoutProps = {
  disabled?: boolean;
  isActiveMenu: boolean;
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
        visibility: visible;
        opacity: 1;
      }
      
      ${Container} {
        border-color: #413ba0;
      }
    `,
    )}
  `}
`;
