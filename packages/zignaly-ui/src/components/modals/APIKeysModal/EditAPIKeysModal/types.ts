import { APISettingsProps } from "../components/APISettings/types";

type Data = { name: string } & APISettingsProps;

export type EditAPIKeysModalProps = {
  initialValue: number | string;
  onClickClose: () => void;
  settings: APISettingsProps;
  onSubmit: (data: Data) => void;
  name: string;
  apikey: string;
};
