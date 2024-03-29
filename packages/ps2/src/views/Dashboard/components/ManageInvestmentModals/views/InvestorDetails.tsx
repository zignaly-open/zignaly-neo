import React from 'react';
import { useServiceDetails } from '../../../../../apis/service/use';
import {
  useSelectedInvestment,
  useSingleInvestment,
} from '../../../../../apis/investment/use';
import InvestorDetailsForService from './InvestorDetailsForService';

const InvestorDetails: React.FC<{ prefixId?: string }> = ({ prefixId }) => {
  const service = useSelectedInvestment();
  const investmentInfo = useSingleInvestment(service.serviceId);
  const { data } = useServiceDetails(service.serviceId);
  return (
    <InvestorDetailsForService
      prefixId={prefixId}
      discount={investmentInfo?.ownerSfDiscount ?? '0'}
      service={{
        serviceLogo: service.serviceLogo,
        serviceName: service.serviceName,
        successFee: data.successFee,
        zglyFee: data.zglySuccessFee,
      }}
    />
  );
};

export default InvestorDetails;
