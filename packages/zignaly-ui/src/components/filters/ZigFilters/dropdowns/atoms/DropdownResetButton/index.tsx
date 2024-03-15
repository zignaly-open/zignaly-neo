import ZigButton, { ZigButtonProps } from "components/inputs/ZigButton";
import { ZigResetIcon } from "icons";
import React from "react";
import { useTranslation } from "react-i18next";

export const DropdownResetButton = (props: ZigButtonProps) => {
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigFilters" });
  return (
    <ZigButton
      variant={"text"}
      {...props}
      sx={{
        textAlign: "center",
        p: "4px 9px 3px",
        fontSize: "14px",
        width: "100%",
        "> span": {
          top: "1px !important",
        },
        ...(props?.sx || {}),
      }}
      startIcon={<ZigResetIcon style={{ top: "1px !important" }} />}
    >
      {t("reset")}
    </ZigButton>
  );
};
