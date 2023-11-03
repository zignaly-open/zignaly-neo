import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import { useZModal } from '../../../../components/ZModal/use';
import { Loader, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useAsync } from 'react-use';
import { useDepositInfo } from 'apis/coin/use';

function useCurrency() {
  const { value: currency } = useAsync(async () => {
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEOLOCATION_API_KEY}`,
    );
    const data = await response.json();
    return data.currency.code;
  }, []);

  return currency;
}

function BuyModal(props: DialogProps): React.ReactElement {
  const { t } = useTranslation(['deposit-crypto']);
  const { data: depositInfo } = useDepositInfo('USDT', 'TRX', true);
  const currency = useCurrency();

  return (
    <ZModal mobileFullScreen wide {...props} title={t('buy-crypto')}>
      <ZigTypography id={'buy-modal__description'} textAlign='center'>
        {t('buy-crypto-description')}
      </ZigTypography>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        {currency && depositInfo ? (
          <iframe
            width='100%'
            height='400px'
            allow='camera'
            src={`https://widget.changelly.com/?from=*&to=usdtrx&amount=1000&address=${
              depositInfo.address
            }&fromDefault=${currency.toLowerCase()}&toDefault=usdtrx&merchant_id=q0s68wsie1uf9wza&payment_id=&v=3`}
          />
        ) : (
          <Loader width={24} height={24} />
        )}
      </Box>
    </ZModal>
  );
}

BuyModal.trackId = 'buy';

export const useOpenBuyModal = (): ((props?: Partial<DialogProps>) => void) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });
  return (props) => {
    showModal(BuyModal, props);
  };
};

export default BuyModal;
