import React from 'react';
import { useTranslation } from 'react-i18next';
import { ZigAlertMessage, ZigTypography } from '@zignaly-open/ui';
import { SuccessFieldWrapper, SuccessFieldReceive } from '../atoms';
import { ZIGNALY_PROFIT_FEE } from '../../../../../../util/constants';
import { Box } from '@mui/material';

const SuccessFeeInputWrapper: React.FC<{
  children: JSX.Element;
  value: number | string;
}> = ({ children, value }) => {
  const { t } = useTranslation('service');
  const feeWeCharge = !value
    ? 0
    : Math.max(0, Math.min(75, +value) - ZIGNALY_PROFIT_FEE);

  return (
    <>
      <SuccessFieldWrapper>
        <ZigTypography>{t('summary.success-fee')}</ZigTypography>
        <ZigTypography variant='body2' color='neutral400'>
          {t('edit.success-fee-desc')}
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
              {t('you-receive')}
            </ZigTypography>
            <Box display='flex' paddingTop='23px'>
              <ZigTypography color='neutral400' textAlign='center' width='100%'>
                {Math.round(feeWeCharge)}
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
      {value === '0' && <ZigAlertMessage text={t('create.zero-fee')} />}
    </>
  );
};

export default SuccessFeeInputWrapper;
