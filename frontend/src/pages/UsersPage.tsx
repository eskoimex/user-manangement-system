import React, { useState } from "react";
import { useUsers, useUsersCount } from "../hooks/useUsers";
import { UsersTable } from "../components/UsersTable";
import { User } from "../types";

interface UsersPageProps {
  onUserSelect: (user: User) => void;
}

export const UsersPage: React.FC<UsersPageProps> = ({ onUserSelect }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 4;

  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(pageNumber, pageSize);
  const {
    data: totalCount = 0,
    isLoading: countLoading,
    error: countError,
  } = useUsersCount();

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrevious = () => {
    setPageNumber((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setPageNumber((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handlePageClick = (page: number) => {
    setPageNumber(page);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageNumber < 3) {
        pages.push(0, 1, 2);
        pages.push(-1);
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else if (pageNumber > totalPages - 4) {
        pages.push(0, 1, 2);
        pages.push(-1);
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pages.push(0, 1, 2);
        pages.push(-1);
        pages.push(pageNumber - 1, pageNumber, pageNumber + 1);
        pages.push(-1);
        pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
      }
    }

    return pages;
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
                "Failed to load users"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-sans font-medium text-6xl leading-[6rem] tracking-normal text-[#020618]">
            Users
          </h1>
        </div>

        <UsersTable
          users={users}
          onUserSelect={onUserSelect}
          isLoading={usersLoading}
        />

        {totalPages > 1 && (
          <div className="mt-8 flex w-full justify-end">
            <nav className="flex items-center space-x-1">
              <span className="sm:hidden flex h-9 items-center justify-center px-3 text-sm text-gray-600 whitespace-nowrap">
                {countLoading ? (
                  <div className="lds-ellipsis-sm">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  `${pageNumber + 1} / ${totalPages}`
                )}
              </span>

              <button
                onClick={handlePrevious}
                disabled={pageNumber === 0 || countLoading}
                className="
                    flex h-9 items-center justify-center 
                    px-5 text-sm font-medium leading-5 
                    bg-white text-[#020618]
                    rounded hover:bg-gray-100 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors cursor-pointer gap-1
                    "
              >
                {countLoading ? (
                  <div className="lds-ellipsis-sm">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <span className="text-2xl leading-none -mt-2">‹</span>
                    <span className="hidden sm:inline">Previous</span>
                  </>
                )}
              </button>

              <div className="hidden sm:flex items-center space-x-1">
                {countLoading ? (
                  <div className="lds-ellipsis-sm">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  getPageNumbers().map((page, index) => (
                    <div key={index}>
                      {page === -1 ? (
                        <span className="flex h-9 w-9 items-center justify-center text-gray-500">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageClick(page)}
                          className={`flex h-9 w-9 items-center justify-center text-sm font-medium  rounded transition-colors cursor-pointer min-w-9 ${
                            page === pageNumber
                              ? " text-black border border-gray-200 hover:bg-gray-100"
                              : " bg-white text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {page + 1}
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={pageNumber >= totalPages - 1 || countLoading}
                className="
                  w-[78px] h-10 flex items-center justify-center
                  pl-4 pr-2.5 pt-0 pb-0
                  text-sm font-medium 
                  bg-white text-gray-900 
                  rounded-md 
                  hover:bg-gray-100 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors cursor-pointer gap-1
                "
              >
                {countLoading ? (
                  <div className="lds-ellipsis-sm">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <span className="hidden sm:inline">Next</span>
                    <span className="text-2xl leading-none -mt-2">›</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};