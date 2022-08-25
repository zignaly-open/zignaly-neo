import React /*, { useCallback, useState }*/ from 'react';
// import { useDispatch } from 'react-redux';

// import { useTranslation } from 'react-i18next';
// import useBalance from '@zignaly-open/raffles-client/src/hooks/useBalance';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { WithdrawYourInvestmentValidation } from '../validations';
// import {Grid, SliderInput} from '@mui/material';
// import { WithdrawActions } from '../styles';
// import { Button, InputAmount } from '@zignaly-open/ui';
// import BigNumber from 'bignumber.js';

const WithdrawPerform: React.FC = () => {
  // const dispatch = useDispatch();
  //
  // /**
  //  * @function onWithdrawInvestment
  //  * @description Withdraw the investment from Edit Investment Modal.
  //  */
  // const onWithdrawInvestment = useCallback(
  //   ({ amountTransfer }) => {
  //     dispatch(
  //       withdrawInvestment(service.serviceId, {
  //         amountTransfer,
  //       }),
  //     );
  //   },
  //   [service.serviceId],
  // );
  //
  // const coin = useBalance();
  // const { t } = useTranslation('withdraw');
  // const [withdrawPercent, setWithdrawPercent] = useState(0);
  //
  // // Form
  // const {
  //   handleSubmit,
  //   control,
  //   watch,
  //   trigger,
  //   setValue,
  //   setError,
  //   clearErrors,
  //   formState: { errors, isDirty, isValid },
  // } = useForm({
  //   mode: 'onChange',
  //   reValidateMode: 'onChange',
  //   defaultValues: {
  //     amountTransfer: '',
  //   },
  //   resolver: yupResolver(WithdrawYourInvestmentValidation),
  // });
  //
  // // @ts-ignore
  // const watchAmountTransfer = watch('amountTransfer', false);
  //
  // // useEffect(() => {
  // //   if (watchAmountTransfer) {
  // //     const tokenBalance = new BigNumber(coin.balance);
  // //     const amount = new BigNumber(watchAmountTransfer);
  // //     const operation = amount
  // //       .multipliedBy(new BigNumber(100))
  // //       .div(tokenBalance)
  // //       .dp(2);
  // //     const percentage = operation.isNaN() ? 100 : operation.toFixed();
  // //     setWithdrawPercent(percentage > 100 ? 100 : parseFloat(percentage));
  // //   } else {
  // //     setWithdrawPercent(0);
  // //   }
  // // }, [watchAmountTransfer]);
  //
  // const canSubmit = isValid && !Object.keys(errors).length >= 1;
  //
  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <Grid container xs={12} sm={6}>
  //       <Column>
  //         <InputAmount
  //           fullWidth={true}
  //           label={t('withdraw.form.label')}
  //           labelBalance={t('withdraw.form.labelBalance')}
  //           name={'amountTransfer'}
  //           control={control}
  //           showUnit={true}
  //           placeholder={'0.0'}
  //           onInsufficientFundsError={(error) => {
  //             if (!error) {
  //               clearErrors();
  //             } else {
  //               clearErrors();
  //               setError('isAmountTransferGranterThanBalance', {
  //                 type: 'custom',
  //                 message: 'input-amount.validation-insufficientFunds',
  //               });
  //             }
  //           }}
  //           tokens={[
  //             {
  //               id: coin.id,
  //               balance: coin.balance,
  //             },
  //           ]}
  //           error={isDirty && errors?.amountTransfer?.message}
  //         />
  //       </Column>
  //       <Column>
  //         <SliderInput
  //           value={withdrawPercent}
  //           mode={'normal'}
  //           initialValue={0}
  //           onChange={(value: string) => {
  //             const tokenBalance = new BigNumber(coin.balance);
  //
  //             if (tokenBalance.gt(0)) {
  //               const operation = tokenBalance
  //                 .div(BigNumber(100))
  //                 .multipliedBy(new BigNumber(value));
  //
  //               setValue('amountTransfer', (value ? operation : '').toString());
  //               setWithdrawPercent(parseInt(value));
  //               trigger();
  //             }
  //           }}
  //         />
  //       </Column>
  //     </Grid>
  //     <WithdrawActions>
  //       <Button
  //         size={'xlarge'}
  //         disabled={!canSubmit}
  //         caption={t('withdraw.button')}
  //         loading={isLoading}
  //       />
  //     </WithdrawActions>
  //   </form>
  // );
  return <>123</>;
};

export default WithdrawPerform;
