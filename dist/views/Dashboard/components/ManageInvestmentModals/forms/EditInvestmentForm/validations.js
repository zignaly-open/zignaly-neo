import * as yup from 'yup';
import { investAmountValidation } from '../InvestForm/validations';
export var EditInvestmentValidation = function (_a) {
    var max = _a.max, coin = _a.coin;
    return yup.object().shape({
        amountTransfer: investAmountValidation(max, coin),
    });
};
//# sourceMappingURL=validations.js.map