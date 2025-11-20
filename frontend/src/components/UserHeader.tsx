import { Loader } from "./ui/loader";
import { User } from "../types";

interface Props {
  user: User;
  isLoading: boolean;
  postCount: number;
}

export const UserHeader = ({ user, isLoading, postCount }: Props) => (
  <div className="mb-8">
    <h1 className="font-sans font-medium text-4xl text-gray-900 mb-2">
      {user.name}
    </h1>

    <div className="flex flex-wrap items-center space-x-2 text-[#181D27]">
      <span className="text-sm text-gray-400">{user.email}</span>
      <span className="text-sm">•</span>
      <span className="text-sm">
        {isLoading ? <Loader size="sm" /> : `${postCount} Posts`}
      </span>
    </div>
  </div>
);
