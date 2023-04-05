/* eslint-disable i18next/no-literal-string */
import React from 'react';
import { TierBarContainer, TotalBoxBox, TotalBoxValue } from './styles';
import { ZigTypography } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { useTranslation } from 'react-i18next';

export const TotalBox: React.FC<{
  label: string | JSX.Element;
  value: string | JSX.Element;
}> = ({ label, value }) => (
  <TotalBoxBox>
    <ZigTypography>{label}</ZigTypography>
    <TotalBoxValue>{value}</TotalBoxValue>
  </TotalBoxBox>
);

export const GetWhatYouDeserveBox: React.FC<{
  label: string | JSX.Element;
  value: string | JSX.Element;
}> = ({ label, value }) => (
  <TotalBoxBox>
    <ZigTypography>{label}</ZigTypography>
    <TotalBoxValue>{value}</TotalBoxValue>
  </TotalBoxBox>
);

export const TierBoost = ({
  label,
  value,
  traderRebateFee,
}: {
  label: string;
  value: number;
  traderRebateFee: number;
}) => {
  const { t } = useTranslation('referrals');

  return (
    <Box display='flex' flexDirection='column' minWidth='144px'>
      <ZigTypography color='neutral300' variant='body2'>
        {label}
      </ZigTypography>
      <Box display='flex' gap={1} alignItems='center' mt='5px'>
        {value ? (
          <>
            <BoltIcon width={9.5} height={18} />
            <ZigTypography
              color='greenGraph'
              variant='body2'
              fontWeight={500}
              whiteSpace='nowrap'
            >
              {value}x {t('boost')}
            </ZigTypography>
            <ZigTypography variant='body2' fontWeight={500}>
              ({Number(traderRebateFee * value).toFixed(2)}%)
            </ZigTypography>
          </>
        ) : (
          <ZigTypography
            variant='body2'
            fontWeight={500}
            sx={{ margin: '0 auto' }}
          >
            -
          </ZigTypography>
        )}
      </Box>
    </Box>
  );
};

export const TierArrow = ({ boost }: { boost: number }) => (
  <TierBarContainer>
    <ZigTypography color='greenGraph'>{boost}x</ZigTypography>
    <BoltIcon width={8} />
  </TierBarContainer>
);
