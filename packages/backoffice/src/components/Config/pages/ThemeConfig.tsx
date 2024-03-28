import React, { useMemo, useRef, useState } from 'react';
import {
  ZigButtonGroupInput,
  ZigTypography,
  ZigButton,
} from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { ConfigWrapper } from '../styled';
import { WhitelabelBackendConfig } from '@zignaly-open/ps2-definitions';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ProfileConfigValidation } from '../validations';
import { useRegenerateImages, useSaveConfig } from '../use';
import { useParams } from 'react-router-dom';
import { useWlConfigQuery } from '../../../apis/config/api';
import ZigColorInput from '../components/ZigColorInput';

export default function ThemeConfig() {
  const { wl } = useParams();
  const { data } = useWlConfigQuery(wl);
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

  const defaultValues = useMemo(
    () => ({ themeOverride: data.themeOverride }),
    [data],
  );

  const formMethods = useForm<{
    themeOverride: WhitelabelBackendConfig['themeOverride'];
  }>({
    defaultValues,
    resolver: yupResolver(ProfileConfigValidation),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const { control, handleSubmit } = formMethods;

  const regenerateImages = useRegenerateImages(data);
  const { submit, isLoading } = useSaveConfig(wl, async (payload) => {
    return {
      ...payload,
      ...(await regenerateImages(
        undefined,
        payload.themeOverride?.themeOverrides?.palette?.neutral800,
      )),
    };
  });

  return (
    <ConfigWrapper>
      <ZigTypography sx={{ mb: 4 }} variant={'h1'}>
        {t('navigation.theme-config')}
      </ZigTypography>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={7.5}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name={'themeOverride.themeOverrides.palette.neutral200'}
              control={control}
              render={({ field }) => <ZigColorInput {...field} />}
            />
          </Grid>
        </Grid>
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
            type={'button'}
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
            disabled={!iframe.current || isLoading}
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
      </form>
    </ConfigWrapper>
  );
}
