import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigTypography } from '@zignaly-open/ui';
import { SuccessFieldWrapper, SuccessFieldWrapperShit } from '../atoms';
import { ZIGNALY_PROFIT_FEE } from '../../../../../../util/constants';

const SuccessFeeInputWrapper: React.FC<{ value: number }> = ({
  children,
  value,
}) => {
  const { t } = useTranslation('service');

  // Service Type Base currency Service name Success fee
  return (
    <SuccessFieldWrapper>
      {children}

      <SuccessFieldWrapperShit>
        <ZigTypography>
          {t('you-get-x', { number: Math.max(0, value - ZIGNALY_PROFIT_FEE) })}
        </ZigTypography>
      </SuccessFieldWrapperShit>
    </SuccessFieldWrapper>
  );
};

export default SuccessFeeInputWrapper;
