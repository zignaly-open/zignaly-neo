import React, { useEffect, useState } from 'react';
import { Layout, StyledTab, StyledTabs } from './styles';
import { useTranslation } from 'react-i18next';
import { ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import SubscriptionCard from './SubscriptionCard';
import { useTitle } from 'react-use';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { SubscriptionPlan } from '../../apis/subscription/types';
import {
  useSubscribeMutation,
  useSubscriptionsQuery,
} from '../../apis/subscription/api';
import { useCurrentUser } from '../../apis/user/use';
import { format, parseISO } from 'date-fns';
import { useToast } from '../../util/hooks/useToast';

const Subscriptions: React.FC = () => {
  const SUBSCRIPTION_CODE_LENGTH = 17;
  const { t } = useTranslation(['subscriptions', 'pages']);
  useTitle(t('pages:subscriptions'));
  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const subscriptionsEndpoint = useSubscriptionsQuery();
  const currentUser = useCurrentUser();
  const [subscribe, { isLoading }] = useSubscribeMutation();
  const toast = useToast();

  const isInputValid = (input: string) => {
    return /^[A-Za-z]{0,2}(-[A-Za-z0-9]{0,4}){0,3}$/.test(input);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toUpperCase();
    if (isInputValid(inputValue)) {
      setCode(inputValue);
    }
  };
  useEffect(() => {
    if (code.length === SUBSCRIPTION_CODE_LENGTH)
      subscribe({ code })
        .unwrap()
        .then(() => toast.success(t('toast-success')));
  }, [code]);
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
              mb={'50px'}
              align={'center'}
              id={'subscriptions__title'}
            >
              {t('title')}
            </ZigTypography>
            <Box mb={4}>
              <StyledTabs value={activeTab} onChange={handleTabChange}>
                <StyledTab
                  active={activeTab === 0}
                  label={t('tabs.annually')}
                />
                <StyledTab
                  active={activeTab === 1}
                  label={t('tabs.lifetime')}
                />
              </StyledTabs>
            </Box>
            <Box display={'flex'} gap={4} mb={15}>
              {subscriptions?.map((el) => {
                const isBlockedSubscription =
                  currentUser?.subscriptionPlan?.id > el.id;
                const isEqualSubscription =
                  currentUser?.subscriptionPlan?.id === el.id;
                const isActiveLifetimeSubscription =
                  currentUser?.subscriptionDuration === 'lifetime';
                const isActiveLifetimeTab = activeTab === 1;
                const isActiveLifetimeTabAndSubscription =
                  isActiveLifetimeTab && isActiveLifetimeSubscription;
                const isActiveAnnuallyTabAndSubscription =
                  !isActiveLifetimeTab && !isActiveLifetimeSubscription;
                return (
                  <SubscriptionCard
                    key={el.id}
                    successFeePct={el.successFeePct}
                    name={el.name}
                    price={activeTab === 0 ? el.priceYear : el.priceLifetime}
                    status={
                      (isBlockedSubscription &&
                        (isActiveAnnuallyTabAndSubscription ||
                          isActiveLifetimeTabAndSubscription)) ||
                      (isActiveLifetimeSubscription && !isActiveLifetimeTab)
                        ? 'blocked'
                        : isEqualSubscription &&
                          (isActiveAnnuallyTabAndSubscription ||
                            isActiveLifetimeTabAndSubscription)
                        ? 'active'
                        : 'accessible'
                    }
                    subscriptionFinishesAt={
                      currentUser?.subscriptionFinishesAt &&
                      format(
                        parseISO(currentUser?.subscriptionFinishesAt),
                        'MMMM do, yyyy',
                      )
                    }
                  />
                );
              })}
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
                <ZigInput
                  disabled={isLoading}
                  value={code}
                  fullWidth
                  onChange={handleCodeChange}
                />
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
