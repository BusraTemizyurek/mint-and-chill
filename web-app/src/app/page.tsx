"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import Image from "next/image";
import { useAccount, useWalletClient } from "wagmi";
import { ethers } from "ethers";

import { output } from "../../MintAndChillNFT_metadata.json";
import {
  Avatar,
  Name,
  Identity,
  Address,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { useEffect, useState } from "react";
import axios from "axios";
import CursorGlow from "../components/CursorGlow";
import NFTGallery from "../components/NFTGallery";
import { Background } from "../components/background";
import { Header } from "../components/header";
import { useContract } from "./useContract";

export default function Home() {
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

  const [hasNFTs, setHasNFTs] = useState<boolean>(false);

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

  useEffect(() => {
    setHasNFTs(true);
  }, []);
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
      const metadata = {
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
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <CursorGlow />
      <Background />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-2xl w-full">
        {/* minter */}

        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl shadow-xl w-full">
          <Header />
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>

          <div className="flex flex-col gap-6 mt-8">
            <input
              type="text"
              placeholder="NFT Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isUploading}
            />

            <textarea
              placeholder="NFT Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/10 border border-white/20 p-3 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
              disabled={isUploading}
            />

            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {!imagePreview ? (
                  <>
                    <svg
                      className="w-12 h-12 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-gray-400">
                      Click to upload your NFT image
                    </span>
                  </>
                ) : (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={300}
                    height={300}
                    className="rounded-lg object-contain max-h-[300px]"
                    unoptimized
                  />
                )}
              </label>
            </div>

            <button
              onClick={mintNFT}
              disabled={!file || isUploading || !name || !description}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Minting in progress...
                </span>
              ) : (
                "Mint NFT"
              )}
            </button>

            {/* Add success message */}
            {mintStatus === "success" && transactionHash && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 mb-2">
                  🎉 NFT minted successfully!
                </p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  View transaction on Etherscan
                </a>
              </div>
            )}

            {/* Add error message */}
            {mintStatus === "error" && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">
                  ❌ Failed to mint NFT. Please try again.
                  {uploadError && (
                    <span className="block mt-1 text-sm">{uploadError}</span>
                  )}
                </p>
              </div>
            )}

            {uploadError && !mintStatus && (
              <div className="text-red-500 text-center mt-4">{uploadError}</div>
            )}
          </div>
        </div>
        {/* NFT Gallery */}
        {hasNFTs ? <NFTGallery /> : null}
      </main>
    </div>
  );
}
