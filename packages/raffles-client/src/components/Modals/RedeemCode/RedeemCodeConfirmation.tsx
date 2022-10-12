import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/system';
import { Button, InputText, PriceLabel, Typography } from '@zignaly-open/ui';
import { useModal } from 'mui-modal-provider';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import DialogContainer from '../DialogContainer';
import TransferZigModal from '../TransferZig';
import { CodeInfo, RedeemCodeProps } from './types';
import * as yup from 'yup';
import { CHECK_CODE } from 'queries/codes';
import { useLazyQuery } from '@apollo/client';
import { NumericFormat } from 'react-number-format';

const RedeemCodeConfirmation = ({
  code,
  balance,
  deposits,
}: {
  code: CodeInfo;
  balance: number;
  deposits: number;
}) => {
  const { t } = useTranslation('redeem-code');
  const { showModal } = useModal();
  const [checkCode, { error, loading }] = useLazyQuery(CHECK_CODE);
  const [codeInfo, setCodeInfo] = useState();
  console.log(codeInfo);

  const bonusBalance = code.benefitBalanceFactor
    ? code.benefitBalanceFactor * balance
    : 0;
  const bonusDeposits = code.benefitDepositFactor
    ? code.benefitDepositFactor * deposits
    : 0;
  const totalBonus = code.benefitDirect + bonusBalance + bonusDeposits;
  let bonus = totalBonus;
  if (code.maxTotalBenefits && bonus > code.maxTotalBenefits) {
    bonus = code.maxTotalBenefits;
  }

  return (
    <>
      <Box textAlign='center'>
        <Box mb={1}>
          <Typography variant='body1' color='neutral200'>
            {t('code-found')}
          </Typography>
        </Box>
        <Typography variant='body1' color='neutral200'>
          <div>
            {t('bonus')}&nbsp;
            <NumericFormat
              value={code.benefitDirect}
              displayType={'text'}
              thousandSeparator={true}
              suffix=' ZIG'
              decimalScale={2}
            />
          </div>
          {code.benefitBalanceFactor && (
            <div>
              {t('balance-bonus')}&nbsp;
              <Trans
                i18nKey='bonus-perc-value'
                t={t}
                values={{
                  perc: code.benefitBalanceFactor * 100,
                }}
              >
                <NumericFormat
                  value={balance}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix=' ZIG'
                  decimalScale={2}
                />
              </Trans>
              &nbsp;
              <NumericFormat
                value={bonusBalance}
                displayType={'text'}
                thousandSeparator={true}
                suffix=' ZIG'
                decimalScale={2}
              />
            </div>
          )}
          {code.benefitDepositFactor && (
            <div>
              {t('deposit-bonus')}&nbsp;
              <Trans
                i18nKey='bonus-perc-value'
                t={t}
                values={{
                  perc: code.benefitDepositFactor * 100,
                }}
              >
                <NumericFormat
                  value={deposits}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix=' ZIG'
                  decimalScale={2}
                />
              </Trans>
              &nbsp;
              <NumericFormat
                value={bonusDeposits}
                displayType={'text'}
                thousandSeparator={true}
                suffix=' ZIG'
                decimalScale={2}
              />
            </div>
          )}
          {(code.benefitBalanceFactor || code.benefitDepositFactor) && (
            <>
              <div>
                {t('total')}&nbsp;
                <NumericFormat
                  value={totalBonus}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix=' ZIG'
                  decimalScale={2}
                />
              </div>
              {code.maxTotalBenefits && (
                <div>
                  {t('max-bonus')}&nbsp;
                  <NumericFormat
                    value={code.maxTotalBenefits}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix=' ZIG'
                    decimalScale={2}
                  />
                </div>
              )}
            </>
          )}
        </Typography>
      </Box>
      <Box display='flex' mt='24px' justifyContent='center'>
        <Button
          size='large'
          caption={
            <Trans i18nKey='redeem-code-bonus' t={t}>
              <NumericFormat
                value={bonus}
                displayType={'text'}
                thousandSeparator={true}
                suffix=' ZIG'
              />
            </Trans>
          }
          loading={loading}
          minWidth={200}
          type='submit'
        />
      </Box>
    </>
  );
};

export default RedeemCodeConfirmation;
