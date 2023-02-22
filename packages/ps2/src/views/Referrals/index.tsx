import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import ComingSoon from '../../components/Stub/ComingSoon';

const Referrals: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('referrals'));
  return <ComingSoon />;
};

export default Referrals;
