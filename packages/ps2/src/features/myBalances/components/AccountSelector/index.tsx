import React, { useCallback, useRef } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Layout, Data, Inline, TypeText, List, Item } from './styles';
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
import { Exchange, ExtendedExchange } from '../../../auth/types';
import { DropDownHandle } from '@zignaly-open/ui/lib/components/display/DropDown/types';

const AccountSelector = () => {
  const theme = useTheme() as Theme;
  const { t } = useTranslation('common');
  const { exchanges } = useCurrentUser();
  const activeExchange: ExtendedExchange = useActiveExchange();
  const selectExchange = useSelectExchange();
  const dropDownRef: React.Ref<DropDownHandle> = useRef(null);

  const handleSelectAccount = useCallback(
    (exchange: Exchange) => {
      selectExchange(exchange.internalId);
      if (dropDownRef.current) {
        dropDownRef.current?.closeDropDown();
      }
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
          {exchanges.length > 1 && (
            <DropDown
              ref={dropDownRef}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              component={
                <IconButton
                  variant={'secondary'}
                  size={'medium'}
                  icon={
                    <ArrowBottomIcon
                      color={theme.neutral300}
                      width={22}
                      height={20}
                    />
                  }
                />
              }
              content={
                <List>
                  {exchanges &&
                    activeExchange &&
                    exchanges.map((exchange: Exchange, index: number) => (
                      <Item
                        key={`--exchange-key-${index.toString()}`}
                        onClick={() => handleSelectAccount(exchange)}
                      >
                        <Avatar
                          size={'medium'}
                          image={getImageOfAccount(index)}
                        />
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
              }
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
