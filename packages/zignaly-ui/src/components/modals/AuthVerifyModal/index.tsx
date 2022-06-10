// Dependencies
// @ts-nocheck
import React from "react";

// Components
import { Container, Title } from "./styles";
import ModalContainer from "../ModalContainer";
import Typography from "../../display/Typography";
import EmailVerifyForm from "../../forms/EmailVerifyForm";
import TwoFAForm from "../../forms/TwoFAForm";

// Props
import { AuthVerifyModalProps } from "./types";

function AuthVerifyModal({
  ask2FA = false,
  hasAsk2FA = false,
  isDisabled = false,
  isUnknownDevice = false,
  hasEmailVerified = false,
  isLoadingEmailVerifyInput = false,
  isLoadingTwoFAVerifyInput = false,

  // Handlers
  onReSendCode = () => {},
  onTwoFactorSubmit = () => {},
  onEmailSubmit = () => {},
}: AuthVerifyModalProps) {
  return (
    <ModalContainer width={500} onClickClose={null}>
      <Title>
        {hasEmailVerified ||
          ((isUnknownDevice || isDisabled) && (
            <Typography variant={"h1"}>Confirm New Device</Typography>
          ))}
      </Title>
      <Container>
        {hasEmailVerified ||
          ((isUnknownDevice || isDisabled) && (
            <EmailVerifyForm
              isLoading={isLoadingEmailVerifyInput}
              onSubmit={onEmailSubmit}
              onReSendCode={onReSendCode}
            />
          ))}
        {hasAsk2FA ||
          (ask2FA && (
            <TwoFAForm isLoading={isLoadingTwoFAVerifyInput} onSubmit={onTwoFactorSubmit} />
          ))}
      </Container>
    </ModalContainer>
  );
}

export default AuthVerifyModal;
