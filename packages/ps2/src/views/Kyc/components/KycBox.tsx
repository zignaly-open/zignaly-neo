import { Box, Grid, Paper, Tooltip, useTheme } from '@mui/material';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DataUsageTwoToneIcon from '@mui/icons-material/DataUsageTwoTone';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useKycStatusQuery } from '../../../apis/user/api';
import { useTranslation } from 'react-i18next';
import { UlList } from '../../Referrals/styles';
import { useZConfirm } from '../../../components/ZModal/use';

const largeIconStyle = {
  height: '16px',
  width: '16px',
  mr: 1,
  verticalAlign: 'sub',
};

const KycBox: React.FC<{
  name: string;
  labelColor: string;
  status?: 'failed' | 'pending' | 'completed';
  balanceRestriction?: string;
  title: string;
  disabled?: boolean;
  icon: JSX.Element;
  items: Record<string, string>;
}> = ({
  icon,
  name,
  status,
  balanceRestriction,
  items,
  labelColor,
  title,
  disabled,
}) => {
  // n+1 queries? never heard about him, is he a rapper?
  const kycStatusEndpoint = useKycStatusQuery(name);
  const { t } = useTranslation(['kyc']);
  console.error(kycStatusEndpoint);
  const theme = useTheme();
  const showModal = useZConfirm();

  const infoIconStyle = {
    height: '13px',
    position: 'relative',
    top: '1px',
    color: theme.palette.backgrounds.investorsIcon,
  };

  // TODO
  const kycLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  const openKyc = () => {
    showModal({
      title: t('modal.title'),
      description: t('modal.description'),
      yesLabel: t('modal.ok'),
      yesAction: () => window.open(kycLink),
    });
  };

  return (
    <Grid container sx={{ mb: 8.5, opacity: disabled ? 0.5 : 1 }}>
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
          {status === 'completed' && (
            <ZigTypography
              sx={{ mt: 2 }}
              component={'p'}
              color={'greenGraph'}
              fontWeight={600}
              variant={'body1'}
            >
              {t('status.completed')}
              <CheckCircleOutlineIcon sx={{ ...largeIconStyle, ml: 1 }} />
            </ZigTypography>
          )}
          {status === 'pending' && (
            <ZigTypography
              sx={{ mt: 2 }}
              component={'p'}
              color={'yellow'}
              fontWeight={600}
              variant={'body1'}
            >
              <DataUsageTwoToneIcon sx={largeIconStyle} />
              {t('status.pending')}
              <Tooltip title={t('progress-explainer')}>
                <InfoOutlinedIcon
                  sx={{
                    height: '13px',
                    verticalAlign: 'sub',
                    color: theme.palette.backgrounds.investorsIcon,
                  }}
                />
              </Tooltip>
            </ZigTypography>
          )}
          {status === 'failed' && (
            <ZigTypography
              component={'p'}
              sx={{ mt: 2 }}
              color={'redGraphOrError'}
              fontWeight={600}
              variant={'body1'}
            >
              <ErrorOutlineOutlinedIcon sx={largeIconStyle} />
              {t('status.failed')}
              <Tooltip title={t('progress-explainer')}>
                <InfoOutlinedIcon sx={infoIconStyle} />
              </Tooltip>
            </ZigTypography>
          )}

          <ZigButton
            sx={{ mt: 2.5 }}
            variant={'contained'}
            disabled={disabled}
            onClick={openKyc}
            size={'large'}
          >
            {t('verify')}
          </ZigButton>
        </Box>
      </Grid>
      <Grid item sm={12} md={7}>
        <Paper sx={{ p: 3.5, pt: 2.5, pb: 2.5 }}>
          <UlList>
            {Object.entries(items).map(([k, v]) => (
              <li style={{ marginTop: 4, marginBottom: 4 }} key={k}>
                {v}
              </li>
            ))}
          </UlList>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default KycBox;
