import { useCallback } from 'react';

export const useHandleExternalLink = () => {
  const handleOpenExternalLink = useCallback((link: string) => {
    window.open(link, '_blank');
  }, []);

  return { handleOpenExternalLink };
};
