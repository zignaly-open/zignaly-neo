// Dependencies
import styled from "styled-components";

export const Layout = styled.div``;

export const Value = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => `
    color: ${theme.priceLabel.valueTextColor};
  `}
`;

export const Token = styled.span`
  ${({ theme }) => `
    color: ${theme.priceLabel.tokenTextColor};
  `}

  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  margin: 0 4px;
  text-transform: uppercase;
`;
