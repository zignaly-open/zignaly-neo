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

const EditService: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.edit', serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);

  return (
    <PageContainer>
      <LayoutContentWrapper
        endpoint={serviceDetailsEndpoint}
        unmountOnRefetch
        error={(error: BackendError) => {
          if (error?.data?.error.code === ErrorCodes.NoSuchService)
            return <Navigate to={ROUTE_404} />;

          return <CriticalError />;
        }}
        content={(service: Service) => (
          <PageWithHeaderContainer>
            <EditServiceProfileContainer service={service} />
          </PageWithHeaderContainer>
        )}
      />
    </PageContainer>
  );
};

export default EditService;
