import CoinIcon from "components/display/CoinIcon";
import Typography from "components/display/Typography";
import ModalContainer from "components/modals/ModalContainer";
import React, { useCallback, useEffect, useState } from "react";
import { Column } from "utils/column";
import { Row } from "utils/row";
import { ReactComponent as SwapIcon } from "assets/icons/swap-icon.svg";
import { dark } from "theme";
import { Gap } from "utils/gap";
import { IconContainer, Line } from "./styles";
import { AmountContainer } from "components/modals/styles";
import { NumericFormat } from "react-number-format";
import Button from "components/inputs/Button";
import { ConfirmSwapModalProps } from "./types";
import { Swap } from "../types";

const ConfirmSwapModal = ({
  swapFrom,
  swapTo,
  isLoading = false,
  swapNowOnClick = () => {},
  getSwapRate = () => {},
}: ConfirmSwapModalProps) => {
  const [swapToResult, setSwapToResult] = useState<Swap>(swapTo);

  const updateSwapRate = useCallback(() => {
    const rate = getSwapRate(swapFrom);
    setSwapToResult({
      ...swapToResult,
      value: rate.value,
      swapRate: rate.swapRate,
      networkFee: rate.networkFee,
    });
  }, [swapToResult]);

  //TODO(Xzirez): Add network fee once clarified how to parse BigNumber
  const ZigAmount = ({ marginRight }: { marginRight: number }) => {
    if (
      swapToResult?.token !== undefined &&
      swapFrom.token !== undefined &&
      swapToResult?.value !== undefined &&
      swapFrom.value !== undefined
    ) {
      return (
        <Row gap={5} alignItems="center" justifyContent="center">
          <IconContainer marginRight={marginRight}>
            <CoinIcon name={swapToResult.token.id} coin={swapToResult.token.id} />
          </IconContainer>
          <Typography variant="bigNumber" color="neutral100">
            <NumericFormat
              value={swapToResult.value.toString()}
              thousandSeparator={true}
              displayType={"text"}
            />
          </Typography>
          <Typography variant="h3" color="neutral400">
            {swapToResult.token.id}
          </Typography>
        </Row>
      );
    }
    return null;
  };

  const ToFromSwap = () => {
    if (
      swapToResult?.token !== undefined &&
      swapFrom.token !== undefined &&
      swapToResult?.value !== undefined &&
      swapFrom.value !== undefined
    ) {
      return (
        <Column width="510px" justifyContent="center">
          <Row width="100%" justifyContent="start">
            <Column gap={16} flex={3} alignItems="start">
              <Typography variant="h2">From</Typography>
              <Row alignItems="center" justifyContent="center" textAlign="center" gap={8}>
                <CoinIcon name={swapFrom.token.id} coin={swapFrom.token.id} />
                <Typography variant="h1" color="neutral100">
                  {swapFrom.value.toString()}
                </Typography>
                <Typography variant="h3" color="neutral400" weight="medium">
                  {swapFrom.token.id}
                </Typography>
              </Row>
            </Column>
            <Column flex={3} alignItems="center" justifyContent="center">
              <SwapIcon width={40} height={40} color={dark.neutral300} />
            </Column>
            <Column gap={16} flex={4} alignItems="start">
              <Typography variant="h2">To</Typography>
              <Row alignItems="center" gap={8}>
                <CoinIcon name={swapToResult.token.id} coin={swapToResult.token.id} />
                <Typography variant="h1" color="neutral100">
                  {swapToResult.value.toString()}
                </Typography>
                <Typography variant="h3" color="neutral400" weight="medium">
                  {swapToResult.token.id}
                </Typography>
              </Row>
            </Column>
          </Row>
          <Gap gap={16} />
          <Line />
          <Gap gap={4} />
          <Row gap={2} justifyContent="start">
            <Typography variant="body1" weight="medium" color="neutral200">
              Rate:
            </Typography>
            <Typography variant="body1" weight="medium" color="neutral000">
              1 ETH = {swapToResult.swapRate}
            </Typography>
          </Row>
        </Column>
      );
    }
    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => updateSwapRate(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ModalContainer title="Confirm Swap">
      <Column alignItems="center">
        <Gap gap={9} />
        <ToFromSwap />
        <Gap gap={48} />
        <AmountContainer borderRadius={16} coloredBorder={true} height="120" width="510">
          <Row gap={16} alignItems="center">
            <Typography color="neutral300" variant="h2" weight="medium">
              You’ll Receive:
            </Typography>
            <ZigAmount marginRight={4} />
          </Row>
        </AmountContainer>
        <Gap gap={28} />
        <Button
          loading={isLoading}
          size="xlarge"
          caption="Swap Now!"
          onClick={() => swapNowOnClick}
        />
      </Column>
    </ModalContainer>
  );
};

export default ConfirmSwapModal;
