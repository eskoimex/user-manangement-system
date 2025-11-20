import React from "react";
import { usePosts } from "../hooks/usePosts";
import { usePostDeletion } from "../hooks/usePostDeletion";

import { AddPostCard } from "../components/AddPostCard";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { Loader } from "../components/ui/loader";
import { DeleteModal } from "../components/ui/DeleteModal";
import { PostCard } from "../components/PostCard";
import { ErrorBox } from "../components/ui/ErrorBox";
import { UserHeader } from "../components/UserHeader";
import { PostGrid } from "../components/PostGrid";
import { EmptyState } from "../components/ui/EmptyState";

import { User } from "../types";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export const UserPostsPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  if (!userId) return <EmptyState message="Invalid user URL" />;

  const user = location.state as User | null;
  if (!user) return <EmptyState message="User not found" />;

  const { data: posts = [], isLoading, error, refetch } = usePosts(userId);
  const { deleteTarget, setDeleteTarget, isDeleting, confirmDelete } =
    usePostDeletion(refetch);

  const onBack = () => navigate("/");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb user={user} onBack={onBack} />
        <UserHeader
          user={user}
          isLoading={isLoading}
          postCount={posts.length}
        />

        {error && (
          <ErrorBox
            title="Error Loading Posts"
            message={
              error instanceof Error ? error.message : "Failed to load posts"
            }
          />
        )}

        <PostGrid>
          <AddPostCard userId={user.id} onSuccess={refetch} />

          {isLoading ? (
            <div className="flex justify-center items-center w-full col-span-full">
              <Loader />
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={setDeleteTarget} />
            ))
          )}
        </PostGrid>
      </div>

      {deleteTarget && (
        <DeleteModal
          title="Delete Post"
          message="Are you sure you want to delete this post?"
          onCancel={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};
