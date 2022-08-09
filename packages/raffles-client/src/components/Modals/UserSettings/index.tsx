import React from 'react';
import { Gap } from '../ConnectWallet/styles';
import DialogContainer from '../DialogContainer';
import { UserSettingsModalProps } from './types';
import SettingsForm from './SettingsForm';
import { useTranslation } from 'react-i18next';

const UserSettingsModal = ({
  username = '',
  discordName = '',
  ...props
}: UserSettingsModalProps) => {
  const { t } = useTranslation('user-settings');

  return (
    <DialogContainer
      maxWidth='sm'
      fullWidth={true}
      {...props}
      title={t('settings')}
    >
      <SettingsForm {...props} discordName={discordName} username={username} />
      <Gap gap={8} />
    </DialogContainer>
  );
};

export default UserSettingsModal;
