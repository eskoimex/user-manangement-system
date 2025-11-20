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
