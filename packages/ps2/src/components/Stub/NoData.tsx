import React from 'react';
import { useTranslation } from 'react-i18next';
import Stub from './index';

const NoData: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <Stub title={t('no-data.title')} description={t('no-data.description')} />
  );
};

export default NoData;
