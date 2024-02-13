import React, { useMemo } from 'react';
import { Service } from '../../../../../apis/service/types';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import RichDescriptionEditor from '../../EditServiceProfileContainer/atoms/RichDescriptionEditor';
import { deserialize } from '../../EditServiceProfileContainer/atoms/RichDescriptionEditor/atoms/util';

const ServiceDescription: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation('service');
  const value = useMemo(
    () => deserialize(service.description),
    [service.description],
  );

  return (
    <Box>
      <RichDescriptionEditor
        id={'service-profile__description'}
        value={value}
        readMore
        readOnly
        label={t('strategy')}
        sx={{ mt: 8, color: 'neutral200' }}
      />
    </Box>
  );
};

export default ServiceDescription;
