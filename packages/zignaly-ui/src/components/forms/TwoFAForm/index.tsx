import React from "react";

import { Layout, Field } from "./styles";
import Typography from "../../display/Typography";
import InputCode from "../../inputs/InputCode";

import { TwoFAFormProps } from "./types";

function TwoFAForm({ onSubmit, isLoading, requireAutoFocus }: TwoFAFormProps) {
  return (
    <Layout>
      <Field>
        <Typography variant={"body1"}>Enter your 2 Factor Authentication code</Typography>
        <InputCode
          fields={6}
          loading={isLoading}
          onComplete={onSubmit}
          autoFocus={requireAutoFocus}
        />
      </Field>
    </Layout>
  );
}

export default TwoFAForm;
