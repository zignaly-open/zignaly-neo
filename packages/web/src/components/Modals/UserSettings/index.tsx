import { Box } from '@mui/system';
import React from 'react';
import { Typography } from 'zignaly-ui';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { Link } from './styles';
import { UserSettingsModalProps } from './types';
import useWindowDimensions from 'hooks/useWindowDimensions';
import SettingsForm from './SettingsForm';

const UserSettingsModal = ({
  userName = '',
  discordName = '',
  ...props
}: UserSettingsModalProps) => {
  const { width } = useWindowDimensions();

  const LargeLayout = () => {
    return (
      <Box display='flex' flexDirection='column'>
        <Gap gap={28} />
        <SettingsForm
          variant='large'
          discordName={discordName}
          userName={userName}
        />
      </Box>
    );
  };

  const MediumLayout = () => {
    return (
      <Box display='flex' flexDirection='column'>
        <SettingsForm
          variant='medium'
          discordName={discordName}
          userName={userName}
        />
      </Box>
    );
  };

  const SmallLayout = () => {
    return (
      <Box display='flex' flexDirection='column'>
        <SettingsForm
          variant='small'
          discordName={discordName}
          userName={userName}
        />
      </Box>
    );
  };
  return (
    <DialogContainer {...props} title='Settings'>
      {width >= 840 && <LargeLayout />}
      {width >= 450 && width < 840 && <MediumLayout />}
      {width < 450 && <SmallLayout />}
      <Gap gap={15} />
      <Box display='flex'>
        <Box flex={1} />
        <Typography variant='body1' color='neutral300' weight='regular'>
          *For advanced options (Change password, 2FA...) visit
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
