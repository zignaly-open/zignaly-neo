import React from "react";
import { ZigAutocompleteProps } from "./types";
import { Autocomplete } from "@mui/material";
import ZigInput from "../ZigInput";

function ZigAutocomplete<T>({
  label,
  disablePortal,
  error,
  wide,
  labelAction,
  options,
  blurOnSelect = true,
  selectOnFocus = true,
  openOnFocus = true,
  ...props
}: ZigAutocompleteProps<T>): JSX.Element {
  // https://i.kym-cdn.com/photos/images/newsfeed/001/242/314/824.jpg
  return (
    <Autocomplete
      disablePortal={disablePortal}
      id="combo-box-demo"
      options={options}
      blurOnSelect={blurOnSelect}
      openOnFocus={openOnFocus}
      selectOnFocus={selectOnFocus}
      {...props}
      renderInput={(params) => (
        <ZigInput {...params} wide={wide} labelAction={labelAction} label={label} error={error} />
      )}
    />
  );
}

export default ZigAutocomplete;
