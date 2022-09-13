import styled from 'styled-components';
import { styledIf } from '@zignaly-open/ui';

export const Layout = styled.div`
  flex-direction: row;
  flex: 0 0 56px;
  width: 100%;
  right: 0;
  left: 0;
  background: #12152c;
  z-index: 50;

  &:after {
    content: '';
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    height: 1px;
    background: #222249;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 25% repeat(5, minmax(0%, 100%));
`;

export const Options = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 30px 34px;
  gap: 14px;
`;

type OptionType = {
  active: boolean;
};

export const Option = styled.a<OptionType>`
  cursor: pointer;
  user-select: none;

  ${({ theme, active }) => `
    ${styledIf(
      active,
      `
      color: ${theme.secondary};
    `,
      `
      color: ${theme.neutral200};
      
      &:hover {
        color: ${theme.neutral150};
      }        
    `,
    )}
  `}
`;

export const HeadOption = styled(Option)<OptionType>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  background: #12152c;
  border: 1px solid #222249;

  ${({ theme, active }) => `
    ${styledIf(
      !active,
      `
      color: ${theme.neutral300};
      
      &:hover {
        color: ${theme.neutral150};
      }        
    `,
      `
       border-bottom: 3px solid ${theme.secondary};
       `,
    )}
  `}
`;
