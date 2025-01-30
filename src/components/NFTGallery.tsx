"use client";

import React from "react";
import { NFTCard } from "@coinbase/onchainkit/nft";
import {
  NFTLastSoldPrice,
  NFTMedia,
  NFTNetwork,
  NFTOwner,
  NFTTitle,
} from "@coinbase/onchainkit/nft/view";

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
  return (
    <div className="grid grid-cols-2 gap-4">
      {exampleNFTs.map((nft) => (
        <NFTCard
          key={nft.id}
          contractAddress={nft.contractAddress}
          tokenId={nft.tokenId}
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
  );
}
