// Dependencies
import React from "react";

// Styled Components
import { Layout, Field } from "./styles";
import Typography from "../../display/Typography";
import InputCode from "../../inputs/InputCode";

// Types
import { TwoFAFormProps } from "./types";

function TwoFAForm({ onSubmit, isLoading }: TwoFAFormProps) {
  return (
    <Layout>
      <Field>
        <Typography variant={"body1"}>Enter your 2 Factor Authentication code</Typography>
        <InputCode fields={6} loading={isLoading} onComplete={onSubmit} />
      </Field>
    </Layout>
  );
}

export default TwoFAForm;
