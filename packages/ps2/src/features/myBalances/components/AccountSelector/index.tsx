import React, { useCallback, useRef } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Data,
  Inline,
  TypeText,
  List,
  Item,
  InternalName,
} from './styles';
import {
  Avatar,
  IconButton,
  Typography,
  ArrowBottomIcon,
  DropDown,
} from '@zignaly-open/ui';
import {
  useActiveExchange,
  useCurrentUser,
  useSelectExchange,
} from '../../../auth/use';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { getImageOfAccount } from '../../../../util/images';
import { Exchange, ExtendedExchange, UserData } from '../../../auth/types';
import { DropDownHandle } from '@zignaly-open/ui/lib/components/display/DropDown/types';

const AccountSelector: React.FC = () => {
  const theme = useTheme() as Theme;
  const { t } = useTranslation('common');
  const user: UserData | Partial<UserData> = useCurrentUser();
  const activeExchange: ExtendedExchange | undefined = useActiveExchange();
  const selectExchange = useSelectExchange();
  const dropDownRef = useRef<DropDownHandle>(null);

  const handleSelectAccount = useCallback(
    (exchange: Exchange) => {
      selectExchange(exchange.internalId);
      dropDownRef.current?.closeDropDown();
    },
    [dropDownRef, selectExchange],
  );

  if (!activeExchange) {
    return null;
  }

  return (
    <Layout>
      <Avatar size={'xxlarge'} image={activeExchange.image} />
      <Data>
        <Inline>
          <Typography variant={'h1'} color={'neutral200'}>
            {activeExchange.internalName}
          </Typography>
          {user.exchanges.length > 1 && (
            <DropDown
              ref={dropDownRef}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              component={({ open }) => (
                <IconButton
                  variant={'secondary'}
                  size={'medium'}
                  isFocused={open}
                  icon={
                    <ArrowBottomIcon
                      color={open ? theme.neutral100 : theme.neutral300}
                      width={22}
                      height={20}
                    />
                  }
                />
              )}
              content={
                <List>
                  {(user.exchanges || []).map((exchange, index) => (
                    <Item
                      id={`account-exchangeId-${exchange.internalId}`}
                      key={`--exchange-key-${index.toString()}`}
                      onClick={() => handleSelectAccount(exchange)}
                    >
                      <Avatar
                        size={'medium'}
                        image={getImageOfAccount(index)}
                      />
                      <InternalName
                        variant={'body1'}
                        color={
                          activeExchange.internalId === exchange.internalId
                            ? 'highlighted'
                            : 'neutral200'
                        }
                      >
                        {exchange.internalName}
                      </InternalName>
                    </Item>
                  ))}
                </List>
              }
            />
          )}
        </Inline>
        <TypeText>
          <span>{t('account-selector.type.title')}</span>
          <span>
            {t(
              'account-selector.type.' +
                (activeExchange.exchangeType === 'futures'
                  ? 'futures'
                  : 'spot'),
            )}
          </span>
        </TypeText>
      </Data>
    </Layout>
  );
};

export default AccountSelector;
