
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../types";
import { api } from "../api/axios";


export const usePosts = (userId: string) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", userId],
    queryFn: async (): Promise<Post[]> => {
      if (!userId) return [];
      const response = await api.get(`/posts?userId=${userId}`);
      return response.data.data;
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });
};


export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, { previousPosts: Post[] }>({
    mutationFn: async (postId) => {
      await api.delete(`/posts/${postId}`);
    },

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]) ?? [];

      queryClient.setQueryData<Post[]>(["posts"], (old = []) =>
        old.filter((post) => post.id !== postId)
      );

      return { previousPosts };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};


export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      userId: string;
      title: string;
      body: string;
    }) => {
      const response = await api.post("/posts", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};