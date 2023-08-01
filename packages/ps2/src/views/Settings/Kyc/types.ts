export type KycDefinitionConfig = {
  color: string;
  requirements: string;
  label: string;
  name: string;
  icon: JSX.Element;
  restriction: { from: string; to?: string; coin: string };
};
