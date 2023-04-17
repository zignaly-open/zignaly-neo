import React, { useEffect, useRef } from "react";
import ReactCodeInput from "@zignaly-open/react-verification-code-input";
import { InputCodeProps } from "./types";
import { Layout } from "./styles";
import ErrorMessage from "components/display/ErrorMessage";
import { Box } from "@mui/material";

function InputCode({
  fields,
  loading,
  onComplete,
  autoFocus = false,
  clearOnError = false,
  error = null,
  prefixId,
}: InputCodeProps) {
  const inputRef = useRef<ReactCodeInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current as any;
      if (input.iRefs.length && autoFocus) {
        setTimeout(() => {
          input.iRefs[0].current?.focus();
        }, 300); // TODO: figure out why
      }
    }
  }, [inputRef]);

  useEffect(() => {
    if (error) {
      // means we just received an error
      // erroneous code => type again
      // private methods, you say? sorry, ya vas ne ponimat, lol
      clearOnError && inputRef.current?.__clearvalues__();
    }
  }, [error, clearOnError]);

  return (
    <Layout error={error || undefined}>
      <Box id={prefixId && `${prefixId}__code-input`}>
        <ReactCodeInput
          ref={inputRef}
          className={"input-box"}
          fields={fields}
          loading={loading}
          disabled={loading}
          autoFocus={autoFocus}
          onComplete={onComplete}
        />
      </Box>
      {error && <ErrorMessage text={error} id={prefixId && `${prefixId}__error-message`} />}
    </Layout>
  );
}

export default InputCode;
