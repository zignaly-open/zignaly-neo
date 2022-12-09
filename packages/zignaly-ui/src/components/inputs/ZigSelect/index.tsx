import React, { useMemo } from "react";
import { StyledSelectWrapper, ZigSelectGlobalStyle } from "./styles";
import { ZigSelectOption, ZigSelectProps } from "./types";
import ErrorMessage from "../../display/ErrorMessage";
import { Typography } from "@mui/material";
import Select, { StylesConfig } from "react-select";
import Theme from "../../../theme/theme";
import { useTheme } from "styled-components";

const customStyles = (small: boolean, theme: Theme): StylesConfig => ({
  menuPortal: (base) => ({
    ...base,
    zIndex: "1500 !important",
  }),
  menu: (base) => ({
    ...base,
    background: "rgba(16, 18, 37) !important",
    border: `1px solid ${theme.neutral600} !important`,
    color: `${theme.neutral200} !important`,
  }),
  option: (base, state) => ({
    ...base,
    ...(small
      ? {
          fontSize: "13px",
          lineHeight: "20px",
        }
      : {}),
    ...(state.isFocused
      ? {
          cursor: "pointer",
          background: "rgba(255, 255, 255, 0.1) !important",
        }
      : {}),
    ...(state.isSelected
      ? {
          background: "rgba(255, 255, 255, 0.2) !important",
        }
      : {}),
  }),
  singleValue: (provided, state) => ({
    ...provided,
    display: state.selectProps.menuIsOpen ? "none" : "block",
  }),
});

function ZigSelect<T>({
  onChange,
  value,
  label,
  error,
  helperText,
  width,
  placeholder,
  options,
  small = false,
  disabled,
  outlined,
  ...props
}: ZigSelectProps<T>): JSX.Element {
  const theme = useTheme() as Theme;
  const styles = useMemo(() => customStyles(small, theme), [small, theme]);

  return (
    <StyledSelectWrapper error={error} width={width} small={small} outlined={outlined}>
      {label && <Typography color={"neutral200"}>{label}</Typography>}
      {ZigSelectGlobalStyle}
      <Select
        styles={styles}
        components={{
          IndicatorSeparator: () => null,
        }}
        // if you want to use this inside of a modal, pass it `menuPosition="fixed"`, `menuShouldScrollIntoView={false}` and `menuShouldBlockScroll`
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
