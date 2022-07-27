import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="rounded-xl font-semibold text-xl bg-primary py-2 hover:bg-primaryClick active:bg-primaryActive">
      {children}
    </button>
  );
};
