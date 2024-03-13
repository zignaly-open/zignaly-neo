import React from "react";
import { useTheme } from "@mui/material";

const ZigImageColorOverride = ({
  width,
  height,
  id,
  style,
  ...rest
}: React.SVGProps<SVGImageElement>) => {
  const theme = useTheme();
  return (
    <svg width={width} height={height} id={id && id} style={style}>
      <defs>
        <filter id="imageColorOverride">
          <feFlood flood-color={theme.palette.imageColorOverride} result="flood" />
          <feComposite
            in="SourceGraphic"
            in2="flood"
            operator="arithmetic"
            k1="1"
            k2="0"
            k3="0"
            k4="0"
          />
        </filter>
      </defs>

      <image
        width="100%"
        height="100%"
        filter={theme.palette.imageColorOverride ? "url(#imageColorOverride)" : undefined}
        {...rest}
      />
    </svg>
  );
};

export default ZigImageColorOverride;
