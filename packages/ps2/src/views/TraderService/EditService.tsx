import React from 'react';
import ServiceHeader from './components/ServiceHeader';
import { TraderServicePageContainer } from 'views/TraderService/components/styles';
import { useParams } from 'react-router-dom';
import {
  useIsServiceOwner,
  useServiceDetails,
  useTraderServiceTitle,
} from '../../apis/service/use';
import EditServiceProfileContainer from './components/EditServiceProfileContainer';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import { useIsAuthenticated } from 'apis/user/use';
import { BackendError } from 'util/errors';
import { Service } from 'apis/service/types';

const EditService: React.FC = () => {
  const { serviceId } = useParams();
  useTraderServiceTitle('profit-sharing.edit', serviceId);
  const serviceDetailsEndpoint = useServiceDetails(serviceId);
  const isAuthenticated = useIsAuthenticated();
  const isOwner = useIsServiceOwner(serviceId);

  return (
    <>
      <ServiceHeader />
      <TraderServicePageContainer isOwner={isOwner}>
        <LayoutContentWrapper
          endpoint={serviceDetailsEndpoint}
          unmountOnRefetch
          // error={(error: BackendError) => {
          //   if (error?.data?.error.code === ErrorCodes.SoloService)
          //     return <Navigate to={ROUTE_PROFIT_SHARING} />;
          //   if (error?.data?.error.code === ErrorCodes.NoSuchService)
          //     return <Navigate to={ROUTE_404} />;
          //   if (
          //     !isAuthenticated &&
          //     error?.data?.error.code === ErrorCodes.PrivateService
          //   ) {
          //     return (
          //       <Navigate
          //         to={ROUTE_LOGIN}
          //         state={{
          //           redirectTo: location,
          //         }}
          //       />
          //     );
          //   }

          //   return <CriticalError />;
          // }}
          content={(service: Service) => {
            // if (!isAuthenticated) {
            //   if (
            //     [
            //       TraderServiceAccessLevel.Solo,
            //       TraderServiceAccessLevel.Private,
            //     ].includes(service?.level)
            //   ) {
            //     return (
            //       <Navigate
            //         to={ROUTE_LOGIN}
            //         state={{
            //           redirectTo: location,
            //         }}
            //       />
            //     );
            //   }
            // }

            return <EditServiceProfileContainer service={service} />;
          }}
        />
      </TraderServicePageContainer>
    </>
  );
};

export default EditService;
