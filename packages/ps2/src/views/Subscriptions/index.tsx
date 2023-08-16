import React, { useState } from 'react';
import { Layout, StyledTab, StyledTabs } from './styles';
import { useTranslation } from 'react-i18next';
import { ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';
import { useTitle } from 'react-use';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { SubscriptionPlan } from '../../apis/subscription/types';
import { useSubscriptionsQuery } from '../../apis/subscription/api';

const Subscriptions: React.FC = () => {
  const { t } = useTranslation(['subscriptions', 'pages']);
  useTitle(t('pages:subscriptions'));
  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const subscriptionsEndpoint = useSubscriptionsQuery();
  const isInputValid = (input: string) => {
    return /^[A-Za-z]{0,2}(-[A-Za-z0-9]{0,4}){0,3}$/.test(input);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toUpperCase();
    if (isInputValid(inputValue)) {
      setCode(inputValue);
    }
  };
  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };
  return (
    <LayoutContentWrapper
      endpoint={[subscriptionsEndpoint]}
      content={([subscriptions]: [subscriptions: SubscriptionPlan[]]) => {
        return (
          <Layout>
            <ZigTypography
              variant='h1'
              mb={'70px'}
              align={'center'}
              id={'subscriptions__title'}
            >
              {t('title')}
            </ZigTypography>
            <Box mb={3}>
              <StyledTabs value={activeTab} onChange={handleTabChange}>
                <StyledTab active={activeTab === 0} label='Price Annually' />
                <StyledTab active={activeTab === 1} label='Lifetime License' />
              </StyledTabs>
            </Box>
            <Box display={'flex'} gap={4} mb={15}>
              {subscriptions?.map((el) => (
                <SubscriptionCard key={el.id} {...el} status={2} />
              ))}
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              width={'62%'}
              gap={0.5}
            >
              <ZigTypography mb={2.5} variant={'h1'} color={'neutral000'}>
                {t('redeem-code')}
              </ZigTypography>
              <Box width={'60%'} mb={9}>
                <ZigInput value={code} fullWidth onChange={handleCodeChange} />
              </Box>
              <ZigTypography color={'neutral000'} variant={'h2'}>
                {t('platform-renew', { amount: 29 })}
              </ZigTypography>
              <ZigTypography color={'neutral000'} variant={'h2'}>
                {t('prelaunch-price')}
              </ZigTypography>
              <ZigTypography color={'neutral000'} variant={'h2'} mb={2}>
                {t('performance-fees')}
              </ZigTypography>
              <ZigTypography color={'neutral100'} variant={'body2'}>
                {t('warning')}
              </ZigTypography>
            </Box>
          </Layout>
        );
      }}
    />
  );
};
export default Subscriptions;
