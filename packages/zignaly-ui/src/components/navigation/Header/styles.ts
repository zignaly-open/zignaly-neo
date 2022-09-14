import styled from "styled-components";

// Config
import { headerConfig } from "./utils";
import { MarginContainer } from "../../styled";

export const Layout = styled.header`
  background: linear-gradient(269.14deg, #080810 0%, #11122b 100%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 12;
  height: ${headerConfig.height};

  @media only screen and (min-width: 600px) {
    padding: 0 32px;
  }
`;

export const Container = styled(MarginContainer)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Side = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 28px;
`;

export const HeaderLinksContainer = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 28px;
  user-select: none;

  a {
    color: #706f82;
    font-weight: 500;
    font-size: 14px;
    line-height: 28px;
    letter-spacing: 0.55px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #fff;
    }

    &.active {
      &,
      &:hover {
        color: #7682f7;
      }
    }
  }
`;
