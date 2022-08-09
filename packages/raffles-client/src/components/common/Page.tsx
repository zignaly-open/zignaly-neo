import { Typography } from '@zignaly-open/ui';
import React, { ReactNode } from 'react';
import WhiteContainer from '../common/WhiteContainer';
import { Box } from '@mui/system';

const Page: React.FC<{
  children: ReactNode;
  title: string | ReactNode;
}> = ({ children, title }) => {
  return (
    <WhiteContainer maxWidth='sm'>
      <Box marginBottom={1}>
        <Typography variant={'h5'}>{title}</Typography>
      </Box>

      {children}
    </WhiteContainer>
  );
};

export default Page;
