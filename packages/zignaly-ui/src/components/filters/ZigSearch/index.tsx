import React, { useRef, useState } from "react";
import { ZigSearchProps } from "./types";
import { Box, Collapse, Fade, IconButton, InputAdornment, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import { ZigCrossIcon, ZigResetIcon } from "../../../icons";
import { ZigInputStyled } from "./styles";
import { useTranslation } from "react-i18next";

const ZigSearch = ({ value, onChange, id, sx }: ZigSearchProps) => {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { t } = useTranslation("zignaly-ui", { keyPrefix: "ZigSearch" });

  return (
    <Box
      display="flex"
      gap={2}
      position={"relative"}
      alignItems={"center"}
      justifyContent={"flex-end"}
      sx={sx}
    >
      <Collapse orientation="horizontal" in={expanded} timeout={expanded ? 150 : 0}>
        <Box
          display="flex"
          gap={2}
          bgcolor={theme.palette.backgrounds.selectInputFill}
          zIndex={2}
          alignItems={"center"}
          width="309px"
          height="56px"
          position={"relative"}
          borderRadius="6px"
          paddingRight={"6px"}
        >
          <Box position="absolute" width={"100%"} height={"100%"} p="6px 45px 6px 6px">
            <ZigInputStyled
              id={id && `${id}-input`}
              ref={inputRef}
              wide
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              placeholder={t("search")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        padding: 0,
                        height: "24px",
                        width: "24px",
                      }}
                      id={id && `${id}-input-reset`}
                    >
                      <ZigResetIcon onClick={() => onChange("")} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <IconButton
            onClick={() => {
              setExpanded(false);
              onChange("");
            }}
            sx={{ height: "32px", width: "32px", marginLeft: "auto" }}
          >
            <ZigCrossIcon
              id={id && `${id}-close`}
              width={"24px"}
              height={"24px"}
              style={{ minHeight: "24px", minWidth: "24px" }}
            />
          </IconButton>
        </Box>
      </Collapse>
      <Box position="absolute" right={0}>
        <Fade in={!expanded}>
          <IconButton
            id={id}
            onClick={() => {
              setExpanded(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 100);
            }}
          >
            <Search />
          </IconButton>
        </Fade>
      </Box>
    </Box>
  );
};

export default ZigSearch;
