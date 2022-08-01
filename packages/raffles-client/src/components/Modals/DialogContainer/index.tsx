import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import theme from 'theme';
import { Typography } from 'zignaly-ui';
import { CloseButton, StyledCloseIcon } from './styles';
import { DialogContainerProps } from './types';

function DialogContainer({ title, children, ...props }: DialogContainerProps) {
  const matchesLarge = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Dialog
      {...props}
      PaperProps={{
        style: {
          backgroundColor: '#101225',
          borderRadius: '16px',
          border: '1px solid #35334a',
          padding: matchesLarge ? '40px 45px 40px 45px' : '10px 0px 10px 0px',
        },
      }}
    >
      <DialogTitle textAlign='center' style={{ position: 'relative' }}>
        <Typography variant='h1' color='neutral100' weight='medium'>
          {title}
        </Typography>
        <CloseButton onClick={(e) => props.onClose(e, 'backdropClick')}>
          <StyledCloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default DialogContainer;
