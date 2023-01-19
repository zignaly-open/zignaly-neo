import React, { useState } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { Service } from 'apis/service/types';
import { Avatar, PencilIcon, TextButton, ZigButton } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { getServiceLogo } from 'util/images';
import theme from 'theme';
import { Close, Delete, DeleteOutline, Edit } from '@mui/icons-material';
import AnchorLink from 'components/AnchorLink';
import { LogoContainer } from '../styles';

const ServiceLogo = ({ service }: { service: Service }) => {
  const { t } = useTranslation('service');
  const md = useMediaQuery(theme.breakpoints.up('sm'));
  const [logoUrl, setLogoUrl] = useState(service.logo);

  // useeffect to update logoUrl when service.logo changes

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'xiammksy');
    const options = {
      method: 'POST',
      body: formData,
    };

    const response = await fetch(
      'https://api.cloudinary.com/v1_1/zignaly/image/upload',
      options,
    );
    const data = await response.json();
    setLogoUrl(data.secure_url);
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      sx={{ marginBottom: md ? 0 : 2 }}
      flexDirection='column'
      gap={1}
    >
      <LogoContainer>
        <Avatar
          size={'xx-large'}
          alt={t('logo-alt', { name: service.name })}
          image={getServiceLogo(logoUrl)}
        />
        {logoUrl && (
          <IconButton onClick={() => setLogoUrl('')}>
            <Close />
          </IconButton>
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
