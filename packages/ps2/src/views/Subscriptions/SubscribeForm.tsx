import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ZigButton, ZigInput } from '@zignaly-open/ui';
import { SubscriptionCodeValidation } from './validation';
import { useSubscribeMutation } from '../../apis/subscription/api';
import { useToast } from '../../util/hooks/useToast';
import { Form } from '../../components/ZModal';
import { useLazyUserQuery } from '../../apis/user/api';
import { Grid } from '@mui/material';

const SubscribeForm = () => {
  const { t } = useTranslation(['subscriptions', 'error']);
  const [subscribe, { isLoading }] = useSubscribeMutation();
  const toast = useToast();
  const [loadUser] = useLazyUserQuery();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<{ code: string }>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(SubscriptionCodeValidation),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = ({ code }: { code: string }) => {
    subscribe({ code: code.toUpperCase() })
      .unwrap()
      .then(() => {
        toast.success(t('toast-success'));
        loadUser();
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        alignItems='center'
        spacing={3}
        style={{ minHeight: '87px' }}
      >
        <Grid item xs>
          <Controller
            name='code'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ZigInput
                error={t(errors?.code?.message)}
                disabled={isLoading}
                fullWidth
                sx={{ minWidth: '190px' }}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item>
          <ZigButton
            disabled={!isValid}
            size='xlarge'
            sx={{ maxHeight: '60px' }}
            type='submit'
            loading={isLoading}
          >
            {t('redeem-code')}
          </ZigButton>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SubscribeForm;
