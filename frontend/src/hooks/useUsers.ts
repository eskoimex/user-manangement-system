
import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { api } from "../lib/utils/api";

export const useUsers = (pageNumber: number, pageSize: number = 4) => {
  return useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: async (): Promise<User[]> => {
      const response = await api.get(
        `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      console.log(response.data.data)
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useUsersCount = () => {
  return useQuery({
    queryKey: ["users", "count"],
    queryFn: async (): Promise<number> => {
      const response = await api.get("/users/count");
      return response.data.data.count;
    },
    staleTime: 5 * 60 * 1000,
  });
};