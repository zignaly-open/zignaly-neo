import React from 'react';
import { ErrorMessage } from '@zignaly-open/ui';
import { ErrorWrapper } from './styles';
import { PageWithHeaderContainer } from '../styles';
import { useTranslation } from 'react-i18next';

const Deactivated: React.FC = () => {
  const { t } = useTranslation('error');

  return (
    <PageWithHeaderContainer>
      <ErrorWrapper>
        <ErrorMessage text={t('access.deactivated-service')} />
      </ErrorWrapper>
    </PageWithHeaderContainer>
  );
};

export default Deactivated;
