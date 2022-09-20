import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';

const Zigpad: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('zigpad'));
  return (
    <>
      <ComingSoon />
    </>
  );
};

export default Zigpad;
