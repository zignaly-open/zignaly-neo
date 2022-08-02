import { DialogProps } from '@mui/material';
import { AuctionType } from '@zignaly/raffles-shared/types';

export type CongratulationsModalProps = DialogProps & {
  auction: AuctionType;
};
