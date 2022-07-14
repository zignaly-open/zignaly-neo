import { Box } from '@mui/material';
import { Gap } from 'components/Modals/ConnectWallet/styles';
import React, { useState } from 'react';
import { Avatar, Button, InputText } from 'zignaly-ui';
import { InputContainer } from '../styles';
import Placeholder from '../../../../assets/avatar-placeholder.png';

const SettingsForm = ({
  userName = '',
  discordName = '',
  variant,
}: {
  userName?: string;
  discordName?: string;
  variant: 'small' | 'medium' | 'large';
}) => {
  // TODO: Add submit of userName and discordName to backend and avatar update
  const [newUserName, setNewUserName] = useState(userName);
  const [discordUser, setDiscordUser] = useState(discordName);

  const getFlexDirection = () => {
    if (variant === 'large') {
      return 'row';
    } else {
      return 'column';
    }
  };

  const getInputWidth = () => {
    if (variant === 'large') {
      return 404;
    } else {
      return null;
    }
  };

  const getButtonWidth = () => {
    if (variant === 'small') {
      return 90;
    } else {
      return 170;
    }
  };
  return (
    <Box display='flex' flexDirection={getFlexDirection()}>
      {variant === 'large' ? (
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
            placeholder='Please enter your username'
            minHeight={23}
            label='Username:'
            value={newUserName}
            onChange={(e: any) => setNewUserName(e.target.value)}
          />
        </InputContainer>
        <Gap gap={5} />
        <InputContainer width={getInputWidth()}>
          <InputText
            placeholder='Please enter your discord user'
            minHeight={23}
            label='Discord User:'
            value={discordUser}
            onChange={(e: any) => setDiscordUser(e.target.value)}
          />
        </InputContainer>
        <Gap gap={variant === 'large' ? 46 : 15} />
        <Box gap='12px' display='flex' flexDirection={getFlexDirection()}>
          <Button
            minWidth={getButtonWidth()}
            caption='Cancel'
            variant='secondary'
            size='large'
          />
          <Button
            minWidth={getButtonWidth()}
            caption='Save Profile'
            size='large'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsForm;
