import { MenuList, styled } from '@mui/material';
import { UserType } from '@zigraffle/shared/types';
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
  currentUser: UserType;
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
          showModal(UserSettingsModal, { userName: currentUser.username });
        }}
      />
      <MenuItem color='neutral200' caption={t('disconnect')} onClick={logout} />
    </MenuList>
  );
};

export default Menu;
