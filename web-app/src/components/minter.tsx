import { Header } from "../components/header";
import { useContract } from "../app/use-contract";
import { WalletButton } from "@/components/wallet-button";
import { useAccount, useWalletClient } from "wagmi";
import { useState } from "react";
import axios from "axios";
import { MinterInputs } from "./minter-inputs";
import { MintNFTButton } from "./mint-nft-button";
import { MintSuccessErrorMsg } from "./mint-success-msg";
import { MintErrorMsg } from "./mint-error-msg";
import { NFTMetadata } from "@/types/nft-metadata";

type MinterProps = {
  className?: string;
};

export const Minter = ({ className }: MinterProps) => {
  const { address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const contract = useContract();

  // Add state for file upload
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Add state for file upload
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  // NFT name and description
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // Add new state variables at the top with other state declarations
  const [mintStatus, setMintStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  //upload to pinata
  const uploadToPinata = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const options = {
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
      },
    };

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        options
      );
      return `ipfs://${res.data.IpfsHash}`;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      throw error;
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  //mint NFT
  const mintNFT = async () => {
    if (!file) {
      alert("Please select an image to mint");
      return;
    }
    if (!name) {
      alert("Please enter a name for the NFT");
      return;
    }
    if (!description) {
      alert("Please enter a description for the NFT");
      return;
    }

    if (!chain || !walletClient) {
      console.log("Missing requirements:");
      console.log("Chain:", chain);
      console.log("Wallet Client:", walletClient);
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setMintStatus("idle");
    setTransactionHash(null);

    try {
      // Upload to Pinata
      const imageIpfsUrl = await uploadToPinata(file);
      console.log("Uploaded to IPFS:", imageIpfsUrl);

      //metadata
      const metadata: NFTMetadata = {
        name: name,
        description: description,
        image: imageIpfsUrl,
      };

      // Convert metadata to base64 encoded tokenURI
      const tokenURI = `data:application/json;base64,${btoa(
        JSON.stringify(metadata)
      )}`;
      console.log("TokenURI:", tokenURI);

      if (!contract) {
        throw new Error("Contract not found");
      }
      // Mint NFT with the IPFS URL
      const transaction = await contract.mintNFT(address, tokenURI);
      const receipt = await transaction.wait();

      console.log("Transaction:", receipt);
      setTransactionHash(receipt.hash);
      setMintStatus("success");

      // Clear form
      setFile(null);
      setImagePreview(null);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error:", error);
      setUploadError(
        error instanceof Error ? error.message : "An error occurred"
      );
      setMintStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`bg-white/5 backdrop-blur-sm p-4 rounded-2xl shadow-xl w-full ${className}`}
    >
      <Header />
      <WalletButton />
      <div className="flex flex-col gap-6 mt-8">
        <MinterInputs
          name={name}
          description={description}
          imagePreview={imagePreview || ""}
          isUploading={isUploading}
          handleFileChange={handleFileChange}
          setName={setName}
          setDescription={setDescription}
        />

        <MintNFTButton
          mintNFT={mintNFT}
          isUploading={isUploading}
          file={file}
          name={name}
          description={description}
        />

        {/* Add success message */}
        {mintStatus === "success" && transactionHash && (
          <MintSuccessErrorMsg transactionHash={transactionHash} />
        )}

        {/* Add error message */}
        {mintStatus === "error" && <MintErrorMsg uploadError={uploadError} />}

        {uploadError && !mintStatus && (
          <div className="text-red-500 text-center mt-4">{uploadError}</div>
        )}
      </div>
    </div>
  );
};
