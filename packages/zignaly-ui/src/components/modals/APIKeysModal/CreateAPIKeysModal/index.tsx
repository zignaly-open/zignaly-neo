// Dependencies
import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

// Components
import ModalContainer from "../../ModalContainer";
import Button from "../../../inputs/Button";
import { Actions } from "../../styles";
import CloneIcon from "assets/icons/clone-icon.svg";
import Typography from "components/display/Typography";
import { Gap } from "utils/gap";
import InputText from "components/inputs/InputText";
import APISettings from "../components/APISettings";

// Types
import { CreateAPIKeysModalProps } from "./types";

function CreateAPIKeysModal({
  onClickClose = () => {},
  onSubmit = () => {},
}: CreateAPIKeysModalProps): React.ReactElement {
  // State
  const [name, setName] = useState();

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isValid },
    register,
  } = methods;

  const onFormSubmit = useCallback((data: any) => {
    setName(data.name);
  }, []);

  const onFinalSubmit = useCallback((data: any) => {
    onSubmit(data);
  }, []);

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText("");
  }, []);

  if (name) {
    return (
      <ModalContainer title="Save Your API Key" width="small" onClickClose={onClickClose}>
        <Typography variant="body1" color="neutral200" weight="regular">
          Save your secret in a safe place. After closing this window, you won’t have access your
          secret anymore and will have to create a new API key.
        </Typography>
        <Gap gap={16} />
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onFinalSubmit)}>
            <InputText
              label="API Key:"
              readOnly={true}
              value="0x..."
              rightSideElement={<CloneIcon width={40} height={40} color="neutral300" />}
              onClickRightSideElement={() => copyAddress}
            />
            <InputText
              label="API Secret:"
              readOnly={true}
              value="a"
              rightSideElement={<CloneIcon width={40} height={40} color="neutral300" />}
              onClickRightSideElement={() => copyAddress}
            />
            <APISettings />
            <Actions>
              <Button caption="Save and Close" disabled={!isValid} size="xlarge" type="submit" />
            </Actions>
          </form>
        </FormProvider>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer title="Create New API Key" width="small" onClickClose={onClickClose}>
      <Typography variant="body1" color="neutral200" weight="regular">
        Create a new API key to connect to your trading platform.
      </Typography>
      <Gap gap={16} />
      <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
        <InputText
          label="Name:"
          {...register("name", {
            required: true,
          })}
        />
        <Actions>
          <Button caption="Continue" disabled={!isValid} size="xlarge" type="submit" />
        </Actions>
      </form>
    </ModalContainer>
  );
}

export default CreateAPIKeysModal;
