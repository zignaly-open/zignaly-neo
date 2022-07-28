import { DialogProps } from '@mui/material';
import { AuctionType } from '@zigraffle/shared/types';

export type ClaimModalProps = DialogProps & {
  auction: AuctionType;
};
