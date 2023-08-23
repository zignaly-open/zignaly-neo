import React from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ProfileStatusBoxContainer } from './styles';
import { Box, Tooltip, useTheme } from '@mui/material';
import { KycResponse } from 'apis/user/types';
import { useTranslation } from 'react-i18next';
import kycConfig from '../Kyc/kycDefinitions';
import { InfoOutlined } from '@mui/icons-material';

export const ProfileStatusBox: React.FC<{
  isSuccess: boolean;
  label: string;
  status: string;
  ctaLabel: string;
  cta: () => void;
}> = ({ isSuccess, label, status, cta, ctaLabel }) => {
  const theme = useTheme();
  const color = isSuccess ? theme.palette.greenGraph : theme.palette.red;

  return (
    <ProfileStatusBoxContainer color={color}>
      <ZigTypography color={'neutral200'}>{label}</ZigTypography>
      <ZigTypography component={'p'} fontWeight={600} color={color}>
        {status}
      </ZigTypography>
      {!isSuccess && (
        <ZigButton variant={'text'} onClick={cta}>
          {ctaLabel}
        </ZigButton>
      )}
    </ProfileStatusBoxContainer>
  );
};

export const KYCStatusBox = ({
  kycStatuses,
  cta,
}: {
  kycStatuses: KycResponse[];
  cta: () => void;
}) => {
  const { t } = useTranslation(['settings', 'kyc']);

  const theme = useTheme();
  const infoIconStyle = {
    height: '15.6px',
    color: theme.palette.backgrounds.investorsIcon,
  };

  const isPartiallyApproved = kycStatuses.some((x) => x.status === 'approved');
  const isPending = kycStatuses[0].status === 'pending';
  const isSuccess =
    isPartiallyApproved &&
    kycStatuses.every(
      (x) => x.status === 'approved' || x.status === 'init' || !x.status,
    );
  const isNotStarted =
    !kycStatuses[0].status || kycStatuses[0].status === 'init';

  let color = theme.palette.red;
  if (isSuccess) color = theme.palette.greenGraph;
  else if (isPending) color = theme.palette.yellow;
  else if (isPartiallyApproved) color = '#BAA9A9';

  const getStatus = (status: KycResponse['status']) =>
    status === 'approved'
      ? 'edit-profile.status-box.verified'
      : status === 'pending'
      ? 'edit-profile.status-box.pending'
      : status === 'rejected'
      ? 'edit-profile.status-box.rejected'
      : 'edit-profile.status-box.not-verified';

  const getStatusColor = (status: KycResponse['status']) =>
    status === 'approved'
      ? theme.palette.greenGraph
      : status === 'pending'
      ? theme.palette.yellow
      : theme.palette.red;

  return (
    <ProfileStatusBoxContainer color={color}>
      <ZigTypography mb='4px' color={'neutral200'} component={'div'}>
        {t('edit-profile.status-box.kyc')}
      </ZigTypography>
      {kycConfig[kycStatuses[0].category].map((x, i) => {
        const { status, reason } = kycStatuses[i];
        if (i > 0 && (!status || status === 'init')) return null;
        return (
          <Box
            display='flex'
            flexDirection={'column'}
            alignItems={'center'}
            key={x.label}
          >
            {i > 0 && (
              <Box
                bgcolor='rgba(169, 169, 186, 0.50)'
                width={'64px'}
                height={'1px'}
                marginTop={'8px'}
                marginBottom={'12px'}
              />
            )}
            {!isNotStarted && (
              <Box sx={{ '> svg': { width: '16px', height: '16px' } }}>
                {x.icon}
              </Box>
            )}
            <ZigTypography
              mt={'1px'}
              component={'p'}
              fontWeight={600}
              color={getStatusColor(status)}
              display={'flex'}
              alignItems={'center'}
            >
              {t(getStatus(status))}
              {status === 'pending' && (
                <Tooltip title={t('progress-explainer', { ns: 'kyc' })}>
                  <InfoOutlined sx={infoIconStyle} />
                </Tooltip>
              )}
              {status === 'rejected' && (
                <Tooltip title={reason}>
                  <InfoOutlined sx={infoIconStyle} />
                </Tooltip>
              )}
            </ZigTypography>
          </Box>
        );
      })}
      {isNotStarted && (
        <ZigButton variant={'text'} onClick={cta}>
          {t('edit-profile.status-box.pass-kyc-cta')}
        </ZigButton>
      )}
    </ProfileStatusBoxContainer>
  );
};
