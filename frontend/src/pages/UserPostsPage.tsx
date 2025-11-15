import React from "react";
import { usePosts, useDeletePost } from "../hooks/usePosts";
import { AddPostForm } from "../components/AddPostForm";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { User } from "../types";

interface UserPostsPageProps {
  user: User;
  onBack: () => void;
}

export const UserPostsPage: React.FC<UserPostsPageProps> = ({
  user,
  onBack,
}) => {
  const { data: posts = [], isLoading, error, refetch } = usePosts(user.id);
  const deletePostMutation = useDeletePost();

  const handleDeletePost = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePostMutation.mutateAsync(postId);
      } catch (error) {
        alert("Failed to delete post");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb user={user} onBack={onBack} />

        <div className="mb-8">
          <h1 className="font-sans font-medium text-4xl leading-[2.5rem] tracking-normal text-gray-900 mb-2">
            {user.name}
          </h1>

          <div className="flex flex-wrap items-center space-x-2 text-[#181D27]">
            <span className="font-sans font-normal text-sm leading-5 tracking-normal text-gray-400">
              {user.email}
            </span>
            <span className="font-sans font-normal text-sm leading-5 tracking-normal">
              •
            </span>
            <span className="font-sans font-normal text-sm leading-5 tracking-normal">
              {isLoading ? (
                <div className="lds-ellipsis-sm">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                `${posts.length} Posts`
              )}
            </span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h2 className="text-red-800 font-semibold">Error Loading Posts</h2>
            <p className="text-red-600 mt-1">
              {error instanceof Error ? error.message : "Failed to load posts"}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-6 justify-start">
          <AddPostCard userId={user.id} onSuccess={refetch} />

          {isLoading ? (
            <div className="flex justify-center items-center w-full col-span-2">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                style={{ width: "270px", height: "293px" }}
                className="p-6 bg-white border border-gray-200 rounded-lg
                         shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
                         hover:shadow-md relative flex flex-col"
              >
                <button
                  onClick={(e) => handleDeletePost(post.id, e)}
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
                <p className="font-normal text-[14px] leading-[22px] text-gray-700 line-clamp-6 w-full break-words">
                  {post.body}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface AddPostCardProps {
  userId: string;
  onSuccess: () => void;
}

const AddPostCard: React.FC<AddPostCardProps> = ({ userId, onSuccess }) => {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <>
      <div
        style={{ width: "270px", height: "293px" }}
        className="p-6 flex flex-col items-center justify-center gap-4
                   bg-white border-2 border-dashed border-spacing-9 border-gray-200 rounded-md
                   shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
                   hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        onClick={() => setIsFormOpen(true)}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-700 bg-white cursor-pointer hover:bg-gray-50">
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

        <p className="font-semibold text-[16px] leading-[20px] text-[#0F172B] text-center">
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