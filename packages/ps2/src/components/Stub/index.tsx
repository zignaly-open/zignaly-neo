import React, { ReactElement } from 'react';
import { ZigTypography } from '@zignaly-open/ui';
import { Layout } from './styles';

// TODO: this belongs to zignaly-ui
const Stub: React.FC<{
  id?: string;
  title: string | ReactElement;
  description: string | ReactElement;
}> = ({ id, title, description }) => {
  return (
    <Layout id={id}>
      <ZigTypography variant={'h1'}>{title}</ZigTypography>
      <ZigTypography variant={'subtitle1'}>{description}</ZigTypography>
    </Layout>
  );
};

export default Stub;
