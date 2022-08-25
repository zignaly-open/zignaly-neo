import React from 'react';
import { ChangeViewFn } from '../types';
import InvestorDetails from './InvestorDetails';
import PendingTransactions from './PendingTransactions';
// import { useSelectedInvestment } from '../../../use';

const EditInvestment: React.FC<{ setView: ChangeViewFn }> = ({ setView }) => {
  // const service = useSelectedInvestment();
  return (
    <>
      <InvestorDetails />
      <PendingTransactions setView={setView} />

      {/*<EditInvestmentForm*/}
      {/*  isLoading={isEditInvestorLoading}*/}
      {/*  coin={coin}*/}
      {/*  transferOutAll={details.transferOutAll}*/}
      {/*  profitPercentage={details.profitPercentage}*/}
      {/*  onClickWithdrawInvestment={() =>*/}
      {/*    setCurrentState(EditInvestmentViews.WithdrawInvestment)*/}
      {/*  }*/}
      {/*  onSubmit={({ amountTransfer, profitPercent }) => {*/}
      {/*    dispatch(*/}
      {/*      editInvestment({*/}
      {/*        service: {*/}
      {/*          serviceId: service.serviceId,*/}
      {/*          serviceName: service.serviceName,*/}
      {/*          currency: coin.id,*/}
      {/*        },*/}
      {/*        amountTransfer: amountTransfer,*/}
      {/*        profitPercent: 100 - profitPercent,*/}
      {/*      }),*/}
      {/*    );*/}
      {/*  }}*/}
      {/*  amountInvested={details.invested}*/}
      {/*/>*/}
    </>
  );
};

export default EditInvestment;
