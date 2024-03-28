import { useToast } from '@zignaly-open/ui';
import { WhitelabelBackendConfig } from '../../apis/config/types';
import { useTranslation } from 'react-i18next';
import {
  useSaveWlConfigMutation,
  useWlConfigQuery,
} from '../../apis/config/api';
import { generateLogoWithBackground, generateSplashscreen } from './imageGen';
import { useAsyncFn } from 'react-use';

export function useSaveConfig(
  wl: string,
  transform?: (
    v: Partial<WhitelabelBackendConfig>,
  ) =>
    | Partial<WhitelabelBackendConfig>
    | Promise<Partial<WhitelabelBackendConfig>>,
) {
  const { t } = useTranslation('config');
  const { data: originalValue } = useWlConfigQuery(wl);
  const [action] = useSaveWlConfigMutation();
  const toast = useToast();

  const [{ loading }, submit] = useAsyncFn(
    async (values: Partial<WhitelabelBackendConfig>) => {
      try {
        await action({
          slug: wl,
          data: {
            ...(originalValue || {}),
            ...(transform ? await transform(values) : values),
          } as WhitelabelBackendConfig,
        }).unwrap();
        toast.success(t('saved'));
      } catch (e) {
        toast.error(
          t('failed') +
            ' ' +
            (e?.data?.error?.msg
              ? t(`error:error.${e?.data?.error?.msg}`)
              : ''),
        );
      }
    },
    [t],
  );

  return {
    isLoading: loading,
    submit,
  };
}

export function useUploadFile(): (file: File | null) => Promise<string> {
  return async (file) => {
    if (!file) return null;
    await new Promise((r) => setTimeout(r, 1000));
    return 'https://res.cloudinary.com/zignaly/image/upload/v1694687051/trjohquby4cn4ak3lb59.png';
  };
}

export function useRegenerateImages(): (
  logo: string,
  bgColor: string,
) => Promise<
  Partial<{
    splashscreen: string;
    logoWithBackground: string;
  }>
> {
  const upload = useUploadFile();
  return async (logo, bgColor) => {
    const [splashscreen, logoWithBackground] = await Promise.all([
      upload(await generateSplashscreen(logo + '/public', bgColor)),
      upload(await generateLogoWithBackground(logo + '/public', bgColor)),
    ]);
    return {
      ...(splashscreen ? { splashscreen } : {}),
      ...(logoWithBackground ? { logoWithBackground } : {}),
    };
  };
}

export function downloadFile(file) {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
}
