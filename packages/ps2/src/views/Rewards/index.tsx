import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { PageContainer } from '@zignaly-open/ui';

const Rewards: React.FC = () => {
  const { t } = useTranslation(['rewards', 'pages']);
  useTitle(t('pages:rewards'));

  return <PageContainer style={{ maxWidth: '1200px' }}>Hui</PageContainer>;
};

export default Rewards;
