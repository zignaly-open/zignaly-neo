import { useParams } from 'react-router-dom';
import { useLazyServiceApiKeysQuery } from './api';
import { BackendErrorResponse, ErrorCodes } from '../../../util/errors';

export const useRefetchIfDesynchronizedState = (
  serviceId?: string,
): ((backendResponse: BackendErrorResponse | undefined) => void) => {
  const { serviceId: serviceIdFromParams } = useParams();
  const [reloadKeys] = useLazyServiceApiKeysQuery();

  return (backendResponse) => {
    if (
      [
        ErrorCodes.ServiceApiKeyDeletedByExchange,
        ErrorCodes.ServiceApiKeyNotFound,
      ].includes(backendResponse?.error?.data?.error?.code)
    ) {
      reloadKeys({ serviceId: serviceId || serviceIdFromParams });
    }
  };
};
