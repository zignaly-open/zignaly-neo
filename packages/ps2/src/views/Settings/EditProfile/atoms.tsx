import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ProfileStatusBoxContainer } from './styles';

export const ProfileStatusBox: React.FC<{
  isSuccess: boolean;
  label: string;
  status: string;
  ctaLabel: string;
  cta: () => void;
}> = ({ isSuccess, label, status, cta, ctaLabel }) => {
  return (
    <ProfileStatusBoxContainer isSuccess={isSuccess}>
      <ZigTypography color={'neutral200'}>{label}</ZigTypography>
      <ZigTypography
        component={'p'}
        sx={{ m: 0.5 }}
        fontWeight={600}
        color={isSuccess ? 'greenGraph' : 'red'}
      >
        {status}
      </ZigTypography>
      <ZigButton variant={'text'} onClick={cta}>
        {ctaLabel}
      </ZigButton>
    </ProfileStatusBoxContainer>
  );
};
