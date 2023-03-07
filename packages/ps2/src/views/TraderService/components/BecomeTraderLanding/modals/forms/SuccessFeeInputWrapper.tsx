import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { SuccessFieldWrapper, SuccessFieldWrapperShit } from '../atoms';
import { ZIGNALY_PROFIT_FEE } from '../../../../../../util/constants';

const SuccessFeeInputWrapper: React.FC<{ value: number | string }> = ({
  children,
  value,
}) => {
  const { t } = useTranslation('service');
  const feeWeCharge = !value
    ? 0
    : Math.max(0, Math.min(75, Number(value)) - ZIGNALY_PROFIT_FEE);

  return (
    <>
      <SuccessFieldWrapper>
        {children}

        <SuccessFieldWrapperShit>
          <ZigTypography>
            {t('you-get-x', {
              number: Math.round(feeWeCharge),
            })}
          </ZigTypography>
        </SuccessFieldWrapperShit>
      </SuccessFieldWrapper>
      {value === '0' && (
        <ZigTypography variant={'body2'} color={'neutral400'}>
          {t('create.zero-fee')}
        </ZigTypography>
      )}
    </>
  );
};

export default SuccessFeeInputWrapper;
