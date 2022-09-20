export type ExpandableInputProps = {
  value?: string;
  children: ({
    isExpanded,
    setExpanded,
  }: {
    isExpanded: boolean;
    setExpanded: (isExpanded: boolean) => void;
  }) => JSX.Element;
};
