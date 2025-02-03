export type ErrorMessageProps = {
  title: string;
  message: string;
};

export const ErrorMessage = ({ message, title }: ErrorMessageProps) => {
  return (
    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <p className="text-red-400">
        ❌ {title}
        {message && <span className="block mt-1 text-sm">{message}</span>}
      </p>
    </div>
  );
};

//
