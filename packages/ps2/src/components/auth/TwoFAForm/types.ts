export type TwoFAFormProps = {
  onSubmit: (code: string) => void;
  isLoading: boolean;
  requireAutoFocus?: boolean;
  clearOnError?: boolean;
  error?: string | null;
};
