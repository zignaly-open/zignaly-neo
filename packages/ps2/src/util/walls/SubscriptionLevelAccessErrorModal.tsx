import React from 'react';
import ChooseBetweenTwo, {
  ChooseBetweenTwoProps,
} from '../../views/Dashboard/components/ManageInvestmentModals/views/ChooseBetweenTwo';
import ZModal from '../../components/ZModal';
import { DialogProps } from '@mui/material/Dialog';

type ModalProps = {
  close: () => void;
  title: string;
} & DialogProps &
  ChooseBetweenTwoProps;

function SubscriptionLevelAccessErrorModal({
  close,
  open,
  title,
  ...other
}: ModalProps) {
  return (
    <ZModal wide allowUnauth open={open} close={close} title={title}>
      <ChooseBetweenTwo {...other} />
    </ZModal>
  );
}

export default SubscriptionLevelAccessErrorModal;
