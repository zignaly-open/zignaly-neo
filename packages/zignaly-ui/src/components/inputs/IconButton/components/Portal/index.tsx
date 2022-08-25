// Dependencies
import React from "react";
import { Portal as InitPortal } from "react-portal";

// Types
import { PortalProps } from "./types";

const Portal = ({ children }: PortalProps): JSX.Element => {
  return <InitPortal>{children}</InitPortal>;
};

export default Portal;
