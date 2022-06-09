import Typography from "components/display/Typography";
import InputText from "components/inputs/InputText";
import Selector from "components/inputs/Selector";
import { SelectSizes } from "components/inputs/Selector/types";
import React, { useMemo, useState } from "react";
import { Gap } from "utils/gap";
import ModalContainer from "../../ModalContainer";
import { Column, QRCodeContainer, SelectorContainer } from "./styles";
import CloneIcon from "assets/icons/clone-icon.svg";
import { dark } from "theme";
import TextButton from "components/inputs/TextButton";
import { QRCodeCanvas } from "qrcode.react";
import { CoinOption, MyAccountDepositModalProps, NetworkOption } from "../types";
import ErrorMessage from "components/display/ErrorMessage";
import { Row } from "utils/row";

const MyAccountDepositModal = ({
  coins,
  notSureOnClick = () => {},
}: MyAccountDepositModalProps) => {
  const [coin, setCoin] = useState<CoinOption>();
  const [network, setNetwork] = useState<NetworkOption>();
  const [depositAddress, setDepositAddress] = useState<string>("");

  const copyAddress = useMemo(() => {
    navigator.clipboard.writeText(depositAddress);
  }, [depositAddress]);

  const CoinSelector = () => {
    return (
      <Row gap={48}>
        <SelectorContainer width={384}>
          <Selector
            label="Coin"
            placeholder={coin?.caption ?? "Select a Coin"}
            onChange={(e: CoinOption) => {
              setCoin(e);
              setNetwork(undefined);
              setDepositAddress("");
            }}
            size={SelectSizes.LARGE}
            value={coin}
            options={coins}
            maxHeight={60}
            transparent={true}
          />
        </SelectorContainer>
        <Column>
          <Typography variant="body1" color="neutral200" weight="medium">
            Balance:{" "}
            <Typography variant="body1" color="neutral000" weight="medium">
              {coin?.balance ?? ""}{" "}
            </Typography>
            {coin?.caption ?? ""}
          </Typography>
          <Typography variant="body1" color="neutral200" weight="medium">
            In Orders:{" "}
            <Typography variant="body1" color="neutral000" weight="medium">
              {coin?.inOrders ?? ""}{" "}
            </Typography>
            {coin?.caption ?? ""}
          </Typography>
          <Typography variant="body1" color="neutral200" weight="medium">
            Avaliable:{" "}
            <Typography variant="body1" color="neutral000" weight="medium">
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
          label="Coin"
          placeholder={network?.caption ?? "Select a Network"}
          onChange={(e: NetworkOption) => {
            setNetwork(e);
            setDepositAddress(e.depositAddress ?? "");
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

  const ErrorAndQRCode = () => {
    return (
      <div>
        {network !== undefined && network.depositEnable === true ? (
          <div>
            <Row gap={14}>
              <ErrorMessage text={"Only send " + network?.name + " tokens to this address"} />
              <TextButton
                color="links"
                caption={"Not Sure?"}
                onClick={() => notSureOnClick()}
              ></TextButton>
            </Row>
            <Gap gap={34}></Gap>
            <QRCodeContainer>
              <QRCodeCanvas width={400} height={400} value={network?.url ?? ""} />
            </QRCodeContainer>
          </div>
        ) : (
          <></>
        )}
        {network?.depositEnable === false ? (
          <ErrorMessage text={"Deposit is not avaliable on this network"} />
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <ModalContainer width={784} title="Deposit Crypto">
      <Typography variant="body1" color="neutral200">
        Deposits may take up to 3 hours to reflect in your balance.
      </Typography>
      <Gap gap={16}></Gap>
      <CoinSelector />
      <Gap gap={12}></Gap>
      <NetworkSelector />
      <Gap gap={12}></Gap>
      <InputText
        label={"Deposit Address"}
        readOnly={true}
        value={depositAddress !== undefined ? depositAddress : undefined}
        placeholder={"Select a Network and Coin first"}
        rightSideElement={<CloneIcon width={40} height={40} color={dark["neutral400"]} />}
        onClickRightSideElement={() => copyAddress}
      />
      <ErrorAndQRCode />
    </ModalContainer>
  );
};
export default MyAccountDepositModal;
