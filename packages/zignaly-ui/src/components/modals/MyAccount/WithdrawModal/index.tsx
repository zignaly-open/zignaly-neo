import Typography from "components/display/Typography";
import Selector from "components/inputs/Selector";
import { SelectSizes } from "components/inputs/Selector/types";
import React, { useState } from "react";
import { Gap } from "utils/gap";
import ModalContainer from "../../ModalContainer";
import { CoinOption, MyAccountWithdrawModalProps, NetworkOption } from "../types";
import FormAndButton from "./components/FormAndButton";

const MyAccountWithdrawModal = ({
  coins,
  addressOnChange = () => {},
  notSureOnClick = () => {},
  amountOnChange = () => {},
  onClickClose = () => {},
  onSubmit = () => {},
  isLoading = false,
}: MyAccountWithdrawModalProps) => {
  const [coin, setCoin] = useState<CoinOption>();
  const [network, setNetwork] = useState<NetworkOption>();

  const CoinSelector = () => {
    return (
      <>
        <Gap gap={16} />
        <Selector
          label="Coin"
          placeholder={coin?.caption ?? "Select a Coin"}
          onChange={(e: CoinOption) => {
            setCoin(e);
            setNetwork(undefined);
          }}
          size={SelectSizes.LARGE}
          value={coin}
          options={coins}
          maxHeight={60}
          transparent={true}
        />
      </>
    );
  };

  const NetworkSelector = () => {
    return (
      <>
        <Gap gap={12} />
        <Selector
          label="Network"
          placeholder={network?.caption ?? "Select a Network"}
          onChange={(e: NetworkOption) => {
            setNetwork(e);
          }}
          size={SelectSizes.LARGE}
          value={network !== undefined ? network : undefined}
          options={coin?.networks ?? undefined}
          maxHeight={60}
          transparent={true}
        />
      </>
    );
  };

  return (
    <ModalContainer width={784} title="Withdraw Crypto" onClickClose={onClickClose}>
      <Typography variant="body1" color="neutral200" weight="regular">
        Withdraw crypto to an external account. To move funds between Zignaly accounts, use a
        transfer instead.
      </Typography>
      <CoinSelector />
      <NetworkSelector />
      <FormAndButton
        coin={coin}
        network={network}
        inputAmountOnChange={amountOnChange}
        notSureOnClick={notSureOnClick}
        inputAddressOnChange={addressOnChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </ModalContainer>
  );
};

export default MyAccountWithdrawModal;
