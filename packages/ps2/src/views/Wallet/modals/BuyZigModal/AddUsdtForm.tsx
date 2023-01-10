import React, { useEffect, useState } from 'react';
import {
  CoinIcon,
  OpenArrowIcon,
  WalletIcon,
  ZigButton,
  ZigTypography,
} from '@zignaly-open/ui';
import ExchangesTooltip from './atoms/ExchangesTooltip';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Select,
} from '@mui/material';
import { BUY_CRYPTO_URL } from 'util/constants';
import { AddUsdtFormProps } from './types';
import { FileCopyOutlined, NorthEast } from '@mui/icons-material';
import { getChainIcon } from 'components/ChainIcon';
import { useZModal } from 'components/ZModal/use';
import { useTranslation, Trans } from 'react-i18next';
import DepositModal from 'views/Dashboard/components/ManageInvestmentModals/DepositModal';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { UsdButtonChoice } from './styles';

const AddUsdtForm = ({ accountsBalances }: AddUsdtFormProps) => {
  const { t } = useTranslation('wallet');
  const { showModal } = useZModal();
  // const [depositUSDT, showDepositUSDT] = useState(false);

  // if (depositUSDT) {
  //   return <DepositUSDT accountsBalances={accountsBalances} />;
  // }

  return (
    <>
      <ZigTypography my={1}>
        {t('buy.deposit.description', { coin: 'USDT' })}
        <br />
        <Trans
          i18nKey='buy.description'
          t={t}
          values={{
            coin: 'USDT',
            max: '5,000',
          }}
        >
          <ExchangesTooltip />
        </Trans>
      </ZigTypography>

      <Grid display='flex' container mt={5} gap={{ xs: 5, sm: 0 }}>
        <UsdButtonChoice item sm={5}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flex={1}
          >
            <ZigTypography>{t('buy.deposit.external')}</ZigTypography>
          </Box>
          <ZigButton
            variant='outlined'
            onClick={() =>
              showModal(DepositModal, {
                selectedCoin: 'USDT',
              })
            }
          >
            {t('buy.deposit.depositCoin', { coin: 'USDT' })}
          </ZigButton>
        </UsdButtonChoice>
        <Grid
          item
          sm={2}
          justifyContent='center'
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
        >
          <Divider orientation='vertical' />
        </Grid>
        <UsdButtonChoice item sm={5}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flex={1}
          >
            <ZigTypography>{t('buy.deposit.noCrypto')}</ZigTypography>
          </Box>
          <ZigButton
            variant='outlined'
            href={BUY_CRYPTO_URL}
            target='_blank'
            endIcon={<NorthEast />}
          >
            {t('buy.deposit.buyCoin', { coin: 'USDT' })}
          </ZigButton>
        </UsdButtonChoice>
      </Grid>
    </>
  );
};

const AddUsdtFormOld = ({
  accountsBalances,
  coin = 'USDT',
}: DepositUSDTProps) => {
  const [network, setNetwork] = useState('');
  const copyToClipboard = useClipboard();
  const [internalId, setInternalId] = useState(null);
  const selectedAccount = accountsBalances.find(
    (a) => a.exchangeId === internalId,
  );
  const networkOptions = selectedAccount
    ? selectedAccount.networks.map((n) => ({
        value: n.network,
        label: n.name,
        icon: getChainIcon(n.network),
      }))
    : [];
  const networkData = selectedAccount
    ? selectedAccount.networks.find((n) => n.network === network)
    : null;
  const address = useExchangeDepositAddress(internalId, coin, networkData);
  const exchangeOptions = accountsBalances.map((a) => ({
    value: a.exchangeId,
    label: a.name,
    // icon: ZignalyIcon,
  }));

  return (
    <Modal>
      <Title>
        <img src={WalletIcon} width={40} height={40} />
        <FormattedMessage id='accounts.deposit' /> {coin}
      </Title>
      <TextDesc>
        <FormattedMessage id='wallet.zig.deposit.subtitle' values={{ coin }} />
      </TextDesc>
      <Control>
        <Label>
          <FormattedMessage id='transfer.internal.coin' />
        </Label>
        <Box display='flex' alignItems='center' pt='2px'>
          <CoinIcon width={32} height={32} coin={coin} />
          <TypographyToken>{coin}</TypographyToken>
        </Box>
      </Control>
      <Control>
        <Label>
          <FormattedMessage id='wallet.zig.deposit.exchangeaccount' />
        </Label>
        <Select
          values={exchangeOptions}
          fullWidth
          value={internalId}
          handleChange={(e) => setInternalId(e.target.value)}
        />
      </Control>
      {selectedAccount && (
        <Control>
          <Label>
            <FormattedMessage id='deposit.network' />
          </Label>
          <Select
            values={networkOptions}
            fullWidth
            value={network}
            handleChange={(e) => setNetwork(e.target.value)}
          />
        </Control>
      )}
      {address?.tag && (
        <Control>
          <Label>
            <FormattedMessage id='wallet.withdraw.memo' />
          </Label>
          <Input
            readOnly
            fullWidth
            value={address.tag}
            endAdornment={
              <IconButton
                aria-label='Copy'
                onClick={() =>
                  copyToClipboard(address.tag, 'deposit.memo.copied')
                }
              >
                <FileCopyOutlined width={24} height={24} />
              </IconButton>
            }
          />
          <QRCodeContainer>
            <QRCode size={200} value={address.tag} />
          </QRCodeContainer>
        </Control>
      )}
      {network && (
        <Control>
          <Label>
            <FormattedMessage id='deposit.address' />
          </Label>
          {address ? (
            <>
              <Input
                readOnly
                fullWidth
                value={address.address}
                endAdornment={
                  <IconButton
                    aria-label='Copy'
                    onClick={() =>
                      copyToClipboard(address.address, 'deposit.address.copied')
                    }
                  >
                    <FileCopyOutlined width={24} height={24} />
                  </IconButton>
                }
              />
              {networkData && (
                <NetworkCautionMessage network={networkData.name} coin={coin} />
              )}
              <QRCodeContainer>
                <QRCode size={200} value={address.address} />
              </QRCodeContainer>
            </>
          ) : (
            <CircularProgress size={21} style={{ margin: '0 auto' }} />
          )}
        </Control>
      )}
    </Modal>
  );
};
export default AddUsdtForm;
