import React, { useCallback } from 'react';
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
import { PageWithHeaderContainer } from '../../TraderService/components/styles';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ROUTE_KYC } from '../../../routes';

const Kyc: React.FC = () => {
  const { t } = useTranslation(['kyc', 'pages']);
  useTitle(t('pages:kyc'));
  const { type: kycType } = useParams<{ type: 'kyc' | 'kyb' }>();
  const navigate = useNavigate();
  const switchToTab = useCallback((type: string) => {
    navigate(generatePath(ROUTE_KYC, { type }));
  }, []);

  const tab = kycType in kycConfig ? kycType : 'kyc';

  return (
    <PageContainer style={{ maxWidth: '615px' }}>
      <PageWithHeaderContainer hasHeader>
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
          onChange={(_, newValue) => switchToTab(newValue)}
          value={tab}
        >
          <ZigTab label={t('tabs.kyc')} value={'kyc'} />
          <ZigTab label={t('tabs.kyb')} value={'kyb'} />
        </ZigTabs>
        {kycConfig[tab]?.map((c, i, all) => (
          <KycBox
            requiresLevel={all[i - 1]?.name}
            labelColor={c.color}
            balanceRestriction={t(
              `balance-range-from${c.restriction.to ? '-to' : ''}`,
              c.restriction,
            )}
            items={t(c.requirements, { returnObjects: true })}
            title={t(c.label)}
            key={c.name}
            icon={c.icon}
            level={c.name}
          />
        )) || false}
      </PageWithHeaderContainer>
    </PageContainer>
  );
};

export default Kyc;