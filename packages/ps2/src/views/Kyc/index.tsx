import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  PageContainer,
  ZigTypography,
  // ZigTypography,
} from '@zignaly-open/ui';
import { ReactComponent as SilverIcon } from '../../images/kyc/silver.svg';
import { ReactComponent as GoldIcon } from '../../images/kyc/gold.svg';
import { Box } from '@mui/material';
import KycBox from './components/KycBox';

const Kyc: React.FC = () => {
  const { t } = useTranslation(['kyc', 'pages']);
  useTitle(t('pages:kyc'));
  return (
    <PageContainer style={{ maxWidth: '915px' }}>
      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 4,
        }}
      >
        <ZigTypography variant={'h1'} id={'kyc__title'}>
          {t('title')}
        </ZigTypography>
        <ZigTypography
          variant={'body1'}
          id={'kyc__description'}
          color='neutral300'
          component={'p'}
        >
          {t('description')}
          <br />
          {t('description-explainer')}
        </ZigTypography>
      </Box>

      <KycBox
        labelColor={'#fff'}
        balanceRestriction={t('balance-range-from-to', {
          from: '0',
          to: '100k',
          coin: 'USDT',
        })}
        status={'failed'}
        items={t(`requirements-level-1`, { returnObjects: true })}
        title={t(`name-level-1`)}
        icon={<SilverIcon />}
        name={
          // TODO: make this dynamic or smth
          // this should NOT be hardcoded, even as a constant
          // @NataliaAvila-PM
          'QUA_individual_sandbox'
        }
      />

      <KycBox
        labelColor={'#FFD232'}
        balanceRestriction={t('balance-range-up-to', {
          to: '100k',
          coin: 'USDT',
        })}
        disabled
        icon={<GoldIcon />}
        items={t(`requirements-level-2`, { returnObjects: true })}
        title={t(`name-level-2`)}
        name={
          // TODO: make this dynamic or smth
          // this should NOT be hardcoded, even as a constant
          // @NataliaAvila-PM
          'QUA_individual_sandbox'
        }
      />
    </PageContainer>
  );
};

export default Kyc;
