import React, { useEffect } from 'react';
import { useActiveExchange, useIsAuthenticated } from '../../../apis/user/use';
import { useToast } from '../../../util/hooks/useToast';
import { useTranslation } from 'react-i18next';

const MissingExchangeChecker: React.FC = () => {
  const activeExchange = useActiveExchange();
  const toast = useToast();
  const { t } = useTranslation('error');

  useEffect(() => {
    if (!activeExchange) {
      toast.error(t('missing-exchange'), {
        autoClose: false,
        position: 'top-center',
      });
    }
  }, [activeExchange]);

  return null;
};

export default () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <MissingExchangeChecker /> : null;
};
