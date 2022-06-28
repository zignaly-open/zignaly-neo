import { APISettingsProps } from "../components/APISettings/types";

type Data = { name: string } & APISettingsProps;

export type CreateAPIKeysModalProps = {
  onClickClose: () => void;
  onSubmit: (data: Data) => void;
  isLoading: boolean;
  apiKey: string;
  apiSecret: string;
};
