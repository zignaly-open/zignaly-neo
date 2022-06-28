// Dependencies
import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

// Components
import ModalContainer from "../../ModalContainer";
import Button from "../../../inputs/Button";
import { Actions } from "../../styles";
import Typography from "components/display/Typography";
import { Gap } from "utils/gap";
import InputText from "components/inputs/InputText";

// Types
import { EditAPIKeysModalProps } from "./types";
import { Key } from "./styles";
import APISettings from "../components/APISettings";

function EditAPIKeysModal({
  onClickClose = () => {},
  onSubmit = () => {},
  settings,
  name,
  apikey,
  isLoading = false,
}: EditAPIKeysModalProps): React.ReactElement {
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
    onSubmit(data);
  }, []);

  return (
    <ModalContainer title="Edit API Key Settings" width="small" onClickClose={onClickClose}>
      <Gap gap={16} />
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
          <InputText
            label="Name:"
            {...register("name", {
              required: true,
            })}
            defaultValue={name}
          />
          <Gap gap={12} />
          <InputText
            label="API Key:"
            {...register("apikey", {
              required: true,
            })}
            defaultValue={apikey}
          />
          <Gap gap={16} />
          <Typography variant="h3" weight="regular" color="neutral200">
            API Secret (only visible on key generation. If lost, you will have to generate a new
            API)
          </Typography>
          <Key>
            <Typography>**********</Typography>
          </Key>
          <APISettings {...settings} />
          <Actions>
            <Button caption="Save and Close" loading={isLoading} disabled={!isValid} size="xlarge" type="submit" />
          </Actions>
        </form>
      </FormProvider>
    </ModalContainer>
  );
}

export default EditAPIKeysModal;
