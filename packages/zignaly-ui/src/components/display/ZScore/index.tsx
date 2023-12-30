import React from "react";
import { Chip } from "@mui/material";
import { ZScoreProps } from "./types";

const ZScore = ({ value, ...rest }: ZScoreProps) => {
  return <Chip label={Math.round(value)} {...rest} />;
};
export default ZScore;
