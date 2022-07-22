import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'zignaly-ui';
import DialogContainer from '../DialogContainer';
import { ClaimModalProps } from './types';

const ClaimModal = ({ ...props }: ClaimModalProps) => {
  const { t } = useTranslation('auction');
  return (
    <DialogContainer title={t('claim-instructions')} {...props}>
      <Typography marginTop={18} color='neutral200'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </DialogContainer>
  );
};

export default ClaimModal;
