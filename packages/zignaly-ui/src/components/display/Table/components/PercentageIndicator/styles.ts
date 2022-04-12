// Dependencies
import styled from "styled-components";

export const Layout = styled.div``;

export const Value = styled.span<{ isPositive: boolean }>`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  ${({ isPositive }: any) => `
    color: ${isPositive ? "#26C4C1" : "#CC3993"};
  `}
`;

export const Indicator = styled.img`
  margin-right: 6px;
`;
