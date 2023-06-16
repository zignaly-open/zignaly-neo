import { styled } from '@mui/material';
import { ZigGlobeLanguages, styledIf, ZigTypography } from '@zignaly-open/ui';

export const NavLink = styled('a')<{ active?: boolean; disabled?: boolean }>`
  color: #706f82;
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 0.55px;
  text-decoration: none;
  transition: 0.15s linear;

  svg {
    transition: 0.15s linear;
    fill: #706f82;
  }

  ${({ active }) => `
    ${styledIf(
      active,
      `
      color: #7682f7;
    `,
      `

      &:not([disabled]) {
        cursor: pointer;

        &:hover {
          color: #fff;
          
          svg {
            fill: #fff;
          }
        }
      }
    `,
    )}
  `}

  &:hover {
    span svg {
      fill: #fff;
      color: #fff;
    }
  }
`;

export const NavList = styled('div')`
  display: flex;
  flex-direction: column;

  padding: 12px 0;
  gap: 8px;

  &:first-child {
    padding-top: 0;
  }

  &.last {
    border-top: 1px solid #2c2d59;
    margin: 0 -18px;
    padding: 0;
  }
`;

export const Networks = styled('div')`
  display: grid;
  grid-template-columns: repeat(5, minmax(0%, 100%));
  justify-content: center;
  align-items: center;
  gap: 16px;
  background: rgb(28, 29, 53);
  padding: 19px 32px;
  margin: 6px -32px -6px;

  > a {
    line-height: 0;
  }

  span svg {
    fill: #707185;
    color: #707185;
    transition: all 0.15s linear;
  }
`;

export const GlobeLanguagesStyled = styled(ZigGlobeLanguages)`
  transition: 0.15s linear;
`;

export const LabelButton = styled(ZigTypography)`
  transition: 0.15s linear;
`;
