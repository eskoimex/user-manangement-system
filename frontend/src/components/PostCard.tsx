import React from "react";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md relative flex flex-col min-h-[293px]">
    <button
      onClick={() => onDelete(post.id)}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
    <h2 className="font-medium text-[18px] leading-[28px] text-gray-900 mb-2 line-clamp-2">
      {post.title}
    </h2>
    <p className="font-normal text-[14px] leading-[22px] text-gray-700 line-clamp-6 break-words">
      {post.body}
    </p>
  </div>
);
