export type KycDefinitionConfig = {
  color: string;
  requirements: string;
  label: string;
  icon: JSX.Element;
  restriction: { from: string; to?: string; coin: string };
};
