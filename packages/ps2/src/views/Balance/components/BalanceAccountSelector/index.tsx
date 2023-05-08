import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Layout, Data, Inline, TypeText } from './styles';
import {
  Avatar,
  ZigTypography,
  ArrowBottomIcon,
  ZigButton,
} from '@zignaly-open/ui';
import { useActiveExchange } from '../../../../apis/user/use';
import AccountSelector from 'components/AccountSelector';

const BalanceAccountSelector: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');
  const activeExchange = useActiveExchange();

  if (!activeExchange) {
    return null;
  }

  return (
    <Layout>
      <Avatar
        size={'xxlarge'}
        image={activeExchange.image}
        id={'balance__exchange-logo'}
      />
      <Data>
        <Inline>
          <ZigTypography variant={'h1'} id={'balance__exhange-internal-name'}>
            {activeExchange.internalName}
          </ZigTypography>
          <AccountSelector
            component={({ open }) => (
              <ZigButton
                id={'balance__exchange-switcher'}
                variant={'outlined'}
                active={open}
                narrow
              >
                <ArrowBottomIcon
                  color={
                    open ? theme.palette.neutral100 : theme.palette.neutral300
                  }
                  width={22}
                  height={20}
                />
              </ZigButton>
            )}
          />
        </Inline>
        <TypeText variant={'h4'}>
          <span id={'balance__type'}>{t('account-selector.type.title')}</span>
          <span id={'balance__exchange-type'}>
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

export default BalanceAccountSelector;
