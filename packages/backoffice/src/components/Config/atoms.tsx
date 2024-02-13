import React from 'react';
import { Box } from '@mui/material';
import { ZigInput, ZigTypography } from '@zignaly-open/ui';
import { ZigInputProps } from '@zignaly-open/ui/components/inputs/ZigInput/types';
import { useTranslation } from 'react-i18next';

export const SectionHeader: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <Box sx={{ mt: 8, mb: 4 }}>
    <ZigTypography variant={'h2'}>{title}</ZigTypography>
    <ZigTypography sx={{ mt: 0.5 }} component={'p'}>
      {description}
    </ZigTypography>
  </Box>
);

export const GridInput: React.FC<
  ZigInputProps & {
    label: string;
    image: JSX.Element;
    id: string;
  }
> = ({ label, image, id, ...rest }) => {
  const { t } = useTranslation('config');
  return (
    <ZigInput
      id={id}
      wide
      placeholder={t('placeholder')}
      label={
        <ZigTypography
          sx={{
            display: 'flex',
            alignItems: 'center',
            svg: {
              width: '20px',
              height: '20px',
              marginRight: '8px',
            },
          }}
        >
          {image}
          {label + ':'}
        </ZigTypography>
      }
      {...rest}
    />
  );
};
