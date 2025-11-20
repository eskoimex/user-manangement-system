import React from "react";

interface EmptyStateProps {
  message: string;
  description?: string; 
  action?: React.ReactNode; 
  className?: string; 
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center 
                  py-20 px-6 bg-white border border-gray-200 rounded-lg 
                  ${className}`}
    >
      <div className="w-14 h-14 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="h-7 w-7 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0V9a6 6 0 10-12 0v8H5a2 2 0 00-2 2v1h18v-1a2 2 0 00-2-2h-2z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{message}</h3>

      {description && (
        <p className="mt-2 text-sm text-gray-500 max-w-xs">{description}</p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
