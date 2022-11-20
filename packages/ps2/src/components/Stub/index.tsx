import React, { ReactElement } from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { Layout } from './styles';

// TODO: this belongs to zignaly-ui
const Stub: React.FC<{
  title: string | ReactElement;
  description: string | ReactElement;
}> = ({ title, description }) => {
  return (
    <Layout>
      <ZigTypography variant={'h1'}>{title}</ZigTypography>
      <ZigTypography variant={'subtitle1'}>{description}</ZigTypography>
    </Layout>
  );
};

export default Stub;
