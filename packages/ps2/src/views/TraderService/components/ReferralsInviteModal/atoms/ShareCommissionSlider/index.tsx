import { ZigSlider, ZigTypography } from '@zignaly-open/ui';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SliderContainer, ContainerArrow, StyledZigSlider } from './styles';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'react-use';
import { useUpdateDiscountMutation } from 'apis/referrals/api';
import { useToast } from 'util/hooks/useToast';

export const ShareCommissionSlider = ({
  discountPct,
  max,
}: {
  discountPct: number;
  max: number;
}) => {
  const { t } = useTranslation(['referrals-trader', 'common']);
  const [value, setValue] = useState(Math.round((discountPct / max) * 100));
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
        discount: (value / 100) * max,
      }).unwrap();
      toast.success(t('changes-saved'));
    },
    2000,
    [value],
  );

  return (
    <SliderContainer>
      <ContainerArrow />
      <ZigTypography
        fontSize={16}
        fontWeight={500}
        letterSpacing={'0.48px'}
        textAlign={'center'}
      >
        {t('split-commission')}
      </ZigTypography>
      <StyledZigSlider
        labels={{
          start: t('for-me'),
          end: t('for-friends'),
          invertSliderValues: true,
          labelsAbove: false,
        }}
        prefixId='referrals-invite-modal'
        value={value}
        onChange={(_, v: number) => {
          setValue(v);
        }}
        max={max}
      />
    </SliderContainer>
  );
};
