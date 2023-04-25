import { styled } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';

// TODO: Box
export const Body = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ToContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

export const ToOutline = styled('div')`
  background: linear-gradient(
        ${({ theme }) => theme.palette.neutral750},
        ${({ theme }) => theme.palette.neutral750}
      )
      padding-box,
    linear-gradient(to right, #8671f7 14.16%, #7ec9f9 83.59%) border-box;
  border: 2px solid transparent;
  width: 510px;
  height: 132px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 16px;
  row-gap: 16px;
  margin-bottom: 12px;
`;

export const TypographyNumberResult = styled(ZigTypography)`
  margin-right: 8px;
`;

export const TypographyBalance = styled(ZigTypography)`
  margin-left: 4px;
`;

export const Inline = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Actions = styled('div')`
  margin-top: 56px;
  display: flex;
  justify-content: center;

  button {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
