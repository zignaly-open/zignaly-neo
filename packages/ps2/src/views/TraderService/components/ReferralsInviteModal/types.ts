import { DialogProps } from '@mui/material/Dialog';
import { Service } from 'apis/service/types';

export type ReferralsInviteModalProps = {
  close: () => void;
  service: Service;
  serviceId: string;
} & DialogProps;

export type TransferFormData = { amountValue: string };
