import styled from "styled-components";
import { animated } from "@react-spring/web";
import { SelectSizes } from "./types";
import { styledIf } from "utils/styled";

const isSmallSelect = (size: SelectSizes) => size === SelectSizes.SMALL;

const isNormalSelect = (size: SelectSizes) => size === SelectSizes.NORMAL;

const isLargeSelect = (size: SelectSizes) => size === SelectSizes.LARGE;

export const Button = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: space-between;
  cursor: pointer;

  ${({ theme }) => `
    background: ${theme.neutral750};
    border: 1px solid ${theme.neutral600};
  `}
`;

export const Caption = styled.div`
  align-items: center;
  flex-direction: row;
  display: flex;
`;

export const Menu = styled(animated.div)`
  ${({ theme }) => `
    border: 1px solid ${theme.neutral600};
    border-top: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${theme.neutral750};
    z-index: 15;
  `}
`;

export const List = styled.ul<any>`
  overflow: auto;
  max-height: 180px;

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

export const Item = styled.li`
  padding: 8px 14px;
  cursor: pointer;

  &:hover {
    background: #15162d;
  }
`;

export const Icon = styled.div`
  margin-right: 14px;
`;

export const Label = styled.label`
  margin-bottom: 4px;
  display: block;
`;

export const Indicator = styled.div`
  margin-right: 8px;
`;

export const InputIcon = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  left: 14px;
  min-width: 34px;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input<any>`
  padding: 14px 14px 14px 48px;

  background: transparent;
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.55px;
  width: 100%;
  font-family: "Avenir Next", sans-serif;

  ${({ theme }) => `
    color: ${theme.neutral100};
    
    ::placeholder {
      color: ${theme.neutral300};
      opacity: 1;
    }
    
    :-ms-input-placeholder {
      color: ${theme.neutral300};
    }
    
    ::-ms-input-placeholder {
      color: ${theme.neutral300};
    }
  `}
`;

export const Empty = styled.p`
  text-align: center;
`;

type LayoutProps = {
  ref: any;
  variant: "primary" | "transparent";
  size: SelectSizes;
  disabled: boolean;
};

export const Layout = styled.div<LayoutProps>`
  width: 100%;
  position: relative;

  &[disabled] {
    ${Button} {
      opacity: 0.5;
      cursor: default;
    }
  }

  ${({ size }) => `
     ${styledIf(
       isSmallSelect(size),
       `
        ${Button} {
          gap: 22px;
          padding: 0 14px;
          height: 54px;
        }
       `,
     )}
     
     ${styledIf(
       isNormalSelect(size),
       `
        ${Button} {
          gap: 22px;
          padding: 0 14px;
          height: 54px;
        }
       `,
     )}
    
     ${styledIf(
       isLargeSelect(size),
       `
        ${Button} {
          gap: 22px;
          padding: 0 14px;
          height: 54px;
        }
       `,
     )}    
  `};
`;
