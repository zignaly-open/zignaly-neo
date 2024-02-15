import React from 'react';
import { ErrorMessage } from '@zignaly-open/ui';
import { ErrorWrapper } from './styles';
import { useTranslation } from 'react-i18next';

const Deactivated: React.FC = () => {
  const { t } = useTranslation('error');

  return (
    <ErrorWrapper>
      <ErrorMessage
        text={t('access.deactivated-service')}
        variant={'body1'}
        id={'deactivated-service__warning'}
      />
    </ErrorWrapper>
  );
};

export default Deactivated;
