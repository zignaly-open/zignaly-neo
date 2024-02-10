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
        // const origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // TODO: check domains
        // TODO: DO NOT FORGET
        // if (origin !== 'http://localhost:8000') return;

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
