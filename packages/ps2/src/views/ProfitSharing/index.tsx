import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import Marketplace from './components/Marketplace';
import { useMarketplace } from '../../apis/marketplace/use';
import { zigSuspenseFallback } from '../../util/suspense';

const ProfitSharing: React.FC = () => {
  const { t } = useTranslation('pages');
  useMarketplace();
  useTitle(t('profit-sharing.title'));
  return (
    // hack to make marketplace and marketplace.json load simultaneously
    <Suspense fallback={zigSuspenseFallback}>
      <Marketplace />
    </Suspense>
  );
};

export default ProfitSharing;
