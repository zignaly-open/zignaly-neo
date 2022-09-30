import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';

const NotFound: React.FC = () => {
  const { t } = useTranslation('common');
  return <Stub title={t('404.title')} description={t('404.description')} />;
};

export default NotFound;
