"use client";

import React, { useEffect, useState } from "react";
import { NFTCardDefault } from "@coinbase/onchainkit/nft";
import { useContract } from "@/app/use-contract";
import { useAccount } from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants";
import { useNFTData } from "@/hooks/use-nft-data";

type NFTGalleryProps = {
  transactions: string[];
};

export default function NFTGallery({ transactions }: NFTGalleryProps) {
  const [nftTokenIds, setNftTokenIds] = useState<string[]>([]);
  const { address } = useAccount();
  const contract = useContract();

  useEffect(() => {
    contract?.tokensOfOwner(address).then((tokenIds) => {
      setNftTokenIds(tokenIds.map((id: bigint) => id.toString()));
    });
  }, [contract, address, transactions]);

  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full mx-0">
      <div className="flex justify-center items-center mb-3">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          🎨
        </h2>
        <h2 className="text-3xl ml-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-400 mb-4 flex items-center">
          NFT Gallery
        </h2>
      </div>
      {nftTokenIds.length === 0 ? (
        <div className="text-xl font-semibold text-gray-600 text-center mt-4">
          No NFTs available
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 w-full">
          {nftTokenIds.map((tokenId, index) => (
            <NFTCardDefault
              key={index}
              tokenId={tokenId}
              contractAddress={CONTRACT_ADDRESS}
              useNFTData={useNFTData}
            />
          ))}
        </div>
      )}
    </div>
  );
}
