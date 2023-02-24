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
      const result = await confirmEmailMutation({ variables: { hashStr } });
      return result ? 'email-confirmed' : 'confirmation-link-valid';
    } catch (error) {
      return 'confirmation-link-invalid';
    }
  };

  return {
    loading,
    confirmEmail,
  };
}
