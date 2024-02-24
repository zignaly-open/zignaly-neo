import React from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import RichDescriptionEditor from '../../EditServiceProfileContainer/atoms/RichDescriptionEditor';
import { deserializeSlate } from '../../EditServiceProfileContainer/atoms/RichDescriptionEditor/atoms/util';

const ServiceDescription: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation('service');

  return (
    <Box>
      <RichDescriptionEditor
        id={'service-profile__description'}
        value={deserializeSlate(service?.description)}
        readMore
        readOnly
        label={t('strategy')}
        sx={{ mt: 8 }}
      />
    </Box>
  );
};

export default ServiceDescription;
