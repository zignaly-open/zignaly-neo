import { useParams } from 'react-router-dom';
import { useLazyServiceApiKeysQuery } from './api';
import { BackendErrorResponse } from '../../util/errors';

const API_KEY_NOT_FOUND = 114;
const API_KEY_DELETED_BY_EXCHANGE = 1081;

export const useRefetchIfDesynchronizedState = (): ((
  backendResponse: BackendErrorResponse | undefined,
) => void) => {
  const { serviceId } = useParams();
  const [reloadKeys] = useLazyServiceApiKeysQuery();

  return (backendResponse) => {
    if (
      [API_KEY_DELETED_BY_EXCHANGE, API_KEY_NOT_FOUND].includes(
        backendResponse?.error?.data?.error?.code,
      )
    ) {
      reloadKeys({ serviceId });
    }
  };
};
