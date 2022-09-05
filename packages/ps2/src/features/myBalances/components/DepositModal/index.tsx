import React, { useMemo, useState } from 'react';
import { Data, Field, Layout } from './styles';
import { useTranslation } from 'react-i18next';
import {
  Select,
  CoinIcon,
  InputSelect,
  formatInputSelectItem,
  Typography,
} from '@zignaly-open/ui';
import ModalContainer from '../../../../components/ModalContainer';
import { DialogProps } from '@mui/material/Dialog';
import { Modal } from '@mui/material';
import { useSelectedMyBalancesCoins } from '../../use';
import DepositBalance from './components/DepositBalance';
import { SelectorItemFormat } from '@zignaly-open/ui/lib/components/inputs/InputSelect/types';
import { CoinDetail, CoinNetwork } from '../../types';
import DepositInfo from './components/DepositInfo';

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

  console.log({ coin, network });

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
          <Field className={'column'}>
            <Select
              label={t('deposit-crypto.networkSelector.label')}
              placeholder={t('deposit-crypto.networkSelector.placeholder')}
              disabled={!coin}
              options={
                coin
                  ? (coin?.data?.networks ?? []).map((item: CoinNetwork) => ({
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
              fullWidth={true}
              onChange={setNetwork}
            />
          </Field>

          {coin && network && (
            <DepositInfo coin={coin.data} network={network.data} />
          )}
        </Layout>
      </ModalContainer>
    </Modal>
  );
}

export default DepositModal;
