import { Box, useMediaQuery } from '@mui/material';
import { Gap } from 'components/Modals/ConnectWallet/styles';
import React, { useState } from 'react';
import { Avatar, Button, InputText } from 'zignaly-ui';
import { InputContainer } from '../styles';
import Placeholder from '../../../../assets/avatar-placeholder.png';
import theme from 'theme';
import { useTranslation } from 'react-i18next';

const SettingsForm = ({
  userName = '',
  discordName = '',
}: {
  userName?: string;
  discordName?: string;
}) => {
  // TODO: Add submit of userName and discordName to backend and avatar update
  const [newUserName, setNewUserName] = useState(userName);
  const [discordUser, setDiscordUser] = useState(discordName);
  const matchesLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation('user-settings');

  const getFlexDirection = () => {
    if (matchesLarge) {
      return 'row';
    } else {
      return 'column';
    }
  };

  const getInputWidth = () => {
    if (matchesLarge) {
      return 404;
    } else {
      return null;
    }
  };

  return (
    <Box display='flex' flexDirection='column'>
      {matchesLarge && <Gap gap={17} />}
      <Box display='flex' flexDirection={getFlexDirection()}>
        {matchesLarge ? (
          <Box marginRight='71px'>
            <Avatar image={Placeholder} size='xx-large' />
          </Box>
        ) : (
          <Box>
            <Box display='flex'>
              <Box flex={1} />
              <Avatar image={Placeholder} size='xx-large' />
              <Box flex={1} />
            </Box>
            <Gap gap={15} />
          </Box>
        )}
        <Box>
          <InputContainer width={getInputWidth()}>
            <InputText
              placeholder={t('please-enter-username')}
              minHeight={23}
              label={t('username-label')}
              value={newUserName}
              onChange={(e: any) => setNewUserName(e.target.value)}
            />
          </InputContainer>
          <Gap gap={5} />
          <InputContainer width={getInputWidth()}>
            <InputText
              placeholder={t('please-enter-discord-user')}
              minHeight={23}
              label={t('discord-user-label')}
              value={discordUser}
              onChange={(e: any) => setDiscordUser(e.target.value)}
            />
          </InputContainer>
          <Gap gap={matchesLarge ? 46 : 15} />
          <Box gap='12px' display='flex' flexDirection={getFlexDirection()}>
            <Button
              minWidth={128}
              caption={t('cancel')}
              variant='secondary'
              size='large'
            />
            <Button minWidth={170} caption={t('save-profile')} size='large' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsForm;
