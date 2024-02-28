import { Box, Grid, Paper, Tooltip, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DataUsageTwoToneIcon from '@mui/icons-material/DataUsageTwoTone';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { ZigArrowOutIcon } from '@zignaly-open/ui/icons';
import { useLazyKycLinkQuery } from '../../../../apis/user/api';
import { useTranslation } from 'react-i18next';
import { OlList, UlList } from '../../../Referrals/styles';
import { useZAlert } from '../../../../components/ZModal/use';
import { KycBoxListEntry } from './atoms';
import {
  KycLevels,
  KycStatus,
  KycStatusResponse,
  UserData,
} from '../../../../apis/user/types';
import { useDispatch } from 'react-redux';
import { useCurrentUser } from 'apis/user/use';
import { setUser } from 'apis/user/store';

const largeIconStyle = {
  height: '16px',
  width: '16px',
  mr: 1,
};

const iconWrapStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const KycBox: React.FC<{
  labelColor: string;
  balanceRestriction?: string;
  disabledMessage?: string;
  title: string;
  icon: JSX.Element;
  response: KycStatusResponse;
  items: KycLevels[number]['levels'][number]['requirements'];
}> = ({
  icon,
  response,
  balanceRestriction,
  disabledMessage,
  items,
  labelColor,
  title,
}) => {
  // n+1 queries? never heard about him, is he a rapper?
  const [getCerificationLinkUrl, { isLoading: loadingVerification }] =
    useLazyKycLinkQuery();
  const { t } = useTranslation(['kyc']);
  const theme = useTheme();
  const showModal = useZAlert();
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const { level, category } = response;

  const infoIconStyle = {
    height: '15.6px',
    color: theme.palette.backgrounds.investorsIcon,
  };

  const openKyc = useCallback(async () => {
    await getCerificationLinkUrl({ category, level })
      .unwrap()
      .then(({ link: kycLink }) => {
        // Force KYCMonitoring to true to trigger UserKycChecker
        dispatch(setUser({ ...(user as UserData), KYCMonitoring: true }));

        showModal({
          title: t('modal.title'),
          description: t('modal.description'),
          okLabel: (
            <>
              {t('modal.ok')}{' '}
              <ZigArrowOutIcon
                width={'9px'}
                height={'9px'}
                style={{ marginBottom: '3px', marginLeft: '5px' }}
              />
            </>
          ),
          okAction: () => window.open(kycLink),
        });
      });
  }, [level, getCerificationLinkUrl]);

  return (
    <Grid
      container
      sx={{
        mt: 3,
        mb: 6,
        opacity: disabledMessage ? 0.5 : 1,
        minHeight: 200,
      }}
    >
      <Grid
        item
        sm={12}
        md={5}
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box sx={{ width: '32px', pt: 1.5, mr: 2.5 }}>{icon}</Box>
        <Box>
          <ZigTypography
            variant={'h2'}
            sx={{ mb: 0.5 }}
            color={labelColor || 'neutral100'}
          >
            {title}
          </ZigTypography>
          {!!balanceRestriction && (
            <>
              <ZigTypography
                color={'neutral400'}
                variant={'body2'}
                component={'p'}
              >
                {t('balance-limit')}
              </ZigTypography>
              <ZigTypography
                color={'neutral100'}
                variant={'body1'}
                component={'p'}
              >
                {balanceRestriction}
              </ZigTypography>
            </>
          )}

          {response?.status === KycStatus.APPROVED && (
            <ZigTypography
              sx={iconWrapStyle}
              component={'p'}
              color={'greenGraph'}
              fontWeight={500}
              variant={'body1'}
            >
              {t('status.verified')}
              <CheckCircleOutlineIcon sx={{ ...largeIconStyle, ml: 1 }} />
            </ZigTypography>
          )}

          {response?.status === KycStatus.PENDING && (
            <ZigTypography
              sx={iconWrapStyle}
              component={'p'}
              color={'yellow'}
              fontWeight={500}
              variant={'body1'}
            >
              <DataUsageTwoToneIcon sx={largeIconStyle} />
              {t('status.pending')}
              <Tooltip title={t('progress-explainer')}>
                <InfoOutlinedIcon sx={infoIconStyle} />
              </Tooltip>
            </ZigTypography>
          )}

          {[KycStatus.REJECTED, KycStatus.REJECTED_RETRY].includes(
            response?.status,
          ) && (
            <ZigTypography
              component={'p'}
              sx={iconWrapStyle}
              color={'redGraphOrError'}
              fontWeight={500}
              variant={'body1'}
            >
              <ErrorOutlineOutlinedIcon sx={largeIconStyle} />
              {t('status.rejected')}
              {!!response?.reason && (
                <Tooltip
                  title={
                    <span style={{ whiteSpace: 'pre-line' }}>
                      {`${response?.reason}\n${
                        response?.status === KycStatus.REJECTED_RETRY
                          ? t('resubmit-issues')
                          : ''
                      }`}
                    </span>
                  }
                >
                  <InfoOutlinedIcon sx={infoIconStyle} />
                </Tooltip>
              )}
            </ZigTypography>
          )}

          {[
            KycStatus.REJECTED_RETRY,
            KycStatus.INIT,
            KycStatus.NOT_STARTED,
          ].includes(response?.status) && (
            <ZigButton
              sx={{ mt: 1, ...iconWrapStyle }}
              variant={'contained'}
              tooltip={disabledMessage || undefined}
              disabled={!!disabledMessage}
              loading={loadingVerification}
              onClick={openKyc}
              size={'large'}
            >
              {t('verify')}
            </ZigButton>
          )}
        </Box>
      </Grid>
      <Grid item sm={12} md={7}>
        <Paper sx={{ p: 3.5, pt: 2.5, pb: 2.5 }}>
          <OlList>
            {items.map((k) => (
              <li
                style={{ marginTop: 4, marginBottom: 4 }}
                key={typeof k === 'string' ? k : k.title}
              >
                {typeof k === 'string' ? (
                  <KycBoxListEntry>{t(`requirements.${k}`)}</KycBoxListEntry>
                ) : (
                  <>
                    <KycBoxListEntry>{k.title}</KycBoxListEntry>
                    <UlList>
                      {k.items.map((itemKey) => (
                        <li
                          style={{ marginTop: 4, marginBottom: 4 }}
                          key={k + '_' + itemKey}
                        >
                          <KycBoxListEntry>
                            {t(`requirements.${itemKey}`)}
                          </KycBoxListEntry>
                        </li>
                      ))}
                    </UlList>
                  </>
                )}
              </li>
            ))}
          </OlList>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default KycBox;
