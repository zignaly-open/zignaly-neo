import { Box } from '@mui/system';
import { InputText, Typography } from '@zignaly-open/ui';
import useCurrentUser from 'hooks/useCurrentUser';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { ShareCodeProps } from './types';

const ShareCode = (props: ShareCodeProps) => {
  const { t } = useTranslation('referral');
  const { user } = useCurrentUser();

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('share-code')}
      {...props}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('not-enough-info')}
        </Typography>
      </Box>
      <Box display='flex' mt='24px' justifyContent='center'>
        <InputText value={user.referralCode} />
      </Box>
    </DialogContainer>
  );
};
export default ShareCode;
