import { ZigTypography } from '@zignaly-open/ui';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SliderContainer, ContainerArrow, StyledZigSlider } from './styles';
import { useDebounce } from 'react-use';
import { useUpdateDiscountMutation } from 'apis/referrals/api';
import { useToast } from 'util/hooks/useToast';
import { Box, Tooltip } from '@mui/material';
import { round } from 'lodash-es';
import { InfoOutlined } from '@mui/icons-material';

export const ShareCommissionSlider = ({
  discountPct,
  max,
}: {
  discountPct: number;
  max: number;
}) => {
  const { t } = useTranslation(['referrals-trader', 'common']);
  const [value, setValue] = useState(Math.round((discountPct * max) / 100));
  const [updateDiscount] = useUpdateDiscountMutation();
  const toast = useToast();
  const isFirstRun = useRef(true);

  useDebounce(
    async () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      await updateDiscount({
        discount: round((value / max) * 100, 2),
      }).unwrap();
      toast.success(t('changes-saved'));
    },
    600,
    [value],
  );

  return (
    <SliderContainer>
      <ContainerArrow />
      <Box position={'relative'}>
        <ZigTypography
          fontSize={16}
          letterSpacing={'0.48px'}
          textAlign={'center'}
          color={'neutral100'}
          id='referrals-invite-modal__slider-label'
          position={'relative'}
          component={'div'}
        >
          {t('split-commission')}
          <Tooltip title={t('tooltips.split-commission')}>
            <InfoOutlined
              sx={{
                color: 'neutral300',
                fontSize: '10px',
                marginLeft: '3px',
                marginBottom: '8px',
              }}
            />
          </Tooltip>
        </ZigTypography>
      </Box>

      <StyledZigSlider
        labels={{
          start: t('for-me'),
          end: t('for-friends'),
          invertSliderValues: true,
          labelsAbove: false,
        }}
        prefixId='referrals-invite-modal'
        value={value}
        onChange={(_, v) => {
          setValue(v as number);
        }}
        max={max}
        valueLabelFormat={(v) => v.toString()}
        step={5}
      />
    </SliderContainer>
  );
};
