import React, { useEffect, useRef } from "react";
import ReactCodeInput from "@zignaly-open/react-verification-code-input";
import { InputCodeProps } from "./types";
import { Layout } from "./styles";
import ErrorMessage from "components/display/ErrorMessage";

function InputCode({
  fields,
  loading,
  onComplete,
  autoFocus = false,
  error = null,
}: InputCodeProps) {
  // Hooks
  const inputRef = useRef(null);

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
  return (
    <Layout>
      <ReactCodeInput
        ref={inputRef}
        className={"input-box"}
        fields={fields}
        loading={loading}
        autoFocus={autoFocus}
        onComplete={onComplete}
      />
      {error && <ErrorMessage text={error} />}
    </Layout>
  );
}

export default InputCode;
