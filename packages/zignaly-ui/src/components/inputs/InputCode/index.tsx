// Dependencies
import React, { useEffect, useRef } from "react";
import ReactCodeInput from "react-verification-code-input";

// Types
import { InputCodeProps } from "./types";

// Styled Components
import { Layout } from "./styles";

function InputCode({ fields, loading, onComplete, autoFocus = false }: InputCodeProps) {
  // Hooks
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current as any;
      if (input.iRefs.length && autoFocus) {
        input.iRefs[0].current.focus();
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
    </Layout>
  );
}

export default InputCode;
