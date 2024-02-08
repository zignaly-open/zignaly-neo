import React from "react";
import { RingsConnectorCircle, RingsConnectorLine } from "./styles";
import { Box } from "@mui/material";

const RingsConnector = () => (
  <Box
    display="flex"
    flexDirection={"column"}
    alignItems={"center"}
    mt="-3px"
    mb="-5px"
    zIndex={1}
    position={"relative"}
  >
    <RingsConnectorLine />
    <RingsConnectorCircle />
  </Box>
);

export default RingsConnector;
