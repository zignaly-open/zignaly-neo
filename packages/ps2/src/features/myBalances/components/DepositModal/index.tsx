import React, { useMemo, useState } from 'react';
import { Data, Field, Layout } from './styles';
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
import DepositBalance from './components/DepositBalance';
import { SelectorItemFormat } from '@zignaly-open/ui/lib/components/inputs/InputSelect/types';
import { CoinDetail } from '../../types';

function DepositModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation('deposit-crypto');
  const [coin, setCoin] = useState(null);
  const [network, setNetwork] = useState(null);
  const coins = useSelectedMyBalancesCoins();
  const depositTag = 'DEPOSIT_TAG';

  const isLoadingDepositAddress = false;
  const depositInfo = false;

  const onClickClose = () => {
    close();
  };

  /**
   * @name coinsList
   * @description Un-normalized state and format to coin selector.
   */
  const coinsList: CoinDetail[] = useMemo(
    () =>
      Object.keys(coins).map((key: string) => ({
        id: key,
        ...coins[key],
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
              onSelectItem={(item: SelectorItemFormat) => {
                setCoin(item);
                setNetwork(null);
              }}
              options={coinsList
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((item: CoinDetail) =>
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
                    item,
                  ),
                )}
            />
            <Data>{coin && <DepositBalance coin={coin.data} />}</Data>
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
              maxHeight={54}
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
