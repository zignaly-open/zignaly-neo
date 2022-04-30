// Dependencies
import React, { useMemo } from "react";

// Types
import { LogoProps, iconsByType } from "./types";

function BrandImage({ type, width, height }: LogoProps) {
  const renderImage = useMemo(() => {
    const Icon = iconsByType[type];
    return Icon ? <Icon width={width} height={height} /> : null;
  }, [type, width, height]);

  return renderImage;
}

export default BrandImage;
