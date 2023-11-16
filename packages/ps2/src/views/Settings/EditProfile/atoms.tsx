import React, { useMemo } from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ProfileStatusBoxContainer } from './styles';
import { Box, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { KycResponse } from 'apis/user/types';
import { useTranslation } from 'react-i18next';
import kycConfig from '../Kyc/kycDefinitions';
import { InfoOutlined } from '@mui/icons-material';
import { Control, Controller } from 'react-hook-form';
import ServiceLogo from '../../TraderService/components/ServiceLogo';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTE_2FA, ROUTE_KYC } from '../../../routes';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';
import { useCurrentUser } from '../../../apis/user/use';
import { useKycStatusesQuery } from '../../../apis/user/api';
import { find, groupBy } from 'lodash-es';
import { EditProfileFormType } from './types';

export const ProfileStatusBox: React.FC<{
  isSuccess: boolean;
  label: string;
  status: string;
  ctaLabel: string;
  cta: () => void;
  id?: string;
}> = ({ isSuccess, label, status, cta, ctaLabel, id }) => {
  const theme = useTheme();
  const color = isSuccess ? theme.palette.greenGraph : theme.palette.red;

  return (
    <ProfileStatusBoxContainer color={color}>
      <ZigTypography color={'neutral200'} id={id && `${id}-label`}>
        {label}
      </ZigTypography>
      <ZigTypography
        component={'p'}
        fontWeight={600}
        color={color}
        mb='5px'
        id={id && `${id}-status`}
      >
        {status}
      </ZigTypography>
      {!isSuccess && (
        <ZigButton variant={'text'} onClick={cta} id={id && `${id}-action`}>
          {ctaLabel}
        </ZigButton>
      )}
    </ProfileStatusBoxContainer>
  );
};

export const ServiceLogoStatus = ({
  control,
}: {
  control: Control<EditProfileFormType>;
}) => {
  const { t } = useTranslation('settings');
  const user = useCurrentUser();
  const navigate = useNavigate();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const { data: kycStatuses } = useKycStatusesQuery(undefined, {
    skip: !isFeatureOn(Features.Kyc),
  });

  const kycStarted = useMemo(() => {
    const kycStatusesCateg = groupBy(kycStatuses?.status, 'category');
    const res = find(kycStatusesCateg, (x) => {
      return x.some(
        (kyc) =>
          (kyc.status === 'rejected' && kyc.canBeRetried) ||
          ['approved', 'pending'].includes(kyc.status),
      );
    });
    if (!res) {
      return kycStatusesCateg[kycStatuses?.status[0].category];
    }
    return res;
  }, [kycStatuses?.status]);

  return (
    <>
      <Controller
        name='imageUrl'
        control={control}
        render={({ field }) => (
          <ServiceLogo
            id={'edit-profile__logo'}
            size={md ? 100 : sm ? 60 : 50}
            label={t('edit-profile.edit-avatar')}
            {...field}
          />
        )}
      />

      {md && (
        <Box sx={{ pt: md && 2 }}>
          <ProfileStatusBox
            id={'edit-profile__two-fa'}
            isSuccess={user['2FAEnable']}
            label={t('edit-profile.status-box.2fa')}
            ctaLabel={t('edit-profile.status-box.enable-2fa-cta')}
            cta={() => navigate(generatePath(ROUTE_2FA))}
            status={t(
              user['2FAEnable']
                ? 'edit-profile.status-box.enabled'
                : 'edit-profile.status-box.disabled',
            )}
          />

          {isFeatureOn(Features.Kyc) && !!kycStatuses && kycStarted && (
            <KYCStatusBox
              id={'edit-profile__kyc'}
              kycStatuses={kycStarted}
              cta={() => navigate(generatePath(ROUTE_KYC))}
            />
          )}
        </Box>
      )}
    </>
  );
};

export const KYCStatusBox = ({
  kycStatuses,
  cta,
  id,
}: {
  kycStatuses: KycResponse[];
  cta: () => void;
  id?: string;
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
  const retry = kycStatuses.some(
    (x) => x.status === 'rejected' && x.canBeRetried,
  );

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
      <ZigTypography
        color={'neutral200'}
        component={'div'}
        id={id && `${id}-verification-${kycStatuses[0].category.toLowerCase()}`}
      >
        {t(`header.verification-${kycStatuses[0].category.toLowerCase()}`)}
      </ZigTypography>
      {kycConfig[kycStatuses[0].category].map((x, i) => {
        const { status, reason, canBeRetried } = kycStatuses[i];
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
                <Tooltip title={t(x.label, { ns: 'kyc' })}>{x.icon}</Tooltip>
              </Box>
            )}
            <ZigTypography
              component={'p'}
              fontWeight={600}
              color={getStatusColor(status)}
              display={'flex'}
              alignItems={'center'}
              mb='5px'
              id={id && `${id}-current-status`}
            >
              {t(getStatus(status))}
              {status === 'pending' && (
                <Tooltip title={t('progress-explainer', { ns: 'kyc' })}>
                  <InfoOutlined sx={infoIconStyle} />
                </Tooltip>
              )}
              {status === 'rejected' && (
                <Tooltip
                  title={
                    <span style={{ whiteSpace: 'pre-line' }}>
                      {`${reason}\n${
                        canBeRetried ? t('resubmit-issues', { ns: 'kyc' }) : ''
                      }`}
                    </span>
                  }
                >
                  <InfoOutlined sx={infoIconStyle} />
                </Tooltip>
              )}
            </ZigTypography>
          </Box>
        );
      })}
      {(isNotStarted || retry) && (
        <ZigButton variant={'text'} onClick={cta} id={id && `${id}-pass-kyc`}>
          {t('edit-profile.status-box.pass-kyc-cta')}
        </ZigButton>
      )}
    </ProfileStatusBoxContainer>
  );
};
