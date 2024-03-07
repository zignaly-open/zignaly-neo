import React from 'react';
import { ZigInput } from '@zignaly-open/ui';
import { InputAdornment, Popover } from '@mui/material';
import { Box } from '@mui/system';
import ColorPicker from 'react-best-gradient-color-picker';

function ZigColorInput({
  value,
  onChange,
  error,
  allowGradient = false,
}: {
  value: string;
  allowGradient: boolean;
  error?: string;
  onChange: (value: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  return (
    <>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Box sx={{ p: 2 }}>
          <ColorPicker
            value={value}
            onChange={onChange}
            hideGradientType={!allowGradient}
            hideControls={!allowGradient}
          />
        </Box>
      </Popover>
      <Box role={'button'} onClick={(e) => setAnchorEl(e.currentTarget)}>
        <ZigInput
          error={error}
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Box
                  sx={{
                    background: value,
                    height: 14,
                    width: 14,
                    borderRadius: 3,
                  }}
                />
              </InputAdornment>
            ),
          }}
          value={value}
          readOnly
        />
      </Box>
    </>
  );
}

export default ZigColorInput;
