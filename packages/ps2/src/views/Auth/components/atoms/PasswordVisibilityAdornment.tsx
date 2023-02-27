import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@zignaly-open/ui';

const PasswordVisibilityAdornment = ({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) => {
  return (
    <InputAdornment position='end'>
      <IconButton
        aria-label='Toggle password visibility'
        onClick={onToggle}
        icon={
          show ? (
            <Visibility sx={{ color: 'neutral200' }} />
          ) : (
            <VisibilityOff sx={{ color: 'neutral200' }} />
          )
        }
        variant='flat'
      />
    </InputAdornment>
  );
};

export default PasswordVisibilityAdornment;
