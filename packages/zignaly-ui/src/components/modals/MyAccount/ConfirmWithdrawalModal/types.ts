export interface ConfirmWithdrawalModalProps {
  networkCaption: string;
  withdrawAddress: string;
  coinName: string;
  onGoBack?: Function;
  onClickWithdraw?: Function;
  withdrawalAmount: number;
  netWorkFee: number;
  onClickClose: any;
  isLoading: boolean;
}
