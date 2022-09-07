import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ServiceHeader from '../../features/trader/components/ServiceHeader';

const Management: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('pages.trading-services'));
  return (
    <>
      <ServiceHeader />
      <ComingSoon />
    </>
  );
};

export default Management;
