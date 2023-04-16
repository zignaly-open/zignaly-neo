import * as yup from 'yup';
import { inputAmountZeroableValidation, inputAmountTokenDecimalsValidation, } from '../../../../util/validation';
export var MinBalanceModalValidation = yup.object({
    amountValue: inputAmountZeroableValidation.concat(inputAmountTokenDecimalsValidation),
});
//# sourceMappingURL=validation.js.map