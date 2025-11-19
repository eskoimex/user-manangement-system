
import React from "react";
import { User } from "../types";

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
  const formatAddress = (user: User): string => {
    if (!user.addresses || user.addresses.length === 0) {
      return "No address";
    }
    const address = user.addresses[0];
    return `${address.street}, ${address.city}, ${address.state} ${address.zipcode}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 lg:p-6 opacity-100">
      {/* User Title */}
      <div className="mb-6 lg:mb-10">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Users</h1>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Full name
                </th>
                <th className="px-4 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Email address
                </th>
                <th className="px-4 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => onUserSelect(user)}
                  className="cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 lg:px-6 lg:py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 lg:px-6 lg:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 truncate max-w-[150px] lg:max-w-none">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-4 py-3 lg:px-6 lg:py-4">
                    <div className="text-sm text-gray-600 truncate max-w-[200px] lg:max-w-xs">
                      {formatAddress(user)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};