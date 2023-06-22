import React from 'react';
import { Item } from './styles';
import { Avatar, ZigDropdown } from '@zignaly-open/ui';
import {
  useActiveExchange,
  useCurrentUser,
  useSelectExchange,
} from '../../apis/user/use';
import { getImageOfAccount } from '../../util/images';
import { Exchange, UserData } from '../../apis/user/types';
import { ZigDropdownProps } from '@zignaly-open/ui';
import { AccountName } from '../Navigation/AccountMenu/styles';

const AccountSelector: React.FC<{
  component: ZigDropdownProps['component'];
  exchangeFilter?: (exchange: Exchange) => boolean;
}> = ({ component, exchangeFilter }) => {
  const user: UserData | Partial<UserData> = useCurrentUser();
  const activeExchange = useActiveExchange();
  const selectExchange = useSelectExchange();

  if (!activeExchange) {
    return null;
  }

  const exchanges = user.exchanges || [];

  return (
    <>
      {user.exchanges.length > 1 && (
        <ZigDropdown
          component={component}
          options={exchanges
            .filter(exchangeFilter || Boolean)
            .map((exchange) => {
              const index = exchanges.indexOf(exchange);
              return {
                onClick: () => selectExchange(exchange.internalId),
                label: (
                  <Item
                    id={`account-exchangeId-${exchange.internalId}`}
                    key={`--exchange-key-${index.toString()}`}
                  >
                    <Avatar size={'medium'} image={getImageOfAccount(index)} />
                    <AccountName
                      variant={'body1'}
                      color={
                        activeExchange.internalId === exchange.internalId
                          ? 'highlighted'
                          : 'neutral200'
                      }
                    >
                      {exchange?.internalName}
                    </AccountName>
                  </Item>
                ),
              };
            })}
        />
      )}
    </>
  );
};

export default AccountSelector;
