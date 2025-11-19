import React from "react";
import { User } from "../types";
import { formatAddress } from "../lib/utils/address_format";

interface UsersTableProps {
  users: User[];
  onUserSelect: (user: User) => void;
  isLoading: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onUserSelect,
  isLoading,
}) => {
  return (
    <div className="lg:ml-[280px] lg:mt-[132px] lg:w-[880px] w-full max-w-full mx-auto p-4 lg:p-0">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-[#020618]">Users</h1>
      </div>

      <div className="overflow-auto bg-white rounded-lg shadow max-h-[400px]">
        <table className="min-w-full table-auto">
          <thead className="border-b border-t bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-normal text-[#62748E]">
                Full name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-normal text-[#62748E]">
                Email address
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium tracking-normal text-[#62748E]">
                Address
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="py-6">
                  <div className="flex justify-center items-center h-16">
                    <div className="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => onUserSelect(user)}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-normal leading-5 tracking-normal text-[#020618]">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-normal leading-5 tracking-normal text-[#020618]">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-normal leading-5 tracking-normal text-[#020618] truncate max-w-[200px] lg:max-w-none lg:w-96">
                      {formatAddress(user)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
