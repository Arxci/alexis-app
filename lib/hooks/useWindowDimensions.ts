// lib/hooks/useWindowDimensions.ts
import { useState, useLayoutEffect, useEffect, useRef } from "react";

function getWindowDimensions() {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface WindowSize {
  width: number;
  height: number;
}

export type WindowSizeCallback = (size: WindowSize) => void;

export default function useWindowDimensions(
  callback?: WindowSizeCallback,
  debounceDelay = 200
): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowDimensions);
  const callbackRef = useRef(callback);
  const debounceDelayRef = useRef(debounceDelay);

  // Keep refs in sync without causing effect re-runs
  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
    debounceDelayRef.current = debounceDelay;
  });

  useIsomorphicLayoutEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      const newSize = getWindowDimensions();
      setWindowSize(newSize);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        callbackRef.current?.(newSize);
      }, debounceDelayRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []); // Empty deps - refs handle the values

  return windowSize;
}
