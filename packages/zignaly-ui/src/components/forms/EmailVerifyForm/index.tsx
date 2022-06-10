// Dependencies
import React from "react";

// Styled Components
import { Layout, Field } from "./styles";
import Typography from "../../display/Typography";
import InputCode from "../../inputs/InputCode";
import Button from "../../inputs/Button";

// Types
import { EmailVerifyFormProps } from "./types";

function EmailVerifyForm({ onSubmit, onReSendCode, isLoading }: EmailVerifyFormProps) {
  return (
    <Layout>
      <Field>
        <Typography variant={"body1"}>Enter the 6 digit code received by email</Typography>
        <InputCode fields={6} loading={isLoading} onComplete={onSubmit} />
        <Button
          type={"button"}
          onClick={onReSendCode}
          variant={"secondary"}
          caption={"RESEND CODE"}
        />
      </Field>
    </Layout>
  );
}

export default EmailVerifyForm;
