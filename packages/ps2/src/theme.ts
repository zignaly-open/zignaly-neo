import { getZignalyThemeExport, ThemeOverridesType } from '@zignaly-open/ui';
import { whitelabel } from './whitelabel';
import { useEffect, useMemo, useState } from 'react';

export function useWlInstanceThemeWithDebugStyling() {
  const [backofficeDebugConfigOverrides, setBackofficeDebugConfigOverrides] =
    useState<ThemeOverridesType>(null);

  useEffect(() => {
    window.addEventListener(
      'message',
      function (event) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        if (
          ![
            // TODO: make sure this is the full list of backoffice urls we support
            'http://localhost:3001',
            'https://bo.staging-zignaly.icu',
            'https://bo.zignaly.com',
          ].includes(origin)
        )
          return;
        if (
          typeof event.data == 'object' &&
          event.data.call == 'passDebugTemplateOverride'
        ) {
          setBackofficeDebugConfigOverrides(event.data.overrides);
        }
      },
      false,
    );
  }, []);

  return useMemo(() => {
    return getZignalyThemeExport(whitelabel?.theme || 'dark', [
      whitelabel.themeOverrides,
      backofficeDebugConfigOverrides,
    ] as ThemeOverridesType[]);
  }, [backofficeDebugConfigOverrides]);
}
