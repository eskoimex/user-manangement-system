import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsers, useUsersCount } from "../hooks/useUsers";
import { UsersTable } from "../components/UsersTable";
import { usePagination } from "../hooks/usePagination";
import { PaginationController } from "../components/ui/pagination_controller";
import { EmptyState } from "../components/ui/EmptyState";
import { Loader } from "../components/ui/loader";
import { User } from "../types";

const PAGE_SIZE = 4;

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: totalCount = 0,
    isLoading: countLoading,
    error: countError,
  } = useUsersCount();

  const { page, setPage, pageCount, next, prev } = usePagination(
    totalCount,
    PAGE_SIZE
  );

  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(page, PAGE_SIZE);

  const handleSelect = (user: User) => {
    navigate(`/users/${user.id}`, { state: user });
  };

  if (usersError || countError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <EmptyState
          message="Unable to load users"
          description={
            (usersError as Error)?.message ||
            (countError as Error)?.message ||
            "An unexpected error occurred."
          }
        />
      </div>
    );
  }

  if (usersLoading && countLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!usersLoading && totalCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <EmptyState
          message="No users found"
          description="There are no users available at the moment."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 flex flex-col items-center">
      <div className="w-full max-w-[880px] px-4">
        <UsersTable
          users={users}
          onUserSelect={handleSelect}
          isLoading={usersLoading}
        />

        {pageCount > 1 && (
          <div className="mt-4 flex w-full justify-end">
            <PaginationController
              page={page}
              pageCount={pageCount}
              loading={countLoading}
              onNext={next}
              onPrev={prev}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
