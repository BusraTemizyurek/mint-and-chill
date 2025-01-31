"use client";

import React, { useEffect, useState } from "react";
import { NFTCard, NFTCardDefault } from "@coinbase/onchainkit/nft";
import {
  NFTLastSoldPrice,
  NFTMedia,
  NFTNetwork,
  NFTOwner,
  NFTTitle,
} from "@coinbase/onchainkit/nft/view";
import { useContract } from "@/app/use-contract";
import { useAccount } from "wagmi";

export default function NFTGallery() {
  const { address, chain } = useAccount();
  const contract = useContract();
  const [nftTokenIds, setNftTokenIds] = useState<string[]>([]);

  useEffect(() => {
    if (contract) {
      contract.tokensOfOwner(address).then((tokenIds) => {
        setNftTokenIds(tokenIds.map((id: bigint) => id.toString()));
      });
    }
  }, [contract, address]);

  console.log(nftTokenIds);

  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full mx-0">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          🎨
        </h2>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400 mb-4 flex items-center">
          <span className="ml-2">NFT Gallery</span>
        </h2>
      </div>
      {nftTokenIds.length === 0 ? (
        "No NFT"
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {nftTokenIds.map((tokenId) => (
            <NFTCard
              key={tokenId}
              contractAddress="0xE9593514f926bd05edc35E4dCA0eD844849dB7e1"
              tokenId={tokenId}
            >
              <NFTMedia />
              <NFTTitle />
              <NFTOwner />
              <NFTLastSoldPrice />
              <NFTNetwork />
              {/* You can customize the components rendered inside the NFTCard here */}
            </NFTCard>
          ))}
          <NFTCard
            contractAddress="0xE9593514f926bd05edc35E4dCA0eD844849dB7e1"
            tokenId="1"
          >
            <NFTMedia />
            <NFTTitle />
          </NFTCard>
          <NFTCard
            contractAddress="0xE9593514f926bd05edc35E4dCA0eD844849dB7e1"
            tokenId="1"
          >
            <NFTMedia />
            <NFTTitle />
          </NFTCard>
          <NFTCard
            contractAddress="0xE9593514f926bd05edc35E4dCA0eD844849dB7e1"
            tokenId="1"
          >
            <NFTMedia />
            <NFTTitle />
          </NFTCard>
          <NFTCard
            contractAddress="0xE9593514f926bd05edc35E4dCA0eD844849dB7e1"
            tokenId="1"
          >
            <NFTMedia />
            <NFTTitle />
          </NFTCard>
          <NFTCard
            contractAddress="0xE9593514f926bd05edc35E4dCA0eD844849dB7e1"
            tokenId="1"
          >
            <NFTMedia />
            <NFTTitle />
          </NFTCard>
          <NFTCard
            contractAddress="0xE9593514f926bd05edc35E4dCA0eD844849dB7e1"
            tokenId="1"
          >
            <NFTMedia />
            <NFTTitle />
          </NFTCard>
        </div>
      )}
    </div>
  );
}
