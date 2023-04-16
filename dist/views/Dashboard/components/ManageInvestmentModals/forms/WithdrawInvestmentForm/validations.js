import * as yup from 'yup';
import { inputAmountTokenMaxValidation, inputAmountTokenDecimalsValidation, inputAmountMinOwnerInvestedValidation, } from '../../../../../../util/validation';
export var EditInvestmentValidation = yup.object().shape({
    amountTransfer: inputAmountTokenMaxValidation.concat(inputAmountTokenDecimalsValidation),
});
export var EditInvestmentValidationOwner = function (minAmount) {
    return yup.object().shape({
        amountTransfer: inputAmountTokenMaxValidation
            .concat(inputAmountTokenDecimalsValidation)
            .concat(inputAmountMinOwnerInvestedValidation(minAmount)),
    });
};
//# sourceMappingURL=validations.js.map