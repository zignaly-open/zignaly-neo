import * as yup from 'yup';

const subscriptionCodeFormat =
  /^[A-Za-z]{2}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
export const SubscriptionCodeValidation = yup
  .object({
    code: yup
      .string()
      .required('error:error.required')
      .matches(
        subscriptionCodeFormat,
        'subscriptions:validation.invalid-code-format',
      ),
  })
  .required();
