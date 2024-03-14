import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'util/title';
import Stub from '../../components/Stub';
import { ROUTE_PROFIT_SHARING } from '../../routes';
import { useNavigate } from 'react-router-dom';

const OfflinePage: React.FC = () => {
  const { t } = useTranslation(['pages', 'error']);
  useTitle(t('pages:404'));
  const navigate = useNavigate();
  useEffect(() => {
    const onOnline = () => navigate(ROUTE_PROFIT_SHARING);
    if (navigator.onLine) onOnline();
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);
  return (
    <Stub
      title={t('error:offline.title')}
      description={t('error:offline.description')}
    />
  );
};

export default OfflinePage;
