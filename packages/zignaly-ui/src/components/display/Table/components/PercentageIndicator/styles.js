// Dependencies
import styled from 'styled-components';

export const Layout = styled.div``;

export const Value = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  ${({ theme, isPositive }) => (`
    color: ${isPositive ? theme.percentageIndicator.upTextColor : theme.percentageIndicator.downTextColor};
  `)}
`;

export const Indicator = styled.img`
  margin-right: 6px;
`;
