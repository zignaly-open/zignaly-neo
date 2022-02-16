// Dependencies
import styled from 'styled-components';

export const Layout = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid #000;
  padding: 4px 12px;

  ${({ theme }) => (`
    border: 1px solid ${theme.neutral[2]};
  `)}
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
    color: ${theme.neutral[2]};
  `)}
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => (`
    color: ${theme.neutral[2]};
  `)}
`;
