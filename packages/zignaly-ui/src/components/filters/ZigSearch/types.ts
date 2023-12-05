import { SxProps } from "@mui/system";

export type ZigSearchProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  sx?: SxProps;
};
