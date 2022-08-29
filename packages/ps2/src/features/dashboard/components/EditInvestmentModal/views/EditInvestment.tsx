import React from 'react';
import EditInvestmentForm from '../forms/EditInvestmentForm';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import InvestorDetails from './InvestorDetails';
import PendingTransactions from './PendingTransactions';
import {
  useCurrentBalance,
  // useSelectedInvestment,
  useStoredInvestmentDetails,
} from '../../../use';

const EditInvestment: React.FC<{ setView: ChangeViewFn }> = ({ setView }) => {
  const { data: details } = useStoredInvestmentDetails();
  const coin = useCurrentBalance();
  return (
    <>
      <InvestorDetails />
      <PendingTransactions setView={setView} />

      <EditInvestmentForm
        coin={coin}
        transferOutAll={details.transferOutAll}
        profitPercentage={details.profitPercentage}
        onClickWithdrawInvestment={() =>
          setView(EditInvestmentViews.WithdrawInvestment)
        }
        // onSubmit={({ amountTransfer, profitPercent }) => {
        //   dispatch(
        //     editInvestment({
        //       service: {
        //         serviceId: service.serviceId,
        //         serviceName: service.serviceName,
        //         currency: coin.id,
        //       },
        //       amountTransfer: amountTransfer,
        //       profitPercent: 100 - profitPercent,
        //     }),
        //   );
        // }}
        amountInvested={details.invested}
      />
    </>
  );
};

export default EditInvestment;
