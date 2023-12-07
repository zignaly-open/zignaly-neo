import ZigButton, { ZigButtonProps } from "components/inputs/ZigButton";
import { ZigResetIcon } from "icons";
import React from "react";

export const DropdownResetButton = (props: ZigButtonProps) => {
  return (
    <ZigButton
      variant={"text"}
      {...props}
      sx={{
        textAlign: "center",
        p: "4px 9px 3px",
        fontSize: "14px",
        width: "100%",
        ...(props?.sx || {}),
      }}
      startIcon={<ZigResetIcon />}
    >
      Reset
    </ZigButton>
  );
};
