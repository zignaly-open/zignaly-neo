import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from 'views/TraderService/components/styles';
import { Navigate, useParams } from 'react-router-dom';
import {
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/ps2/service/use';
import EditServiceProfileContainer from './components/EditServiceProfileContainer';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { BackendError, ErrorCodes } from 'util/errors';
import { Service } from 'apis/ps2/service/types';
import { ROUTE_404 } from 'routes';
import CriticalError from 'components/Stub/CriticalError';

const EditService: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.edit', serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);

  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer isOwner={true}>
        <LayoutContentWrapper
          endpoint={serviceDetailsEndpoint}
          unmountOnRefetch
          error={(error: BackendError) => {
            if (error?.data?.error.code === ErrorCodes.NoSuchService)
              return <Navigate to={ROUTE_404} />;

            return <CriticalError />;
          }}
          content={(service: Service) => (
            <EditServiceProfileContainer service={service} />
          )}
        />
      </TraderServicePageContainer>
    </>
  );
};

export default EditService;
