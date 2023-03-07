import React from 'react';
import { Service } from '../../../../../apis/ps2/service/types';
import { useTranslation } from 'react-i18next';
import MarkdownSection from './MarkdownSection';

const ServiceDescription: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation('service');
  return (
    <MarkdownSection
      content={service.description}
      title={t('strategy')}
      emptyText={t('strategy-empty')}
    />
  );
};

export default ServiceDescription;
