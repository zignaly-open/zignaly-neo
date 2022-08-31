// Dependencies
import styled from 'styled-components';
import { Typography } from '@zignaly-open/ui';

export const Layout = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Field = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;

  &.column {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
  }

  &.qrCode {
    justify-content: center;
    align-items: center;
  }

  &.loader {
    justify-content: center;
    align-items: center;
    padding: 22px 0;
  }
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Balance = styled(Typography)``;

export const Value = styled(Typography)`
  margin: 0 6px;
`;

export const Currency = styled(Typography)``;
