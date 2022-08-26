// Dependencies
import React, { useCallback, useMemo, useRef } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Layout, Data, Inline, TypeText, List, Item } from './styles';
import {
  Avatar,
  IconButton,
  Typography,
  ArrowBottomIcon,
} from '@zignaly-open/ui';
import {
  useActiveExchange,
  useCurrentUser,
  useSelectExchange,
} from '../../../auth/use';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { getImageOfAccount } from '../../../../util/images';
import { Exchange } from '../../../auth/types';

const AccountSelector = () => {
  const theme = useTheme() as Theme;
  const { t } = useTranslation('common');
  const { exchanges } = useCurrentUser();
  const activeExchange = useActiveExchange();
  const selectExchange = useSelectExchange();
  const dropDownRef =
    useRef<{ setIsDropDownActive: (value: boolean) => void }>(null);

  /**
   * @function handleSelectAccount:
   * @description It is invoked when the user selects a new account.
   */
  const handleSelectAccount = useCallback(
    (exchange) => {
      selectExchange(exchange);
      if (dropDownRef.current) {
        dropDownRef.current?.setIsDropDownActive(false);
      }
    },
    [dropDownRef, selectExchange],
  );

  /**
   * @var renderAccountsList:
   * @description Render the list of accounts available
   */
  const renderAccountsList = useMemo(
    () => (
      <List>
        {exchanges &&
          activeExchange &&
          exchanges.map((exchange: Exchange, index: number) => (
            <Item
              key={`--exchange-key-${index.toString()}`}
              onClick={() => handleSelectAccount(exchange)}
            >
              <Avatar size={'medium'} image={getImageOfAccount(index)} />
              <Typography
                variant={'body1'}
                color={
                  activeExchange.internalId === exchange.internalId
                    ? 'highlighted'
                    : 'neutral200'
                }
                className={'internalName'}
              >
                {exchange.internalName}
              </Typography>
            </Item>
          ))}
      </List>
    ),
    [exchanges, activeExchange],
  );

  if (!activeExchange) {
    return null;
  }

  return (
    <Layout>
      <Avatar size={'xxlarge'} image={getImageOfAccount(0)} />
      <Data>
        <Inline>
          <Typography variant={'h1'} color={'neutral200'}>
            {activeExchange.internalName}
          </Typography>
          {exchanges.length > 1 && (
            <IconButton
              ref={dropDownRef}
              variant={'secondary'}
              size={'medium'}
              icon={
                <ArrowBottomIcon
                  color={theme.neutral300}
                  width={22}
                  height={20}
                />
              }
              dropDownOptions={{
                width: '280px',
                alignment: 'right',
                maxHeight: '330px',
              }}
              renderDropDown={renderAccountsList}
            />
          )}
        </Inline>
        <TypeText>
          <span>{t('account-selector.type.title')}</span>
          <span>
            {activeExchange.exchangeType === 'futures'
              ? t('account-selector.type.futures')
              : t('account-selector.type.spot')}
          </span>
        </TypeText>
      </Data>
    </Layout>
  );
};

export default AccountSelector;
