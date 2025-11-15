import React, { useState } from "react";
import { useCreatePost } from "../hooks/usePosts";

interface AddPostFormProps {
  userId: string;
  onSuccess: () => void;
  onClose: () => void; 
}

export const AddPostForm: React.FC<AddPostFormProps> = ({
  userId,
  onSuccess,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const createPostMutation = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPostMutation.mutateAsync({ userId, title, body });

      setTitle("");
      setBody("");
      onSuccess();
      onClose(); 
    } catch (error) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-4xl font-medium leading-10 text-[#020618] mb-6">
            New post
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Post title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // required
                minLength={1}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Give your post a title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Post content
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                // required
                minLength={1}
                rows={6}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Write something mind-blowing"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {createPostMutation.isPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
