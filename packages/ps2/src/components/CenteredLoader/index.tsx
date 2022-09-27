import { Center } from './styles';
import { Loader } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CenteredLoader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Center>
      <Loader
        color={'#fff'}
        width={'40px'}
        height={'40px'}
        ariaLabel={t('loading')}
      />
    </Center>
  );
};

export default CenteredLoader;
