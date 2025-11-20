// import React from "react";
// import { usePosts, useDeletePost } from "../hooks/usePosts";
// import { AddPostCard } from "../components/AddPostCard";
// import { Breadcrumb } from "../components/ui/breadcrumb";
// import { Loader } from "../components/ui/loader";
// import { DeleteModal } from "../components/ui/DeleteModal";
// import { PostCard } from "../components/PostCard";
// import { User } from "../types";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

// const GRID_COLS = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

// export const UserPostsPage: React.FC = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const user = location.state && "id" in location.state ? (location.state as User) : null;

//   const { data: posts = [], isLoading, error, refetch } = usePosts(userId!);
//   const deletePostMutation = useDeletePost();

//   const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
//   const [isDeleting, setIsDeleting] = React.useState(false);

//   const handleDeletePost = async () => {
//     if (!deleteTarget) return;
//     setIsDeleting(true);
//     try {
//       await deletePostMutation.mutateAsync(deleteTarget);
//       refetch();
//       setDeleteTarget(null);
//     } catch {
//       alert("Failed to delete post");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const onBack = () => navigate("/");

//   if (!user) return <div className="p-6 text-center">User not found</div>;

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
//         <Breadcrumb user={user} onBack={onBack} />

//         <div className="mb-8">
//           <h1 className="font-sans font-medium text-4xl leading-[2.5rem] text-gray-900 mb-2">
//             {user.name}
//           </h1>
//           <div className="flex flex-wrap items-center space-x-2 text-[#181D27]">
//             <span className="font-sans font-normal text-sm text-gray-400">{user.email}</span>
//             <span className="font-sans font-normal text-sm">•</span>
//             <span className="font-sans font-normal text-sm">
//               {isLoading ? <Loader size="sm" /> : `${posts.length} Posts`}
//             </span>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <h2 className="text-red-800 font-semibold">Error Loading Posts</h2>
//             <p className="text-red-600 mt-1">
//               {error instanceof Error ? error.message : "Failed to load posts"}
//             </p>
//           </div>
//         )}

//         <div className={`grid ${GRID_COLS} gap-6 justify-start`}>
//           <AddPostCard userId={user.id} onSuccess={refetch} />

//           {isLoading ? (
//             <div className="flex justify-center items-center w-full col-span-full">
//               <Loader />
//             </div>
//           ) : (
//             posts.map((post) => (
//               <PostCard key={post.id} post={post} onDelete={setDeleteTarget} />
//             ))
//           )}
//         </div>
//       </div>

//       {deleteTarget && (
//         <DeleteModal
//           title="Delete Post"
//           message="Are you sure you want to delete this post? This action cannot be undone."
//           onCancel={() => setDeleteTarget(null)}
//           onConfirm={handleDeletePost}
//           isLoading={isDeleting}
//         />
//       )}
//     </div>
//   );
// };
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
