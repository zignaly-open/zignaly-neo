import { styled } from '@mui/material';

export const Form = styled('form')``;

export const CoinIconWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > div {
    margin-right: 11px;
  }
`;

export const FullWidthSelect = styled('div')`
  & > div {
    width: 100%;
  }
`;

export const ModalActions = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 56px;
  gap: 14px;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;
