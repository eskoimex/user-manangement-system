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
  const [error, setError] = useState<string | string[]>("");
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    body?: string;
  }>({});

  const createPostMutation = useCreatePost();

  const TITLE_LIMIT = 50;
  const BODY_LIMIT = 250;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length > TITLE_LIMIT || body.length > BODY_LIMIT) {
      setError(
        `Title cannot exceed ${TITLE_LIMIT} characters. Body cannot exceed ${BODY_LIMIT} characters.`
      );
      return;
    }

    try {
      await createPostMutation.mutateAsync({ userId, title, body });
      setTitle("");
      setBody("");
      setError("");
      setFieldErrors({});
      onSuccess();
      onClose();
    } catch (e: any) {
      const msg = e.message || "Failed to create post.";

      const fe: { title?: string; body?: string } = {};
      if (msg.toLowerCase().includes("title")) fe.title = msg;
      if (msg.toLowerCase().includes("body")) fe.body = msg;

      setFieldErrors(fe);
      setError(msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-6 flex flex-col">
          <h2 className="text-4xl font-medium leading-10 text-[#020618] mb-6">
            New Post
          </h2>

          {error &&
            (Array.isArray(error) ? (
              <ul className="mb-4 bg-red-50 border border-red-300 p-3 rounded-md">
                {error.map((msg, idx) => (
                  <li key={idx} className="text-red-700 text-sm">
                    {msg}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-4 rounded-md bg-red-50 border border-red-300 p-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            ))}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={TITLE_LIMIT}
                placeholder="Give your post a title"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  fieldErrors.title
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-blue-300"
                }`}
              />
              <p className="text-right text-xs text-gray-500">
                {title.length}/{TITLE_LIMIT}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Post Content
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={BODY_LIMIT}
                rows={6}
                placeholder="Write something mind-blowing"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  fieldErrors.body
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-blue-300"
                }`}
              />
              <p className="text-right text-xs text-gray-500">
                {body.length}/{BODY_LIMIT}
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createPostMutation.isPending}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {createPostMutation.isPending ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
