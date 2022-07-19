import { MenuList, styled } from '@mui/material';
import UserSettingsModal from 'components/Modals/UserSettings';
import { useLogout } from 'hooks/useAuthenticate';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from 'zignaly-ui';
import { useModal } from 'mui-modal-provider';
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

const Menu = ({ currentUser }: { currentUser: any }) => {
  const logout = useLogout();
  const { t } = useTranslation('global');
  const { showModal } = useModal();

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
          showModal(UserSettingsModal, { userName: currentUser.userName });
        }}
      />
      <MenuItem color='neutral200' caption={t('disconnect')} onClick={logout} />
    </MenuList>
  );
};

export default Menu;
