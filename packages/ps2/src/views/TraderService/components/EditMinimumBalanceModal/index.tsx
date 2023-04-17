import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { MinBalanceModalProps } from './types';
import { MinBalanceModalValidation } from './validation';
import BigNumber from 'bignumber.js';
import { Button, InputAmountAdvanced, ZigTypography } from '@zignaly-open/ui';
import {
  useServiceDetails,
  useTraderServiceManagement,
  useTraderServiceUpdateMinimum,
} from '../../../../apis/service/use';
import { Box } from '@mui/material';
import { InputAmountAdvancedValueType } from '@zignaly-open/ui';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from 'components/ZModal';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

type EditMinBalanceFormValues = { amountValue: InputAmountAdvancedValueType };

function MinBalanceModal({ close, serviceId, ...props }: MinBalanceModalProps) {
  const { t } = useTranslation(['management', 'common']);
  const { isLoading: isLoadingManagement, data: management } =
    useTraderServiceManagement(serviceId);
  const { isLoading: isLoadingService, data: service } =
    useServiceDetails(serviceId);
  const toast = useToast();

  const minimumBalance = management?.minimumSca;
  const coin = {
    id: service?.ssc,
    balance: new BigNumber(minimumBalance).toFixed(),
  };

  const {
    handleSubmit,
    control,
    formState: { isValid, errors, isDirty },
  } = useForm<EditMinBalanceFormValues>({
    mode: 'onChange',
    defaultValues: {
      amountValue: {
        token: coin,
        value: minimumBalance,
      },
    },
    resolver: yupResolver(MinBalanceModalValidation),
  });

  const [update, { isLoading: isUpdating }] =
    useTraderServiceUpdateMinimum(serviceId);

  const onSubmit = useCallback(({ amountValue }: EditMinBalanceFormValues) => {
    update(amountValue.value?.toString()).then(() => {
      toast.success(t('management:minBalance.success'));
      close();
    });
  }, []);

  return (
    <ZModal
      authOnly
      wide
      {...props}
      title={t('minBalanceModal.title')}
      close={close}
    >
      <Box sx={{ marginBottom: 3 }}>
        <ZigTypography>{t('minBalanceModal.desc')}</ZigTypography>
      </Box>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputAmountAdvanced
          label={t('common:amount') + ':'}
          placeholder={t('minBalanceModal.placeholder')}
          labelBalance={t('minBalanceModal.labelBalance')}
          control={control}
          name={'amountValue'}
          fullWidth={true}
          showMaxButton={false}
          error={isDirty && t(errors?.amountValue?.value?.message)}
          enableMaxAmountMessage={false}
          tokens={[coin]}
          showUnit
        />

        <ModalActions>
          <Button
            id={'edit-balance__save'}
            loading={isLoadingManagement || isLoadingService || isUpdating}
            caption={t('minBalanceModal.save')}
            disabled={!isValid}
            size='xlarge'
            type='submit'
          />
        </ModalActions>
      </form>
    </ZModal>
  );
}

export default MinBalanceModal;
