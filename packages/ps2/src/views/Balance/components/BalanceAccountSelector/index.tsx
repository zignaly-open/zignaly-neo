import React from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Layout, Data, Inline, TypeText } from './styles';
import {
  Avatar,
  IconButton,
  Typography,
  ArrowBottomIcon,
} from '@zignaly-open/ui';
import { useActiveExchange } from '../../../../apis/user/use';
import Theme from '@zignaly-open/ui/lib/theme/theme';
import AccountSelector from 'components/AccountSelector';

const BalanceAccountSelector: React.FC = () => {
  const theme = useTheme() as Theme;
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
          <Typography variant={'h1'} color={'neutral200'}>
            {activeExchange.internalName}
          </Typography>
          <AccountSelector
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
          />
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

export default BalanceAccountSelector;
