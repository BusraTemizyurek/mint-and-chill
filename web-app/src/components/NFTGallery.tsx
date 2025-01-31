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
import { useContract } from "@/app/useContract";
import { useAccount } from "wagmi";

const exampleNFTs = [
  {
    id: 1,
    name: "NFT 1",
    contractAddress: "0xC1Cb5735170ef11A858F1A35b808cF7A2778B2f6",
    tokenId: "1",
  },
  {
    id: 2,
    name: "NFT 2",
    contractAddress: "0xC1Cb5735170ef11A858F1A35b808cF7A2778B2f6",
    tokenId: "2",
  },
  {
    id: 3,
    name: "NFT 3",
    contractAddress: "0xC1Cb5735170ef11A858F1A35b808cF7A2778B2f6",
    tokenId: "3",
  },
  {
    id: 4,
    name: "NFT 4",
    contractAddress: "0xC1Cb5735170ef11A858F1A35b808cF7A2778B2f6",
    tokenId: "4",
  },
  // Add more example NFTs as needed
];

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
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full mx-0 mt-8">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          🎨
        </h2>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400 mb-4 flex items-center">
          <span className="ml-2">NFT Gallery</span>
        </h2>
      </div>
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
      </div>
    </div>
  );
}
