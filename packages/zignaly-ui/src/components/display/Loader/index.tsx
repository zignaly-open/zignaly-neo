// Dependencies
import * as React from "react";
import { ReactElement } from "react";

// Types
import { LoaderTypes, LoaderProps, componentsByType } from "./types";

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
