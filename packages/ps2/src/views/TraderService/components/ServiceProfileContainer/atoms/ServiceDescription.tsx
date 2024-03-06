import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import MarkdownSection from './MarkdownSection';

const ServiceDescription: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation('service');

  return (
    <Box>
      <MarkdownSection
        id={'service-profile__description'}
        content={service.description}
        title={t('strategy')}
        emptyText={t('strategy-empty')}
      />
    </Box>
  );
};

export default ServiceDescription;
