import { LoginPayload } from './types';
import { useLoginMutation } from './api';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useAsyncFn } from 'react-use';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';

export const useAuthenticate = (): AsyncFnReturn<
  (payload: LoginPayload) => Promise<boolean>
> => {
  const [login] = useLoginMutation();

  const { executeRecaptcha } = useGoogleReCaptcha();

  return useAsyncFn(
    async (payload: LoginPayload) => {
      try {
        const captcha = await executeRecaptcha('login');
        await login({
          ...payload,
          gRecaptchaResponse: captcha,
          cVersionRecaptcha: 2,
        }).unwrap();
        return true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
    [executeRecaptcha],
  );
};
