"use client";

import { useAccount } from "wagmi";
import CursorGlow from "../components/cursor-glow";
import NFTGallery from "../components/nft-gallery";
import { Background } from "../components/background";
import { Minter } from "../components/minter";

export default function Home() {
  const { address } = useAccount();
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)] relative">
      <CursorGlow />
      <Background />
      <main
        className={`w-full ${
          !address
            ? "flex flex-col items-center max-w-2xl"
            : "grid grid-cols-1 md:grid-cols-[minmax(400px,600px)_2px_1fr] gap-4 md:gap-8 items-center"
        }`}
      >
        {/* Minter */}
        <div className="w-full min-w-[350px]">
          <Minter />
        </div>

        {/* Divider - only shown when NFTGallery is present */}
        {address && (
          <div className="hidden md:block h-full w-full bg-gray-200/10" />
        )}

        {/* NFT Gallery */}
        {address && (
          <div className="w-full overflow-auto">
            <NFTGallery />
          </div>
        )}
      </main>
    </div>
  );
}
