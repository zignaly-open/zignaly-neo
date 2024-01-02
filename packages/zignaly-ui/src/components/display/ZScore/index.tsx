import React from "react";
import { Chip } from "@mui/material";
import { ZScoreProps } from "./types";
import { ZScoreIcon } from "icons";

const sx = {
  "&": {
    gap: "6px",
    padding: "0 16px",
    borderRadius: "18px",
    backgroundImage: "linear-gradient(to top, #3e3177, #263e6f)",
    height: "36px",
  },
  "&&> *": {
    margin: 0,
    padding: 0,
  },
};

const ZScore = ({ value, ...rest }: ZScoreProps) => {
  return <Chip sx={sx} icon={<ZScoreIcon />} label={Math.round(value)} {...rest} />;
};
export default ZScore;
