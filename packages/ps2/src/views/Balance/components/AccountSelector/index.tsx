import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Layout, Data, Inline, TypeText, Item, InternalName } from './styles';
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
} from '../../../../apis/user/use';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { getImageOfAccount } from '../../../../util/images';
import { ExtendedExchange, UserData } from '../../../../apis/user/types';

const AccountSelector: React.FC = () => {
  const theme = useTheme() as Theme;
  const { t } = useTranslation('common');
  const user: UserData | Partial<UserData> = useCurrentUser();
  const activeExchange: ExtendedExchange | undefined = useActiveExchange();
  const selectExchange = useSelectExchange();

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
              options={(user.exchanges || []).map((exchange, index) => ({
                onClick: () => selectExchange(exchange.internalId),
                label: (
                  <Item
                    id={`account-exchangeId-${exchange.internalId}`}
                    key={`--exchange-key-${index.toString()}`}
                  >
                    <Avatar size={'medium'} image={getImageOfAccount(index)} />
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
                ),
              }))}
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
