import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import NotFound from '../../components/Stub/NotFound';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('404'));
  return <NotFound />;
};

export default NotFoundPage;
