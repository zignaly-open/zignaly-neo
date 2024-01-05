import React, { useMemo } from "react";
import { Chip } from "@mui/material";
import { ZScoreProps } from "./types";
import { ZScoreIcon } from "icons";

const ZScore = ({ value, mini = false, ...rest }: ZScoreProps) => {
  const sx = useMemo(
    () => ({
      "&": {
        gap: "6px",
        padding: `0 ${mini ? 12 : 16}px`,
        borderRadius: "18px",
        backgroundImage: "linear-gradient(to top, #3e3177, #263e6f)",
        height: `${mini ? 28 : 36}px`,
      },
      "&&> *": {
        margin: 0,
        padding: 0,
      },
    }),
    [mini],
  );

  return (
    <Chip sx={sx} icon={mini ? undefined : <ZScoreIcon />} label={Math.round(value)} {...rest} />
  );
};
export default ZScore;
