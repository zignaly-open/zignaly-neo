import ErrorMessage from "components/display/ErrorMessage";
import Button from "components/inputs/Button";
import InputAmount from "components/inputs/InputAmount";
import InputText from "components/inputs/InputText";
import TextButton from "components/inputs/TextButton";
import { ethers } from "ethers";
import React from "react";
import { useCallback, useState } from "react";
import { Gap } from "utils/gap";
import { Row } from "utils/row";
import { FormAndButtonProps } from "../types";

const FormAndButton = ({
  network,
  coin,
  inputAmountOnChange,
  inputAddressOnChange,
  notSureOnClick = () => {},
  onSubmit = () => {},
  isLoading = false,
}: FormAndButtonProps) => {
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState<Number>(0);
  const [isValidInput, setIsValidInput] = useState(false);
  let isValidAddress = false;
  let isValidAmount = false;

  const handleSubmit = () => {
    onSubmit(withdrawAddress, withdrawAmount);
  };

  const withAddressChanged = useCallback((e: string) => {
    setWithdrawAddress(e);
    validateWithdrawAddress(e);
    validateInput();
    inputAddressOnChange(withdrawAddress);
  }, []);

  const withdrawAmountChanged = useCallback((e: number) => {
    setWithdrawAmount(e);
    validateAmount(e);
    validateInput();
    inputAmountOnChange(withdrawAmount);
  }, []);

  const validateAmount = useCallback((withdrawAmount: number) => {
    if (withdrawAmount <= 0) {
      isValidAmount = false;
    } else {
      isValidAmount = true;
    }
  }, []);

  const validateWithdrawAddress = useCallback((withdrawAddress: string) => {
    if (withdrawAddress === "") {
      isValidAddress = false;
    } else {
      isValidAddress = true;
    }
  }, []);

  const validateInput = useCallback(() => {
    if (isValidAddress && isValidAmount) {
      setIsValidInput(true);
    } else {
      setIsValidInput(false);
    }
  }, [isValidAmount, isValidAddress]);

  if (network !== undefined && coin !== undefined) {
    return (
      <>
        <Gap gap={13} />
        <InputText
          label={"Withdraw to Address"}
          placeholder={"Paste wallet address here"}
          value={withdrawAddress}
          onChange={(e: any) => {
            withAddressChanged(e.target.value);
            inputAddressOnChange(e.target.value);
          }}
        />
        <Row gap={14}>
          <ErrorMessage text={"Only send " + network?.name + " tokens to this address"} />
          <TextButton color="links" caption={"Not Sure?"} onClick={() => notSureOnClick()} />
        </Row>
        <Gap gap={13} />
        <InputAmount
          label={"Amount to Withdraw"}
          value={ethers.utils.parseEther(coin.balance.toString())}
          onChange={(e: any) => {
            withdrawAmountChanged(e.target.value);
            inputAmountOnChange(e.target.value);
          }}
          name={coin.caption}
          tokens={[
            {
              id: coin.caption,
              balance: ethers.utils.parseEther(coin.balance.toString()),
            },
          ]}
        />
        <Gap gap={28} />
        <Row gap={14} justifyContent="end">
          <Button variant="secondary" size="xlarge" caption={"Cancel"} />
          <Button
            disabled={!isValidInput}
            loading={isLoading}
            onClick={() => handleSubmit()}
            size="xlarge"
            caption={"Continue to Confirmation"}
          />
        </Row>
      </>
    );
  } else {
    return null;
  }
};

export default FormAndButton;
