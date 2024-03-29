import { Chip } from "@mui/material";
import { ComponentProps } from "react";

export type ZScoreProps = { value: number; mini?: boolean } & ComponentProps<typeof Chip>;
