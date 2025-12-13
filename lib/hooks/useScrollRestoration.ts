"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

export const useScrollRestoration = (isLoading: boolean) => {
  const pathname = usePathname();
  // 1. Fix Shared Position: Use a unique key per route
  const storageKey = `scroll-pos-${pathname}`;

  // Ref to track if we have successfully restored (to prevent fighting the user)
  const hasRestored = useRef(false);

  // Reset restored state when path changes
  useEffect(() => {
    hasRestored.current = false;
  }, [pathname]);

  // 2. Save scroll position
  useEffect(() => {
    // Disable browser's automatic restoration (it fights with ours)
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleScroll = () => {
      // Don't save "0" if the page is just loading/mounting
      if (window.scrollY > 0) {
        window.sessionStorage.setItem(storageKey, window.scrollY.toString());
      }
    };

    // Throttle slightly for performance
    const onScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [storageKey]);

  // 3. Fix Hard Refresh: Restore with Height Check
  useLayoutEffect(() => {
    // If loading or already restored, do nothing
    if (isLoading || hasRestored.current) return;

    const savedPosStr = window.sessionStorage.getItem(storageKey);
    if (!savedPosStr) return;

    const savedPos = parseInt(savedPosStr, 10);

    // This function checks if the page is TALL ENOUGH to scroll to the saved spot.
    // If images haven't loaded, document height might be small.
    const attemptScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // We can only scroll to 'savedPos' if the page is at least 'savedPos + WindowHeight' tall.
      if (docHeight >= savedPos + winHeight) {
        window.scrollTo({ top: savedPos, behavior: "instant" });
        hasRestored.current = true;
        return true; // Success
      }
      return false; // Failed (page too short)
    };

    // Attempt 1: Try immediately
    if (attemptScroll()) return;

    // Attempt 2: Watch for page growth (images loading)
    // This catches the exact moment the page becomes tall enough.
    const observer = new ResizeObserver(() => {
      // Once we successfully restore, stop watching
      if (hasRestored.current) {
        observer.disconnect();
        return;
      }
      if (attemptScroll()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body);

    // Cleanup
    return () => observer.disconnect();
  }, [isLoading, storageKey]);
};
