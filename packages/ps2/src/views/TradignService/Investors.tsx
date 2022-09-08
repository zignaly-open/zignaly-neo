import ServiceInvestorsContainer from 'features/trader/components/InvestorTable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ServiceHeader from '../../features/trader/components/ServiceHeader';
import { useParams } from 'react-router-dom';

const Investors: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.profit-sharing.investors'));
  const { serviceId } = useParams();
  return (
    <>
      <ServiceHeader />
      <ServiceInvestorsContainer serviceId={serviceId} />
    </>
  );
};

export default Investors;
