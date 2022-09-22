import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';

const ComingSoon: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <Stub
      title={t('coming-soon.title')}
      description={t('coming-soon.description')}
    />
  );
};

export default ComingSoon;
