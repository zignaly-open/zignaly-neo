import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';

const CriticalError: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <Stub
      title={t('critical-error.title')}
      description={t('critical-error.description')}
    />
  );
};

export default CriticalError;
