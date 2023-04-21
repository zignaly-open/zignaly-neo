import * as React from "react";
import { ReactElement } from "react";

import { LoaderTypes, LoaderProps, componentsByType } from "./types";

// TODO: deprecate, pull CircularProgress from ps2, add stories for CircularProgress
function Loader({
  type = LoaderTypes.TAILSPIN,
  width,
  height,
  color,
  secondaryColor,
  ariaLabel,
  strokeWidth,
  className,
}: LoaderProps): ReactElement {
  const ComponentByType = componentsByType[type];

  return (
    <ComponentByType
      width={width}
      height={height}
      color={color}
      ariaLabel={ariaLabel}
      // @ts-ignore
      secondaryColor={secondaryColor}
      strokeWidth={strokeWidth}
      wrapperClass={className}
    />
  );
}

export { LoaderTypes };
export default Loader;
