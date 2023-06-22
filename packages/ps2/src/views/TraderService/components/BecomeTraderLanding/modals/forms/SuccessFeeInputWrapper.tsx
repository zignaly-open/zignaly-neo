import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigAlertMessage, ZigTypography } from '@zignaly-open/ui';
import { SuccessFieldWrapper, SuccessFieldReceive } from '../atoms';
import { Box } from '@mui/material';
import { getServiceOwnerFee } from '../../../../../../util/fee';
import { ZIGNALY_PROFIT_FEE } from '../../../../../../util/constants';

const SuccessFeeInputWrapper: React.FC<{
  children: JSX.Element;
  title?: string;
  description?: string;
  newValueLabel?: string;
  showZeroFeeExplainer?: boolean;
  precision?: number;
  newValue?: number | string;
  value: number | string;
}> = ({
  title,
  newValue,
  showZeroFeeExplainer,
  description,
  children,
  newValueLabel,
  value,
}) => {
  const { t } = useTranslation('service');
  const feeWeCharge = getServiceOwnerFee(+value);

  return (
    <>
      <SuccessFieldWrapper>
        <ZigTypography>{title || t('summary.success-fee')}</ZigTypography>
        <ZigTypography variant='body2' color='neutral400'>
          {description ||
            t('edit.success-fee-desc', { zignalyFee: ZIGNALY_PROFIT_FEE })}
        </ZigTypography>

        <Box display='flex' mt={1.25}>
          {children}
          <SuccessFieldReceive>
            <ZigTypography
              variant='caption'
              color='neutral400'
              textAlign='center'
              sx={{
                position: 'absolute',
                top: '7px',
                left: '4px',
                width: '100%',
              }}
            >
              {newValueLabel || t('you-receive')}
            </ZigTypography>
            <Box display='flex' paddingTop='23px'>
              <ZigTypography color='neutral400' textAlign='center' width='100%'>
                {newValue ?? Math.round(feeWeCharge)}
              </ZigTypography>
              <ZigTypography
                color='neutral400'
                sx={{ position: 'absolute', right: '22px' }}
                // eslint-disable-next-line i18next/no-literal-string
              >
                %
              </ZigTypography>
            </Box>
          </SuccessFieldReceive>
        </Box>
      </SuccessFieldWrapper>
      {!!showZeroFeeExplainer && value === '0' && (
        <ZigAlertMessage text={t('create.zero-fee')} />
      )}
    </>
  );
};

export default SuccessFeeInputWrapper;
