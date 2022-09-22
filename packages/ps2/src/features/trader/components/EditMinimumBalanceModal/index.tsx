import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { MinBalanceModalProps } from './types';
import { MinBalanceModalValidation } from './validation';
import BigNumber from 'bignumber.js';
import { Button, InputAmountAdvanced, Typography } from '@zignaly-open/ui';
import {
  useServiceDetails,
  useTraderServiceManagement,
  useTraderServiceUpdateMinimum,
} from '../../use';
import ModalContainer from '../../../../components/ModalContainer';
import { ModalActions } from '../../../../components/ModalContainer/styles';
import { Box, Modal } from '@mui/material';
import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';
import { useToast } from '../../../../util/hooks/useToast';

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
  } = useForm<{ amountValue: InputAmountAdvancedValue }>({
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

  const onSubmit = useCallback(({ amountValue }) => {
    update(amountValue.value?.toString()).then(() => {
      toast.success(t('management:management.minBalance.success'));
      close();
    });
  }, []);

  return (
    <Modal
      {...props}
      onClose={close}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <ModalContainer
        width={784}
        title={t('minBalanceModal.title')}
        onClickClose={close}
      >
        <Box sx={{ marginBottom: 3 }}>
          <Typography>{t('minBalanceModal.desc')}</Typography>
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
              loading={isLoadingManagement || isLoadingService || isUpdating}
              caption={t('minBalanceModal.save')}
              disabled={!isValid}
              size='xlarge'
              type='submit'
            />
          </ModalActions>
        </form>
      </ModalContainer>
    </Modal>
  );
}

export default MinBalanceModal;
