import { useCurrentUser } from '../../../apis/user/use';
import { trackClick } from '@zignaly-open/tracker';

export default function useTrackEvent(): (ctaId: string) => void {
  const { userId } = useCurrentUser();
  return (ctaId) =>
    trackClick({
      userId,
      ctaId,
    });
}
