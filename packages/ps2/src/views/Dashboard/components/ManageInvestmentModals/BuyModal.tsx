import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from '../../../../components/ZModal';
import { DepositModalProps } from './types';
import { useZModal } from '../../../../components/ZModal/use';
import { Loader, ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { useAsync } from 'react-use';

function BuyModal({
  close,
  onClose,
  selectedCoin,
  allowedCoins,
  ...props
}: {
  onClose: () => void;
} & DepositModalProps &
  DialogProps): React.ReactElement {
  const { t } = useTranslation(['deposit-crypto']);

  const { value: currency } = useAsync(async () => {
    const response = await fetch('http://www.geoplugin.net/json.gp');
    const data = await response.json();
    return data.geoplugin_currencyCode;
  }, []);

  return (
    <ZModal
      mobileFullScreen
      wide
      {...props}
      close={close}
      title={t('buy-crypto')}
    >
      <ZigTypography id={'buy-modal__description'} textAlign='center'>
        {t('buy-crypto-description')}
      </ZigTypography>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        {currency ? (
          <iframe
            width='100%'
            height='400px'
            allow='camera'
            src={`https://widget.changelly.com/?from=*&to=usdtrx&amount=1000&address=TSHcvNgyZNMV77fuwZJjm6bNJ3pa6AqzHB&fromDefault=${currency.toLowerCase()}&toDefault=usdtrx&merchant_id=q0s68wsie1uf9wza&payment_id=&v=3`}
          />
        ) : (
          <Loader width={24} height={24} />
        )}
      </Box>
    </ZModal>
  );
}

BuyModal.trackId = 'buy';

export const useOpenBuyModal = (): ((
  props?: Partial<DepositModalProps & { onClose: () => void }>,
) => void) => {
  const { showModal } = useZModal({ disableAutoDestroy: true });
  return (props) => {
    showModal(BuyModal, props);
  };
};

export default BuyModal;
