import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useBalance from '../../hooks/useBalance';
import { ReactComponent as ZigCoinIcon } from 'images/zig-coin.svg';
import NumberFormat from 'react-number-format';
import UserBalanceListener from './UserBalanceListener';
import { styled } from '@mui/material/styles';
import { Typography } from 'zignaly-ui';

const Layout = styled('div')`
  color: ${({ theme }) => theme.neutral100};
  background: rgba(16, 18, 37, 0.3);
  border: 1px solid #35334a;
  border-radius: 5px;
  display: flex;
  gap: 6px;
  padding: 0 10px;
  height: 38px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 11px;
`;

const Balance = styled(Typography)`
  white-space: nowrap;
`;

const UserBalance: React.FC = () => {
  const { balance } = useBalance();
  useTranslation('balance');

  const renderZigsCoins = useMemo(
    () => (
      <NumberFormat
        value={balance}
        displayType={'text'}
        thousandSeparator={true}
        renderText={(value) => <Balance>{value} ZIG</Balance>}
      />
    ),
    [balance],
  );

  return (
    <Layout>
      <UserBalanceListener />
      <ZigCoinIcon width={24} height={24} />
      {renderZigsCoins}
    </Layout>
  );
};

export default UserBalance;
