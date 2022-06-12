import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import WhiteContainer from '../common/WhiteContainer';

const Page: React.FC<{
  children: ReactNode;
  title: string | ReactNode;
}> = ({ children, title }) => {
  return (
    <WhiteContainer maxWidth='sm'>
      <Typography variant={'h5'} marginBottom={1}>
        {title}
      </Typography>

      {children}
    </WhiteContainer>
  );
};

export default Page;
