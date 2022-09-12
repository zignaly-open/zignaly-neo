import React from "react";

export type ExpandableInputProps = {
  icon: React.ReactElement;
  placeholder?: string;
  value?: string;
  onChange: (e: string) => void;
};
