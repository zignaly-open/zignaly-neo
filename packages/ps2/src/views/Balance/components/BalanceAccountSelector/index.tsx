import React from 'react';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Layout, Data, Inline, TypeText } from './styles';
import {
  Avatar,
  IconButton,
  ZigTypography,
  ArrowBottomIcon,
} from '@zignaly-open/ui';
import { useActiveExchange } from '../../../../apis/ps2/user/use';
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
      <Avatar size={'xxlarge'} image={activeExchange.image} />
      <Data>
        <Inline>
          <ZigTypography variant={'h1'}>
            {activeExchange.internalName}
          </ZigTypography>
          <AccountSelector
            component={({ open }) => (
              <IconButton
                id={'balance__account-switcher'}
                variant={'secondary'}
                size={'medium'}
                isFocused={open}
                icon={
                  <ArrowBottomIcon
                    color={
                      open ? theme.palette.neutral100 : theme.palette.neutral300
                    }
                    width={22}
                    height={20}
                  />
                }
              />
            )}
          />
        </Inline>
        <TypeText variant={'h4'}>
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

export default BalanceAccountSelector;
