import React from 'react';
import { Avatar } from '@zignaly-open/ui';
import { Investor, InvestorData, InvestorName } from '../styles';
import { getServiceLogo } from 'util/images';
import { useSelectedInvestment } from '../../../use';

const InvestorDetails: React.FC = () => {
  const service = useSelectedInvestment();
  return (
    <Investor>
      <Avatar size={'xx-large'} image={getServiceLogo(service.serviceLogo)} />
      <InvestorData>
        <InvestorName variant={'h2'} color={'neutral100'}>
          {service.serviceName}
        </InvestorName>

        {/*TODO: figure out why the hell do we have fields that are missing from the model here  */}
        {/*{service.successFee && (*/}
        {/*  <InvestorSuccessFee variant={'h3'} color={'neutral400'}>*/}
        {/*    {service.successFee}*/}
        {/*    {t('edit-investment.investorDetail-successFee')}*/}
        {/*  </InvestorSuccessFee>*/}
        {/*)}*/}
      </InvestorData>
    </Investor>
  );
};

export default InvestorDetails;
