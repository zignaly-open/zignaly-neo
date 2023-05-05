import React from "react";
import { styled, LinkProps, Link } from "@mui/material";

const ZigLink = styled(
  ({ rel, target = "_blank", underline = "hover", ...props }: LinkProps & {}) => (
    <Link underline={underline} rel={rel || "noopener noreferrer"} target={target} {...props} />
  ),
)``;

export default ZigLink as typeof Link;
