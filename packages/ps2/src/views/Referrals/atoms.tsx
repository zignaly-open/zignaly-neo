import React from 'react';
import { TotalBoxBox, TotalBoxValue } from './styles';
import { ZigTypography } from '@zignaly-open/ui';

export const TotalBox: React.FC<{
  label: string | JSX.Element;
  value: string | JSX.Element;
}> = ({ label, value }) => (
  <TotalBoxBox>
    <ZigTypography
      textTransform={'uppercase'}
      fontWeight={500}
      textAlign={'center'}
      className='referral-box__label'
    >
      {label}
    </ZigTypography>
    <TotalBoxValue className='referral-box__value'>{value}</TotalBoxValue>
  </TotalBoxBox>
);
