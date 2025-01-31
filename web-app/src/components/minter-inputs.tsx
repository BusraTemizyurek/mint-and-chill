import Image from "next/image";

type MinterInputsProps = {
  name: string;
  description: string;
  imagePreview: string;
  isUploading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
};

export const MinterInputs = ({
  name,
  description,
  imagePreview,
  isUploading,
  handleFileChange,
  setName,
  setDescription,
}: MinterInputsProps) => {
  return (
    <>
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
    </>
  );
};
