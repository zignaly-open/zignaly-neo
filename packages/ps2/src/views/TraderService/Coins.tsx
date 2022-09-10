import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { TraderServicePageContainer } from '../../features/trader/components/styles';

const Coins: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.trading-services'));
  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer>
        <ComingSoon />
      </TraderServicePageContainer>
    </>
  );
};

export default Coins;
