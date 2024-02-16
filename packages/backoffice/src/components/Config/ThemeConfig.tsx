import React, { useMemo, useRef, useState } from 'react';
import {
  ZigButtonGroupInput,
  ZigTypography,
  ZigButton,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { ConfigWrapper } from './styled';

export default function ThemeConfig() {
  const { t } = useTranslation('config');
  const sizes = useMemo(
    () =>
      [
        {
          value: 'mobile',
          label: t('sizes.mobile'),
          width: 393,
          height: 852,
        },
        {
          value: 'tablet',
          label: t('sizes.tablet'),
          width: 810,
          height: 1080,
        },
        {
          value: 'desktop',
          label: t('sizes.desktop'),
          width: 1366,
          height: 768,
        },
      ].map(({ value, label, width, height }) => ({
        value,
        height,
        width,
        label: `${label} (${width}x${height})`,
      })),
    [t],
  );

  const [size, setSize] = useState(sizes[2].value);
  const activeSize = sizes.find((x) => x.value === size) || sizes[2];
  const iframe = useRef(null);
  const domain = 'http://localhost:3000';
  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 4 }} variant={'h1'}>
        {t('navigation.theme-config')}
      </ZigTypography>

      <Box
        sx={{
          textAlign: 'left',
          mb: 3,
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'flex-end',
          flex: 1,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <ZigButtonGroupInput
            value={size}
            options={sizes}
            onChange={(v) => setSize(v)}
            label={t('sizes.preview-size')}
          />
        </Box>

        <ZigButton
          onClick={() => {
            iframe.current.contentWindow.postMessage(
              {
                call: 'passDebugTemplateOverride',
                overrides: {
                  palette: {
                    neutral300: ['#f00', '#f0f', '#0f0', '#0ff'][
                      Math.floor(Math.random() * 4)
                    ],
                  },
                },
              },
              '*',
            );
          }}
          disabled={!iframe.current}
        >
          {t('apply')}
        </ZigButton>
      </Box>

      <Box
        sx={{
          backgroundImage:
            'repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px)',
          p: 1,
        }}
      >
        <iframe
          ref={iframe}
          style={{
            border: 'none',
            height: activeSize.height,
            width: activeSize.width,
          }}
          src={domain}
        ></iframe>
      </Box>
    </ConfigWrapper>
  );
}
