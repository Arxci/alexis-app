import { useState, useCallback } from "react";

export function useImageLoad(src?: string | null) {
  const hasValidSource = !!src;

  const [isLoading, setIsLoading] = useState(hasValidSource);
  const [hasError, setHasError] = useState(!hasValidSource);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const reset = useCallback(() => {
    if (src) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [src]);

  return {
    isLoading,
    hasError,
    handleLoad,
    handleError,
    reset,
  };
}
