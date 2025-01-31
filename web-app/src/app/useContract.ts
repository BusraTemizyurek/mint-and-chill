import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import { output } from "../../MintAndChillNFT_metadata.json";
import { useEffect, useState } from "react";

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
          "0xE9593514f926bd05edc35E4dCA0eD844849dB7e1",
          // "0xC1Cb5735170ef11A858F1A35b808cF7A2778B2f6",
          output.abi,
          signer
        )
      );
    });
  }, [address, chain, walletClient]);

  return contract;
};
