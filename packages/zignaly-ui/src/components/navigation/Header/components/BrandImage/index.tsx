import React from "react";
import { LogoProps, iconsByType } from "./types";

// TODO: fix types to logo and iso and add default variables
export default function BrandImage({ type, width, height, id }: LogoProps) {
  const Icon = iconsByType[type];
  return Icon ? <Icon width={width} height={height} id={id} /> : null;
}
