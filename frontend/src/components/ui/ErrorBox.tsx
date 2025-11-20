export const ErrorBox = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <h2 className="text-red-800 font-semibold">{title}</h2>
    <p className="text-red-600 mt-1">{message}</p>
  </div>
);
