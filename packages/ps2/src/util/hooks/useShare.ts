import { useCallback, useEffect, useState } from 'react';

// Types for the useShare hook parameters
interface UseShareParams {
  onShare?: (content: ShareParams) => void;
  onSuccess?: (content: ShareParams) => void;
  onError?: (error: any) => void;
  fallback?: () => void;
  successTimeout?: number;
}

// Types for the share function parameters
interface ShareParams {
  title?: string;
  text?: string;
  url?: string;
}

const useShare = ({
  onShare,
  onSuccess,
  onError,
  fallback,
  successTimeout = 3000,
}: UseShareParams) => {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

  // Check for Web Share API support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'navigator' in window) {
      setIsSupported('share' in navigator);
      setIsReady(true);
    }
  }, []);

  // Function to handle the reset of isShared state
  const resetIsShared = (timeout: number) => {
    const timer = setTimeout(() => setIsShared(false), timeout);
    return () => clearTimeout(timer);
  };

  // Function to handle sharing or fallback
  const share = useCallback(
    async (content: ShareParams) => {
      if (isSupported) {
        // Execute onShare callback if provided
        onShare?.(content);

        try {
          // Attempt to use the Web Share API
          await navigator.share(content);
          setIsShared(true);

          // Execute onSuccess callback if provided
          onSuccess?.(content);

          // Reset isShared after the user-defined or default period of time
          return resetIsShared(successTimeout);
        } catch (error) {
          // Execute onError callback if provided
          onError?.(error);
        }
      } else {
        // Execute fallback function if provided
        fallback?.();
        setIsShared(true);

        // Reset isShared after the user-defined or default period of time
        return resetIsShared(successTimeout);
      }
    },
    [fallback, isSupported, onError, onShare, onSuccess, successTimeout],
  );

  return { share, isSupported, isReady, isShared };
};

export default useShare;
