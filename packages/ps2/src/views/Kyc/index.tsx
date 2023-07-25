import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import {
  PageContainer,
  ZigTab,
  ZigTabs,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import KycBox from './components/KycBox';
import kycConfig from './kycDefinitions';

const Kyc: React.FC = () => {
  const { t } = useTranslation(['kyc', 'pages']);
  useTitle(t('pages:kyc'));
  const [tab, setTab] = useState<'kyc' | 'kyb'>('kyc');

  return (
    <PageContainer style={{ maxWidth: '615px' }}>
      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          pb: 4,
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

      <ZigTabs
        sx={{
          mt: 0,
          mb: 4,
          ml: 'auto',
          mr: 'auto',
        }}
        onChange={(_, newValue) => setTab(newValue)}
        value={tab}
      >
        <ZigTab label={t('tabs.kyc')} value={'kyc'} />
        <ZigTab label={t('tabs.kyb')} value={'kyb'} />
      </ZigTabs>
      {kycConfig[tab]?.map((c) => (
        <KycBox
          labelColor={c.color}
          balanceRestriction={t(
            `balance-range-from${c.restriction.to ? '-to' : ''}`,
            c.restriction,
          )}
          items={t(c.requirements, { returnObjects: true })}
          title={t(c.label)}
          key={c.name}
          icon={c.icon}
          name={
            // TODO: make this dynamic or smth
            // this should NOT be hardcoded, even as a constant
            // @NataliaAvila-PM
            'QUA_individual_sandbox'
          }
        />
      )) || false}
    </PageContainer>
  );
};

export default Kyc;
