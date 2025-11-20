import { useState } from "react";
import { useDeletePost } from "./usePosts";

export const usePostDeletion = (refetch: () => void) => {
  const deletePostMutation = useDeletePost();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await deletePostMutation.mutateAsync(deleteTarget);
      refetch();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteTarget,
    setDeleteTarget,
    isDeleting,
    confirmDelete,
  };
};
