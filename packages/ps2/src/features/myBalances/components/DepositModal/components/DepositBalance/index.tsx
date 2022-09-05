import React from 'react';
import { Balance, Currency, Value } from './styles';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { useSelectedMyBalancesByCoin } from '../../../../use';
import { CoinBalance, CoinDetail } from '../../../../types';

const DepositBalance = ({ coin }: { coin: CoinDetail }): React.ReactElement => {
  const { t } = useTranslation('deposit-crypto');
  const balance = useSelectedMyBalancesByCoin(coin.id) as CoinBalance;

  /**
   * @name renderBalanceInfo()
   * @description Render the balance field
   */
  const renderBalanceInfo = (label: string, value: string) => (
    <Balance variant={'body2'} color={'neutral200'}>
      {label}
      <Value variant={'body2'} color={'neutral000'}>
        <NumberFormat
          value={value}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={9}
        />
      </Value>
      <Currency variant={'body2'}>{coin.id.toUpperCase()}</Currency>
    </Balance>
  );

  return (
    <>
      {renderBalanceInfo(
        t('deposit-crypto.balances.total'),
        balance.balanceTotal,
      )}
      {renderBalanceInfo(
        t('deposit-crypto.balances.balanceLocked'),
        balance.balanceLocked,
      )}
      {renderBalanceInfo(
        t('deposit-crypto.balances.balanceFree'),
        balance.balanceFree,
      )}
    </>
  );
};

export default DepositBalance;
