import React, { useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import { Avatar, ZigButton } from '@zignaly-open/ui';
import { Close, Edit } from '@mui/icons-material';
import { LogoContainer } from './styles';
import { getServiceLogo } from 'util/images';
import { uploadImage } from 'apis/cloudinary';
import { AvatarSizes } from '@zignaly-open/ui/lib/components/display/Avatar';

const ServiceLogo = ({
  label,
  value,
  size,
  onChange,
}: {
  label: string | JSX.Element;
  value: string;
  size?: AvatarSizes | AvatarSizes[keyof AvatarSizes] | number;
  onChange: (logo: string) => void;
}) => {
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
          size={size || 'xx-large'}
          alt={''}
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
        {label}
        <input hidden type='file' onChange={uploadLogo} />
      </ZigButton>
    </Box>
  );
};

export default ServiceLogo;
