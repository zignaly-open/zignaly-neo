import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import SectionWithReadMore from './SectionWithReadMore';

const ServiceDescription: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation('service');
  return (
    <SectionWithReadMore
      content={service.description}
      title={t('strategy')}
      emptyText={t('strategy-empty')}
    />
  );
};

export default ServiceDescription;
