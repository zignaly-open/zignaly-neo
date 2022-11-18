import { useLazyQuery } from '@apollo/client';
import { CHECK_USERNAME } from 'config/apollo/queries';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const USERNAME_PATTERN = /^[\da-z-.]{2,20}$/i;

export const useValidateUsername = (): ((
  username: string,
) => Promise<true | string>) => {
  const { t } = useTranslation('onboarding');
  const [checkUsername] = useLazyQuery(CHECK_USERNAME, {
    fetchPolicy: 'network-only',
  });

  return useCallback(
    async (username: string) => {
      const {
        data: { checkUsername: isValid },
      } = await checkUsername({
        variables: {
          username,
        },
      });
      return isValid || t('username-taken', { username });
    },
    [checkUsername, t],
  );
};
