// Dependencies
import styled from 'styled-components';

export const Value = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

export const Layout = styled.div`
  ${({ theme, stateId }) => (`
    color: ${theme.connectionStateLabel.textColor[stateId]};
  `)}
`;
