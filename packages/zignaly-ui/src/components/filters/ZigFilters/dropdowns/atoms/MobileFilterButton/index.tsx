import React from "react";
import ZigTypography from "components/display/ZigTypography";
import ZigButton, { ZigButtonProps } from "components/inputs/ZigButton";

const MobileFilterButton = ({
  value,
  ...rest
}: { value: string | JSX.Element } & ZigButtonProps) => {
  return (
    <ZigButton variant="outlined" sx={{ p: "2px 14px" }} {...rest}>
      <ZigTypography>{value}</ZigTypography>
    </ZigButton>
  );
};

export default MobileFilterButton;
