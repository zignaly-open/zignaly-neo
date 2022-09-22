import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';

const ProfitSharing: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('profit-sharing.title'));
  return (
    <>
      <ComingSoon />
    </>
  );
};

export default ProfitSharing;
