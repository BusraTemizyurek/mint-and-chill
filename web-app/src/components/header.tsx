import Image from "next/image";

export const Header = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Base Sepolia Testnet
      </h2>

      <div className="flex items-center gap-6">
        <Image
          src="/logo.svg"
          alt="Mint and Chill Logo"
          width={50}
          height={50}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              MINT
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mx-2">
              &
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              CHILL
            </span>
          </h1>
          <span className="text-sm text-gray-400 tracking-widest uppercase mt-1">
            NFT Minting Made Easy
          </span>
        </div>
      </div>
    </div>
  );
};
