import React, { useMemo } from "react";
import {
  StyledSelectWrapper,
  ZigMediumSelectGlobalStyle,
  ZigNormalSelectGlobalStyle,
} from "./styles";
import { ZigSelectOption, ZigSelectProps } from "./types";
import Select, { StylesConfig } from "react-select";
import { useTheme } from "styled-components";
import ZigTypography from "../../display/ZigTypography";
import { ErrorMessage } from "../../display/ZigAlertMessage";
import { Box, Theme } from "@mui/material";

const customStyles = (
  small: boolean,
  medium: boolean,
  theme: Theme,
  userStyles: StylesConfig,
): StylesConfig => ({
  ...userStyles,
  menuPortal: (base) => ({
    ...base,
    zIndex: "1500 !important",
  }),
  menu: (base) => ({
    ...base,
    background: `${theme.palette.neutral800} !important`,
    border: `1px solid ${theme.palette.neutral600} !important`,
    color: `${theme.palette.neutral200} !important`,
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
          color: theme.palette.neutral000,
          background: theme.palette.contrasting + "33 !important",
        }
      : {}),
    ...userStyles.option?.(base, state),
  }),
  singleValue: (base, state) => ({
    ...base,
    display: state.selectProps.menuIsOpen ? "none" : "block",
    ...userStyles.singleValue?.(base, state),
  }),
});

function ZigSelect<T>({
  onChange,
  value,
  label,
  error,
  width,
  placeholder,
  options,
  small = false,
  disabled,
  outlined,
  id,
  showBorder = true,
  hoverBackground = true,
  sx,
  medium = false,
  styles: userStyles = {},
  ...props
}: ZigSelectProps<T>): JSX.Element {
  const theme = useTheme() as Theme;
  const styles = useMemo(
    () => customStyles(small, medium, theme, userStyles),
    [small, theme, userStyles],
  );

  return (
    // @ts-ignore
    <StyledSelectWrapper
      error={error}
      width={width}
      small={small}
      medium={medium}
      outlined={outlined}
      showBorder={showBorder}
      hoverBackground={hoverBackground}
    >
      {label && (
        <ZigTypography
          sx={medium ? { fontSize: "13px", lineHeight: "20px" } : {}}
          color={"neutral200"}
          id={id && `${id}-label`}
        >
          {label}
        </ZigTypography>
      )}
      <Box sx={sx}>
        {medium ? ZigMediumSelectGlobalStyle : ZigNormalSelectGlobalStyle}
        <Select
          id={id}
          styles={styles}
          components={{
            IndicatorSeparator: () => null,
          }}
          // if you want to use this inside of a modal, pass it `menuPosition="fixed"`, `menuShouldScrollIntoView={false}` and `menuShouldBlockScroll`
          isOptionDisabled={(option) => !!(option as ZigSelectOption<T>).disabled}
          options={options}
          isDisabled={disabled}
          onChange={(v) => {
            onChange?.((v as ZigSelectOption<T>)?.value, (v as ZigSelectOption<T>) || null);
          }}
          menuPortalTarget={document.body}
          placeholder={placeholder || label}
          value={options?.find?.((x) => x.value === value || (x as unknown) === value) || null}
          classNamePrefix="zig-react-select"
          instanceId={id}
          {...props}
        />
        {!!error && typeof error === "string" && (
          <Box mt="3px">
            <ErrorMessage text={error} id={id && `${id}-error-text`} />
          </Box>
        )}
      </Box>
    </StyledSelectWrapper>
  );
}

export default ZigSelect;
