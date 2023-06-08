import React, { useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Service } from 'apis/service/types';
import { Avatar, ZigButton } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Close, Edit } from '@mui/icons-material';
import { LogoContainer } from './styles';
import { getServiceLogo } from 'util/images';
import { uploadImage } from 'apis/cloudinary';

const ServiceLogo = ({
  service,
  value,
  onChange,
}: {
  service: Service;
  value: string;
  onChange: (logo: string) => void;
}) => {
  const { t } = useTranslation('service');
  const [uploading, setUploading] = useState(false);

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    setUploading(true);

    try {
      const data = await uploadImage(e.target.files[0]);
      onChange(data.secure_url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      gap={1}
    >
      <LogoContainer>
        <Avatar
          size={'xx-large'}
          alt={t('logo-alt', { name: service.name })}
          image={getServiceLogo(value)}
        />
        {uploading ? (
          <CircularProgress size={24} />
        ) : (
          value && (
            <IconButton onClick={() => onChange('')}>
              <Close />
            </IconButton>
          )
        )}
      </LogoContainer>

      <ZigButton
        startIcon={<Edit sx={{ width: '12px', height: '12px' }} />}
        variant='text'
        component='label'
      >
        {t('edit.logo')}
        <input hidden type='file' onChange={uploadLogo} />
      </ZigButton>
    </Box>
  );
};

export default ServiceLogo;
