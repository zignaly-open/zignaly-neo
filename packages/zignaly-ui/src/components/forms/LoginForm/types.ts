export type LoginFormProps = {
  onSubmit: any;
  signUpURL?: string | null;
  forgotPasswordURL?: string | null;
  isLoading: boolean;
};

export type LoginFormInputProps = {
  email: string;
  password: string;
};
