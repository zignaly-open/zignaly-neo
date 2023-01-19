import React, { useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Service } from 'apis/service/types';
import { Avatar, ZigButton } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Close, Edit } from '@mui/icons-material';
import { LogoContainer } from './styles';

const ServiceLogo = ({
  service,
  logo,
  onChange,
}: {
  service: Service;
  logo: string;
  onChange: (logo: string) => void;
}) => {
  const { t } = useTranslation('service');
  const [uploading, setUploading] = useState(false);

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'xiammksy');
    const options = {
      method: 'POST',
      body: formData,
    };
    setUploading(true);

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/zignaly/image/upload',
        options,
      );
      const data = await response.json();
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
          image={logo}
        />
        {uploading ? (
          <CircularProgress size={24} />
        ) : (
          logo && (
            <IconButton onClick={() => onChange('')}>
              <Close />
            </IconButton>
          )
        )}
      </LogoContainer>

      <ZigButton startIcon={<Edit />} variant='text' component='label'>
        {t('edit.logo')}
        <input hidden type='file' onChange={uploadLogo} />
      </ZigButton>
    </Box>
  );
};

export default ServiceLogo;
