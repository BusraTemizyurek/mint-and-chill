import { useContract } from "@/app/use-contract";
import { NFTMetadata } from "@/types/nft-metadata";
import { NFTData } from "@coinbase/onchainkit/nft";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useNFTData(
  contractAddress: `0x${string}`,
  tokenId?: string
): NFTData {
  const [tokenDetails, setTokenDetails] = useState<NFTData>();
  const contract = useContract();
  const { address } = useAccount();
  const owner = address ?? "0x";

  useEffect(() => {
    contract?.tokenURI(tokenId).then((tokenUri) => {
      fetch(tokenUri)
        .then((res) => res.json())
        .then((metadata: NFTMetadata) => {
          setTokenDetails({
            name: metadata.name,
            description: metadata.description,
            imageUrl: metadata.image.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            ),
            contractType: "ERC721",
            ownerAddress: owner,
          });
        });
    });
  }, [contract, tokenId, owner]);

  return tokenDetails ?? {};
}
