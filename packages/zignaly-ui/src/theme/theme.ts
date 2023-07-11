// this thing is overwritten in module-name.d.ts
import { CustomPalette } from "@mui/material/styles";

interface Theme {
  fontFamily: string[];
  palette: Omit<CustomPalette, "backgrounds" | "boxShadows" | "chart">;
  backgrounds: CustomPalette["backgrounds"];
  boxShadows: CustomPalette["boxShadows"];
  chart: CustomPalette["chart"];
  mode: "dark" | "light";
}

export default Theme;
