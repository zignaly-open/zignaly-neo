import React from 'react';
import { Box } from '@mui/system';
import { TextButton, Typography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ExclusiveWalletProps } from './types';
import { WalletTypeId } from './types';
import { walletsDownloadUrls } from './utils';

const ExclusiveWallet = ({
  wallet = 'kucoin',
  ...props
}: ExclusiveWalletProps) => {
  const { t } = useTranslation('exclusive-wallets');

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t(`${wallet}.title`)}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {`${t(`${wallet}.description`)} `}
        </Typography>
        <TextButton
          href={walletsDownloadUrls[wallet]}
          caption='Download it here'
          variant='body1'
        />
      </Box>
    </DialogContainer>
  );
};

export { WalletTypeId };
export default ExclusiveWallet;
