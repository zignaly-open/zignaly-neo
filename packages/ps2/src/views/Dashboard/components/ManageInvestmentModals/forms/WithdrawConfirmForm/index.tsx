import Typography from 'components/display/Typography';
import InputText from 'components/inputs/InputText';
import ModalContainer from 'components/modals/ModalContainer';
import React from 'react';
import { Column } from 'utils/column';
import { Gap } from 'utils/gap';
import { Row } from 'utils/row';
import { IconContainer } from './styles';
import NumberFormat from 'react-number-format';
import Button from 'components/inputs/Button';
import { AmountContainer } from 'components/modals/styles';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConfirmWithdrawalModalProps } from './types';
import { CoinIcon } from '@zignaly-open/ui';
import { useWithdrawMutation } from 'apis/coin/api';
import { useActiveExchange, useCurrentUser } from 'apis/user/use';

const ZigAmount = ({
  amount,
  marginRight,
  coin,
}: {
  amount: number;
  marginRight: number;
  coin: string;
}) => {
  return (
    <Row gap={5} alignItems='center' justifyContent='center'>
      <IconContainer marginRight={marginRight}>
        <CoinIcon name={coin} coin={coin} />
      </IconContainer>
      <Typography variant='bigNumber' color='neutral100'>
        <NumberFormat
          value={amount}
          thousandSeparator={true}
          displayType={'text'}
        />
      </Typography>
      <Typography variant='h3' color='neutral400'>
        {coin}
      </Typography>
    </Row>
  );
};

const WithdrawConfirmForm = ({
  coin,
  address,
  tag,
  onWithdraw = () => {},
  onBack = () => {},
  network,
  onClickClose = () => {},
  amount,
}: ConfirmWithdrawalModalProps) => {
  const { t } = useTranslation('withdraw-crypto');
  const { internalId } = useActiveExchange();
  const [withdraw, withdrawStatus] = useWithdrawMutation();
  const { ask2FA } = useCurrentUser();

  const handleWithdraw = () => {
    if (ask2FA) {
      // showTwoFAModal(true);
      // setFormData(data);
    } else {
      withdraw({
        asset: coin,
        network: network.network,
        exchangeInternalId: internalId,
        address,
        tag,
        amount,
      });
    }
  };

  return (
    <Grid mt={16}>
      <Column justifyContent='center'>
        <Typography variant='body1' color='neutral200' weight='regular'>
          {t('confirmation.network')}
        </Typography>
        <Gap gap={5} />
        <Row alignItems='center'>
          <CoinIcon name={coin} coin={coin} />
          <Gap gap={11} />
          <Typography variant='h2' color='neutral100' weight='medium'>
            {network.name}
          </Typography>
        </Row>
      </Column>
      <Gap gap={12} />
      <InputText
        label='Withdraw to Address'
        readOnly={true}
        value={address}
        name={'Eth'}
      />
      <Gap gap={16} />
      <Row justifyContent='center' gap={16} alignItems='center'>
        <AmountContainer borderRadius={5} width='446' height={'96'}>
          <Column justifyContent='center'>
            <Typography weight='regular' variant='h3' color='neutral200'>
              Withdrawal Amount
            </Typography>
            <Gap gap={2} />
            <ZigAmount amount={withdrawalAmount} marginRight={4} coin={coin} />
          </Column>
        </AmountContainer>
        <AmountContainer borderRadius={5} width='210' height={'96'}>
          <Column justifyContent='center'>
            <Typography variant='body2' weight='medium' color='neutral200'>
              Network Fee
            </Typography>
            <Gap gap={2} />
            <ZigAmount amount={netWorkFee} marginRight={4} coin={coin} />
          </Column>
        </AmountContainer>
      </Row>
      <Gap gap={8} />
      <AmountContainer
        borderRadius={5}
        coloredBorder={true}
        width='672'
        height='120'
      >
        <Row gap={16} alignItems='center'>
          <Typography color='neutral300' variant='h2' weight='medium'>
            You’ll Receive:
          </Typography>
          <ZigAmount
            amount={withdrawalAmount - netWorkFee}
            marginRight={6}
            coin={coin}
          />
        </Row>
      </AmountContainer>
      <Gap gap={28} />
      <Row gap={14} justifyContent='end' alignItems='center'>
        <Button
          onClick={() => onBack()}
          variant='secondary'
          size='xlarge'
          caption='Back'
        />
        <Button
          onClick={handleWithdraw}
          variant='primary'
          size='xlarge'
          caption='Withdraw now!'
          loading={withdrawStatus.isLoading}
        />
      </Row>
    </Grid>
  );
};

export default WithdrawConfirmForm;
