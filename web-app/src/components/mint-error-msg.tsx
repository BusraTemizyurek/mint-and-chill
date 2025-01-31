type MintErrorMsgProps = {
  uploadError: string | null;
};

export const MintErrorMsg = ({ uploadError }: MintErrorMsgProps) => {
  return (
    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <p className="text-red-400">
        ❌ Failed to mint NFT. Please try again.
        {uploadError && (
          <span className="block mt-1 text-sm">{uploadError}</span>
        )}
      </p>
    </div>
  );
};
