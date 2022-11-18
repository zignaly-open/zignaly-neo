import React, { ReactElement } from 'react';
import { Button } from '@zignaly-open/ui';
import { useMediaQuery } from '@mui/material';
import { theme } from 'theme';

export default function Option({
  onClick,
  header,
  icon,
}: {
  onClick: () => void;
  header: string;
  icon: ReactElement;
}) {
  const matchesSmall = useMediaQuery(theme.breakpoints.up('sm'));

  const content = (
    <Button
      variant='primary'
      minWidth={270}
      size={matchesSmall ? 'xlarge' : 'large'}
      caption={header}
      onClick={onClick}
      leftElement={icon}
    />
  );

  return content;
}
