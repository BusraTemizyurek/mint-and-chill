"use client";

import { useState, type ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "wagmi/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const config = createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: "MintAndChill",
        preference: "all",
        version: "4",
      }),
    ],
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  });
  const ONCHAINKIT_API_KEY = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={ONCHAINKIT_API_KEY}
          chain={baseSepolia}
          config={{
            appearance: {
              name: "MintAndChill",
              logo: "/logo.svg", // Displayed in modal header
              mode: "auto", // 'light' | 'dark' | 'auto'
              theme: "default", // 'default' or custom theme
            },
            wallet: {
              display: "modal",
              termsUrl: "https://...",
              privacyUrl: "https://...",
            },
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
