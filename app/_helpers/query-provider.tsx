"use client";

import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { useState } from "react";

// 1. Create a safe storage wrapper.
// This allows us to declare the persister at the top level (like the docs)
// without crashing the server, because 'window' is only accessed when used.
const safeSessionStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
    }
  },
};

// 2. Create the persister ONCE, statically.
const persister = createAsyncStoragePersister({
  storage: safeSessionStorage,
});

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
