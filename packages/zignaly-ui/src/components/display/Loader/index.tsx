import * as React from "react";
import { Oval } from "react-loader-spinner";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";

export const Loader: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 40, height = 40 }) => {
  const { palette } = useTheme();
  return (
    <Oval
      width={width + "px"}
      height={height + "px"}
      color={palette.backgrounds.loader}
      secondaryColor={palette.contrasting + "33"}
      ariaLabel={"Loading..."}
    />
  );
};

export const CenteredLoader: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 40, height = 40 }) => (
  <Box
    sx={{
      display: "flex",
      padding: "8em 0",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Loader width={width} height={height} />
  </Box>
);
