import React, { useCallback, useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { Data, Field, Layout, Balance, Currency, Value } from './styles';
import { useTranslation } from 'react-i18next';
import {
  CoinIcon,
  ErrorMessage,
  InputSelect,
  formatInputSelectItem,
  InputText,
  Loader,
  Select,
  Typography,
  QRCode,
} from '@zignaly-open/ui';
import ModalContainer from '../../../../components/ModalContainer';
import { DialogProps } from '@mui/material/Dialog';
import { Modal } from '@mui/material';
import { useSelectedMyBalancesCoins } from '../../use';

function DepositModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation('deposit-crypto');
  const [coin, setCoin] = useState(null) as any;
  const [network, setNetwork] = useState(null) as any;
  const coins = useSelectedMyBalancesCoins();
  const balances = null;
  const depositInfo = null;
  const depositTag = 'DEPOSIT_TAG';

  const isLoadingCoinsBalances = true;
  const isLoadingDepositAddress = true;

  /**
   * @name renderBalanceInfo()
   * @description Render the balance field
   */
  const renderBalanceInfo = useCallback(
    (label, value) =>
      coin && (
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
          <Currency variant={'body2'}>
            {String(coin?.ref?.id).toUpperCase()}
          </Currency>
        </Balance>
      ),
    [coin],
  );

  const onClickClose = () => {
    close();
  };

  /**
   * @name balance
   * @description Get the current Balances of the token.
   */
  const balance = useMemo(() => {
    if (!balances || !Object.keys(balances).length || !coin) {
      return null;
    }
    const id = coin?.ref?.id as string;
    return balances[id];
  }, [coin, balances]);

  /**
   * @name coinList
   * @description Un-normalized state and format to coin selector.
   */
  const coinList = useMemo(
    () =>
      Object.keys(coins).map((key: any) => ({
        id: key,
        balance: coins[key],
      })),
    [coins],
  );

  return (
    <Modal
      {...props}
      onClose={close}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <ModalContainer
        title={t('deposit-crypto.title')}
        width={784}
        onClickClose={onClickClose}
      >
        <Typography>{t('deposit-crypto.description')}</Typography>

        <Layout>
          {/* Select Coin */}
          <Field>
            <InputSelect
              name={'coin'}
              label={t('deposit-crypto.coinSelector.label')}
              variant={'primary'}
              placeholder={t('deposit-crypto.coinSelector.placeholder')}
              selected={coin}
              onSelectItem={(coin: any) => {
                setCoin(coin);
                setNetwork(null);
              }}
              options={coinList
                .sort((a: { id: string }, b: { id: string }) =>
                  a.id.localeCompare(b.id),
                )
                .map((item: any) =>
                  formatInputSelectItem(
                    {
                      id: item.id,
                      icon: (
                        <CoinIcon
                          key={item.id}
                          size={'small'}
                          name={item.id}
                          coin={item.id}
                        />
                      ),
                      caption: item.id,
                    },
                    {
                      coin: item.id,
                      balance: item.balance,
                    },
                  ),
                )}
            />
            <Data>
              {isLoadingCoinsBalances
                ? coin && (
                    <Loader
                      color={'#fff'}
                      ariaLabel={t('deposit-crypto.balances.loadingAriaLabel')}
                      width={'22px'}
                      height={'22px'}
                    />
                  )
                : coin &&
                  balance && (
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
                  )}
            </Data>
          </Field>

          {/* Select Network */}
          <Field>
            <Select
              label={t('deposit-crypto.networkSelector.label')}
              placeholder={t('deposit-crypto.networkSelector.placeholder')}
              disabled={!coin}
              options={
                coin
                  ? (coin?.data?.balance?.networks ?? []).map((item: any) => ({
                      id: item.network,
                      caption: item.name,
                      leftElement: (
                        <CoinIcon
                          key={item.network}
                          name={item.network}
                          coin={item.network}
                          size={'small'}
                        />
                      ),
                      data: item,
                    }))
                  : []
              }
              value={network}
              minHeight={54}
              maxHeight={54}
              isFooterTable={true}
              onChange={setNetwork}
            />
          </Field>

          {network && !network.data.depositEnable ? (
            <ErrorMessage text={network.data.depositDesc} />
          ) : (
            <>
              <Field className={'column'}>
                <InputText
                  label={t('deposit-crypto.depositAddress.label')}
                  value={
                    isLoadingDepositAddress || !network
                      ? ''
                      : depositInfo?.address ?? ''
                  }
                  readOnly={true}
                  placeholder={
                    isLoadingDepositAddress
                      ? t('deposit-crypto.depositAddress.loading')
                      : t('deposit-crypto.depositAddress.placeholder')
                  }
                  copyToClipboard={true}
                />
                {!isLoadingDepositAddress &&
                  depositInfo?.address &&
                  network &&
                  coin && (
                    <ErrorMessage
                      text={t('deposit-crypto.depositAddress.warning', {
                        network: network.caption,
                        coin: coin.ref.id,
                      })}
                    />
                  )}
              </Field>

              {isLoadingDepositAddress ? (
                <Field className={'loader'}>
                  <Loader
                    color={'#fff'}
                    ariaLabel={t('deposit-crypto.depositAddress.loading')}
                    width={'32px'}
                    height={'32px'}
                  />
                </Field>
              ) : (
                <>
                  {depositTag && coin && network && (
                    <Field className={'column'}>
                      <InputText
                        label={t('deposit-crypto.depositMemo.label')}
                        value={depositTag}
                        readOnly={true}
                        copyToClipboard={true}
                      />
                    </Field>
                  )}
                  {depositInfo?.address && coin && network && (
                    <Field className={'qrCode'}>
                      <QRCode
                        label={
                          depositTag &&
                          t('deposit-crypto.depositQR.address', {
                            coin: coin.ref.id,
                          })
                        }
                        includeMargin={true}
                        size={200}
                        value={depositInfo.address}
                      />

                      {depositTag && coin && (
                        <QRCode
                          label={t('deposit-crypto.depositQR.memo', {
                            coin: coin.ref.id,
                          })}
                          includeMargin={true}
                          size={200}
                          value={depositTag}
                        />
                      )}
                    </Field>
                  )}
                </>
              )}
            </>
          )}
        </Layout>
      </ModalContainer>
    </Modal>
  );
}

export default DepositModal;
