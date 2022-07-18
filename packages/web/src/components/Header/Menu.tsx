import { MenuList, styled } from '@mui/material';
import UserSettingsModal from 'components/Modals/UserSettings';
import { useLogout } from 'hooks/useAuthenticate';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from 'zignaly-ui';

const MenuItem = styled(TextButton)`
  padding: 2px 15px;
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
  currentUser: any;
  showModal: (...args: any[]) => void;
}) => {
  const logout = useLogout();
  const { t } = useTranslation('global');

  return (
    <MenuList>
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
