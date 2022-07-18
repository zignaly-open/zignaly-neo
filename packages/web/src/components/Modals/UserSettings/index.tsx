import { Box } from '@mui/system';
import React from 'react';
import { Typography } from 'zignaly-ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Link } from './styles';
import { UserSettingsModalProps } from './types';
import SettingsForm from './SettingsForm';
import { useTranslation } from 'react-i18next';

const UserSettingsModal = ({
  userName = '',
  discordName = '',
  ...props
}: UserSettingsModalProps) => {
  const { t } = useTranslation('user-settings');

  return (
    <DialogContainer {...props} title={t('settings')}>
      <SettingsForm discordName={discordName} userName={userName} />
      <Gap gap={15} />
      <Box display='flex'>
        <Box flex={1} />
        <Typography variant='body1' color='neutral300' weight='regular'>
          {t('information')}
          <a
            href='https://zignaly.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            <Link
              variant='body1'
              underline={true}
              color='links'
              weight='regular'
            >
              www.zignaly.com
            </Link>
          </a>
        </Typography>
        <Box flex={1} />
      </Box>
    </DialogContainer>
  );
};

export default UserSettingsModal;
