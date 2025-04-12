import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  extraCss?: string; 
}

export const Button: React.FC<ButtonProps> = ({ children, extraCss }) => {
  return (
    <button className={`rounded-xl font-semibold text-xl bg-primary py-2 hover:bg-primaryClick active:bg-primaryActive ${extraCss}`} >
      {children}
    </button>
  );
};
