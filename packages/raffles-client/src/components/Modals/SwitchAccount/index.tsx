import { Box } from '@mui/system';
import { Button, Typography } from '@zignaly-open/ui';
import { useLogout } from 'hooks/useAuthenticate';
import useCurrentUser from 'hooks/useCurrentUser';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import { SwitchAccountProps } from './types';

const SwitchAccount = (props: SwitchAccountProps) => {
  const { t } = useTranslation(['transfer-zig', 'global']);
  const { user } = useCurrentUser();
  const logout = useLogout();

  useEffect(() => {
    if (!user) {
      // Close once disconnected
      props.onClose(null, 'escapeKeyDown');
    }
  }, [user]);

  return (
    <DialogContainer
      fullWidth={true}
      maxWidth={'sm'}
      title={t('wrong-address')}
      {...props}
      onClose={null}
    >
      <Box textAlign='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('wrong-address-info')}
        </Typography>
      </Box>
      <Box display='flex' mt='24px' justifyContent='center'>
        <Button
          size='large'
          caption={t('disconnect', {
            ns: 'global',
          })}
          onClick={logout}
          minWidth={200}
        />
      </Box>
    </DialogContainer>
  );
};
export default SwitchAccount;
