import Typography from "components/display/Typography";
import InputText from "components/inputs/InputText";
import ModalContainer from "components/modals/ModalContainer";
import React from "react";
import { Column } from "utils/column";
import { Gap } from "utils/gap";
import { Row } from "utils/row";
import { AmountContainer, IconContainer } from "./styles";
import NumberFormat from "react-number-format";
import Button from "components/inputs/Button";
import CoinIcon from "components/display/CoinIcon";
import { ConfirmWithdrawalModalProps } from "./types";

const ConfirmWithdrawalModal = ({
  networkCaption,
  coinName,
  withdrawAddress,
  onClickWithdraw = () => {},
  onGoBack = () => {},
  withdrawalAmount,
  netWorkFee,
}: ConfirmWithdrawalModalProps) => {
  const ZigAmount = ({ amount, marginRight }: { amount: number; marginRight: number }) => {
    return (
      <Row gap={5} alignItems="center" justifyContent="center">
        <IconContainer marginRight={marginRight}>
          <CoinIcon name={coinName} coin={coinName} />
        </IconContainer>
        <Typography variant="bigNumber" color="neutral100">
          <NumberFormat value={amount} thousandSeparator={true} displayType={"text"} />
        </Typography>
        <Typography variant="h3" color="neutral400">
          ZIG
        </Typography>
      </Row>
    );
  };
  return (
    <ModalContainer width={784} title="Confirm Withdrawal">
      <Typography variant="body1" color="neutral200">
        Please confirm the information is correct and submit your withdrawal.
      </Typography>
      <Gap gap={16} />
      <Column justifyContent="center">
        <Typography variant="body1" color="neutral200" weight="regular">
          Withdrawal Network
        </Typography>
        <Gap gap={5} />
        <Row alignItems="center">
          <CoinIcon name={coinName} coin={coinName} />
          <Gap gap={11} />
          <Typography variant="h2" color="neutral100" weight="medium">
            {networkCaption}
          </Typography>
        </Row>
      </Column>
      <Gap gap={12} />
      <InputText label="Withdraw to Address" readOnly={true} value={withdrawAddress} name={"Eth"} />
      <Gap gap={16} />
      <Row justifyContent="center" gap={16} alignItems="center">
        <AmountContainer width="446">
          <Column justifyContent="center">
            <Typography weight="regular" variant="h3" color="neutral200">
              Withdrawal Amount
            </Typography>
            <Gap gap={2} />
            <ZigAmount amount={withdrawalAmount} marginRight={4} />
          </Column>
        </AmountContainer>
        <AmountContainer width="210">
          <Column justifyContent="center">
            <Typography variant="body2" weight="medium" color="neutral200">
              Network Fee
            </Typography>
            <Gap gap={2} />
            <ZigAmount amount={netWorkFee} marginRight={4} />
          </Column>
        </AmountContainer>
      </Row>
      <Gap gap={8} />
      <AmountContainer coloredBorder={true} width="672">
        <Row gap={16} alignItems="center">
          <Typography color="neutral300" variant="h2" weight="medium">
            You’ll Receive:
          </Typography>
          <ZigAmount amount={withdrawalAmount - netWorkFee} marginRight={6} />
        </Row>
      </AmountContainer>
      <Gap gap={28} />
      <Row gap={14} justifyContent="end" alignItems="center">
        <Button onClick={() => onGoBack()} variant="secondary" size="xlarge" caption="Back" />
        <Button
          onClick={() => onClickWithdraw()}
          variant="primary"
          size="xlarge"
          caption="Withdraw now!"
        />
      </Row>
    </ModalContainer>
  );
};

export default ConfirmWithdrawalModal;
