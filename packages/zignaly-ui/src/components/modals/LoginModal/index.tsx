// Dependencies
import React from "react";

// Components
import ModalContainer from "../ModalContainer";
import LoginForm from "../../forms/LoginForm";

// Styled Components
import { Body } from "./styles";

// Props
import { LoginModalProps } from "./types";

function LoginModal({
  onSubmit = () => {},
  onClickClose = () => {},
  isLoading,
  signUpURL,
  forgotPasswordURL,
}: LoginModalProps) {
  return (
    <ModalContainer width={600} onClickClose={onClickClose}>
      <Body>
        <LoginForm
          forgotPasswordURL={forgotPasswordURL}
          signUpURL={signUpURL}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </Body>
    </ModalContainer>
  );
}

export default LoginModal;
