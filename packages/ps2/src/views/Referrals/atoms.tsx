import React from 'react';
import { TotalBoxBox, TotalBoxValue } from './styles';
import { ZigTypography } from '@zignaly-open/ui';

export const TotalBox: React.FC<{
  label: string | JSX.Element;
  value: string | JSX.Element;
}> = ({ label, value }) => (
  <TotalBoxBox>
    <ZigTypography>{label}</ZigTypography>
    <TotalBoxValue>{value}</TotalBoxValue>
  </TotalBoxBox>
);

export const GetWhatYouDeserveBox: React.FC<{
  label: string | JSX.Element;
  value: string | JSX.Element;
}> = ({ label, value }) => (
  <TotalBoxBox>
    <ZigTypography>{label}</ZigTypography>
    <TotalBoxValue>{value}</TotalBoxValue>
  </TotalBoxBox>
);
