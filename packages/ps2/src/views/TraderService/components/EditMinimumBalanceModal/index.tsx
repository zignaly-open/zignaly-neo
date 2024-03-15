import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { MinBalanceModalProps } from './types';
import { MinBalanceModalValidation } from './validation';
import BigNumber from 'bignumber.js';
import {
  ZigButton,
  ZigTypography,
  ZigModalActions,
  ZigInputAmount,
} from '@zignaly-open/ui';
import {
  useServiceDetails,
  useTraderServiceManagement,
  useTraderServiceUpdateMinimum,
} from '../../../../apis/service/use';
import { Box } from '@mui/material';
import { useToast } from '../../../../util/hooks/useToast';
import ZModal from 'components/ZModal';

type EditMinBalanceFormValues = { amountValue: string };

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
    formState: { isValid, errors },
  } = useForm<EditMinBalanceFormValues>({
    mode: 'all',
    defaultValues: {
      amountValue: minimumBalance,
    },
    resolver: yupResolver(MinBalanceModalValidation),
  });

  const [update, { isLoading: isUpdating }] =
    useTraderServiceUpdateMinimum(serviceId);

  const onSubmit = useCallback(({ amountValue }: EditMinBalanceFormValues) => {
    update(amountValue.toString()).then(() => {
      toast.success(t('management:minBalance.success'));
      close();
    });
  }, []);

  return (
    <ZModal
      id={'edit-minimum-balance-modal'}
      wide
      {...props}
      title={t('minBalanceModal.title')}
      close={close}
    >
      <Box sx={{ marginBottom: 3, textAlign: 'center' }}>
        <ZigTypography
          textAlign={'center'}
          id={'edit-minimum-balance-modal__description'}
        >
          {t('minBalanceModal.desc')}
        </ZigTypography>
      </Box>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={'amountValue'}
          render={({ field }) => (
            <ZigInputAmount
              id={'edit-minimum-balance-modal__input-amount'}
              label={t('common:amount') + ':'}
              placeholder={t('minBalanceModal.placeholder')}
              fullWidth={true}
              showMaxButton={false}
              error={t(errors?.amountValue?.message)}
              coin={coin.id}
              extraInfo={{
                others: [
                  {
                    label: t('minBalanceModal.labelBalance'),
                    value: minimumBalance,
                  },
                ],
              }}
              {...field}
            />
          )}
        />
        <ZigModalActions>
          <ZigButton
            id={'edit-minimum-balance-modal__save'}
            loading={isLoadingManagement || isLoadingService || isUpdating}
            disabled={!isValid}
            size='xlarge'
            type='submit'
          >
            {t('minBalanceModal.save')}
          </ZigButton>
        </ZigModalActions>
      </form>
    </ZModal>
  );
}

export default MinBalanceModal;
