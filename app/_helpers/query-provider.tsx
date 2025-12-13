"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { useState } from "react";
import { useIsClient } from "@/lib/hooks/useIsClient";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isClient = useIsClient();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 5, // 5 mins (Crucial: prevents immediate refetch on restore)
          },
        },
      })
  );

  const [persister] = useState(() => {
    if (typeof window === "undefined") return undefined;

    return createAsyncStoragePersister({
      storage: window.sessionStorage,
    });
  });

  if (!isClient || !persister) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
