import { ReactElement } from "react";

export type HeaderRouteProps = {
  label: string;
  path: string;
};

export type HeaderProps = {
  leftElements: ReactElement[];
  rightElements: ReactElement[];
};
