import { TFunction } from 'i18next';
import { servicesThatAllowKeyCreation } from '../../../apis/service/constants';
import { ExchangeName } from '../../../apis/service/types';

export function getButtonDisabledPropsForExchangesWithoutApiKeyManagement(
  exchange: ExchangeName,
  t: TFunction,
) {
  return servicesThatAllowKeyCreation?.includes(exchange)
    ? {}
    : {
        disabled: true,
        tooltip: t('no-api-key-management-in-this-exchange', {
          exchange: t(`common:${exchange}`),
        }),
      };
}
