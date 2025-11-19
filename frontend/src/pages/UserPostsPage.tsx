// // import React from "react";
// // import { usePosts, useDeletePost } from "../hooks/usePosts";
// // import { AddPostForm } from "../components/AddPostForm";
// // import { Breadcrumb } from "../components/ui/breadcrumb";
// // import { User } from "../types";
// // import { useParams, useLocation, useNavigate } from "react-router-dom";

// // interface UserPostsPageProps {}

// // export const UserPostsPage: React.FC<UserPostsPageProps> = () => {
// //   const { userId } = useParams();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const user = location.state as User;

// //   if (!user) {
// //     return <div>User not found</div>;
// //   }

// //   const onBack = () => navigate("/");

// //   const { data: posts = [], isLoading, error, refetch } = usePosts(userId!);
// //   const deletePostMutation = useDeletePost();

// //   const handleDeletePost = async (postId: string, e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     if (window.confirm("Are you sure you want to delete this post?")) {
// //       try {
// //         await deletePostMutation.mutateAsync(postId);
// //         refetch();
// //       } catch {
// //         alert("Failed to delete post");
// //       }
// //     }
// //   };

// //   const getGridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"; // 3 columns on large screens

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
// //         <Breadcrumb user={user} onBack={onBack} />

// //         <div className="mb-8">
// //           <h1 className="font-sans font-medium text-4xl leading-[2.5rem] text-gray-900 mb-2">
// //             {user.name}
// //           </h1>

// //           <div className="flex flex-wrap items-center space-x-2 text-[#181D27]">
// //             <span className="font-sans font-normal text-sm leading-5 text-gray-400">
// //               {user.email}
// //             </span>
// //             <span className="font-sans font-normal text-sm leading-5">•</span>
// //             <span className="font-sans font-normal text-sm leading-5">
// //               {isLoading ? (
// //                 <div className="lds-ellipsis-sm">
// //                   <div></div>
// //                   <div></div>
// //                   <div></div>
// //                   <div></div>
// //                 </div>
// //               ) : (
// //                 `${posts.length} Posts`
// //               )}
// //             </span>
// //           </div>
// //         </div>

// //         {error && (
// //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
// //             <h2 className="text-red-800 font-semibold">Error Loading Posts</h2>
// //             <p className="text-red-600 mt-1">
// //               {error instanceof Error ? error.message : "Failed to load posts"}
// //             </p>
// //           </div>
// //         )}

// //         <div className={`grid ${getGridCols} gap-6 justify-start`}>
// //           <AddPostCard userId={user.id} onSuccess={refetch} />

// //           {isLoading ? (
// //             <div className="flex justify-center items-center w-full col-span-full">
// //               <div className="lds-ellipsis">
// //                 <div></div>
// //                 <div></div>
// //                 <div></div>
// //                 <div></div>
// //               </div>
// //             </div>
// //           ) : (
// //             posts.map((post) => (
// //               <div
// //                 key={post.id}
// //                 className="p-6 bg-white border border-gray-200 rounded-lg
// //                            shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
// //                            hover:shadow-md relative flex flex-col min-h-[293px]"
// //               >
// //                 <button
// //                   onClick={(e) => handleDeletePost(post.id, e)}
// //                   className="absolute top-2 right-2 text-red-500 hover:text-red-700"
// //                 >
// //                   <svg
// //                     className="w-4 h-4"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
// //                     />
// //                   </svg>
// //                 </button>

// //                 <h2 className="font-medium text-[18px] leading-[28px] text-gray-900 mb-2 line-clamp-2">
// //                   {post.title}
// //                 </h2>
// //                 <p className="font-normal text-[14px] leading-[22px] text-gray-700 line-clamp-6 break-words">
// //                   {post.body}
// //                 </p>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // interface AddPostCardProps {
// //   userId: string;
// //   onSuccess: () => void;
// // }

// // const AddPostCard: React.FC<AddPostCardProps> = ({ userId, onSuccess }) => {
// //   const [isFormOpen, setIsFormOpen] = React.useState(false);

// //   return (
// //     <>
// //       <div
// //         className="p-6 flex flex-col items-center justify-center gap-4
// //                    bg-white border-2 border-dashed border-gray-200 rounded-md
// //                    shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
// //                    hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer
// //                    min-h-[293px]"
// //         onClick={() => setIsFormOpen(true)}
// //       >
// //         <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-700 bg-white cursor-pointer hover:bg-gray-50">
// //           <svg
// //             className="w-3 h-3 text-gray-700"
// //             fill="none"
// //             stroke="currentColor"
// //             viewBox="0 0 24 24"
// //           >
// //             <path
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               strokeWidth={3}
// //               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
// //             />
// //           </svg>
// //         </div>

// //         <p className="font-semibold text-[16px] leading-[20px] text-[#0F172B] text-center">
// //           New Post
// //         </p>
// //       </div>

// //       {isFormOpen && (
// //         <AddPostForm
// //           userId={userId}
// //           onSuccess={() => {
// //             onSuccess();
// //             setIsFormOpen(false);
// //           }}
// //           onClose={() => setIsFormOpen(false)}
// //         />
// //       )}
// //     </>
// //   );
// // };
// import React from "react";
// import { usePosts, useDeletePost } from "../hooks/usePosts";
// import { AddPostForm } from "../components/AddPostForm";
// import { Breadcrumb } from "../components/ui/breadcrumb";
// import { User } from "../types";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

// interface UserPostsPageProps {}

// export const UserPostsPage: React.FC<UserPostsPageProps> = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const user = location.state as User;

//   if (!user) {
//     return <div>User not found</div>;
//   }

//   const onBack = () => navigate("/");

//   const { data: posts = [], isLoading, error, refetch } = usePosts(userId!);
//   const deletePostMutation = useDeletePost();

//   const handleDeletePost = async (postId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       try {
//         await deletePostMutation.mutateAsync(postId);
//         refetch();
//       } catch {
//         alert("Failed to delete post");
//       }
//     }
//   };

//   const getGridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"; // 3 columns on large screens

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
//         <Breadcrumb user={user} onBack={onBack} />

//         <div className="mb-8">
//           <h1 className="font-sans font-medium text-4xl leading-[2.5rem] text-gray-900 mb-2">
//             {user.name}
//           </h1>

//           <div className="flex flex-wrap items-center space-x-2 text-[#181D27]">
//             <span className="font-sans font-normal text-sm leading-5 text-gray-400">
//               {user.email}
//             </span>
//             <span className="font-sans font-normal text-sm leading-5">•</span>
//             <span className="font-sans font-normal text-sm leading-5">
//               {isLoading ? (
//                 <div className="lds-ellipsis-sm">
//                   <div></div>
//                   <div></div>
//                   <div></div>
//                   <div></div>
//                 </div>
//               ) : (
//                 `${posts.length} Posts`
//               )}
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

//         <div className={`grid ${getGridCols} gap-6 justify-start`}>
//           <AddPostCard userId={user.id} onSuccess={refetch} />

//           {isLoading ? (
//             <div className="flex justify-center items-center w-full col-span-full">
//               <div className="lds-ellipsis">
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//               </div>
//             </div>
//           ) : (
//             posts.map((post) => (
//               <div
//                 key={post.id}
//                 className="p-6 bg-white border border-gray-200 rounded-lg
//                            shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
//                            hover:shadow-md relative flex flex-col min-h-[293px]"
//               >
//                 <button
//                   onClick={(e) => handleDeletePost(post.id, e)}
//                   className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//                 >
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                     />
//                   </svg>
//                 </button>

//                 <h2 className="font-medium text-[18px] leading-[28px] text-gray-900 mb-2 line-clamp-2">
//                   {post.title}
//                 </h2>
//                 <p className="font-normal text-[14px] leading-[22px] text-gray-700 line-clamp-6 break-words">
//                   {post.body}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface AddPostCardProps {
//   userId: string;
//   onSuccess: () => void;
// }

// const AddPostCard: React.FC<AddPostCardProps> = ({ userId, onSuccess }) => {
//   const [isFormOpen, setIsFormOpen] = React.useState(false);

//   return (
//     <>
//       <div
//         className="p-6 flex flex-col items-center justify-center gap-4
//                    bg-white border-2 border-dashed border-gray-200 rounded-md
//                    shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
//                    hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer
//                    min-h-[293px]"
//         onClick={() => setIsFormOpen(true)}
//       >
//         <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-700 bg-white cursor-pointer hover:bg-gray-50">
//           <svg
//             className="w-3 h-3 text-gray-700"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={3}
//               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//             />
//           </svg>
//         </div>

//         <p className="font-semibold text-[16px] leading-[20px] text-[#0F172B] text-center">
//           New Post
//         </p>
//       </div>

//       {isFormOpen && (
//         <AddPostForm
//           userId={userId}
//           onSuccess={() => {
//             onSuccess();
//             setIsFormOpen(false);
//           }}
//           onClose={() => setIsFormOpen(false)}
//         />
//       )}
//     </>
//   );
// };
import React, { useState } from "react";
import { usePosts, useDeletePost } from "../hooks/usePosts";
import { AddPostForm } from "../components/AddPostForm";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { User } from "../types";
import { useParams, useLocation, useNavigate } from "react-router-dom";

interface UserPostsPageProps {}

export const UserPostsPage: React.FC<UserPostsPageProps> = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state as User;

  if (!user) return <div>User not found</div>;

  const onBack = () => navigate("/");

  const { data: posts = [], isLoading, error, refetch } = usePosts(userId!);
  const deletePostMutation = useDeletePost();

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deletePostMutation.mutateAsync(deleteTarget);
      refetch();
      setDeleteTarget(null);
    } catch (err) {
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const getGridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"; // 3 columns on large screens

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        <Breadcrumb user={user} onBack={onBack} />

        <div className="mb-8">
          <h1 className="font-sans font-medium text-4xl leading-[2.5rem] text-gray-900 mb-2">
            {user.name}
          </h1>

          <div className="flex flex-wrap items-center space-x-2 text-[#181D27]">
            <span className="font-sans font-normal text-sm leading-5 text-gray-400">
              {user.email}
            </span>
            <span className="font-sans font-normal text-sm leading-5">•</span>
            <span className="font-sans font-normal text-sm leading-5">
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

        <div className={`grid ${getGridCols} gap-6 justify-start`}>
          <AddPostCard userId={user.id} onSuccess={refetch} />

          {isLoading ? (
            <div className="flex justify-center items-center w-full col-span-full">
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
                className="p-6 bg-white border border-gray-200 rounded-lg
                           shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
                           hover:shadow-md relative flex flex-col min-h-[293px]"
              >
                <button
                  onClick={() => setDeleteTarget(post.id)}
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
            ))
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Delete Post
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
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
        className="p-6 flex flex-col items-center justify-center gap-4
                   bg-white border-2 border-dashed border-gray-200 rounded-md
                   shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)]
                   hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer
                   min-h-[293px]"
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
