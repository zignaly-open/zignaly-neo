import styled from 'styled-components';
import { styledIf, Typography } from '@zignaly-open/ui';

export const Layout = styled.div`
  background: #101225;
  border: 1px solid #35334a;
  border-radius: 16px;
  padding: 40px 56px;
  user-select: none;
`;

export const Title = styled(Typography).attrs({
  variant: 'h1',
  color: 'neutral100',
})`
  display: flex;
  justify-content: space-between;
`;

export const Body = styled.div`
  font-size: 14px;
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.neutral200};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 14px;
`;

export const HeaderButton = styled.button`
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
      fill: ${theme.neutral300};
      width: 18px;
      height: 18px;
    }
  `}
`;

export const Inline = styled.div<{ align?: string }>`
  ${({ align }) => `
    ${styledIf(
      align === 'center',
      `
       flex: 1;
       `,
    )}
  `}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
