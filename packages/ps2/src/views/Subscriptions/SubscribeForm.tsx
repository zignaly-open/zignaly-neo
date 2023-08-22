import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ZigInput } from '@zignaly-open/ui';
import { SubscriptionCodeValidation } from './validation';
import { useSubscribeMutation } from '../../apis/subscription/api';
import { useToast } from '../../util/hooks/useToast';
import { Form } from '../../components/ZModal';

const SubscribeForm = () => {
  const { t } = useTranslation(['subscriptions', 'error']);
  const [subscribe, { isLoading }] = useSubscribeMutation();
  const toast = useToast();

  const {
    handleSubmit,
    control,
    formState: { errors },
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
      .then(() => toast.success(t('toast-success')));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={'code'}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <ZigInput
            error={t(errors?.code?.message)}
            disabled={isLoading}
            fullWidth
            {...field}
          />
        )}
      />
    </Form>
  );
};

export default SubscribeForm;