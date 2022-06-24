import Typography from "components/display/Typography";
import InputText from "components/inputs/InputText";
import TextButton from "components/inputs/TextButton";
import ToggleButton from "components/inputs/ToggleButton";
import ModalContainer from "components/modals/ModalContainer";
import React, { useCallback, useMemo, useState } from "react";
import { Column } from "utils/column";
import { Gap } from "utils/gap";
import { Row } from "utils/row";
import { AccountSettingsModalProps, accountSettingsViewsId } from "./types";
import TrashIcon from "assets/icons/trash-icon.svg";
import Button from "components/inputs/Button";
import { ButtonContainer } from "./styles";
import CopyIcon from "assets/icons/copy-icon.svg";

const AccountSettingsModal = ({
  type = "Spot",
  exchange = "Zignaly",
  accountName = "Spot1",
  enableLeveragedToken = () => {},
  saveSettingsOnClick = () => {},
  onClickClose = () => {},
  generateOnClick = () => {},
  deleteGeneratedKeyOnClick = () => {},
  onClickConfirmDelete = () => {},
}: AccountSettingsModalProps) => {
  const [currentState, setCurrentState] = useState(accountSettingsViewsId.EDIT_ACCOUNT);
  const [generatedApiKey, setGeneratedApiKey] = useState("");
  const [generatedApiSecret, setGeneratedApiSecret] = useState("");

  const copyApiKey = useCallback(() => {
    navigator.clipboard.writeText(generatedApiKey);
  }, [generatedApiKey]);

  const copyApiSecret = useCallback(() => {
    navigator.clipboard.writeText(generatedApiSecret);
  }, [generatedApiSecret]);

  const isApiKeySet = useMemo(() => {
    if (generatedApiKey !== "" && generatedApiSecret !== "") {
      return true;
    } else {
      return false;
    }
  }, [generatedApiKey, generatedApiSecret]);

  const tryDeleteKeys = () => {
    try {
      deleteGeneratedKeyOnClick();
      setGeneratedApiKey("");
      setGeneratedApiSecret("");
    } catch (e) {
      deleteGeneratedKeyOnClick({ onError: e });
    }
  };

  const GenerateApiKeyView = () => {
    return (
      <ModalContainer width={784} title="Save Your API Key" onClickClose={onClickClose}>
        <Gap gap={16} />
        <Typography variant="body1" weight="regular">
          Save your secret in a safe place. After closing this window, you won’t have access to your
          secret anymore and will have to create a new API key.
        </Typography>
        <Gap gap={16} />
        <InputText
          readOnly={true}
          value={generatedApiKey}
          onClickRightSideElement={copyApiKey}
          rightSideElement={<CopyIcon width={28} height={28} />}
          label="Api Key:"
        />
        <Gap gap={12} />
        <InputText
          readOnly={true}
          value={generatedApiSecret}
          onClickRightSideElement={copyApiSecret}
          rightSideElement={<CopyIcon width={28} height={28} />}
          label="Api Secret:"
        />
        <Gap gap={28} />
        <Row justifyContent="center">
          <ButtonContainer width={224}>
            <Button
              size="xlarge"
              caption="Return to Settings"
              onClick={() => setCurrentState(accountSettingsViewsId.EDIT_ACCOUNT)}
            />
          </ButtonContainer>
        </Row>
      </ModalContainer>
    );
  };

  const ConfirmDeleteAccount = () => {
    return (
      <ModalContainer
        width={784}
        title="Delete Account"
        onClickClose={() => setCurrentState(accountSettingsViewsId.EDIT_ACCOUNT)}
      >
        <Gap gap={16} />
        <Typography variant="body1" weight="regular">
          If you delete this account, all the information and settings for signal providers and copy
          traders will be lost. Are you sure you want to delete this account?
        </Typography>
        <Gap gap={28} />
        <Row justifyContent="center">
          <ButtonContainer width={199}>
            <Button
              caption={"Confirm Delete"}
              size="xlarge"
              onClick={() => onClickConfirmDelete()}
            />
          </ButtonContainer>
        </Row>
      </ModalContainer>
    );
  };

  const EditAccountView = () => {
    return (
      <ModalContainer width={784} title="Edit Account Settings" onClickClose={onClickClose}>
        <Row>
          <Typography variant="body1" color="neutral200">
            Type:{" "}
            <Typography variant="body1" color="neutral000">
              {type}
            </Typography>
          </Typography>
          <Gap gap={8} />
          <Typography variant="body1" color="neutral200">
            Exchange:{" "}
            <Typography variant="body1" color="neutral000">
              {exchange}
            </Typography>
          </Typography>
        </Row>
        <Gap gap={16} />
        <InputText label="Account name" readOnly={true} value={accountName} />
        <Gap gap={28} />
        <Row alignItems="center" justifyContent="space-between">
          <Column gap={2}>
            <Typography variant="h2" color="neutral100">
              Enable Leveraged Tokens
            </Typography>
            <Typography variant="body1" color="neutral200">
              (derivate tokens that offer leveraged exposure to the underlying asset)
            </Typography>
          </Column>
          <ToggleButton onChange={enableLeveragedToken} size="small" />
        </Row>
        <Gap gap={16} />
        <Row alignItems="center" justifyContent="space-between">
          <Column gap={2}>
            <Typography variant="h2" color="neutral100">
              Zignaly API Key
            </Typography>
            <Typography variant="body1" color="neutral200">
              (to access your data from other software)
            </Typography>
          </Column>
          {isApiKeySet === true ? (
            <Button
              onClick={() => {
                tryDeleteKeys();
              }}
              variant="primary"
              caption="Delete"
              size="medium"
              leftElement={<TrashIcon width={20} height={20} color={"#F3F4F6"} />}
            />
          ) : (
            <Button
              onClick={() => {
                setCurrentState(accountSettingsViewsId.API_KEY);
                setGeneratedApiKey(generateOnClick().apiKey);
                setGeneratedApiSecret(generateOnClick().apiSecret);
              }}
              variant="secondary"
              caption="Generate"
              size="medium"
            />
          )}
        </Row>
        {isApiKeySet === true ? (
          <>
            <Gap gap={16} />
            <InputText
              readOnly={true}
              value={generatedApiKey}
              onClickRightSideElement={copyApiKey}
              rightSideElement={<CopyIcon width={28} height={28} />}
            />
          </>
        ) : (
          <></>
        )}
        <Gap gap={16} />
        <Column alignItems="start">
          <TextButton
            caption="Delete Account"
            onClick={() => setCurrentState(accountSettingsViewsId.DELETE_ACCOUNT)}
            leftElement={<TrashIcon width={16} height={16} color={"#65647E"} />}
          />
        </Column>
        <Gap gap={28} />
        <Row justifyContent="center">
          <ButtonContainer width={185}>
            <Button size="xlarge" caption="Save Settings" onClick={() => saveSettingsOnClick} />
          </ButtonContainer>
        </Row>
      </ModalContainer>
    );
  };

  const ModalViewId = () => {
    if (currentState === accountSettingsViewsId.EDIT_ACCOUNT) {
      return <EditAccountView />;
    } else if (currentState === accountSettingsViewsId.API_KEY) {
      return <GenerateApiKeyView />;
    } else if (currentState === accountSettingsViewsId.DELETE_ACCOUNT) {
      return <ConfirmDeleteAccount />;
    } else {
      return <></>;
    }
  };
  return <ModalViewId />;
};

export default AccountSettingsModal;
