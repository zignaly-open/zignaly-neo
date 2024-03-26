import React from 'react';
import { Avatar, ZigImageInput } from '@zignaly-open/ui';
import { getServiceLogo } from 'util/images';
import { uploadImage } from 'apis/cloudinary';
import { AvatarSizes } from '@zignaly-open/ui/lib/components/display/Avatar';

const ServiceLogo = ({
  label,
  value,
  size,
  onChange,
  id,
}: {
  label: string | JSX.Element;
  value: string;
  size?: AvatarSizes | AvatarSizes[keyof AvatarSizes] | number;
  onChange: (logo: string) => void;
  id?: string;
}) => {
  return (
    <ZigImageInput
      buttonLabel={label}
      sx={{ alignItems: 'center' }}
      uploadFn={async (file: File) => {
        const upload = await uploadImage(file);
        return upload.secure_url;
      }}
      renderer={(url: string) => (
        <Avatar
          size={size || 'xx-large'}
          alt={''}
          image={getServiceLogo(url)}
          id={id}
        />
      )}
      id={'edit-profile__logo'}
      value={getServiceLogo(value)}
      onChange={onChange}
    />
  );
};

export default ServiceLogo;
