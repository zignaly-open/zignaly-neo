import React, { ReactElement } from 'react';
import { Typography } from '@zignaly-open/ui';
import { Layout } from './styles';

// TODO: this belongs to zignaly-ui
const Stub: React.FC<{
  title: string | ReactElement;
  description: string | ReactElement;
}> = ({ title, description }) => {
  return (
    <Layout>
      <Typography variant={'h1'}>{title}</Typography>
      <Typography variant={'body1'} color={'neutral200'}>
        {description}
      </Typography>
    </Layout>
  );
};

export default Stub;
