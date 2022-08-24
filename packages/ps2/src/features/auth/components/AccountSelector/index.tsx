import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Layout, Field, Button, Container, Item } from './styles';
import { Typography, Avatar, ArrowBottomIcon } from '@zignaly-open/ui';
import { Exchange } from '../../types';
import { getImageOfAccount } from '../../../../util/images';
import { useActiveExchange, useSelectExchange, useUser } from '../../use';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import { AccountSelectorProps } from './types';

const AccountSelector: React.FC<AccountSelectorProps> = ({
  onExchangeSelected,
}) => {
  const theme = useTheme() as Theme;
  const { exchanges } = useUser();
  const activeExchange = useActiveExchange();
  const selectExchange = useSelectExchange();
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  const setActiveExchange = (exchangeInternalId: string) => {
    selectExchange(exchangeInternalId);
    setIsDropdownShown(false);
    onExchangeSelected();
  };

  const hasMultipleExchanges = exchanges.length > 1;

  if (!activeExchange) {
    return null;
  }

  return (
    <Layout isActive={isDropdownShown}>
      <Button
        isMenu={hasMultipleExchanges}
        onClick={() => hasMultipleExchanges && setIsDropdownShown((x) => !x)}
      >
        <Field>
          <Avatar size={'medium'} image={activeExchange.image} />
          <Typography variant={'body1'} color={'neutral100'}>
            {activeExchange.internalName}
          </Typography>
        </Field>
        {hasMultipleExchanges && (
          <ArrowBottomIcon
            color={theme.neutral300}
            width={'22px'}
            height={'22px'}
          />
        )}
      </Button>
      {isDropdownShown && (
        <Container>
          {exchanges.map((exchange: Exchange, index) => (
            <Item
              key={exchange.internalId}
              onClick={() => setActiveExchange(exchange.internalId)}
            >
              <Avatar size={'medium'} image={getImageOfAccount(index)} />
              <Typography
                variant={'body1'}
                color={
                  activeExchange.internalId === exchange.internalId
                    ? 'highlighted'
                    : 'neutral200'
                }
              >
                {exchange.internalName}
              </Typography>
            </Item>
          ))}
        </Container>
      )}
    </Layout>
  );
};

export default AccountSelector;
