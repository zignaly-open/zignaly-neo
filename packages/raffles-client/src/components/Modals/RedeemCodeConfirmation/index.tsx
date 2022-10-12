import React from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@zignaly-open/ui';
import { Trans, useTranslation } from 'react-i18next';
import { REDEEM_CODE } from 'queries/codes';
import { useMutation } from '@apollo/client';
import NumberFormat from 'react-number-format';
import { Table } from './styles';
import { CodeInfo } from '../RedeemCode/types';

const RedeemCodeConfirmation = ({
  code,
  balance,
  deposits,
}: {
  code: CodeInfo;
  balance: number;
  deposits: number;
}) => {
  const { t } = useTranslation(['redeem-code', 'global']);
  const [redeemCode, { error, loading, data }] = useMutation(REDEEM_CODE);

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

  if (data) {
    return (
      <>
        <Box textAlign='center'>
          <Typography variant='body1' color='neutral200'>
            <Trans i18nKey='redeem-success' t={t}>
              <NumberFormat
                value={data.redeemCode}
                displayType={'text'}
                thousandSeparator={true}
                suffix=' ZIG'
                decimalScale={2}
              />
            </Trans>
          </Typography>
        </Box>
        <Box display='flex' mt='24px' justifyContent='center'>
          <Button
            size='large'
            caption={t('ok', { ns: 'global' })}
            minWidth={200}
            onClick={() => redeemCode({ variables: { code: code.code } })}
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box textAlign='center'>
        <Box mb={2}>
          <Typography variant='body1' color='neutral200'>
            {t('code-found')}
          </Typography>
        </Box>
        <Table>
          <tr>
            <td>
              <Typography variant='body1' color='neutral200'>
                {t('bonus')}
              </Typography>
            </td>

            <td>
              <Typography variant='body1' color='neutral100'>
                <NumberFormat
                  value={code.benefitDirect}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix=' ZIG'
                  decimalScale={2}
                />
              </Typography>
            </td>
          </tr>
          {code.benefitBalanceFactor && (
            <tr>
              <td>
                <Typography variant='body1' color='neutral200'>
                  {t('balance-bonus')}
                </Typography>
              </td>
              <td>
                <Typography variant='body1' color='neutral100'>
                  <Trans
                    i18nKey='bonus-perc-value'
                    t={t}
                    values={{
                      perc: code.benefitBalanceFactor * 100,
                    }}
                  >
                    <NumberFormat
                      value={balance}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=' ZIG'
                      decimalScale={2}
                    />
                  </Trans>
                  <NumberFormat
                    value={bonusBalance}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix=' ZIG'
                    decimalScale={2}
                  />
                </Typography>
              </td>
            </tr>
          )}
          {code.benefitBalanceFactor && (
            <tr>
              <td>
                <Typography variant='body1' color='neutral200'>
                  {t('deposit-bonus')}
                </Typography>
              </td>
              <td>
                <Typography variant='body1' color='neutral100'>
                  <Trans
                    i18nKey='bonus-perc-value'
                    t={t}
                    values={{
                      perc: code.benefitDepositFactor * 100,
                    }}
                  >
                    <NumberFormat
                      value={deposits}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=' ZIG'
                      decimalScale={2}
                    />
                  </Trans>
                  <NumberFormat
                    value={bonusDeposits}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix=' ZIG'
                    decimalScale={2}
                  />
                </Typography>
              </td>
            </tr>
          )}
          {(code.benefitBalanceFactor || code.benefitDepositFactor) && (
            <>
              <tr>
                <td>
                  <Typography variant='body1' color='neutral200'>
                    {t('total')}
                  </Typography>
                </td>
                <td>
                  <Typography variant='body1' color='neutral100'>
                    <NumberFormat
                      value={totalBonus}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix=' ZIG'
                      decimalScale={2}
                    />
                  </Typography>
                </td>
              </tr>
              {code.maxTotalBenefits && (
                <tr>
                  <td>
                    <Typography variant='body1' color='neutral200'>
                      {t('max-bonus')}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant='body1' color='neutral100'>
                      <NumberFormat
                        value={code.maxTotalBenefits}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix=' ZIG'
                        decimalScale={2}
                      />
                    </Typography>
                  </td>
                </tr>
              )}
            </>
          )}
        </Table>
      </Box>
      {error && (
        <Box display='flex' justifyContent='center' mt={2}>
          <Typography variant={'body1'} color='redGraphOrError'>
            {error.message}
          </Typography>
        </Box>
      )}
      <Box display='flex' mt='24px' justifyContent='center'>
        <Button
          size='large'
          caption={
            <Trans i18nKey='redeem-code-bonus' t={t}>
              <NumberFormat
                value={bonus}
                displayType={'text'}
                thousandSeparator={true}
                suffix=' ZIG'
                decimalScale={2}
              />
            </Trans>
          }
          loading={loading}
          minWidth={200}
          onClick={() => redeemCode({ variables: { code: code.code } })}
        />
      </Box>
    </>
  );
};

export default RedeemCodeConfirmation;
