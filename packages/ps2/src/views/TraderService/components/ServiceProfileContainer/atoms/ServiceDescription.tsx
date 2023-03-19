import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import MarkdownSection from './MarkdownSection';
import { Box } from '@mui/material';

const ServiceDescription: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation('service');
  return (
    <Box id={'service-profile__description'}>
      <MarkdownSection
        content={service.description}
        title={t('strategy')}
        emptyText={t('strategy-empty')}
      />
    </Box>
  );
};

export default ServiceDescription;
