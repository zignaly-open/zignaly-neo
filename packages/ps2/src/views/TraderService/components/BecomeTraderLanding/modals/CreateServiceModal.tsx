import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal from 'components/ZModal';

function CreateServiceModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation('offer-your-trading-service');

  return (
    <ZModal wide {...props} close={close} title={t('modal.title')}>
      hui
    </ZModal>
  );
}

CreateServiceModal.trackId = 'create-service';

export default CreateServiceModal;
