import Typography from "components/display/Typography";
import Button from "components/inputs/Button";
import ModalContainer from "components/modals/ModalContainer";
import React from "react";
import { ButtonContainer, Gap } from "./styles";
import { ConnectWalletModalProps } from "./types";
import { ReactComponent as MetaMaskLogo } from "assets/icons/metamask-logo.svg";
import { ReactComponent as WalletConnectLogo } from "assets/icons/walletconnect-logo.svg";

const ConnectWalletModal = ({
  onClickClose = () => {},
  metaMaskOnClick = () => {},
  walletConnectOnClick = () => {},
}: ConnectWalletModalProps) => {
  return (
    <ModalContainer
      centerHeaderText={true}
      width={656}
      title="Connect Wallet"
      onClickClose={onClickClose}
    >
      <Gap gap={9} />
      <Typography variant="body1" weight="regular" color="neutral200">
        To continue, you need to connect your wallet to one of the following providers:
      </Typography>
      <Gap gap={21} />
      <ButtonContainer>
        <Button
          leftElement={<MetaMaskLogo width={34} height={34} />}
          minWidth={255}
          size="xlarge"
          caption="METAMASK"
          onClick={() => metaMaskOnClick}
        />
        <Gap gap={8} />
        <Button
          leftElement={<WalletConnectLogo width={34} height={21} />}
          maxWidth={255}
          size="xlarge"
          caption="WALLETCONNECT"
          onClick={() => walletConnectOnClick}
        />
      </ButtonContainer>
    </ModalContainer>
  );
};

export default ConnectWalletModal;
