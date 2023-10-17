import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import NotFound from '../../components/Stub/NotFound';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation('pages');
  useTitle(t('404'));
  return <NotFound />;
};

export default NotFoundPage;
