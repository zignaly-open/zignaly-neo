import React from "react";

import { Wrapper, Icon } from "./styles";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { FormControlLabel } from "@mui/material";
import { ZigTypography } from "../../../index";
import { ZigCheckBoxProps } from "./types";

function ZigCheckBox({ variant = "contained", label, id, ...props }: ZigCheckBoxProps) {
  return (
    <FormControlLabel
      id={id}
      sx={{ alignItems: "flex-start" }}
      control={
        <Checkbox
          {...props}
          id={id && `${id}-input`}
          sx={{ padding: "0 9px" }}
          checkedIcon={
            variant === "outlined" ? (
              <Wrapper>
                <Icon />
              </Wrapper>
            ) : (
              <CheckBoxIcon />
            )
          }
          icon={variant === "outlined" ? <Wrapper /> : <CheckBoxOutlineBlankIcon />}
        />
      }
      label={
        variant === "outlined"
          ? label && (
              <ZigTypography variant={"body2"} color={"neutral300"} id={id && `${id}-label`}>
                {label}
              </ZigTypography>
            )
          : label
      }
    />
  );
}

export default ZigCheckBox;
