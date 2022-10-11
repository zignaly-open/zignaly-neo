import React from 'react';
import ComingSoon from '../../components/Stub/ComingSoon';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';

const Signup: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('signup'));

  return (
    <>
      <ComingSoon />
    </>
  );
};

export default Signup;
