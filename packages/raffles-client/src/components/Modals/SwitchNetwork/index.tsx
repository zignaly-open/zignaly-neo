import { Box } from '@mui/system';
import { Mumbai, Polygon, useEthers } from '@usedapp/core';
import { Button, Typography } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { SwitchNetworkModalProps } from './types';

const SwitchNetworkModal = ({ chainId, ...props }: SwitchNetworkModalProps) => {
  const { t } = useTranslation('transfer-zig');

  const { switchNetwork } = useEthers();
  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t(chainId ? 'title' : 'wrong-network')}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('wrong-network-info')}
        </Typography>
      </Box>
      <Box display='flex' mt='24px' justifyContent='center'>
        <Button
          size='large'
          caption={t('switch-network')}
          onClick={() =>
            switchNetwork(
              process.env.REACT_APP_USE_MUMBAI_CHAIN
                ? Mumbai.chainId
                : Polygon.chainId,
            )
          }
          minWidth={200}
        />
      </Box>
    </DialogContainer>
  );
};
export default SwitchNetworkModal;
