"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { persister, queryClient } from "../queryClient";

export default function QueryClientProviderApp({ children }: any) {

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
