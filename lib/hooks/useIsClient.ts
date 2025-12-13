"use client";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Value on Client
    () => false // Value on Server
  );
}
