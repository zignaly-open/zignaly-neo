import styled from 'styled-components';

export const NavList = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #2c2d59;
  padding: 12px 0;
  gap: 8px;

  &:first-child {
    padding-top: 0;
  }

  &.last {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const LoginButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;

  ${({ theme }) => `
    svg {
      color: ${theme.neutral300};
    }
  `}
`;
