import * as yup from 'yup';
import { inputAmountTokenMaxValidation, inputAmountTokenDecimalsValidation, } from '../../../../util/validation';
export var TransferModalValidation = yup.object({
    amountValue: inputAmountTokenMaxValidation.concat(inputAmountTokenDecimalsValidation),
});
//# sourceMappingURL=validation.js.map