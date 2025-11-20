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
    <div className="w-full flex flex-col items-center justify-start pt-4">
      <div className="w-full max-w-[880px] px-4">
        <div className="mb-6 text-left">
          <h1 className="font-sans font-medium text-6xl leading-[6rem] tracking-normal text-[#020618] ">
            Users
          </h1>
        </div>

        <div
          className="bg-white rounded-lg shadow
  max-h-[400px] lg:overflow-hidden md:overflow-auto
  sm:overflow-auto overflow-auto"
        >
          <table className="min-w-full table-auto">
            <thead className="border-b border-t sticky top-0 z-10">
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
    </div>
  );
};
