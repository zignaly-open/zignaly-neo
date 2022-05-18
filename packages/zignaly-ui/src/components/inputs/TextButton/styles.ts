// Dependencies
import styled from "styled-components";
import { styledIf } from "../../../utils/styled";
import Loader from "components/display/Loader";

export const Container = styled.div`
  position: relative;
  transition: all 0.2s linear;
  outline: none;
  display: inline-flex;
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

export const ButtonLoader = styled(Loader)`
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
`;

export const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RightElement = styled(LeftElement)`
  padding-right: 0;
  padding-left: 10px;
`;

export const CenterIcon = styled.div`
  position: relative;
  top: 1px;
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

/**
 * Layout
 */
interface LayoutProps {
  isLoading?: boolean;
  color?: string;
}

export const Layout = styled.button<LayoutProps>`
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  user-select: none;
  background: transparent;
  text-decoration-line: none;
  svg {
    width: 100%;
    height: 100%;
  }
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
      
  `}
`;
