import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { Layout, Field, Button, Container, Item } from './styles';
import { Avatar, ArrowBottomIcon, ZigTypography } from '@zignaly-open/ui';
import { Exchange } from '../../../../apis/user/types';
import { getImageOfAccount } from '../../../../util/images';
import {
  useActiveExchange,
  useSelectExchange,
  useCurrentUser,
} from '../../../../apis/user/use';
import { AccountSelectorProps } from './types';

const AccountSelector: React.FC<AccountSelectorProps> = ({
  onExchangeSelected,
}) => {
  const theme = useTheme();
  const { exchanges } = useCurrentUser();
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
          <ZigTypography variant={'body1'} color={'neutral100'}>
            {activeExchange.internalName}
          </ZigTypography>
        </Field>
        {hasMultipleExchanges && (
          <ArrowBottomIcon
            color={theme.palette.neutral300}
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
              <ZigTypography
                variant={'body1'}
                color={
                  activeExchange.internalId === exchange.internalId
                    ? 'highlighted'
                    : 'neutral200'
                }
              >
                {exchange.internalName}
              </ZigTypography>
            </Item>
          ))}
        </Container>
      )}
    </Layout>
  );
};

export default AccountSelector;
