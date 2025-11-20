// export const Loader = () => {
//   return (
//     <div className="flex justify-center items-center py-10">
//       <div className="lds-ellipsis">
//         <div></div><div></div><div></div><div></div>
//       </div>
//     </div>
//   );
// };
import React from "react";

interface LoaderProps {
  size?: "sm" | "lg";
}

export const Loader: React.FC<LoaderProps> = ({ size = "lg" }) => (
  <div className={`lds-ellipsis${size === "sm" ? "-sm" : ""}`}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
