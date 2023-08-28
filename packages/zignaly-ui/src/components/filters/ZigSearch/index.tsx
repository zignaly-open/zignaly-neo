import React, { useState } from "react";
import { ZigSearchProps } from "./types";
import { Box, Fade, IconButton, InputAdornment, Slide, Zoom } from "@mui/material";
import { Replay, Search } from "@mui/icons-material";
import { ZigCrossIcon } from "../../../icons";
import { CollapseBox, ZigInputStyled } from "./styles";

const ZigSearch = ({ value, onChange }: ZigSearchProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box display="flex" gap={2} position={"relative"} alignItems={"center"}>
      <Slide direction="left" in={expanded} gap={2}>
        <Box display="flex" gap={2} bgcolor="pink" zIndex={2} alignItems={"center"}>
          <ZigInputStyled
            value={value}
            onChange={(e) => {
              onChange?.(e.target.value);
            }}
            InputPropss={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Replay onClick={() => onChange("")} width={40} height={40} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={() => setExpanded(false)} sx={{ height: "48px" }}>
            <ZigCrossIcon width={"32px"} height={"32px"} />
          </IconButton>
        </Box>
      </Slide>
      <Box position="absolute" right={0}>
        <Fade in={!expanded}>
          <IconButton onClick={() => setExpanded(true)}>
            <Search />
          </IconButton>
        </Fade>
      </Box>
    </Box>
  );
};

export default ZigSearch;
