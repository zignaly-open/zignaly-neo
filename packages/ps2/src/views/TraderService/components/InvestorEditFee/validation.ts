import * as yup from 'yup';
import { number } from 'yup';

export const ServiceFeeEditModalValidation = yup.object({
  value: number()
    .test(
      'int',
      'investors:change-fee-modal.validate-must-be-gte-0',
      (val) => val >= 0,
    )
    .test(
      'int',
      'investors:change-fee-modal.validate-must-be-lte-100',
      (val) => val <= 100,
    ),
});
