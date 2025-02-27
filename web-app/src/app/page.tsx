"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import CursorGlow from "../components/cursor-glow";
import NFTGallery from "../components/nft-gallery";
import { Background } from "../components/background";
import { Minter } from "../components/minter";
import { ErrorMessage } from "@/components/error-message";
import { Header } from "@/components/header";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

export default function Home() {
  const { address, chain, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<string[]>([]);

  const addTransaction = (transactionHash: string) => {
    setTransactions((prev) => [...prev, transactionHash]);
  };

  return (
    <div
      className={`grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)] ${
        !address && "h-screen"
      }`}
    >
      <CursorGlow />
      <Background />
      <main
        className={`flex flex-col gap-8 items-center w-full ${
          address ? "max-w-full px-4" : "max-w-2xl"
        }`}
      >
        <div className={address ? "" : "flex-1 flex items-center"}>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl shadow-xl w-full">
            <Header />
            <WalletDefault />
            {isConnected && chain && <Minter onMintSuccess={addTransaction} />}
            {isConnected && !chain && (
              <ErrorMessage
                title="Unsupported network"
                message={`This network is not supported. Please switch to Base Sepolia in your wallet.`}
              />
            )}
          </div>
        </div>
        {/* NFT Gallery */}
        {isConnected && chain && address && (
          <>
            <NFTGallery transactions={transactions} />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all"
              aria-label="Scroll to top"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </>
        )}
      </main>
    </div>
  );
}
