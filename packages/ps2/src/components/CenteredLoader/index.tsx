import { Center } from './styles';
import { Loader } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CenteredLoader: React.FC<{ width?: number; height?: number }> = ({
  width = 40,
  height = 40,
}) => {
  const { t } = useTranslation();
  return (
    <Center>
      <Loader
        color={'#fff'}
        width={width + 'px'}
        height={height + 'px'}
        ariaLabel={t('loading')}
      />
    </Center>
  );
};

export default CenteredLoader;
