import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CoinIconWrapper, Form, FullWidthSelect } from './styles';
import {
  dark,
  InputText,
  ErrorMessage,
  ZignalyQRCode,
  ZigSelect,
  CloneIcon,
  Typography,
  CoinIcon,
  Loader,
  InputAmountAdvanced,
} from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { DepositFormData } from './types';
import { useToast } from '../../../../../../util/hooks/useToast';
import { Box, Grid } from '@mui/material';
import NumberFormat from 'react-number-format';
import {
  useCoinBalances,
  useDepositInfo,
  useExchangeCoinsList,
} from '../../../../../../apis/coin/use';
import { DepositModalProps } from '../../types';
import { allowedDeposits } from '../../../../../../util/coins';
import { useActiveExchange } from '../../../../../../apis/user/use';

function WithdrawForm({ allowedCoins, selectedCoin }: DepositModalProps) {
  const { t } = useTranslation('withdraw-crypto');
  const { data: balances } = useCoinBalances({ convert: true });
  const { data: coins } = useExchangeCoinsList();
  const { exchangeType } = useActiveExchange();
  const toast = useToast();

  const { handleSubmit, control, watch, setValue } = useForm<DepositFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  const coin = watch('coin');
  const network = watch('network');

  const coinOptions = useMemo(
    () =>
      allowedDeposits[exchangeType]?.map((ssc) => {
        const balance = balances[ssc];
        const name = coins[ssc]?.name || '';
        return {
          value: ssc,
          name,
          label: (
            <CoinIconWrapper>
              <CoinIcon size={'small'} coin={ssc} name={name} />{' '}
              <Typography weight={'demibold'}>{ssc} </Typography> &nbsp;
              <Typography weight={'regular'}>{name}</Typography>
            </CoinIconWrapper>
          ),
          inOrders: balance?.balanceLocked || 0,
          balance: balance?.balanceTotal || 0,
          available: balance?.balanceFree || 0,
          networks: coins[ssc].networks?.map((n) => ({
            label: n.name,
            value: n.network,
            ...n,
          })),
        };
      }),
    [coins, allowedCoins, exchangeType],
  );

  const coinObject = coin && coinOptions?.find((x) => x.value === coin);
  const networkObject =
    network && coinObject?.networks?.find((x) => x.value === network);

  useEffect(() => {
    if (coin) {
      setValue(
        'network',
        coinObject.networks.length === 1 ? coinObject.networks[0].value : null,
      );
    } else if (coinOptions?.length === 1) {
      setValue('coin', coinOptions[0].value);
    }
  }, [coin]);

  useEffect(() => {
    if (!coin && coinOptions && selectedCoin) {
      const match = coinOptions.find((x) => x.value === selectedCoin);
      match && setValue('coin', match?.value);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(() => {})}>
      <Box mt={1} mb={1}>
        <Typography>{t('description')}</Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} pt={3}>
          <FullWidthSelect>
            <Controller
              name='coin'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ZigSelect
                  menuPlacement='auto'
                  menuShouldScrollIntoView={false}
                  menuPosition='fixed'
                  menuShouldBlockScroll
                  label={t('coinSelector.label')}
                  placeholder={t('coinSelector.placeholder')}
                  {...field}
                  options={coinOptions}
                />
              )}
            />
          </FullWidthSelect>
        </Grid>

        <Grid item xs={12} pt={3}>
          <FullWidthSelect>
            <Controller
              name='network'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ZigSelect
                  menuPosition='fixed'
                  menuShouldBlockScroll
                  menuShouldScrollIntoView={false}
                  label={t('networkSelector.label')}
                  placeholder={t('networkSelector.placeholder')}
                  {...field}
                  options={coinObject?.networks}
                />
              )}
            />
          </FullWidthSelect>
        </Grid>

        {!!network && networkObject?.withdrawEnable && (
          <>
            <Grid item xs={12} pt={3}>
              <InputText
                placeholder={t('withdrawAddress.placeholder')}
                label={t('withdrawAddress.label')}
              />
            </Grid>

            {networkObject?.label && (
              <Box>
                <ErrorMessage
                  text={t('withdrawAddress.warning', {
                    network: networkObject?.label,
                    coin: coinObject?.name,
                  })}
                />
              </Box>
            )}

            {!!networkObject?.memoRegex && (
              <Grid item xs={12} pt={3}>
                <InputText
                  label={t('withdrawMemo.label')}
                  placeholder={t('withdrawMemo.placeholder')}
                />
              </Grid>
            )}
          </>
        )}

        {!!network && !networkObject?.withdrawEnable && (
          <ErrorMessage text={t('no-network')} />
        )}

        <Grid item xs={12} mt={3}>
          <InputAmountAdvanced
            name='amount'
            control={control}
            label={t('amountToWithdraw.label')}
            labelBalance={t('amountToWithdraw.labelBalance')}
            showUnit={true}
            placeholder='0.0'
            tokens={[
              {
                id: coin,
                balance: 1,
              },
            ]}
            // error={isDirty && t(errors?.amountTransfer?.value?.message)}
          />
        </Grid>
      </Grid>
    </Form>
  );
}

export default WithdrawForm;

// import Typography from 'components/display/Typography';
// import Selector from 'components/inputs/Selector';
// import { SelectSizes } from 'components/inputs/Selector/types';
// import React, { useState } from 'react';
// import { Gap } from 'utils/gap';
// import ModalContainer from '../../ModalContainer';
// import {
//   CoinOption,
//   MyAccountWithdrawModalProps,
//   NetworkOption,
// } from './types';
// import FormAndButton from './components/FormAndButton';

// const MyAccountWithdrawModal = ({
//   coins,
//   addressOnChange = () => {},
//   notSureOnClick = () => {},
//   amountOnChange = () => {},
//   onClickClose = () => {},
//   onSubmit = () => {},
//   isLoading = false,
// }: MyAccountWithdrawModalProps) => {
//   const [coin, setCoin] = useState<CoinOption>();
//   const [network, setNetwork] = useState<NetworkOption>();

//   const CoinSelector = () => {
//     return (
//       <>
//         <Gap gap={16} />
//         <Selector
//           label='Coin'
//           placeholder={coin?.caption ?? 'Select a Coin'}
//           onChange={(e: CoinOption) => {
//             setCoin(e);
//             setNetwork(undefined);
//           }}
//           size={SelectSizes.LARGE}
//           value={coin}
//           options={coins}
//           maxHeight={60}
//           transparent={true}
//         />
//       </>
//     );
//   };

//   const NetworkSelector = () => {
//     return (
//       <>
//         <Gap gap={12} />
//         <Selector
//           label='Network'
//           placeholder={network?.caption ?? 'Select a Network'}
//           onChange={(e: NetworkOption) => {
//             setNetwork(e);
//           }}
//           size={SelectSizes.LARGE}
//           value={network !== undefined ? network : undefined}
//           options={coin?.networks ?? undefined}
//           maxHeight={60}
//           transparent={true}
//         />
//       </>
//     );
//   };

//   return (
//     <ModalContainer
//       width={784}
//       title='Withdraw Crypto'
//       onClickClose={onClickClose}
//     >
//       <Typography variant='body1' color='neutral200' weight='regular'>
//         Withdraw crypto to an external account. To move funds between Zignaly
//         accounts, use a transfer instead.
//       </Typography>
//       <CoinSelector />
//       <NetworkSelector />
//       <FormAndButton
//         coin={coin}
//         network={network}
//         inputAmountOnChange={amountOnChange}
//         notSureOnClick={notSureOnClick}
//         inputAddressOnChange={addressOnChange}
//         onSubmit={onSubmit}
//         isLoading={isLoading}
//       />
//     </ModalContainer>
//   );
// };

// export default MyAccountWithdrawModal;
