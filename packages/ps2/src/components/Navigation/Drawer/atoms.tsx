import { ExpandLess, ChevronRight } from '@mui/icons-material';
import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Avatar, ZigDropdown } from '@zignaly-open/ui';
import {
  useActiveExchange,
  useCurrentUser,
  useSelectExchange,
} from 'apis/user/use';
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageOfAccount } from 'util/images';
import { AccountName } from '../AccountMenu/styles';

export const DropdownExchangeAccount = () => {
  const { exchanges } = useCurrentUser();
  const activeExchange = useActiveExchange();

  const selectExchange = useSelectExchange();

  const setActiveExchange = (exchangeInternalId: string) => {
    selectExchange(exchangeInternalId);
  };

  return (
    <ZigDropdown
      component={({ open }) => (
        <Box display='flex' gap={1} justifyContent='center'>
          <Avatar size={'medium'} image={activeExchange?.image} />
          <AccountName variant={'body1'} color={'neutral100'}>
            {activeExchange?.internalName}
          </AccountName>
          {open ? <ExpandLess /> : <ChevronRight />}
        </Box>
      )}
      options={(exchanges?.length > 1 ? exchanges : []).map(
        (exchange, index) => ({
          onClick: () => setActiveExchange(exchange.internalId),
          id: `drawer-account-switcher-dropdown__account-${index}`,
          label: (
            <>
              <Avatar size={'medium'} image={getImageOfAccount(index)} />
              <AccountName
                variant={'body1'}
                color={
                  activeExchange?.internalId === exchange.internalId
                    ? 'highlighted'
                    : 'neutral200'
                }
              >
                {exchange.internalName}
              </AccountName>
            </>
          ),
        }),
      )}
    />
  );
};

export const DrawerMenuItem: React.FC<{
  closeDrawer: () => void;
  id: string;
  path: string;
  label: string;
}> = ({ closeDrawer, id, path, label }) => (
  <ListItem disablePadding onClick={closeDrawer} sx={{ pl: 4 }}>
    <ListItemButton id={id} to={path} component={Link}>
      <ListItemText primary={label} />
    </ListItemButton>
  </ListItem>
);
