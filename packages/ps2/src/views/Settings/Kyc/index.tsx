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
import { PageWithHeaderContainer } from '../../TraderService/components/styles';
import { useKycStatusesQuery } from '../../../apis/user/api';
import CriticalError from '../../../components/Stub/CriticalError';
import LayoutContentWrapper from '../../../components/LayoutContentWrapper';

const Kyc: React.FC = () => {
  const { t } = useTranslation(['kyc', 'pages']);
  useTitle(t('pages:kyc'));
  const statusesEndpoint = useKycStatusesQuery();
  const [tab, switchToTab] = useState<'KYC' | 'KYB'>('KYB');

  return (
    <LayoutContentWrapper
      endpoint={statusesEndpoint}
      error={() => <CriticalError />}
      content={({ status }) => {
        return (
          <PageContainer style={{ maxWidth: '815px' }}>
            <PageWithHeaderContainer hasHeader>
              <Box
                sx={{
                  textAlign: 'center',
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
                <ZigTab label={t('tabs.kyc')} value={'KYC'} />
                <ZigTab label={t('tabs.kyb')} value={'KYB'} />
              </ZigTabs>
              {kycConfig[tab]?.map((c, i) => (
                <KycBox
                  requiresLevel={status[i - 1].name}
                  labelColor={c.color}
                  balanceRestriction={t(
                    `balance-range-from${c.restriction.to ? '-to' : ''}`,
                    c.restriction,
                  )}
                  items={t(c.requirements, { returnObjects: true })}
                  title={t(c.label)}
                  key={status[i].name}
                  icon={c.icon}
                  level={status[i].name}
                />
              )) || false}
            </PageWithHeaderContainer>
          </PageContainer>
        );
      }}
    />
  );
};

export default Kyc;
