// In Next.js, this file would be called: app/providers.tsx
'use client';

import LocalStorageContextProvider from '@/context/LocalStorageContext';
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import type React from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider>
      <LocalStorageContextProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </LocalStorageContextProvider>
    </ThemeProvider>
  );
}
