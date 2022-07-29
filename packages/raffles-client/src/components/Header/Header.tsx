import { IconButton, BrandImage, UserIcon, WalletIcon } from 'zignaly-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useCurrentUser from '../../hooks/useCurrentUser';
import { Header as ZIGHeader, Button } from 'zignaly-ui';
import { styled } from '@mui/material/styles';
import ConnectWalletModal from '../Modals/ConnectWallet';
import { useModal } from 'mui-modal-provider';
import UserBalance from './UserBalance';
import TransferZigModal from 'components/Modals/TransferZig';
import Menu from './Menu';
import { Box } from '@mui/system';

// TODO: we should fix types in zignaly-ui
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const StyledWalletIcon = styled(WalletIcon)`
  color: ${({ theme }) => theme.neutral300};
`;

const MenuButton = styled(IconButton)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-left: -18px;
  }

  button > div {
    width: auto !important;
  }
`;

const Header = () => {
  const { t } = useTranslation('global');
  const { user: currentUser, loading } = useCurrentUser();
  const { showModal } = useModal();

  return (
    <ZIGHeader
      leftElements={[
        <BrandImage
          key={'logo2'}
          type={'logotype'}
          width={'140px'}
          height={'68px'}
        />,
      ]}
      rightElements={[
        !loading &&
          (currentUser?.id ? (
            <React.Fragment key='transfer'>
              <Box
                sx={{
                  display: { sm: 'block', xs: 'none' },
                }}
              >
                <Button
                  variant='secondary'
                  size='small'
                  caption={t('transfer-coin', { coin: 'ZIG' })}
                  leftElement={<StyledWalletIcon />}
                  onClick={() => showModal(TransferZigModal)}
                />
              </Box>
              <Box ml={{ sm: 0, xs: 1 }}>
                <UserBalance />
              </Box>
            </React.Fragment>
          ) : (
            <Button
              variant='secondary'
              size='small'
              onClick={() => {
                showModal(ConnectWalletModal);
              }}
              caption={t('log-in')}
              key='login'
              leftElement={<StyledWalletIcon />}
            />
          )),
        <MenuButton
          key={'user'}
          variant={'flat'}
          // TODO: we should fix svgs in zignaly-ui
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: fixme
          icon={<UserIcon color='#65647E' />}
          renderDropDown={<Menu currentUser={currentUser} />}
          dropDownOptions={{
            alignment: 'right',
            position: 'static',
          }}
        />,
      ]}
    />
  );
};

export default Header;
