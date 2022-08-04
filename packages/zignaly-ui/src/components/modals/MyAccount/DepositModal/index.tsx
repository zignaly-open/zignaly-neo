import Typography from "components/display/Typography";
import InputText from "components/inputs/InputText";
import Selector from "components/inputs/Selector";
import { SelectSizes } from "components/inputs/Selector/types";
import React, { useCallback, useState } from "react";
import { Gap } from "utils/gap";
import ModalContainer from "../../ModalContainer";
import { Column, SelectorContainer } from "./styles";
import { ReactComponent as CloneIcon } from "assets/icons/clone-icon.svg";
import { dark } from "theme";
import TextButton from "components/inputs/TextButton";
import { CoinOption, MyAccountDepositModalProps, NetworkOption } from "../types";
import ErrorMessage from "components/display/ErrorMessage";
import { Row } from "utils/row";
import ZignalyQRCode from "components/display/ZignalyQRCode";

const MyAccountDepositModal = ({
  coins,
  notSureOnClick = () => {},
  onClickClose = () => {},
}: MyAccountDepositModalProps) => {
  const [coin, setCoin] = useState<CoinOption>();
  const [network, setNetwork] = useState<NetworkOption>();
  const [depositAddress, setDepositAddress] = useState<string>("");
  const [depositMemo, setDepositMemo] = useState<string>("");

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText(depositAddress);
  }, [depositAddress]);

  const networkChanged = useCallback(
    (e: NetworkOption) => {
      setNetwork(e);
      setDepositAddress(e.depositAddress ?? "");
      setDepositMemo(e.depositMemo ?? "");
    },
    [network],
  );

  const coinChanged = useCallback(
    (e: CoinOption) => {
      setCoin(e);
      setNetwork(undefined);
      setDepositAddress("");
      setDepositMemo("");
    },
    [coin],
  );

  const CoinSelector = () => {
    return (
      <Row gap={48}>
        <SelectorContainer width={384}>
          <Selector
            label="Coin"
            placeholder={coin?.caption ?? "Select a Coin"}
            onChange={(e: CoinOption) => {
              coinChanged(e);
            }}
            size={SelectSizes.LARGE}
            value={coin}
            options={coins}
            maxHeight={60}
            transparent={true}
          />
        </SelectorContainer>
        <Column>
          <Typography variant="body2" color="neutral200" weight="medium">
            Balance:{" "}
            <Typography variant="body2" color="neutral000" weight="medium">
              {coin?.balance ?? ""}{" "}
            </Typography>
            {coin?.caption ?? ""}
          </Typography>
          <Typography variant="body2" color="neutral200" weight="medium">
            In Orders:{" "}
            <Typography variant="body2" color="neutral000" weight="medium">
              {coin?.inOrders ?? ""}{" "}
            </Typography>
            {coin?.caption ?? ""}
          </Typography>
          <Typography variant="body2" color="neutral200" weight="medium">
            Avaliable:{" "}
            <Typography variant="body2" color="neutral000" weight="medium">
              {coin?.avaliable ?? ""}{" "}
            </Typography>
            {coin?.caption ?? ""}
          </Typography>
        </Column>
      </Row>
    );
  };

  const NetworkSelector = () => {
    return (
      <SelectorContainer width={672}>
        <Selector
          label="Network"
          placeholder={network?.caption ?? "Select a Network"}
          onChange={(e: NetworkOption) => {
            networkChanged(e);
          }}
          size={SelectSizes.LARGE}
          value={network !== undefined ? network : undefined}
          options={coin?.networks ?? undefined}
          maxHeight={60}
          transparent={true}
        />
      </SelectorContainer>
    );
  };

  const AddressAndQRCode = () => {
    if (network !== undefined && network.depositEnable === true) {
      return (
        <>
          <InputText
            label={"Deposit Address"}
            readOnly={true}
            value={depositAddress !== undefined ? depositAddress : undefined}
            placeholder={"Select a Network and Coin first"}
            rightSideElement={<CloneIcon width={40} height={40} color={dark.neutral300} />}
            onClickRightSideElement={() => copyAddress}
          />
          {depositMemo !== "" && (
            <>
              <Gap gap={12} />
              <InputText
                label={"Deposit MEMO/Tag:"}
                readOnly={true}
                value={depositMemo}
                placeholder={"Select a Network and Coin first"}
                rightSideElement={<CloneIcon width={40} height={40} color={dark.neutral300} />}
                onClickRightSideElement={() => copyAddress}
              />
            </>
          )}
          <Row gap={14}>
            <ErrorMessage text={"Only send " + network?.name + " tokens to this address"} />
            <TextButton color="links" caption={"Not Sure?"} onClick={() => notSureOnClick()} />
          </Row>
          <Gap gap={28} />
          {depositMemo === "" ? (
            <ZignalyQRCode url={network?.url} />
          ) : (
            <Row justifyContent="center" gap={97}>
              <ZignalyQRCode label={coin?.caption + " Address"} url={network?.url} />
              <ZignalyQRCode label={coin?.caption + " Memo/Tag"} url={network?.depositMemo} />
            </Row>
          )}
        </>
      );
    } else if (network?.depositEnable === false) {
      return <ErrorMessage text={"Deposit is not avaliable on this network"} />;
    } else {
      return null;
    }
  };

  return (
    <ModalContainer width={784} title="Deposit Crypto" onClickClose={onClickClose}>
      <Typography variant="body1" color="neutral200" weight="regular">
        Deposits may take up to 3 hours to reflect in your balance.
      </Typography>
      <Gap gap={16}></Gap>
      <CoinSelector />
      <Gap gap={12}></Gap>
      <NetworkSelector />
      <Gap gap={12}></Gap>
      <AddressAndQRCode />
    </ModalContainer>
  );
};
export default MyAccountDepositModal;
