import { styled, Tab as TabMui } from "@mui/material";

export const Tab = styled(TabMui, {
  shouldForwardProp: (prop) => prop !== "asideComponent",
})``;
