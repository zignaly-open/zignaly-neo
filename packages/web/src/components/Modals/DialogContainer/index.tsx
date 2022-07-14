import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { Typography } from 'zignaly-ui';
import { DialogContainerProps } from './types';

function DialogContainer({ title, children, ...props }: DialogContainerProps) {
  return (
    <Dialog
      {...props}
      PaperProps={{
        style: {
          backgroundColor: '#101225',
          borderRadius: '16px',
          border: '1px solid #35334a',
          padding: '40px 56px 40px 56px',
        },
      }}
    >
      <DialogTitle textAlign='center'>
        <Typography variant='h1' color='neutral100' weight='medium'>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default DialogContainer;
