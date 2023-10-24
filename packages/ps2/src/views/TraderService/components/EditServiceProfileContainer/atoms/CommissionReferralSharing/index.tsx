import { Box } from '@mui/material';
import { ZigButton, ZigSwitch, ZigTypography } from '@zignaly-open/ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SliderBox, StyledZigSlider, ZigTypographyValue } from './styles';
import BoostChip from 'views/TraderService/components/ReferralsInviteModal/atoms/BoostChip';
import { getTraderBoost } from 'views/TraderService/components/ReferralsInviteModal/util';
import { HELP_REFERRAL, ZIGNALY_PROFIT_FEE } from 'util/constants';
import CommissionPromo from 'views/TraderService/components/ServiceProfileContainer/atoms/CommissionPromo';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ChevronRight } from '@mui/icons-material';

const CommissionReferralSharing = ({
  value,
  onChange,
  successFee,
  zglySuccessFee,
}: {
  value: number;
  onChange: (value: number) => void;
  successFee: number;
  zglySuccessFee: number;
}) => {
  const { t } = useTranslation(['service', 'referrals-trader']);
  const [enable, setEnable] = useState(value > 0);
  const min = ZIGNALY_PROFIT_FEE;
  const max = successFee - zglySuccessFee;
  const currentBoost = getTraderBoost(
    value || ZIGNALY_PROFIT_FEE,
    zglySuccessFee,
  );

  return (
    <Box display='flex' flexDirection={'column'}>
      <ZigTypography>{t('edit.commission.title')}</ZigTypography>
      <ZigTypography variant='body2' color='neutral400'>
        {t('edit.commission.description')}&nbsp;
        <ZigButton
          variant={'text'}
          endIcon={
            <ChevronRight
              sx={{
                marginTop: '2px !important',
                marginLeft: '-2px !important',
                color: 'links',
                fill: 'currentColor !important',
              }}
            />
          }
          href={HELP_REFERRAL}
          target='_blank'
          rel='noopener'
        >
          {t('edit.commission.how-it-works')}
        </ZigButton>
      </ZigTypography>
      <Box display={'flex'} gap='25px' mt='20px'>
        <ZigSwitch
          checked={enable}
          onChange={(e) => {
            setEnable(e.target.checked);
          }}
        />
        {enable && (
          <Box display={'flex'}>
            <SliderBox>
              <ZigTypography
                variant='h4'
                textAlign={'center'}
                component={'div'}
              >
                {t('edit.commission.max-success-fee')}
              </ZigTypography>
              <Box display={'flex'}>
                <BoostChip
                  boost={getTraderBoost(min, zglySuccessFee)}
                  showBolt
                />
                <StyledZigSlider
                  min={min}
                  max={max}
                  value={value || ZIGNALY_PROFIT_FEE}
                  prefixId={'service-edit__commission-slider'}
                  onChange={(_, v: number) => {
                    onChange(v);
                  }}
                  marks={false}
                  valueLabelFormat={(v) => (
                    <Box display='flex' alignItems={'center'} gap='2px'>
                      <ZigTypographyValue>{v}</ZigTypographyValue>
                      <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                      >
                        <BoltIcon width={3} height={8} />
                        <ZigTypography fontSize={10} lineHeight={'14px'}>
                          {currentBoost}
                          {'x'}
                        </ZigTypography>
                      </Box>
                    </Box>
                  )}
                  labelFormat={(v) => v.toString()}
                />
                <BoostChip
                  boost={getTraderBoost(max, zglySuccessFee)}
                  showBolt
                />
              </Box>
            </SliderBox>
            <Box display={'flex'} flexDirection={'column'} ml='27px' gap='4px'>
              <ZigTypography
                variant='h4'
                textAlign={'center'}
                component={'div'}
              >
                {t('edit.commission.promo-preview')}
              </ZigTypography>
              <CommissionPromo
                traderBoost={currentBoost}
                maxCommission={Math.round(50 * (1 + currentBoost))}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommissionReferralSharing;
