import { useMutation } from '@apollo/client';
import { CONFIRM_EMAIL_MUTATION } from 'queries/users';

export default function useConfirmEmail(): {
  loading: boolean;
  confirmEmail: (hashStr: string) => Promise<string>;
} {
  const [confirmEmailMutation, { loading }] = useMutation(
    CONFIRM_EMAIL_MUTATION,
  );

  const confirmEmail = async (hashStr: string): Promise<string> => {
    try {
      const { data } = await confirmEmailMutation({ variables: { hashStr } });
      return data.confirmEmail;
    } catch (error) {
      return error + 'Unexpected error verifying email. Please try again.';
    }
  };

  return {
    loading,
    confirmEmail,
  };
}
