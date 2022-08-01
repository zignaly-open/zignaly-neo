// Dependencies
import styled from "styled-components";

export const Layout = styled.nav`
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

    &.active {
      color: #7682f7;
    }
  }
`;
