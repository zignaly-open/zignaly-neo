import React, { useState } from 'react';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/system';

const hiddenStyle = {
  opacity: 0,
  overflow: 'hidden',
  height: 0,
};

const TogglerButton: React.FC<{
  width?: number;
  isPositive: boolean;
  text: string | JSX.Element;
  buttonText: string | JSX.Element;
  action?: () => void;
}> = ({ action, isPositive, text, buttonText }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      sx={{
        ...(!action ? { display: 'flex' } : { minHeight: '2rem' }),
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ZigTypography
        sx={{
          transition: '.3s',
          ...(isHover || !action ? {} : { transform: 'translateY(12px)' }),
        }}
        component={'p'}
        color={isPositive ? 'greenGraph' : 'redGraphOrError'}
      >
        {text}
      </ZigTypography>
      {action && (
        <ZigButton
          sx={{
            transition: '.3s',
            ...(isHover ? {} : hiddenStyle),
          }}
          onClick={action}
          variant={'text'}
        >
          {buttonText}
        </ZigButton>
      )}
    </Box>
  );
};

export default TogglerButton;
