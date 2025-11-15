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
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead className="border-b border-t">
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
          {users.map((user) => (
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
                <div className="text-sm font-normal leading-5 tracking-normal text-[#020618] truncate w-96">
                  {formatAddress(user)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
