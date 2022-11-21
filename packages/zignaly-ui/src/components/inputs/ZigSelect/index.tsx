import React from "react";
import { StyledSelectWrapper, ZigSelectGlobalStyle } from "./styles";
import { ZigSelectOption, ZigSelectProps } from "./types";
import ErrorMessage from "../../display/ErrorMessage";
import { Typography } from "@mui/material";
import Select from "react-select";

function ZigSelect<T>({
  onChange,
  value,
  label,
  error,
  helperText,
  width,
  placeholder,
  options,
  disabled,
  ...props
}: ZigSelectProps<T>): JSX.Element {
  return (
    <StyledSelectWrapper error={error} width={width}>
      {label && <Typography color={"neutral200"}>{label}</Typography>}
      {ZigSelectGlobalStyle}
      <Select
        components={{
          IndicatorSeparator: () => null,
        }}
        isOptionDisabled={(option) => !!(option as ZigSelectOption<T>).disabled}
        options={options as unknown as { label: string; value: number }[]}
        isDisabled={disabled}
        onChange={(v) => {
          onChange?.((v as ZigSelectOption<T>)?.value ?? null, (v as ZigSelectOption<T>) || null);
        }}
        menuPortalTarget={document.body}
        placeholder={placeholder || label}
        value={options?.find?.((x) => x.value === value || (x as unknown) === value) || null}
        classNamePrefix="zig-react-select"
        {...props}
      />
      {!!error && <ErrorMessage text={error} />}
    </StyledSelectWrapper>
  );
}

export default ZigSelect;
