import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import Marketplace from './components/Marketplace';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import DepositModal from '../Dashboard/components/ManageInvestmentModals/DepositModal';

const ProfitSharing: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('profit-sharing.title'));
  return (
    <>
      <Marketplace />
    </>
  );
};

export default ProfitSharing;

export const ProfitSharingInvest = createZModalRouteElement({
  component: DepositModal,
  ctaId: 'profit-sharing-url',
});
