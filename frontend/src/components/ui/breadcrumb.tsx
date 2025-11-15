import React from "react";

interface BreadcrumbProps {
  user: { name: string };
  onBack: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ user, onBack }) => {
  return (
    <nav className="flex items-center space-x-2 mb-7 text-sm text-gray-500 ">
      <button
        onClick={onBack}
        className="font-sans font-normal text-sm leading-5 tracking-normal text-[#62748E] hover:text-blue-800"
      >
        Users
      </button>

      <span className="mx-2"> &gt; </span>
      <span className="font-sans font-normal text-sm leading-5 tracking-normal text-gray-700">
        {user.name}
      </span>
    </nav>
  );
};

export { Breadcrumb };
