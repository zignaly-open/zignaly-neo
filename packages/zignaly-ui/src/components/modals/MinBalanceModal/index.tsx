// Dependencies
import React, { useCallback, useState } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";

// Components
import ModalContainer from "../ModalContainer";
import InputAmount from "../../inputs/InputAmount";
import Button from "../../inputs/Button";
import { Actions } from "../styles";

// Types
import { MinBalanceModalProps } from "./types";

function MinBalanceModal({
  initialValue,
  onClickClose = () => {},
}: MinBalanceModalProps): React.ReactElement {
  // State
  // Fuck me sideways, what is this
  const [, setAmount] = useState(initialValue);

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <ModalContainer title={"Minimum balance"} width="small" onClickClose={onClickClose}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputAmount
          label=""
          value={ethers.utils.parseEther(initialValue.toString())}
          onChange={(_, { value }) => setAmount(value)}
        />
        <Actions>
          <Button caption={"Save"} disabled={!isValid} size="xlarge" type="submit" />
        </Actions>
      </form>
    </ModalContainer>
  );
}

export default MinBalanceModal;
