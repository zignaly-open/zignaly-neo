import { Box } from '@mui/material';
import {
  ZigAlertMessage,
  ZigButton,
  ZigSwitch,
  ZigTypography,
} from '@zignaly-open/ui';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SliderBox, StyledZigSlider, ZigTypographyValue } from './styles';
import BoostChip from 'views/TraderService/components/ReferralsInviteModal/atoms/BoostChip';
import { getTraderBoost } from 'views/TraderService/components/ReferralsInviteModal/util';
import { HELP_REFERRAL } from 'util/constants';
import CommissionPromo from 'views/TraderService/components/ServiceProfileContainer/atoms/CommissionPromo';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ChevronRight } from '@mui/icons-material';
import { whitelabel } from '../../../../../../whitelabel';

const CommissionReferralSharing = ({
  value,
  onChange,
  successFee,
  zglySuccessFee,
  prefixId,
}: {
  value: number;
  onChange: (value: number) => void;
  successFee: number;
  zglySuccessFee: number;
  prefixId?: string;
}) => {
  const { t } = useTranslation(['service', 'referrals-trader']);
  const [enable, setEnable] = useState(value > 0);
  const min = zglySuccessFee;
  const max = successFee - zglySuccessFee;
  const currentBoost =
    1 +
    getTraderBoost(
      value || whitelabel.defaultSuccessFee,
      whitelabel.defaultSuccessFee,
    );

  useEffect(() => {
    if (!successFee || !enable) {
      onChange(0);
    } else if (max === min || (enable && !value)) {
      onChange(zglySuccessFee);
    }
  }, [value, successFee, zglySuccessFee, enable]);

  return (
    <Box display='flex' flexDirection={'column'}>
      <ZigTypography id={prefixId && `${prefixId}-title`}>
        {t('edit.commission.title')}
      </ZigTypography>
      <ZigTypography
        variant='body2'
        color='neutral400'
        id={prefixId && `${prefixId}-description`}
      >
        {t('edit.commission.description')}&nbsp;
        <ZigButton
          variant={'text'}
          id={prefixId && `${prefixId}-how-it-works`}
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
        {!successFee ? (
          <ZigAlertMessage
            id={prefixId && `${prefixId}-alert-success-fee`}
            text={t('edit.commission.increase-success-fee')}
            warning
          />
        ) : (
          <>
            <ZigSwitch
              id={prefixId && `${prefixId}-switch`}
              checked={enable}
              onChange={(e) => {
                setEnable(e.target.checked);
              }}
            />
            {enable && (
              <Box display={'flex'}>
                {max > min && (
                  <SliderBox>
                    <ZigTypography
                      textAlign={'center'}
                      component={'div'}
                      variant='body2'
                      color={'neutral200'}
                      id={prefixId && `${prefixId}-max-success-fee-label`}
                    >
                      {t('edit.commission.max-success-fee')}
                    </ZigTypography>
                    <Box display={'flex'}>
                      <BoostChip
                        boost={
                          1 + getTraderBoost(min, whitelabel.defaultSuccessFee)
                        }
                        showBolt
                      />
                      <StyledZigSlider
                        min={min}
                        max={max}
                        value={value || zglySuccessFee}
                        prefixId={'service-edit__commission-slider'}
                        onChange={(e, v) => onChange(v as number)}
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
                        valueLabelDisplay='on'
                      />
                      <BoostChip
                        boost={
                          1 + getTraderBoost(max, whitelabel.defaultSuccessFee)
                        }
                        showBolt
                      />
                    </Box>
                  </SliderBox>
                )}
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  ml='27px'
                  gap='4px'
                >
                  <ZigTypography
                    variant='body2'
                    textAlign={'center'}
                    component={'div'}
                    color={'neutral200'}
                    id={prefixId && `${prefixId}-promo-preview-label`}
                  >
                    {t('edit.commission.promo-preview')}
                  </ZigTypography>
                  <CommissionPromo
                    id={prefixId && `${prefixId}-promo-preview`}
                    traderBoost={currentBoost}
                    maxCommission={Math.round(100 * currentBoost)}
                  />
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default CommissionReferralSharing;
