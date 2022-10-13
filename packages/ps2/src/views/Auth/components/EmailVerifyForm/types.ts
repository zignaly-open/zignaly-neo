export type EmailVerifyFormProps = {
  onSubmit: (code: string) => void;
  onReSendCode: () => void;
  isLoading: boolean;
  clearOnError?: boolean;
  isReSendLoading?: boolean;
  error?: string | null;
};
