import React from 'react';
import { PageWithHeaderContainer } from 'views/TraderService/components/styles';
import { Navigate, useParams } from 'react-router-dom';
import {
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/service/use';
import EditServiceProfileContainer from './components/EditServiceProfileContainer';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { BackendError, ErrorCodes } from 'util/errors';
import { Service } from 'apis/service/types';
import { ROUTE_404 } from 'routes';
import CriticalError from 'components/Stub/CriticalError';
import { PageContainer } from '@zignaly-open/ui';
import { useServiceCommissionQuery } from 'apis/referrals/api';
import { ServiceCommission } from 'apis/referrals/types';

const EditService: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.edit', serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const serviceCommissionEndpoint = useServiceCommissionQuery({
    serviceId,
  });

  return (
    <PageContainer>
      <LayoutContentWrapper
        endpoint={[serviceDetailsEndpoint, serviceCommissionEndpoint]}
        unmountOnRefetch
        error={(error: BackendError) => {
          if (error?.data?.error.code === ErrorCodes.NoSuchService)
            return <Navigate to={ROUTE_404} />;

          return <CriticalError />;
        }}
        content={([service, commission]: [Service, ServiceCommission]) => (
          <PageWithHeaderContainer>
            <EditServiceProfileContainer
              service={service}
              commission={commission.commission}
            />
          </PageWithHeaderContainer>
        )}
      />
    </PageContainer>
  );
};

export default EditService;
