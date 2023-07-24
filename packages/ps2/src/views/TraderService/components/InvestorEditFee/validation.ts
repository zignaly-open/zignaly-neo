import * as yup from 'yup';
import { number } from 'yup';

export const ServiceFeeEditModalValidation = yup.object({
  value: number()
    .typeError('investors:change-fee-modal.validate-must-be-between')
    .integer('investors:change-fee-modal.validate-must-be-between')
    .required('investors:change-fee-modal.validate-must-be-between')
    .test(
      'int',
      'investors:change-fee-modal.validate-must-be-between',
      (val) => val >= 0,
    )
    .test(
      'int',
      'investors:change-fee-modal.validate-must-be-between',
      function (val) {
        return (
          val <= this.parent.maxDiscount.max ||
          val === this.parent.maxDiscount.full
        );
      },
    ),
});
