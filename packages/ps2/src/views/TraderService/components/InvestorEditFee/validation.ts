import * as yup from 'yup';
import { number } from 'yup';

export const ServiceFeeEditModalValidation = yup.object({
  value: number()
    .typeError('error:error.required')
    .required('error:error.required')
    .test(
      'int',
      'investors:change-fee-modal.validate-must-be-gte-0',
      (val) => val >= 0,
    )
    .test(
      'int',
      'investors:change-fee-modal.validate-must-be-lte-max',
      function (val) {
        return val <= this.parent.maxDiscount;
      },
    ),
});
