import useCurrentUser from 'hooks/useCurrentUser';
import { track } from '@zignaly-open/tracker';

export const useTz = () => {
  const { user } = useCurrentUser();
  return (ctaId?: string) => {
    track({
      userId: user.publicAddress,
      ctaId,
    });
  };
};
