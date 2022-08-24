import { MenuList, styled } from '@mui/material';
import { UserType } from '@zignaly-open/raffles-shared/types';
import UserSettingsModal from 'components/Modals/UserSettings';
import { useLogout } from 'hooks/useAuthenticate';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from '@zignaly-open/ui';
import { Box } from '@mui/system';
import TransferZigModal from 'components/Modals/TransferZig';

const MenuItem = styled(TextButton)`
  padding: 6px 15px;
  color: ${({ theme }) => theme.neutral200};
  display: block;

  span {
    font-size: 15px !important;
  }
`;

const Menu = ({
  currentUser,
  showModal,
}: {
  currentUser: UserType;
  showModal: (...args: unknown[]) => void;
}) => {
  const logout = useLogout();
  const { t } = useTranslation('global');

  return (
    <MenuList>
      <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
        <MenuItem
          color='neutral200'
          caption={t('transfer-coin', { coin: 'ZIG' })}
          onClick={() => showModal(TransferZigModal)}
        />
      </Box>
      <MenuItem
        color='neutral200'
        caption={t('settings')}
        onClick={() => {
          showModal(UserSettingsModal, {
            username: currentUser.username,
            discordName: currentUser.discordName,
          });
        }}
      />
      <MenuItem color='neutral200' caption={t('disconnect')} onClick={logout} />
    </MenuList>
  );
};

export default Menu;
