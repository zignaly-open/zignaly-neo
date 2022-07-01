// Dependencies

import styled from '@emotion/styled';
import { Typography } from 'zignaly-ui';

export const Layout = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #101225;
  border: 1px solid #35334a;
  border-radius: 16px;

  ${(props) => `
    width: ${props.width}px;
  `};
  user-select: none;
`;

export const Title = styled(Typography)`
  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div<{ width: number }>`
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
  ${(props) => `
    width: ${props.width - 112}px;
  `};
  color: #a9a9ba;
  padding: 0px 56px 56px 56px;
`;

export const Header = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => `
    width: ${props.width -96}px;
  `};
  align-items: center;
  padding: 40px 40px 0px 56px;
`;

export const HeaderButton = styled.button<any>`
  border: 0;
  padding: 0;
  margin: 0;
  height: 32px;
  width: 32px;
  background: transparent;
  border: none;
  cursor: pointer;

  ${({ theme }) => `
    svg { 
      fill: ${theme['neutral300']};
      width: 32px;
      height: 32px;
    }
  `}
`;

export const Inline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
