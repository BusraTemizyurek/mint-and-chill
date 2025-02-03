"use client";

import { type ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "wagmi/chains";

export function Providers(props: { children: ReactNode }) {
  const ONCHAINKIT_API_KEY = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;

  return (
    // <WagmiProvider config={config}>
    // <QueryClientProvider client={queryClient}>
    <OnchainKitProvider
      apiKey={ONCHAINKIT_API_KEY}
      chain={baseSepolia}
      config={{
        appearance: {
          name: "MintAndChill",
          logo: "/logo.svg",
          mode: "dark",
          theme: "default",
        },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}
