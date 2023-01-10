import * as yup from 'yup';
import i18n from '../../../../util/i18next';

const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
const ipRangeRegex =
  /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}(?:\/(?:31|30|2\d|1\d|\d))?$/;

const validateIp = (ip: string) => ipRegex.test(ip);
const validateIpRange = (ip: string) => ipRangeRegex.test(ip);

const validateAlias = yup
  .string()
  .required('error:error.required')
  .test(
    'maxlength',
    i18n.t('common:validation.max-allowed-length', { count: 30 }),
    function (val) {
      return val.length <= 20;
    },
  );

export const CreateKeyValidation = yup
  .object({
    alias: validateAlias,
  })
  .required();

export const ipStringToArray = (value: string) =>
  value.split(/,|\s+/).filter(Boolean);

export const EditKeyValidation = yup
  .object({
    alias: validateAlias,
    ipRestrictions: yup
      .string()
      .test('required', 'error:error.required', function (value) {
        return !!value.trim() || this.parent.enableIpRestriction !== 'true';
      })
      .test(
        'ranges',
        'management:api-keys.ip-restrictions-ranges',
        function (value) {
          return (
            this.parent.enableIpRestriction !== 'true' ||
            ipStringToArray(value).every(validateIp) ||
            !ipStringToArray(value).every(validateIpRange)
          );
        },
      )
      .test('empty', 'error:error.required', function (value) {
        return (
          this.parent.enableIpRestriction !== 'true' ||
          ipStringToArray(value).length !== 0
        );
      })
      .test(
        'invalid',
        'management:api-keys.ip-restrictions-invalid',
        function (value) {
          return (
            this.parent.enableIpRestriction !== 'true' ||
            ipStringToArray(value).every(validateIp)
          );
        },
      )
      .test(
        'duplicates',
        'management:api-keys.ip-restrictions-duplicates',
        function (value) {
          return (
            this.parent.enableIpRestriction !== 'true' ||
            ipStringToArray(value).length ===
              new Set(ipStringToArray(value)).size
          );
        },
      ),
  })
  .required();
