import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@zignaly-open/ui';
import { DEFAULT_CHAIN_ID } from 'config/web3';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { SwitchNetworkModalProps } from './types';
import { switchNetwork } from 'util/switchChain';
import { useWeb3React } from '@web3-react/core';

const SwitchNetworkModal = ({ chainId, ...props }: SwitchNetworkModalProps) => {
  const { t } = useTranslation('transfer-zig');
  const { connector } = useWeb3React();

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
          onClick={() => switchNetwork(connector, DEFAULT_CHAIN_ID)}
          minWidth={200}
        />
      </Box>
    </DialogContainer>
  );
};
export default SwitchNetworkModal;
