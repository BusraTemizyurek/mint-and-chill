import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import { output } from "../../MintAndChillNFT_metadata.json";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "@/constants";

export const useContract = () => {
  const { address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    if (!chain || !walletClient) {
      return;
    }

    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };

    const provider = new ethers.BrowserProvider(
      walletClient.transport,
      network
    );
    provider.getSigner(address).then((signer) => {
      setContract(
        new ethers.Contract(
          CONTRACT_ADDRESS, // baseSepolia
          output.abi,
          signer
        )
      );
    });
  }, [address, chain, walletClient]);

  return contract;
};
