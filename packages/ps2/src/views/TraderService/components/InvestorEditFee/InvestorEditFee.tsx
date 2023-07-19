import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import ZModal, { ModalActions } from '../../../../components/ZModal';
import { ZigButton, ZigInput, ZigTypography } from '@zignaly-open/ui';
import { Box, InputAdornment } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useToast } from '../../../../util/hooks/useToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTraderServiceEditSuccessFeeMutation } from '../../../../apis/service/api';
import SuccessFeeInputWrapper from '../BecomeTraderLanding/modals/forms/SuccessFeeInputWrapper';
import { useServiceDetails } from '../../../../apis/service/use';
import { ServiceFeeEditModalValidation } from './validation';
import {
  adjustDiscountFromBackend,
  adjustDiscountToBackend,
  getServiceTotalFee,
} from '../../../../util/fee';
import { ZIGNALY_PROFIT_FEE } from '../../../../util/constants';

type EditFeeFormValues = {
  value: number;
  maxDiscount: { max: number; full: number };
};

function InvestorEditFee({
  close,
  ownerSuccessFee,
  ownerSfDiscount,
  accountId,
  serviceId,
  ...props
}: {
  close: () => void;
  ownerSuccessFee: number;
  accountId: string;
  ownerSfDiscount: number;
  serviceId: string;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['investors']);
  const [editFee, { isLoading }] = useTraderServiceEditSuccessFeeMutation();
  const toast = useToast();
  const { data } = useServiceDetails(serviceId);
  const serviceTotalFee = +data?.successFee || 0;
  const previousValue = adjustDiscountFromBackend(
    ownerSfDiscount,
    serviceTotalFee,
  );
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { isValid, errors },
  } = useForm<EditFeeFormValues>({
    mode: 'onChange',
    defaultValues: {
      value: previousValue,
      maxDiscount: {
        max: Math.max(0, serviceTotalFee - 2 * ZIGNALY_PROFIT_FEE),
        full: serviceTotalFee,
      },
    },
    resolver: yupResolver(ServiceFeeEditModalValidation),
  });

  // needed only for validation
  register('maxDiscount');

  const value = watch('value');

  const onSubmit = useCallback(
    ({ value: discount, maxDiscount: { full } }: EditFeeFormValues) => {
      if (previousValue !== Number(value)) {
        editFee({
          discount: adjustDiscountToBackend(discount, full),
          accountId,
          serviceId,
        })
          .unwrap()
          .then(() => {
            toast.success(t('change-fee-modal.fee-edited'));
            close();
          });
      } else close();
    },
    [value],
  );

  return (
    <ZModal wide {...props} close={close} title={t('change-fee-modal.title')}>
      <Box sx={{ marginBottom: 3, textAlign: 'center' }}>
        <ZigTypography>{t('change-fee-modal.desc')}</ZigTypography>
      </Box>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='value'
          control={control}
          render={({ field }) => (
            <SuccessFeeInputWrapper
              value={value}
              newValueLabel={t('change-fee-modal.new-success-fee')}
              title={t('change-fee-modal.title')}
              description={t('first-grade-math-explainer', {
                zignalyFee: ZIGNALY_PROFIT_FEE,
              })}
              newValue={getServiceTotalFee(
                Math.max(
                  serviceTotalFee - watch('value') - ZIGNALY_PROFIT_FEE,
                  0,
                ),
              )}
            >
              <ZigInput
                type='number'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
                label={t('change-fee-modal.discount')}
                labelInline={true}
                fullWidth={false}
                error={t(errors.value?.message, watch('maxDiscount'))}
                {...field}
              />
            </SuccessFeeInputWrapper>
          )}
        />

        <ModalActions>
          <ZigButton
            id={'edit-success-fee__save'}
            loading={isLoading}
            disabled={!isValid}
            size='xlarge'
            type='submit'
          >
            {t('actions:save')}
          </ZigButton>
        </ModalActions>
      </form>
    </ZModal>
  );
}

InvestorEditFee.trackId = 'edit-success-fee';

export default InvestorEditFee;
