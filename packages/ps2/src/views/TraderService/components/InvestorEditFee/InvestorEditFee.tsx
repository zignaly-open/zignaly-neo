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
import { useActiveExchange } from '../../../../apis/user/use';
import { ServiceFeeEditModalValidation } from './validation';

type EditFeeFormValues = { value: number };

function InvestorEditFee({
  close,
  serviceId,
  ...props
}: {
  close: () => void;
  serviceId: string;
} & DialogProps): React.ReactElement {
  const { t } = useTranslation(['investors']);
  const { internalId: accountId } = useActiveExchange();
  const [editFee, { isLoading }] = useTraderServiceEditSuccessFeeMutation();
  const toast = useToast();
  const { data } = useServiceDetails(serviceId);
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, errors },
  } = useForm<EditFeeFormValues>({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(ServiceFeeEditModalValidation),
  });

  const onSubmit = useCallback(({ value: discount }: EditFeeFormValues) => {
    editFee({
      discount,
      accountId,
      serviceId,
    }).then(() => {
      // TODO
      toast.success(t('change-fee-modal.fee-edited'));
      close();
    });
  }, []);

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
              value={watch('value')}
              title={t('change-fee-modal.title')}
              description={t('change-fee-modal.input-desc')}
              newValueLabel={t('change-fee-modal.new-success-fee')}
              newValue={
                ((+data?.successFee || 0) * (100 - (watch('value') || 0))) / 100
              }
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
                error={t(errors.value?.message)}
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
