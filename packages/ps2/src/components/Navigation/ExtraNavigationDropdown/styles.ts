import { styled } from '@mui/material';
import { lighten } from '@mui/material/styles';
import { ZigGlobeLanguages, styledIf, ZigTypography } from '@zignaly-open/ui';

export const NavLink = styled('a')<{ active?: boolean; disabled?: boolean }>`
  color: ${({ theme }) => theme.palette.neutral400};
  font-weight: 500;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 0.55px;
  text-decoration: none;
  transition: 0.15s linear;

  svg {
    transition: 0.15s linear;
    fill: ${({ theme }) => theme.palette.neutral400};
  }

  ${({ active, theme }) => `
    ${styledIf(
      active,
      `
      color: ${theme.palette.highlighted};
    `,
      `

      &:not([disabled]) {
        cursor: pointer;

        &:hover {
          color: ${theme.palette.neutral000};
          
          svg {
            fill: ${theme.palette.neutral000};
          }
        }
      }
    `,
    )}
  `}

  &:hover {
    span svg {
      fill: ${({ theme }) => theme.palette.neutral000};
      color: ${({ theme }) => theme.palette.neutral000};
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
  background: ${({ theme }) =>
    // ok we dropped the color here EFFORTLESSLY preserving the original color
    lighten(theme.palette.neutral800, (0x1c - 0x12) / 0xff)};
  padding: 19px 32px;
  margin: 6px -32px -12px;

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
