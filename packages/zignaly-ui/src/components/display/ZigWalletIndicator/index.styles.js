// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 4px;
`;

export const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

export const Level = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;

  ${({ theme }) => (`
    color: ${theme.zigWalletIndicator.levelTextColor}
  `)}
`;

export const Token = styled.span`
  text-transform: uppercase;
  padding-left: 4px;
  line-height: 23px;
  
  ${({ theme }) => (`
    color: ${theme.zigWalletIndicator.tokenTextColor}
  `)}
`;

export const Value = styled.div`
  display: flex;
  text-transform: uppercase;

  ${({ theme }) => (`
    color: ${theme.zigWalletIndicator.valueTextColor}
  `)}
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
