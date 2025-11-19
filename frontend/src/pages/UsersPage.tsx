import React from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useUsersCount } from "../hooks/useUsers";
import { UsersTable } from "../components/UsersTable";
import { usePagination } from "../hooks/usePagination";
import { PaginationController } from "../components/ui/pagination_controller";

export const UsersPage: React.FC = () => {
  const pageSize = 4;

  const {
    data: totalCount = 0,
    isLoading: countLoading,
    error: countError,
  } = useUsersCount();

  const { page, setPage, pageCount, next, prev } = usePagination(
    totalCount,
    pageSize
  );

  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(page, pageSize);

  const navigate = useNavigate();

  const handleSelect = (user: any) => {
    navigate(`/users/${user.id}`, { state: user });
  };

  if (usersError || countError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold">Error Loading Data</h2>
            <p className="text-red-600 mt-1">
              {(usersError as Error)?.message ||
                (countError as Error)?.message ||
                "Unable to load users"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Users Table always rendered */}
        <UsersTable
          users={users}
          onUserSelect={handleSelect}
          isLoading={usersLoading}
        />

        {/* Pagination */}
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
