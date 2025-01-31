type MintSuccessErrorMsgProps = {
  transactionHash: string;
};

export const MintSuccessErrorMsg = ({
  transactionHash,
}: MintSuccessErrorMsgProps) => {
  return (
    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
      <p className="text-green-400 mb-2">🎉 NFT minted successfully!</p>
      <a
        href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline"
      >
        View transaction on Etherscan
      </a>
    </div>
  );
};
