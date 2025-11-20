import React from "react";
import { AddPostForm } from "./AddPostForm";

interface AddPostCardProps {
  userId: string;
  onSuccess: () => void;
}

export const AddPostCard: React.FC<AddPostCardProps> = ({
  userId,
  onSuccess,
}) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setIsFormOpen(true)}
        className="p-6 flex flex-col items-center justify-center gap-4
                   bg-white border-2 border-dashed border-gray-200 rounded-md
                   shadow hover:border-gray-400 hover:text-gray-600
                   transition-colors cursor-pointer min-h-[293px]"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-700 bg-white hover:bg-gray-50">
          <svg
            className="w-3 h-3 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>

        <p className="font-semibold text-[16px] text-[#0F172B] text-center">
          New Post
        </p>
      </div>

      {isFormOpen && (
        <AddPostForm
          userId={userId}
          onSuccess={() => {
            onSuccess();
            setIsFormOpen(false);
          }}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
};
