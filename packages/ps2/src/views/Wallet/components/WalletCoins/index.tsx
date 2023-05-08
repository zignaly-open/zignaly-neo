/* eslint-disable i18next/no-literal-string */
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createColumnHelper,
  ZigButton,
  ZigCoinIcon,
  ZigPriceLabel,
  ZigTable,
  ZigTypography,
} from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { WalletCoinsProps, WalletCoinsTableType } from './types';
import { useZModal } from 'components/ZModal/use';
import { Remove } from '@mui/icons-material';
import WalletWithdrawModal from 'views/Wallet/modals/WalletWithdrawModal';
import { StyledTable } from './styles';

const WalletCoins = ({ coins, balances }: WalletCoinsProps) => {
  const { t } = useTranslation('wallet');
  const { showModal } = useZModal();

  const columnHelper = createColumnHelper<WalletCoinsTableType>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('coin', {
        header: t('transactions.header.coin'),
        cell: ({ getValue }) => (
          <ZigTypography
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={1}
          >
            <ZigCoinIcon coin={getValue()} size='small' bucket='coins' />
            {getValue()}
          </ZigTypography>
        ),
      }),
      columnHelper.accessor('balance.balance', {
        header: t('transactions.header.amount'),
        cell: ({ getValue }) => (
          <ZigTypography color='almostWhite'>
            <NumericFormat
              value={getValue()}
              displayType='text'
              thousandSeparator={true}
            />
          </ZigTypography>
        ),
      }),
      columnHelper.accessor(
        (row) => row.balance.balance * coins[row.coin].usdPrice,
        {
          id: 'value',
          header: t('coins.header.value'),
          cell: ({ getValue, row: { original } }) => (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap={1}
            >
              <ZigPriceLabel value={getValue()} usd color='almostWhite' />
              <ZigTypography variant='h5' color='neutral300'>
                @
                <NumericFormat
                  value={coins[original.coin].usdPrice}
                  displayType='text'
                  decimalScale={10}
                />
                /{original.coin}
              </ZigTypography>
            </Box>
          ),
        },
      ),
      columnHelper.display({
        id: 'action',
        cell: ({ row: { original } }) => (
          <Box display='flex' justifyContent='flex-end'>
            <ZigButton
              narrow
              tooltip={t('withdraw')}
              id={'wallet-table__withdraw'}
              onClick={() =>
                showModal(WalletWithdrawModal, {
                  selectedCoin: original.coin,
                  ctaId: 'wallet-table-row',
                  coins,
                })
              }
              variant='outlined'
            >
              <Remove
                sx={{ height: '18px', width: '22px' }}
                color={'neutral300'}
              />
            </ZigButton>
          </Box>
        ),
      }),
    ],
    [],
  );

  const data = Object.entries(balances)
    .map(([coin, balance]) => ({
      coin,
      balance,
    }))
    .filter(({ coin, balance }) => coin !== 'ZIG' && balance.balance > 0);

  if (!data.length) {
    return null;
  }

  return (
    <Box mb='70px'>
      <StyledTable>
        <ZigTable
          prefixId={'wallet-coins'}
          columns={columns}
          data={data}
          initialState={{
            sorting: [
              {
                id: 'value',
                desc: true,
              },
            ],
          }}
        />
      </StyledTable>
    </Box>
  );
};

export default WalletCoins;
