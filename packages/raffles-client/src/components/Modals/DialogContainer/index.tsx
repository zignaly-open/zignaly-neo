import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import theme from 'theme';
import { Typography } from '@zignaly-open/ui';
import { CloseButton, StyledCloseIcon } from './styles';
import { DialogContainerProps } from './types';

function DialogContainer({ title, children, ...props }: DialogContainerProps) {
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      {...props}
      PaperProps={{
        style: {
          backgroundColor: '#101225',
          borderRadius: '16px',
          border: '1px solid #35334a',
          padding: matchesSmall ? '30px 30px 30px 30px' : '10px 0px 10px 0px',
        },
      }}
    >
      <DialogTitle textAlign='center' style={{ position: 'relative' }}>
        <Typography variant='h1' color='neutral100' weight='medium'>
          {title}
        </Typography>
        {props.onClose && (
          <CloseButton onClick={(e) => props.onClose(e, 'backdropClick')}>
            <StyledCloseIcon />
          </CloseButton>
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default DialogContainer;
